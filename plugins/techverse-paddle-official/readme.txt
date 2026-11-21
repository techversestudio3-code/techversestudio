=== TechVerse Official Paddle Billing Gateway for WooCommerce ===
Contributors: techversestudio
Tags: paddle, woocommerce, payment gateway, paddle billing, subscriptions, vat, sales tax
Requires at least: 5.8
Tested up to: 6.5
WC requires at least: 6.0
WC tested up to: 9.2
Requires PHP: 7.4
Stable tag: 2.1.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Enterprise Paddle Billing v2 gateway for WooCommerce. Accept credit cards, PayPal, and Apple Pay globally with automated tax and compliance.

== Description ==

TechVerse Official Paddle Billing Gateway connects WooCommerce stores with Paddle's modern Billing v2 platform.
Designed for software houses, digital creators, and SaaS businesses.

= Key Features =
* **Paddle Billing v2 SDK**: Native integration with the latest `paddle.js` v2.
* **Global Sales Tax Automation**: Offloads VAT, GST, and US State sales tax liabilities automatically.
* **Overlay & Inline Checkout Modes**: Supports clean lightbox popups or seamless inline payment forms.
* **Automated Webhooks**: Processes transactions and order fulfillment with cryptographic HMAC signature verification.
* **WooCommerce HPOS Certified**: Compatible with High-Performance Order Storage (custom order tables).
* **Direct Admin Refunds**: Execute full or partial refunds directly from WooCommerce Admin without logging into Paddle.

== Installation ==

1. Upload the `techverse-paddle-official.zip` plugin folder to the `/wp-content/plugins/` directory, or install directly via WordPress Admin -> Plugins -> Add New -> Upload Plugin.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Navigate to WooCommerce -> Settings -> Payments -> TechVerse Paddle Gateway.
4. Input your Paddle Client-side Token, API Secret Key, and Webhook Secret.
5. Set the Webhook URL in your Paddle Dashboard: `https://yourdomain.com/?wc-api=techverse_paddle_webhook`.
