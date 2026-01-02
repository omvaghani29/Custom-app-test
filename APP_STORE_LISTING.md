# App Store Listing Configuration Guide

## Where to Add App Description

The app description is configured in **TWO places**:

### 1. In `shopify.app.toml` (Basic Description)
✅ **Already Added** - A basic description has been added to your `shopify.app.toml` file.

### 2. In Shopify Partner Dashboard (Detailed Description) ⭐ **REQUIRED**

You need to add a detailed description in your Partner Dashboard:

#### Steps:

1. **Log in to Shopify Partner Dashboard**
   - Go to: https://partners.shopify.com
   - Sign in with your Partner account

2. **Navigate to Your App**
   - Go to "Apps" → Select your app

3. **Go to App Listing**
   - Click on "App listing" in the left menu
   - Or go to: Apps → Your App → App listing

4. **Edit App Description**
   - Find the "Description" section
   - Add a detailed, compelling description
   - Use the rich text editor if available

### App Description Best Practices:

1. **Start with a Hook:**
   - First sentence should grab attention
   - Explain the main benefit immediately

2. **Be Specific:**
   - List exact features
   - Mention specific use cases
   - Include technical details if relevant

3. **Use Formatting:**
   - Use bullet points for features
   - Use headings for sections
   - Keep paragraphs short

4. **Example Structure:**
   ```
   [Hook/Value Proposition]
   
   [What it does - 2-3 sentences]
   
   Key Features:
   - Feature 1
   - Feature 2
   - Feature 3
   
   [Who it's for]
   
   [How it helps]
   ```

### Current Configuration:

✅ **Basic description** added to `shopify.app.toml`
⚠️ **Detailed description** needs to be added in Partner Dashboard

---

## Support Email Configuration

### Where Support Email is Set:

✅ **Already Added** - Support email has been added to `shopify.app.toml`:
```toml
support_email = "support@next3pl.com"
```

### Additional Places to Set Support Email:

1. **Shopify Partner Dashboard:**
   - Apps → Your App → App setup
   - Find "Support email" field
   - Set to: `support@next3pl.com` (or your actual support email)

2. **App Listing Page:**
   - Apps → Your App → App listing
   - Add support contact information

### Support Email Best Practices:

1. **Use a Dedicated Email:**
   - `support@yourdomain.com`
   - `help@yourdomain.com`
   - `app-support@yourdomain.com`

2. **Set Up Email Forwarding:**
   - Forward to your main support team
   - Use a ticketing system (Zendesk, Intercom, etc.)

3. **Response Time:**
   - Aim for 24-hour response time
   - Set up auto-responders
   - Include in your app listing

### Current Status:

✅ Support email configured in `shopify.app.toml` as: `support@next3pl.com`

⚠️ **Action Required:** 
- Update the email to your actual support email address
- Verify it's set in Partner Dashboard
- Set up email forwarding/management

---

## Summary Checklist:

- [x] Basic description added to `shopify.app.toml`
- [ ] Detailed description added in Partner Dashboard
- [x] Support email added to `shopify.app.toml`
- [ ] Support email verified in Partner Dashboard
- [ ] Support email inbox set up and monitored
- [ ] App icon uploaded in Partner Dashboard (see APP_ICON_SETUP.md)

---

**Note:** The Partner Dashboard is the primary place for App Store listing information. The `shopify.app.toml` file provides basic metadata, but detailed descriptions, screenshots, and other listing materials must be configured in the Partner Dashboard.

