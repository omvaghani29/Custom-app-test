import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { Form, useActionData, useLoaderData } from "react-router";

import { login } from "../../shopify.server";
import { loginErrorMessage } from "./error.server";
import { validateShopDomain } from "../../utils/validation.server";
import { logger } from "../../utils/logger.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    try {
      logger.info("Login page accessed", { url: request.url });
    } catch (e) {
      // Logger error shouldn't break the flow
      console.log("Login page accessed");
    }
    
    // Call login function and handle both errors and LoginError responses
    let loginResult;
    try {
      loginResult = await login(request);
    } catch (loginError) {
      // If login throws an error, log it and return empty errors
      console.error("Login loader error:", loginError);
      return { errors: {} };
    }
    
    const errors = loginErrorMessage(loginResult);

    return { errors };
  } catch (error) {
    // Catch any unexpected errors
    console.error("Login loader error:", error);
    return { errors: {} };
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const shop = formData.get("shop") as string | null;

    // Validate shop domain input (only if provided)
    if (shop) {
      const validation = validateShopDomain(shop);
      if (!validation.isValid) {
        try {
          logger.warn("Invalid shop domain provided", { shop, errors: validation.errors });
        } catch (e) {
          // Logger error shouldn't break the flow
          console.warn("Invalid shop domain:", shop, validation.errors);
        }
        return {
          errors: {
            shop: validation.errors.join(", "),
          },
        };
      }
    }

    try {
      logger.info("Login attempt", { shop });
    } catch (e) {
      // Logger error shouldn't break the flow
      console.log("Login attempt for:", shop);
    }

    // Call login function and handle both errors and LoginError responses
    let loginResult;
    try {
      loginResult = await login(request);
      
      // If login returns a Response (redirect), return it directly
      if (loginResult instanceof Response) {
        return loginResult;
      }
    } catch (loginError) {
      // If login throws an error, log it and return a user-friendly message
      console.error("Login function error:", loginError);
      const errorMessage = loginError instanceof Error ? loginError.message : String(loginError);
      return {
        errors: {
          shop: `Login failed: ${errorMessage}. Please check your shop domain and try again.`,
        },
      };
    }

    // Process the login result (which should be a LoginError)
    const errors = loginErrorMessage(loginResult);

    try {
      if (errors.shop) {
        logger.warn("Login failed", { shop, errors });
      } else {
        logger.info("Login successful", { shop });
      }
    } catch (e) {
      // Logger error shouldn't break the flow
      console.log("Login result:", errors.shop ? "failed" : "success");
    }

    return {
      errors,
    };
  } catch (error) {
    // Catch any unexpected errors
    console.error("Login action error:", error);
    return {
      errors: {
        shop: "An error occurred during login. Please try again.",
      },
    };
  }
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
