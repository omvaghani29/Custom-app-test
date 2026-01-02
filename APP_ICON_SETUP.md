# App Icon Setup Guide

## Where to Set Your App Icon

The app icon is configured in the **Shopify Partner Dashboard**, not in the codebase. Here's how to set it up:

### Steps to Upload App Icon:

1. **Log in to Shopify Partner Dashboard**
   - Go to: https://partners.shopify.com
   - Sign in with your Partner account

2. **Navigate to Your App**
   - Go to "Apps" in the left sidebar
   - Click on your app (custom test app)

3. **Go to App Setup**
   - Click on "App setup" in the left menu
   - Or go directly to the "App listing" section

4. **Upload App Icon**
   - Find the "App icon" section
   - Click "Upload" or "Change icon"
   - Select your image file

### Icon Requirements:

- **Size:** 1024 x 1024 pixels (square)
- **Format:** PNG or JPG
- **File size:** Maximum 2 MB
- **Background:** Transparent or solid color
- **Content:** Should represent your app clearly
- **Quality:** High resolution, no pixelation

### Best Practices:

1. **Design Guidelines:**
   - Use a simple, recognizable design
   - Ensure it's readable at small sizes (it will be displayed as 64x64 in some places)
   - Use your brand colors
   - Avoid text (it won't be readable at small sizes)

2. **Testing:**
   - Preview how it looks at different sizes
   - Make sure it stands out on both light and dark backgrounds
   - Test on mobile devices

3. **File Location:**
   - Keep a copy of your icon in your project for reference
   - Recommended location: `public/app-icon.png` or `public/app-icon.jpg`
   - This is just for your reference - the actual upload happens in Partner Dashboard

### Current Status:

Your app icon is **NOT set in the codebase**. You need to:
1. Prepare your 1024x1024px icon image
2. Upload it through the Shopify Partner Dashboard
3. (Optional) Save a copy in `public/app-icon.png` for your reference

### Note:

The icon you upload in the Partner Dashboard will be used in:
- Shopify App Store listing
- App installation screens
- Merchant's installed apps list
- App Bridge UI (if configured)

---

**Important:** The icon must be uploaded through the Partner Dashboard. There is no code configuration for the app icon.

