import type { ActionFunctionArgs } from "react-router";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import { logger } from "../utils/logger.server";
import { withErrorHandling } from "../utils/error-handler.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  return await withErrorHandling(async () => {
    const { shop, session, topic } = await authenticate.webhook(request);

    logger.info(`Received ${topic} webhook`, { shop });

    // Webhook requests can trigger multiple times and after an app has already been uninstalled.
    // If this webhook already ran, the session may have been deleted previously.
    if (session) {
      await db.session.deleteMany({ where: { shop } });
      logger.info("Sessions deleted for uninstalled app", { shop });
    } else {
      logger.warn("No session found to delete", { shop });
    }

    return new Response();
  }, "Failed to process uninstall webhook");
};
