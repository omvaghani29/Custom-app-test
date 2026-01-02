import type { HeadersFunction } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>

        <div style={{ color: "#000000", fontSize: "16px", lineHeight: "1.8" }}>
          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
              Last Updated: {new Date().toLocaleDateString()}
            </h2>
            <p style={{ marginBottom: "16px" }}>
              This Privacy Policy describes how Next3PL ("we", "our", or "us") collects, uses, and protects your information when you use our Shopify application.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
              1. Information We Collect
            </h2>
            <p style={{ marginBottom: "12px" }}>
              We collect the following types of information:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li style={{ marginBottom: "8px" }}>
                <strong>Store Information:</strong> Your Shopify store domain, name, and basic store details
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Order Data:</strong> Order information necessary for fulfillment and shipping synchronization
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Product Data:</strong> Product information required for inventory management
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Authentication Tokens:</strong> OAuth tokens securely stored for API access
              </li>
            </ul>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
              2. How We Use Your Information
            </h2>
            <p style={{ marginBottom: "12px" }}>
              We use the collected information to:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li style={{ marginBottom: "8px" }}>Synchronize orders between Shopify and our 3PL system</li>
              <li style={{ marginBottom: "8px" }}>Update fulfillment and shipping status in real-time</li>
              <li style={{ marginBottom: "8px" }}>Manage inventory levels across platforms</li>
              <li style={{ marginBottom: "8px" }}>Provide customer support and improve our services</li>
            </ul>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
              3. Data Security
            </h2>
            <p style={{ marginBottom: "16px" }}>
              We implement industry-standard security measures to protect your data, including:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li style={{ marginBottom: "8px" }}>Encrypted data transmission (HTTPS)</li>
              <li style={{ marginBottom: "8px" }}>Secure token storage</li>
              <li style={{ marginBottom: "8px" }}>Regular security audits</li>
              <li style={{ marginBottom: "8px" }}>Access controls and authentication</li>
            </ul>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
              4. Data Sharing
            </h2>
            <p style={{ marginBottom: "16px" }}>
              We do not sell, trade, or rent your personal information to third parties. We only share data with:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li style={{ marginBottom: "8px" }}>Your authorized 3PL fulfillment partner</li>
              <li style={{ marginBottom: "8px" }}>Service providers who assist in operating our app (under strict confidentiality agreements)</li>
            </ul>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
              5. Your Rights
            </h2>
            <p style={{ marginBottom: "12px" }}>
              You have the right to:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li style={{ marginBottom: "8px" }}>Access your stored data</li>
              <li style={{ marginBottom: "8px" }}>Request deletion of your data</li>
              <li style={{ marginBottom: "8px" }}>Uninstall the app at any time (which will delete associated data)</li>
              <li style={{ marginBottom: "8px" }}>Contact us with privacy concerns</li>
            </ul>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
              6. Data Retention
            </h2>
            <p style={{ marginBottom: "16px" }}>
              We retain your data only as long as necessary to provide our services. When you uninstall the app, we delete all associated session and authentication data.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
              7. Contact Us
            </h2>
            <p style={{ marginBottom: "16px" }}>
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p style={{ marginBottom: "16px" }}>
              <strong>Email:</strong> support@next3pl.com<br />
              <strong>Support:</strong> Available through the Shopify app interface
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
              8. Changes to This Policy
            </h2>
            <p style={{ marginBottom: "16px" }}>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>
        </div>
      </div>
    </s-page>
  );
}

