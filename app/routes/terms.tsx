import type { HeadersFunction } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};

export default function TermsOfService() {
  return (
    <s-page>
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        maxWidth: "900px",
        margin: "40px auto",
        padding: "40px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
      }}>
        <h1 style={{
          fontSize: "32px",
          fontWeight: "bold",
          color: "#0066cc",
          marginBottom: "24px"
        }}>
          Terms of Service
        </h1>

        <div style={{ color: "#000000", fontSize: "16px", lineHeight: "1.8" }}>
          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
              Last Updated: {new Date().toLocaleDateString()}
            </h2>
            <p style={{ marginBottom: "16px" }}>
              Please read these Terms of Service ("Terms") carefully before using the Next3PL Shopify application ("Service") operated by Next3PL ("us", "we", or "our").
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
              1. Acceptance of Terms
            </h2>
            <p style={{ marginBottom: "16px" }}>
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access the Service.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
              2. Description of Service
            </h2>
            <p style={{ marginBottom: "12px" }}>
              Next3PL is a third-party logistics (3PL) integration application that:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li style={{ marginBottom: "8px" }}>Synchronizes orders between your Shopify store and 3PL fulfillment systems</li>
              <li style={{ marginBottom: "8px" }}>Provides real-time shipment and fulfillment updates</li>
              <li style={{ marginBottom: "8px" }}>Manages inventory levels across platforms</li>
              <li style={{ marginBottom: "8px" }}>Streamlines your fulfillment workflow</li>
            </ul>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
              3. Use of Service
            </h2>
            <p style={{ marginBottom: "12px" }}>
              You agree to:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li style={{ marginBottom: "8px" }}>Use the Service only for lawful purposes</li>
              <li style={{ marginBottom: "8px" }}>Provide accurate and complete information</li>
              <li style={{ marginBottom: "8px" }}>Maintain the security of your account credentials</li>
              <li style={{ marginBottom: "8px" }}>Not attempt to gain unauthorized access to the Service</li>
              <li style={{ marginBottom: "8px" }}>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
              4. Account Responsibility
            </h2>
            <p style={{ marginBottom: "16px" }}>
              You are responsible for maintaining the confidentiality of your Shopify account and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
              5. Service Availability
            </h2>
            <p style={{ marginBottom: "16px" }}>
              We strive to maintain high availability of the Service but do not guarantee uninterrupted access. The Service may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
              6. Data and Content
            </h2>
            <p style={{ marginBottom: "16px" }}>
              You retain all rights to your data. By using the Service, you grant us permission to access and process your data solely for the purpose of providing the Service. We do not claim ownership of your data.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
              7. Limitation of Liability
            </h2>
            <p style={{ marginBottom: "16px" }}>
              To the maximum extent permitted by law, Next3PL shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the Service.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
              8. Termination
            </h2>
            <p style={{ marginBottom: "16px" }}>
              You may terminate your use of the Service at any time by uninstalling the app from your Shopify store. We reserve the right to suspend or terminate your access to the Service at our sole discretion, with or without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
              9. Changes to Terms
            </h2>
            <p style={{ marginBottom: "16px" }}>
              We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of the Service after any changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
              10. Contact Information
            </h2>
            <p style={{ marginBottom: "16px" }}>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p style={{ marginBottom: "16px" }}>
              <strong>Email:</strong> support@next3pl.com<br />
              <strong>Support:</strong> Available through the Shopify app interface
            </p>
          </section>
        </div>
      </div>
    </s-page>
  );
}

