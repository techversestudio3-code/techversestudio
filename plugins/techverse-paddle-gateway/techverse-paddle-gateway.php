<?php
/**
 * Plugin Name: TechVerse Paddle Billing & Checkout Gateway for WooCommerce
 * Plugin URI: https://techversestudio.com/plugins/paddle
 * Description: Seamless Paddle Merchant of Record gateway for WooCommerce. Supports inline checkout, overlay modals, global sales tax automation, and instant digital fulfillment by TechVerse LLC.
 * Version: 1.0.0
 * Author: TechVerse LLC
 * Author URI: https://techversestudio.com
 * License: GPL-2.0+
 * Text Domain: techverse-paddle
 * WC tested up to: 8.9
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('plugins_loaded', 'techverse_init_paddle_gateway', 13);

function techverse_init_paddle_gateway() {
    if (!class_exists('WC_Payment_Gateway')) {
        return;
    }

    class WC_Gateway_TechVerse_Paddle extends WC_Payment_Gateway {
        public function __construct() {
            $this->id                 = 'techverse_paddle';
            $this->icon               = 'https://techversestudio.com/assets/paddle-badge.png';
            $this->has_fields         = false;
            $this->method_title       = __('TechVerse Paddle Gateway', 'techverse-paddle');
            $this->method_description = __('Sell globally with zero tax liability using Paddle Merchant of Record.', 'techverse-paddle');

            $this->supports = array(
                'products',
                'refunds',
                'subscriptions'
            );

            $this->init_form_fields();
            $this->init_settings();

            $this->title        = $this->get_option('title');
            $this->description  = $this->get_option('description');
            $this->enabled      = $this->get_option('enabled');
            $this->sandbox      = 'yes' === $this->get_option('sandbox');
            $this->vendor_id    = $this->get_option('vendor_id');
            $this->api_key      = $this->get_option('api_key');
            $this->client_token = $this->get_option('client_token');

            add_action('woocommerce_update_options_payment_gateways_' . $this->id, array($this, 'process_admin_options'));
            add_action('wp_enqueue_scripts', array($this, 'paddle_scripts'));
        }

        public function init_form_fields() {
            $this->form_fields = array(
                'enabled' => array(
                    'title'   => __('Enable/Disable', 'techverse-paddle'),
                    'type'    => 'checkbox',
                    'label'   => __('Enable TechVerse Paddle Gateway', 'techverse-paddle'),
                    'default' => 'yes'
                ),
                'title' => array(
                    'title'       => __('Title', 'techverse-paddle'),
                    'type'        => 'text',
                    'default'     => __('Credit Card / PayPal / Apple Pay (Paddle)', 'techverse-paddle'),
                ),
                'description' => array(
                    'title'       => __('Description', 'techverse-paddle'),
                    'type'        => 'textarea',
                    'default'     => __('Encrypted global checkout processed by Paddle.com (Merchant of Record).', 'techverse-paddle'),
                ),
                'sandbox' => array(
                    'title'       => __('Paddle Sandbox Environment', 'techverse-paddle'),
                    'label'       => __('Enable Sandbox Mode', 'techverse-paddle'),
                    'type'        => 'checkbox',
                    'default'     => 'yes',
                ),
                'vendor_id' => array(
                    'title'       => __('Vendor ID / Seller ID', 'techverse-paddle'),
                    'type'        => 'text',
                    'default'     => ''
                ),
                'client_token' => array(
                    'title'       => __('Client Token', 'techverse-paddle'),
                    'type'        => 'text',
                    'default'     => ''
                ),
                'api_key' => array(
                    'title'       => __('API Secret Key', 'techverse-paddle'),
                    'type'        => 'password',
                    'default'     => ''
                )
            );
        }

        public function paddle_scripts() {
            if (!is_checkout()) {
                return;
            }
            if ($this->enabled !== 'yes' || empty($this->client_token)) {
                return;
            }

            wp_enqueue_script('paddle-v2-sdk', 'https://cdn.paddle.com/paddle/v2/paddle.js', array(), null, true);
            $inline_js = "document.addEventListener('DOMContentLoaded', function() {
                if (typeof Paddle !== 'undefined') {
                    " . ($this->sandbox ? "Paddle.Environment.set('sandbox');" : "") . "
                    Paddle.Initialize({ token: '" . esc_js($this->client_token) . "' });
                }
            });";
            wp_add_inline_script('paddle-v2-sdk', $inline_js);
        }

        public function process_payment($order_id) {
            $order = wc_get_order($order_id);

            // Return success with Paddle checkout trigger URL
            return array(
                'result'   => 'success',
                'redirect' => $order->get_checkout_payment_url(true)
            );
        }
    }
}

add_filter('woocommerce_payment_gateways', 'techverse_add_paddle_gateway_class');
function techverse_add_paddle_gateway_class($gateways) {
    $gateways[] = 'WC_Gateway_TechVerse_Paddle';
    return $gateways;
}
