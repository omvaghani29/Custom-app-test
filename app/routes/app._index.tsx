import type {
  HeadersFunction,
  LoaderFunctionArgs,
} from "react-router";
import { useLoaderData } from "react-router";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
import db from "../db.server";
import { logger } from "../utils/logger.server";
import { withErrorHandling } from "../utils/error-handler.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await withErrorHandling(async () => {
    await authenticate.admin(request);
    
    // Get shop from URL
    const url = new URL(request.url);
    const shopParam = url.searchParams.get("shop");
    
    logger.info("App index page accessed", { shop: shopParam });
    
    // Get session from database
    let accessToken = null;
    let shopDomain = null;
    
    // Try to find session by shop parameter first, otherwise get the most recent session
    const session = shopParam
      ? await db.session.findFirst({
          where: { shop: shopParam },
          orderBy: { expires: "desc" },
        })
      : await db.session.findFirst({
          orderBy: { expires: "desc" },
        });
    
    if (session) {
      accessToken = session.accessToken;
      shopDomain = session.shop;
      logger.debug("Session found", { shop: shopDomain });
    } else {
      logger.warn("No session found", { shop: shopParam });
    }

    return {
      accessToken,
      shop: shopDomain,
    };
  }, "Failed to load app index page");
};

export default function Index() {
  const { accessToken, shop } = useLoaderData<typeof loader>();

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
          <div style={{ 
            textAlign: "center", 
            marginBottom: "30px" 
          }}>
            <h1 style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#0066cc",
              margin: 0,
              padding: 0
            }}>
              Welcome to Next3PL
            </h1>
          </div>

          <p style={{
            color: "#000000",
            fontSize: "16px",
            lineHeight: "1.6",
            marginBottom: "24px"
          }}>
            Thank you for installing our 3PL integration app. This application connects your Shopify store with our logistics system to automate shipping, synchronize orders, and streamline your fulfillment workflow.
          </p>

          <div style={{ marginTop: "24px" }}>
            <h2 style={{
              color: "#000000",
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "16px"
            }}>
              What this app helps you with:
            </h2>
            <ul style={{
              listStyleType: "disc",
              paddingLeft: "24px",
              margin: 0,
              color: "#000000"
            }}>
              <li style={{ marginBottom: "8px", fontSize: "16px", lineHeight: "1.6" }}>
                Automatic order syncing from Shopify
              </li>
              <li style={{ marginBottom: "8px", fontSize: "16px", lineHeight: "1.6" }}>
                Real-time shipment and fulfillment updates
              </li>
              <li style={{ marginBottom: "8px", fontSize: "16px", lineHeight: "1.6" }}>
                Reduced manual workload and faster processing
              </li>
              <li style={{ marginBottom: "8px", fontSize: "16px", lineHeight: "1.6" }}>
                Improved tracking and visibility
              </li>
            </ul>
          </div>

          {accessToken && (
            <div style={{ 
              marginTop: "32px", 
              padding: "20px", 
              backgroundColor: "#f9f9f9", 
              borderRadius: "8px",
              border: "1px solid #e0e0e0"
            }}>
              <h3 style={{
                color: "#000000",
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "12px",
                marginTop: 0
              }}>
                OAuth Access Token:
              </h3>
              <div style={{
                backgroundColor: "#ffffff",
                padding: "12px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                wordBreak: "break-all",
                fontSize: "14px",
                fontFamily: "monospace",
                color: "#333"
              }}>
                {accessToken}
              </div>
              {shop && (
                <p style={{
                  marginTop: "12px",
                  fontSize: "14px",
                  color: "#666",
                  marginBottom: 0
                }}>
                  Shop: {shop}
                </p>
              )}
            </div>
          )}
        </div>
    </s-page>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
