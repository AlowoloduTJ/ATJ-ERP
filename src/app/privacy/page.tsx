import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | ATJ-ERP",
  description: "Privacy Policy for ATJ-ERP - Learn how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            ATJ-ERP ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you use our
            Enterprise Resource Planning (ERP) software and services (the "Service").
          </p>
          <p>
            By using our Service, you agree to the collection and use of information in accordance with
            this Privacy Policy. If you do not agree with our policies and practices, please do not use
            our Service.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          
          <h3>2.1 Information You Provide</h3>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>
              <strong>Account Information:</strong> Name, email address, phone number, company name,
              and other contact information when you create an account
            </li>
            <li>
              <strong>Business Data:</strong> Inventory records, financial transactions, employee
              information, customer data, and other business information you input into the Service
            </li>
            <li>
              <strong>Payment Information:</strong> Billing address, payment method details (processed
              securely through third-party payment processors)
            </li>
            <li>
              <strong>Communication Data:</strong> Messages, support requests, and other communications
              you send to us
            </li>
          </ul>

          <h3>2.2 Automatically Collected Information</h3>
          <p>When you use our Service, we automatically collect certain information, including:</p>
          <ul>
            <li>
              <strong>Usage Data:</strong> Information about how you access and use the Service, such
              as pages viewed, features used, and time spent on the Service
            </li>
            <li>
              <strong>Device Information:</strong> IP address, browser type, operating system, device
              identifiers, and other technical information
            </li>
            <li>
              <strong>Log Data:</strong> Server logs, error reports, and performance data
            </li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our Service</li>
            <li>Process transactions and send related information</li>
            <li>Send administrative information, updates, and security alerts</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Monitor and analyze usage patterns and trends</li>
            <li>Detect, prevent, and address technical issues and security threats</li>
            <li>Comply with legal obligations and enforce our Terms of Service</li>
          </ul>
        </section>

        <section>
          <h2>4. Data Storage and Security</h2>
          <p>
            Your data is stored securely using industry-standard cloud infrastructure provided by
            Supabase. We implement appropriate technical and organizational measures to protect your
            personal information, including:
          </p>
          <ul>
            <li>Encryption of data in transit and at rest</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Regular security assessments and updates</li>
            <li>Row-level security policies to ensure data isolation</li>
          </ul>
          <p>
            However, no method of transmission over the Internet or electronic storage is 100% secure.
            While we strive to use commercially acceptable means to protect your information, we cannot
            guarantee absolute security.
          </p>
        </section>

        <section>
          <h2>5. Third-Party Services</h2>
          <p>We use the following third-party services that may collect information:</p>
          <ul>
            <li>
              <strong>Clerk:</strong> Authentication and user management services. Clerk's privacy
              policy: <a href="https://clerk.com/legal/privacy" target="_blank" rel="noopener noreferrer">https://clerk.com/legal/privacy</a>
            </li>
            <li>
              <strong>Supabase:</strong> Database and backend infrastructure. Supabase's privacy
              policy: <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">https://supabase.com/privacy</a>
            </li>
            <li>
              <strong>Vercel:</strong> Hosting and deployment platform. Vercel's privacy policy:{" "}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">https://vercel.com/legal/privacy-policy</a>
            </li>
          </ul>
          <p>
            These third-party services have their own privacy policies governing the collection and use
            of your information. We encourage you to review their privacy policies.
          </p>
        </section>

        <section>
          <h2>6. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to provide the Service and
            fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is
            required or permitted by law. When you delete your account, we will delete or anonymize
            your personal information, except where we are required to retain it for legal purposes.
          </p>
        </section>

        <section>
          <h2>7. Your Rights (GDPR & CCPA)</h2>
          <p>Depending on your location, you may have the following rights:</p>
          <ul>
            <li>
              <strong>Access:</strong> Request access to your personal information
            </li>
            <li>
              <strong>Correction:</strong> Request correction of inaccurate or incomplete information
            </li>
            <li>
              <strong>Deletion:</strong> Request deletion of your personal information
            </li>
            <li>
              <strong>Portability:</strong> Request transfer of your data to another service
            </li>
            <li>
              <strong>Objection:</strong> Object to processing of your personal information
            </li>
            <li>
              <strong>Restriction:</strong> Request restriction of processing
            </li>
            <li>
              <strong>Opt-Out:</strong> Opt out of certain data collection and processing activities
            </li>
          </ul>
          <p>
            To exercise these rights, please contact us at{" "}
            <a href="mailto:privacy@atj-erp.company">privacy@atj-erp.company</a>.
          </p>
        </section>

        <section>
          <h2>8. Children's Privacy</h2>
          <p>
            Our Service is not intended for individuals under the age of 18. We do not knowingly collect
            personal information from children. If you become aware that a child has provided us with
            personal information, please contact us, and we will take steps to delete such information.
          </p>
        </section>

        <section>
          <h2>9. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your country of
            residence. These countries may have data protection laws that differ from those in your
            country. By using our Service, you consent to the transfer of your information to these
            countries.
          </p>
        </section>

        <section>
          <h2>10. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by
            posting the new Privacy Policy on this page and updating the "Last updated" date. You are
            advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section>
          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong> <a href="mailto:privacy@atj-erp.company">privacy@atj-erp.company</a>
            </li>
            <li>
              <strong>Website:</strong> <a href="https://atj-erp.company">https://atj-erp.company</a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
