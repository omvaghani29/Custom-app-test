import type { ActionFunctionArgs } from "react-router";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import { logger } from "../utils/logger.server";
import { withErrorHandling } from "../utils/error-handler.server";

export const action = async ({ request }: ActionFunctionArgs) => {
    return await withErrorHandling(async () => {
        const { payload, session, topic, shop } = await authenticate.webhook(request);
        logger.info(`Received ${topic} webhook`, { shop });

        const current = payload.current as string[];
        if (session) {
            await db.session.update({   
                where: {
                    id: session.id
                },
                data: {
                    scope: current.toString(),
                },
            });
            logger.info("Session scope updated", { shop, scopes: current });
        } else {
            logger.warn("No session found to update", { shop });
        }
        return new Response();
    }, "Failed to process scopes update webhook");
};
