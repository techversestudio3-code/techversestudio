=== TechVerse Official Coda Payments Gateway for WooCommerce ===
Contributors: techversestudio
Tags: coda, codapay, coda payments, woocommerce, payment gateway, carrier billing, e-wallets
Requires at least: 5.8
Tested up to: 6.5
WC requires at least: 6.0
WC tested up to: 9.2
Requires PHP: 7.4
Stable tag: 2.1.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Official Coda Payments (Codapay) payment gateway for WooCommerce. Accept 300+ local payment methods, direct carrier billing, QR codes, and local e-wallets worldwide.

== Description ==

TechVerse Official Coda Payments Gateway empowers WooCommerce merchants to tap into emerging markets across Southeast Asia, Latin America, the Middle East, and beyond using Coda Payments (Codapay).

= Key Features =
* **300+ Alternative Payment Methods**: Accept e-wallets (GoPay, OVO, DANA, ShopeePay, Touch 'n Go, GCash, PromptPay), telco direct carrier billing, ATM bank transfers, and over-the-counter payments.
* **Codapay v2 REST API**: Fast, reliable transaction initialization with automatic redirection and return management.
* **Instant Server-to-Server Webhooks**: Automatic order fulfillment upon verified payment callbacks with cryptographic SHA-256 Checksum validation.
* **WooCommerce HPOS Certified**: 100% compatible with High-Performance Order Storage.
* **Sandbox & Live Modes**: Seamless developer switch for sandbox testing prior to live merchant rollout.

== Installation ==

1. Upload the `techverse-coda-official.zip` plugin folder to the `/wp-content/plugins/` directory, or install directly via WordPress Admin -> Plugins -> Add New -> Upload Plugin.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Navigate to WooCommerce -> Settings -> Payments -> TechVerse Coda Payments Gateway.
4. Input your Coda API Key, Merchant ID, and Checksum Secret Key.
5. Provide your Coda Onboarding Manager with your Server Notification Webhook URL: `https://yourdomain.com/?wc-api=techverse_coda_webhook`.
