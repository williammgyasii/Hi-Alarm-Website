/**
 * Firebase Admin SDK initialization for server-side Firestore access
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to Firebase Console > Project Settings > Service Accounts
 * 2. Click "Generate new private key" and download the JSON file
 * 3. Set the following environment variables in your .env.local:
 *    - FIREBASE_PROJECT_ID: Your Firebase project ID
 *    - FIREBASE_CLIENT_EMAIL: The client_email from the JSON file
 *    - FIREBASE_PRIVATE_KEY: The private_key from the JSON file (include the quotes and newlines)
 * 
 * Example .env.local:
 * FIREBASE_PROJECT_ID=your-project-id
 * FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
 * FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourPrivateKeyHere\n-----END PRIVATE KEY-----\n"
 */

import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

// Check if Firebase is configured
const isFirebaseConfigured = Boolean(
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY
);

let app: App | null = null;
let db: Firestore | null = null;

/**
 * Initialize Firebase Admin SDK
 * Returns null if not configured (dev mode fallback)
 */
function initializeFirebase(): App | null {
  if (!isFirebaseConfigured) {
    console.warn(
      "⚠️ Firebase is not configured. Running in dev mode with in-memory storage.\n" +
      "Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY environment variables."
    );
    return null;
  }

  // Check if already initialized
  const existingApps = getApps();
  if (existingApps.length > 0) {
    return existingApps[0];
  }

  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    
    return initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
    return null;
  }
}

/**
 * Get Firestore instance
 * Returns null if Firebase is not configured
 */
export function getFirestoreDb(): Firestore | null {
  if (!isFirebaseConfigured) {
    return null;
  }

  if (!app) {
    app = initializeFirebase();
  }

  if (!app) {
    return null;
  }

  if (!db) {
    db = getFirestore(app);
  }

  return db;
}

/**
 * Check if we're running in dev mode (no Firebase)
 */
export function isDevMode(): boolean {
  return !isFirebaseConfigured;
}

// ============================================
// IN-MEMORY FALLBACK FOR DEVELOPMENT
// ============================================

interface WaitlistEntry {
  email: string;
  name?: string;
  createdAt: Date;
  source: string;
  userAgent?: string;
}

// In-memory storage for dev mode
const inMemoryWaitlist = new Map<string, WaitlistEntry>();

/**
 * Add entry to waitlist (works in both Firebase and dev mode)
 */
export async function addToWaitlist(data: {
  email: string;
  name?: string;
  userAgent?: string;
}): Promise<{ ok: boolean; message?: string }> {
  const normalizedEmail = data.email.toLowerCase().trim();
  
  // Dev mode - use in-memory storage
  if (isDevMode()) {
    if (inMemoryWaitlist.has(normalizedEmail)) {
      return { ok: false, message: "This email is already on the waitlist." };
    }
    
    inMemoryWaitlist.set(normalizedEmail, {
      email: normalizedEmail,
      name: data.name,
      createdAt: new Date(),
      source: "landing",
      userAgent: data.userAgent,
    });
    
    console.log(`[DEV MODE] Added to waitlist: ${normalizedEmail}`);
    console.log(`[DEV MODE] Total waitlist entries: ${inMemoryWaitlist.size}`);
    
    return { ok: true };
  }
  
  // Production mode - use Firestore
  const db = getFirestoreDb();
  if (!db) {
    return { ok: false, message: "Database connection failed. Please try again." };
  }
  
  try {
    const waitlistRef = db.collection("waitlist");
    
    // Check for existing entry
    const existingQuery = await waitlistRef
      .where("email", "==", normalizedEmail)
      .limit(1)
      .get();
    
    if (!existingQuery.empty) {
      return { ok: false, message: "This email is already on the waitlist." };
    }
    
    // Add new entry
    await waitlistRef.add({
      email: normalizedEmail,
      name: data.name || null,
      createdAt: new Date(),
      source: "landing",
      userAgent: data.userAgent || null,
    });
    
    return { ok: true };
  } catch (error) {
    console.error("Firestore error:", error);
    return { ok: false, message: "Something went wrong. Please try again." };
  }
}

/**
 * Get all waitlist entries (dev mode only, for debugging)
 */
export function getDevWaitlistEntries(): WaitlistEntry[] {
  return Array.from(inMemoryWaitlist.values());
}
