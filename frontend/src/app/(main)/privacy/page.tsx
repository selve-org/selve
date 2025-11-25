// src/app/(main)/privacy/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SELVE",
  description: "Privacy Policy for the SELVE personality profiling platform.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-background text-foreground min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-12">Last updated: November 2025</p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              SELVE (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy 
              Policy explains how we collect, use, disclose, and safeguard your information when you 
              use our personality profiling platform and related services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-foreground mb-3 mt-6">Personal Information</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you create an account, we collect:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Email address</li>
              <li>Name (if provided)</li>
              <li>Profile information from third-party authentication providers (Google, LinkedIn)</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mb-3 mt-6">Assessment Data</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you complete assessments, we collect:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Your responses to personality assessment questions</li>
              <li>Time spent on each question</li>
              <li>Assessment completion timestamps</li>
              <li>Calculated personality dimension scores</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mb-3 mt-6">Friend Assessment Data</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When friends complete assessments about you:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Their responses are collected and linked to your profile</li>
              <li>Individual friend responses are anonymized - you cannot see who said what</li>
              <li>Aggregated scores are calculated to protect individual friend privacy</li>
              <li>Quality scores are calculated to filter low-effort responses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use your information to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide and maintain the Service</li>
              <li>Calculate and display your personality profile</li>
              <li>Generate personalized insights and narratives</li>
              <li>Compare your self-perception with friend perceptions</li>
              <li>Send you notifications about friend responses (with your consent)</li>
              <li>Improve our assessment algorithms and Service features</li>
              <li>Conduct research to validate and enhance our psychometric frameworks</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Sharing and Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Service Providers:</strong> Third-party services that help us operate our platform (hosting, email, analytics)</li>
              <li><strong>AI Services:</strong> We use OpenAI to generate personalized narrative insights. Your assessment data may be processed by these services</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Your friends who complete assessments about you can only see that they completed an 
              assessment - they cannot see your results or other friends&apos; responses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal 
              information, including encryption of data in transit and at rest, secure authentication 
              systems, and regular security assessments. However, no method of transmission over the 
              Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your assessment data for as long as your account is active. You can request 
              deletion of your account and associated data at any time. Some anonymized, aggregated 
              data may be retained for research purposes even after account deletion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your data</li>
              <li>Export your data in a portable format</li>
              <li>Opt out of certain data processing activities</li>
              <li>Withdraw consent for optional features</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              To exercise these rights, contact us at{" "}
              <a 
                href="mailto:hello@selve.me" 
                className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                hello@selve.me
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Cookies and Tracking</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use essential cookies to maintain your session and preferences. We may use analytics 
              tools to understand how users interact with our Service. You can control cookie 
              preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service is not intended for individuals under the age of 16. We do not knowingly 
              collect personal information from children. If we become aware that we have collected 
              personal information from a child, we will take steps to delete such information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place to protect your information in accordance 
              with this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material 
              changes by posting the new Privacy Policy on this page with an updated &quot;Last updated&quot; 
              date. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{" "}
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
