# GoEasyCharge - Shopify Theme

A premium, conversion-optimized Shopify theme with bilingual support (Arabic/English), modern design, and advanced e-commerce features.

## Features

### 🌍 Bilingual Support
- Full RTL (Right-to-Left) support for Arabic
- Seamless language switching between Arabic and English
- Localized content and translations included

### 🎨 Modern Design
- Clean, professional interface inspired by Atlas Bolt
- Responsive design for all devices
- Smooth animations and transitions
- Customizable color scheme

### 💰 Conversion Optimization
- Sticky Add to Cart button
- Quantity bundles with discount messaging
- In-cart upsell suggestions
- Urgency blocks (low stock warnings)
- Free shipping progress bar
- Exit-intent newsletter popup

### 📱 Mobile-First
- Fully responsive design
- Touch-friendly interface
- Fast loading times
- PWA-ready structure

### 🔍 SEO Optimized
- JSON-LD structured data
- Open Graph meta tags
- Dynamic sitemap support
- Semantic HTML

### 🛒 E-Commerce Features
- Product image gallery
- Variant selection
- Quantity selector
- Shopping cart with drawer
- Checkout integration
- Product reviews support
- Collection filtering and sorting

### 🔧 Customization
- Easy color customization
- Typography options
- Section-based layout
- Theme settings for all features
- Metafield support

## Installation

### 1. Download the Theme

```bash
# Clone or download the theme files
git clone https://github.com/yourusername/goeasycharge-theme.git
```

### 2. Upload to Shopify

#### Option A: Using Shopify CLI (Recommended)
```bash
# Install Shopify CLI if you haven't already
npm install -g @shopify/cli

# Navigate to theme directory
cd goeasycharge-theme

# Login to your Shopify store
shopify login --store=your-store.myshopify.com

# Push theme to development
shopify theme push

# Open theme in browser
shopify theme open
```

#### Option B: Manual Upload
1. Go to your Shopify Admin
2. Navigate to **Online Store** → **Themes**
3. Click **Add theme** → **Upload zip file**
4. Select the `goeasycharge-theme.zip` file
5. Click **Upload**

### 3. Customize Theme

1. Go to **Online Store** → **Themes**
2. Find GoEasyCharge theme
3. Click **Customize**
4. Adjust colors, fonts, and settings
5. Publish when ready

## Directory Structure

```
goeasycharge-theme/
├── assets/              # CSS, JavaScript, and images
│   ├── theme.css       # Main stylesheet
│   ├── rtl.css         # RTL support for Arabic
│   └── theme.js        # JavaScript functionality
├── config/             # Theme configuration
│   └── settings_schema.json  # Theme settings
├── layout/             # Layout templates
│   └── theme.liquid    # Main layout
├── locales/            # Translations
│   ├── en.json        # English translations
│   └── ar.json        # Arabic translations
├── sections/           # Reusable sections
│   ├── header.liquid
│   ├── footer.liquid
│   ├── hero.liquid
│   ├── featured-products.liquid
│   ├── exit-intent-popup.liquid
│   └── cart-drawer.liquid
├── snippets/           # Reusable code snippets
├── templates/          # Page templates
│   ├── index.json     # Home page
│   ├── product.liquid # Product page
│   ├── collection.liquid # Collection page
│   └── cart.liquid    # Cart page
└── README.md          # This file
```

## Configuration

### Theme Settings

Access theme settings from the Shopify Admin:

1. **Colors**: Customize primary, secondary, and accent colors
2. **Typography**: Choose fonts and heading sizes
3. **Header**: Configure logo, search, and cart visibility
4. **Hero Section**: Set hero image, title, and CTA
5. **Conversion Features**: Enable/disable optimization features
6. **Newsletter**: Configure newsletter popup and discount
7. **Social Media**: Add social media links
8. **Language**: Set default language and enable switcher

### Customizing Colors

Edit `config/settings_schema.json` to change default colors:

```json
{
  "type": "color",
  "id": "primary_color",
  "label": "Primary Color",
  "default": "#2563eb"
}
```

### Adding Translations

Edit `locales/en.json` or `locales/ar.json`:

```json
{
  "product": {
    "add_to_cart": "Add to Cart"
  }
}
```

## Customization Guide

### Adding a New Section

1. Create a new file in `sections/` directory
2. Add Liquid code with `{% schema %}` block
3. Add CSS using `{% stylesheet %}`
4. Reference in `templates/index.json`

Example:
```liquid
{% stylesheet %}
  .my-section {
    padding: 2rem;
  }
{% endstylesheet %}

<section class="my-section">
  <h2>{{ section.settings.title }}</h2>
</section>

{% schema %}
{
  "name": "My Section",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Title"
    }
  ]
}
{% endschema %}
```

### Modifying Product Page

Edit `templates/product.liquid` to customize:
- Product gallery
- Variant options
- Pricing display
- Add to cart button
- Product details tabs

### Changing Colors Globally

Edit `assets/theme.css`:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #1e40af;
  --accent-color: #10b981;
}
```

## Features in Detail

### Exit Intent Popup
Triggers when users move mouse to leave the page. Offers discount code to encourage newsletter signup.

**Configuration:**
- Title and subtitle
- Discount code and percentage
- Button text

### Free Shipping Progress Bar
Shows remaining amount needed to qualify for free shipping.

**Configuration:**
- Threshold amount in `settings_schema.json`
- Automatically displays in cart and product pages

### Urgency Blocks
Displays low stock warnings on product pages.

**Configuration:**
- Enable/disable in theme settings
- Automatically shows inventory count

### In-Cart Upsells
Recommends products while customer reviews cart.

**Configuration:**
- Automatically pulls from "all" collection
- Customizable number of recommendations

## Troubleshooting

### Raw JSON data displaying on page
If you see raw JSON data like `{"hero_title"...}` on your page:
- Ensure the theme is properly installed via Shopify Admin (not just uploaded as files)
- Clear your browser cache and Shopify's theme cache
- Check that you're viewing the live theme, not the code editor
- Verify the theme is published (not in preview mode)
- Refresh the page after making any changes

### Theme not loading
- Clear browser cache
- Try incognito/private mode
- Check browser console for errors

### Translations not showing
- Verify locale files in `locales/` directory
- Check language switcher is enabled
- Ensure correct language code is set

### Styles not applying
- Check CSS file is loaded in browser
- Verify no CSS conflicts
- Clear Shopify cache

### Mobile layout broken
- Check responsive breakpoints in CSS
- Test on actual mobile device
- Verify viewport meta tag in `theme.liquid`

## Performance Tips

1. **Image Optimization**: Use WebP format where possible
2. **Lazy Loading**: Enable lazy loading for images
3. **Minification**: Minify CSS and JavaScript
4. **Caching**: Enable browser caching in Shopify settings
5. **CDN**: Use Shopify's CDN for assets

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Support

For issues, feature requests, or questions:
1. Check the troubleshooting section
2. Review Shopify theme documentation
3. Contact theme developer

## License

This theme is provided as-is. Customize as needed for your store.

## Credits

- Developed by GoEasyCharge Team
- Inspired by Atlas Bolt theme
- Built with Shopify Liquid

---

**Version:** 1.0.0  
**Last Updated:** 2024
