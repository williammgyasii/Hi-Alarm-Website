import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Hilarm - Our terms and conditions.",
};

export default function TermsPage() {
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
            Terms of Service
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
                1. Acceptance of Terms
              </h2>
              <p className="leading-relaxed">
                By accessing or using Hilarm, you agree to be bound by these Terms of 
                Service. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. Description of Service
              </h2>
              <p className="leading-relaxed">
                Hilarm is an accountability-based alarm application that allows users to 
                set alarms that can only be turned off by designated trusted contacts. 
                The service is currently in development and not yet publicly available.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. Waitlist
              </h2>
              <p className="leading-relaxed">
                By joining our waitlist, you agree to receive email communications about 
                Hilarm&apos;s development and launch. You may unsubscribe at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. Intellectual Property
              </h2>
              <p className="leading-relaxed">
                All content, features, and functionality of Hilarm are owned by us and 
                are protected by international copyright, trademark, and other intellectual 
                property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Limitation of Liability
              </h2>
              <p className="leading-relaxed">
                Hilarm is provided &quot;as is&quot; without warranties of any kind. We shall not 
                be liable for any damages arising from the use or inability to use our 
                service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Changes to Terms
              </h2>
              <p className="leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify 
                users of any material changes via email or through the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. Contact
              </h2>
              <p className="leading-relaxed">
                For any questions regarding these terms, please contact us at{" "}
                <span className="text-foreground">legal@hialarm.app</span>.
              </p>
            </section>

            <Separator className="my-8 bg-white/[0.06]" />

            <p className="text-sm">
              These terms of service are a placeholder and will be updated with more 
              comprehensive terms before the app launches.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
