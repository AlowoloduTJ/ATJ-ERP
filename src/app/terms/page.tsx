import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | ATJ-ERP",
  description: "Terms of Service for ATJ-ERP - Read our terms and conditions for using our ERP platform.",
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1>Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <section>
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using ATJ-ERP ("the Service"), you agree to be bound by these Terms of
            Service ("Terms"). If you disagree with any part of these Terms, you may not access the
            Service.
          </p>
          <p>
            These Terms apply to all users of the Service, including without limitation users who are
            browsers, vendors, customers, merchants, and contributors of content.
          </p>
        </section>

        <section>
          <h2>2. Description of Service</h2>
          <p>
            ATJ-ERP is a cloud-based Enterprise Resource Planning (ERP) software platform that provides
            integrated business management solutions, including but not limited to:
          </p>
          <ul>
            <li>Inventory and warehouse management</li>
            <li>Production planning and tracking</li>
            <li>Financial accounting and ledger management</li>
            <li>Human resources management</li>
            <li>Sales and customer relationship management</li>
            <li>Reporting and analytics</li>
          </ul>
        </section>

        <section>
          <h2>3. Account Registration and Security</h2>
          <h3>3.1 Account Creation</h3>
          <p>
            To use the Service, you must create an account by providing accurate, current, and complete
            information. You are responsible for maintaining the confidentiality of your account
            credentials and for all activities that occur under your account.
          </p>

          <h3>3.2 Account Security</h3>
          <p>You agree to:</p>
          <ul>
            <li>Use a strong, unique password</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
            <li>Not share your account credentials with third parties</li>
            <li>Be responsible for all activities under your account</li>
          </ul>
        </section>

        <section>
          <h2>4. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for any illegal purpose or in violation of any laws</li>
            <li>Transmit any harmful code, viruses, or malicious software</li>
            <li>Attempt to gain unauthorized access to the Service or related systems</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Use automated systems to access the Service without permission</li>
            <li>Copy, modify, or create derivative works of the Service</li>
            <li>Reverse engineer, decompile, or disassemble the Service</li>
            <li>Remove or alter any proprietary notices or labels</li>
            <li>Use the Service to store or transmit infringing, libelous, or otherwise unlawful material</li>
            <li>Impersonate any person or entity or misrepresent your affiliation</li>
          </ul>
        </section>

        <section>
          <h2>5. User Content and Data</h2>
          <h3>5.1 Your Data</h3>
          <p>
            You retain all rights, title, and interest in and to your data. You are solely responsible
            for the accuracy, quality, and legality of your data and the means by which you acquired it.
          </p>

          <h3>5.2 License to Use Your Data</h3>
          <p>
            By using the Service, you grant us a limited, non-exclusive license to use, store, and
            process your data solely for the purpose of providing the Service to you.
          </p>

          <h3>5.3 Data Backup</h3>
          <p>
            While we implement reasonable data backup and recovery procedures, you are responsible for
            maintaining your own backups of important data. We are not liable for any loss or corruption
            of your data.
          </p>
        </section>

        <section>
          <h2>6. Intellectual Property</h2>
          <p>
            The Service, including its original content, features, and functionality, is owned by ATJ Concepts Limited
            and is protected by international copyright, trademark, patent, trade secret, and other
            intellectual property laws.
          </p>
          <p>
            You may not use our trademarks, service marks, or logos without our prior written consent.
          </p>
        </section>

        <section>
          <h2>7. Payment Terms</h2>
          <h3>7.1 Subscription Fees</h3>
          <p>
            Access to certain features of the Service may require payment of subscription fees. Fees
            are billed in advance on a recurring basis (monthly or annually) and are non-refundable
            except as required by law.
          </p>

          <h3>7.2 Price Changes</h3>
          <p>
            We reserve the right to change our pricing at any time. We will provide at least 30 days'
            notice of any price changes. Continued use of the Service after the price change constitutes
            acceptance of the new pricing.
          </p>

          <h3>7.3 Payment Processing</h3>
          <p>
            Payments are processed by third-party payment processors. You agree to provide accurate
            payment information and authorize us to charge your payment method for all fees.
          </p>
        </section>

        <section>
          <h2>8. Service Availability and Modifications</h2>
          <p>
            We strive to maintain high availability of the Service but do not guarantee uninterrupted
            access. The Service may be unavailable due to maintenance, updates, or circumstances beyond
            our control.
          </p>
          <p>
            We reserve the right to modify, suspend, or discontinue the Service (or any part thereof)
            at any time, with or without notice. We shall not be liable to you or any third party for
            any modification, suspension, or discontinuation of the Service.
          </p>
        </section>

        <section>
          <h2>9. Termination</h2>
          <h3>9.1 Termination by You</h3>
          <p>
            You may terminate your account at any time by contacting us or using the account deletion
            feature in the Service.
          </p>

          <h3>9.2 Termination by Us</h3>
          <p>
            We may terminate or suspend your account immediately, without prior notice, if you breach
            these Terms or engage in any fraudulent, abusive, or illegal activity.
          </p>

          <h3>9.3 Effect of Termination</h3>
          <p>
            Upon termination, your right to use the Service will immediately cease. We may delete your
            account and data, subject to our data retention policies and legal obligations.
          </p>
        </section>

        <section>
          <h2>10. Disclaimers and Limitation of Liability</h2>
          <h3>10.1 Disclaimer of Warranties</h3>
          <p>
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
          </p>

          <h3>10.2 Limitation of Liability</h3>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL ATJ-ERP BE LIABLE FOR ANY
            INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS
            OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL,
            OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.
          </p>
        </section>

        <section>
          <h2>11. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless ATJ-ERP and its officers, directors,
            employees, and agents from and against any claims, liabilities, damages, losses, and
            expenses, including reasonable attorneys' fees, arising out of or in any way connected with
            your use of the Service or violation of these Terms.
          </p>
        </section>

        <section>
          <h2>12. Governing Law and Dispute Resolution</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of England, United Kingdom, without regard to its conflict of law provisions.
          </p>
          <p>
            Any disputes arising out of or relating to these Terms or the Service shall be resolved
            through binding arbitration in accordance with the rules of London Chamber of Arbitration and Mediation (LCAM),
            except where prohibited by law.
          </p>
        </section>

        <section>
          <h2>13. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify you of material
            changes by posting the updated Terms on this page and updating the "Last updated" date. Your
            continued use of the Service after such modifications constitutes acceptance of the updated
            Terms.
          </p>
        </section>

        <section>
          <h2>14. Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid, that provision
            shall be limited or eliminated to the minimum extent necessary, and the remaining
            provisions shall remain in full force and effect.
          </p>
        </section>

        <section>
          <h2>15. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong> <a href="mailto:legal@atj-erp.company">legal@atj-erp.company</a>
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
