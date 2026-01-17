import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Hilarm - Learn how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <Bell className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold">Hilarm</span>
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to home</span>
        </Link>

        <article>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>

          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString("en-US", { 
              year: "numeric", 
              month: "long", 
              day: "numeric" 
            })}
          </p>

          <Separator className="my-8 bg-white/[0.06]" />

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. Information We Collect
              </h2>
              <p className="leading-relaxed">
                When you join our waitlist, we collect your email address and optionally 
                your name. We may also collect basic analytics data to improve our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. How We Use Your Information
              </h2>
              <p className="leading-relaxed">
                We use your email address solely to notify you about Hilarm&apos;s launch 
                and important product updates. We will never sell your information to 
                third parties or send you spam.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. Data Storage and Security
              </h2>
              <p className="leading-relaxed">
                Your data is stored securely using industry-standard encryption and 
                security practices. We use Firebase/Google Cloud infrastructure to 
                ensure your information is protected.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. Your Rights
              </h2>
              <p className="leading-relaxed">
                You can request to have your data deleted at any time by contacting us. 
                You may also unsubscribe from our communications at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Contact Us
              </h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us 
                at <span className="text-foreground">privacy@hialarm.app</span>.
              </p>
            </section>

            <Separator className="my-8 bg-white/[0.06]" />

            <p className="text-sm">
              This privacy policy is a placeholder and will be updated with more 
              comprehensive terms before the app launches.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
