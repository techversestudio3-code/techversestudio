<?php
/**
 * Plugin Name: TechVerse Official Paddle Billing Gateway for WooCommerce
 * Plugin URI: https://techversestudio.com/plugins/paddle-gateway
 * Description: Production-ready Paddle Billing v2 gateway for WooCommerce. Supports overlay checkout, inline checkout, automatic sales tax (VAT/GST), automated webhook fulfillment, subscriptions, and instant refunds.
 * Version: 2.1.0
 * Author: TechVerse Studio
 * Author URI: https://techversestudio.com
 * License: GPL-2.0+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: techverse-paddle
 * Domain Path: /languages
 * Requires at least: 5.8
 * Requires PHP: 7.4
 * WC requires at least: 6.0
 * WC tested up to: 9.2
 */

if (!defined('ABSPATH')) {
    exit;
}

define('TECHVERSE_PADDLE_VERSION', '2.1.0');
define('TECHVERSE_PADDLE_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('TECHVERSE_PADDLE_PLUGIN_URL', plugin_dir_url(__FILE__));

// Declare WooCommerce High-Performance Order Storage (HPOS) Compatibility
add_action('before_woocommerce_init', function() {
    if (class_exists(\Automattic\WooCommerce\Utilities\FeaturesUtil::class)) {
        \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility(
            'custom_order_tables',
            __FILE__,
            true
        );
        \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility(
            'cart_checkout_blocks',
            __FILE__,
            true
        );
    }
});

// Load Gateway Class when WooCommerce is active
add_action('plugins_loaded', 'techverse_paddle_init_gateway', 11);

function techverse_paddle_init_gateway() {
    if (!class_exists('WC_Payment_Gateway')) {
        return;
    }

    require_once TECHVERSE_PADDLE_PLUGIN_DIR . 'includes/class-paddle-webhook-handler.php';
    require_once TECHVERSE_PADDLE_PLUGIN_DIR . 'includes/class-wc-gateway-techverse-paddle.php';

    // Register gateway in WooCommerce
    add_filter('woocommerce_payment_gateways', function($gateways) {
        $gateways[] = 'WC_Gateway_TechVerse_Paddle';
        return $gateways;
    });
}

// Add plugin action links
add_filter('plugin_action_links_' . plugin_basename(__FILE__), function($links) {
    $settings_link = '<a href="' . admin_url('admin.php?page=wc-settings&tab=checkout&section=techverse_paddle') . '">' . __('Settings', 'techverse-paddle') . '</a>';
    array_unshift($links, $settings_link);
    return $links;
});
