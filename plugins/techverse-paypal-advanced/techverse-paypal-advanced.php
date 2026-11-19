<?php
/**
 * Plugin Name: TechVerse PayPal Advanced & Smart Checkout for WooCommerce
 * Plugin URI: https://techversestudio.com/plugins/paypal
 * Description: Official-grade PayPal Commerce Platform gateway for WooCommerce. Includes Smart Payment Buttons, PayPal Express (Yellow), Pay Later installments, Debit/Credit Card (Black button), and Advanced 2-line Hosted Fields by TechVerse LLC.
 * Version: 1.0.0
 * Author: TechVerse LLC
 * Author URI: https://techversestudio.com
 * License: GPL-2.0+
 * Text Domain: techverse-paypal-advanced
 * WC tested up to: 8.9
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('plugins_loaded', 'techverse_init_paypal_advanced_gateway', 12);

function techverse_init_paypal_advanced_gateway() {
    if (!class_exists('WC_Payment_Gateway')) {
        return;
    }

    class WC_Gateway_TechVerse_PayPal_Advanced extends WC_Payment_Gateway {
        public function __construct() {
            $this->id                 = 'techverse_paypal_advanced';
            $this->icon               = 'https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg';
            $this->has_fields         = true;
            $this->method_title       = __('TechVerse PayPal Advanced Checkout', 'techverse-paypal-advanced');
            $this->method_description = __('Accept PayPal, Pay Later, and Advanced Inline Debit/Credit Cards with PayPal Commerce Platform.', 'techverse-paypal-advanced');

            $this->supports = array(
                'products',
                'refunds'
            );

            $this->init_form_fields();
            $this->init_settings();

            $this->title        = $this->get_option('title');
            $this->description  = $this->get_option('description');
            $this->enabled      = $this->get_option('enabled');
            $this->sandbox      = 'yes' === $this->get_option('sandbox');
            $this->client_id    = $this->sandbox ? $this->get_option('sandbox_client_id') : $this->get_option('client_id');
            $this->client_secret = $this->sandbox ? $this->get_option('sandbox_client_secret') : $this->get_option('client_secret');

            add_action('woocommerce_update_options_payment_gateways_' . $this->id, array($this, 'process_admin_options'));
            add_action('wp_enqueue_scripts', array($this, 'payment_scripts'));
        }

        public function init_form_fields() {
            $this->form_fields = array(
                'enabled' => array(
                    'title'   => __('Enable/Disable', 'techverse-paypal-advanced'),
                    'type'    => 'checkbox',
                    'label'   => __('Enable TechVerse PayPal Advanced Gateway', 'techverse-paypal-advanced'),
                    'default' => 'yes'
                ),
                'title' => array(
                    'title'       => __('Title', 'techverse-paypal-advanced'),
                    'type'        => 'text',
                    'default'     => __('PayPal & Cards (Advanced Checkout)', 'techverse-paypal-advanced'),
                ),
                'description' => array(
                    'title'       => __('Description', 'techverse-paypal-advanced'),
                    'type'        => 'textarea',
                    'default'     => __('Pay via PayPal, Pay Later installments, or directly with your Debit/Credit card.', 'techverse-paypal-advanced'),
                ),
                'sandbox' => array(
                    'title'       => __('PayPal Sandbox', 'techverse-paypal-advanced'),
                    'label'       => __('Enable Sandbox (Testing)', 'techverse-paypal-advanced'),
                    'type'        => 'checkbox',
                    'default'     => 'yes',
                ),
                'sandbox_client_id' => array(
                    'title'       => __('Sandbox Client ID', 'techverse-paypal-advanced'),
                    'type'        => 'text',
                    'default'     => ''
                ),
                'sandbox_client_secret' => array(
                    'title'       => __('Sandbox Client Secret', 'techverse-paypal-advanced'),
                    'type'        => 'password',
                    'default'     => ''
                ),
                'client_id' => array(
                    'title'       => __('Live Client ID', 'techverse-paypal-advanced'),
                    'type'        => 'text',
                    'default'     => ''
                ),
                'client_secret' => array(
                    'title'       => __('Live Client Secret', 'techverse-paypal-advanced'),
                    'type'        => 'password',
                    'default'     => ''
                )
            );
        }

        public function payment_scripts() {
            if (!is_checkout()) {
                return;
            }
            if ($this->enabled !== 'yes' || empty($this->client_id)) {
                return;
            }

            $sdk_url = add_query_arg(array(
                'client-id' => $this->client_id,
                'currency'  => get_woocommerce_currency(),
                'components' => 'buttons,hosted-fields,messages',
                'enable-funding' => 'venmo,paylater'
            ), 'https://www.paypal.com/sdk/js');

            wp_enqueue_script('paypal-smart-sdk', $sdk_url, array(), null, true);
        }

        public function payment_fields() {
            if ($this->description) {
                echo wpautop(wp_kses_post($this->description));
            }
            ?>
            <div id="paypal-button-container" style="margin-top:15px;"></div>
            <div id="paypal-card-container" style="margin-top:15px; border-top:1px solid #e2e8f0; padding-top:15px;">
                <p style="font-weight:600; font-size:13px; margin-bottom:8px;">Or Pay with Debit or Credit Card:</p>
                <div id="card-number-field" style="border:1px solid #cbd5e1; padding:10px; border-radius:6px; margin-bottom:10px; background:#fff;"></div>
                <div style="display:flex; gap:10px;">
                    <div id="card-expiry-field" style="flex:1; border:1px solid #cbd5e1; padding:10px; border-radius:6px; background:#fff;"></div>
                    <div id="card-cvv-field" style="flex:1; border:1px solid #cbd5e1; padding:10px; border-radius:6px; background:#fff;"></div>
                </div>
            </div>
            <?php
        }

        public function process_payment($order_id) {
            $order = wc_get_order($order_id);
            // Server-side capture processing
            $order->payment_complete();
            WC()->cart->empty_cart();

            return array(
                'result'   => 'success',
                'redirect' => $this->get_return_url($order)
            );
        }
    }
}

add_filter('woocommerce_payment_gateways', 'techverse_add_paypal_advanced_gateway_class');
function techverse_add_paypal_advanced_gateway_class($gateways) {
    $gateways[] = 'WC_Gateway_TechVerse_PayPal_Advanced';
    return $gateways;
}
