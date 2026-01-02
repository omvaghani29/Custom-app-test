import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { Form, useActionData, useLoaderData } from "react-router";

import { login } from "../../shopify.server";
import { loginErrorMessage } from "./error.server";
import { validateShopDomain } from "../../utils/validation.server";
import { logger } from "../../utils/logger.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  logger.info("Login page accessed", { url: request.url });
  const errors = loginErrorMessage(await login(request));

  return { errors };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const shop = formData.get("shop") as string | null;

  // Validate shop domain input
  const validation = validateShopDomain(shop);
  if (!validation.isValid) {
    logger.warn("Invalid shop domain provided", { shop, errors: validation.errors });
    return {
      errors: {
        shop: validation.errors.join(", "),
      },
    };
  }

  logger.info("Login attempt", { shop });
  const errors = loginErrorMessage(await login(request));

  if (errors.shop) {
    logger.warn("Login failed", { shop, errors });
  } else {
    logger.info("Login successful", { shop });
  }

  return {
    errors,
  };
};

export default function Auth() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [shop, setShop] = useState("");
  const { errors } = actionData || loaderData;

  return (
    <AppProvider embedded={false}>
      <s-page>
        <Form method="post">
        <s-section heading="Log in">
          <s-text-field
            name="shop"
            label="Shop domain"
            details="example.myshopify.com"
            value={shop}
            onChange={(e) => setShop(e.currentTarget.value)}
            autocomplete="on"
            error={errors.shop}
          ></s-text-field>
          <s-button type="submit">Log in</s-button>
        </s-section>
        </Form>
      </s-page>
    </AppProvider>
  );
}
