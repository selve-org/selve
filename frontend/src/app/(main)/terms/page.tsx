// src/app/(main)/terms/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | SELVE",
  description: "Terms of Service for the SELVE personality profiling platform.",
};

export default function TermsPage() {
  return (
    <main className="bg-background text-foreground min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-12">Last updated: November 2025</p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using SELVE (&quot;the Service&quot;), you agree to be bound by these Terms of 
              Service. If you do not agree to these terms, please do not use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              SELVE is a personality profiling platform that provides self-assessment tools based on 
              validated psychometric frameworks. The Service includes personality assessments, friend 
              feedback features, and personalized insights. Our assessments are designed for personal 
              development purposes and are not intended as clinical or diagnostic tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Accounts</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To use certain features of the Service, you must create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide accurate and complete information when creating your account</li>
              <li>Maintain the security of your account credentials</li>
              <li>Promptly update your account information if it changes</li>
              <li>Accept responsibility for all activities that occur under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Friend Assessments</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you invite friends to complete an assessment about you:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>You are responsible for obtaining appropriate consent from your friends</li>
              <li>Friend responses are anonymized and aggregated to protect their privacy</li>
              <li>You agree not to use the Service to harass or pressure others into completing assessments</li>
              <li>Friends who participate are bound by these Terms when using the assessment link</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Use the Service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Interfere with or disrupt the Service or its servers</li>
              <li>Share or distribute assessment content without permission</li>
              <li>Use the Service to make employment, clinical, or legal decisions about others</li>
              <li>Create multiple accounts for fraudulent purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service, including its content, features, and functionality, is owned by SELVE 
              and is protected by copyright, trademark, and other intellectual property laws. The 
              SELVE framework, dimension names (LUMEN, AETHER, ORPHEUS, VARA, CHRONOS, KAEL, ORIN, 
              LYRA), and associated content are proprietary to SELVE. You may not copy, modify, 
              distribute, or create derivative works based on our content without explicit permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, 
              either express or implied. SELVE does not warrant that the Service will be uninterrupted, 
              error-free, or completely secure. Personality assessments are for informational and 
              personal development purposes only and should not be used as the sole basis for important 
              life decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the fullest extent permitted by law, SELVE shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages, or any loss of profits or 
              revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, 
              or other intangible losses resulting from your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may modify these Terms at any time. We will notify users of material changes by 
              posting the updated Terms on the Service with a new &quot;Last updated&quot; date. Your continued 
              use of the Service after such changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to suspend or terminate your account and access to the Service at 
              our sole discretion, without notice, for conduct that we believe violates these Terms or 
              is harmful to other users, us, or third parties, or for any other reason.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with applicable laws, 
              without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms, please contact us at{" "}
              <a 
                href="mailto:hello@selve.me" 
                className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                hello@selve.me
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
