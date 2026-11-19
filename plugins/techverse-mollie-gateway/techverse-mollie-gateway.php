<?php
/**
 * Plugin Name: TechVerse Mollie Multi-Gateway for WooCommerce
 * Plugin URI: https://techversestudio.com/plugins/mollie
 * Description: Premium European & Global payment suite for WooCommerce. Supports iDEAL, Bancontact, Klarna, SOFORT, Cartes Bancaires, and Credit Cards by TechVerse LLC.
 * Version: 1.0.0
 * Author: TechVerse LLC
 * Author URI: https://techversestudio.com
 * License: GPL-2.0+
 * Text Domain: techverse-mollie
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('plugins_loaded', 'techverse_init_mollie_gateway', 14);

function techverse_init_mollie_gateway() {
    if (!class_exists('WC_Payment_Gateway')) {
        return;
    }

    class WC_Gateway_TechVerse_Mollie extends WC_Payment_Gateway {
        public function __construct() {
            $this->id                 = 'techverse_mollie';
            $this->icon               = 'https://techversestudio.com/assets/mollie-badge.png';
            $this->has_fields         = false;
            $this->method_title       = __('TechVerse Mollie Gateway', 'techverse-mollie');
            $this->method_description = __('Accept iDEAL, Klarna, Credit Cards and European methods via Mollie API.', 'techverse-mollie');

            $this->supports = array('products', 'refunds');

            $this->init_form_fields();
            $this->init_settings();

            $this->title       = $this->get_option('title');
            $this->description = $this->get_option('description');
            $this->enabled     = $this->get_option('enabled');
            $this->testmode    = 'yes' === $this->get_option('testmode');
            $this->api_key     = $this->testmode ? $this->get_option('test_api_key') : $this->get_option('live_api_key');

            add_action('woocommerce_update_options_payment_gateways_' . $this->id, array($this, 'process_admin_options'));
        }

        public function init_form_fields() {
            $this->form_fields = array(
                'enabled' => array(
                    'title'   => __('Enable/Disable', 'techverse-mollie'),
                    'type'    => 'checkbox',
                    'default' => 'yes'
                ),
                'title' => array(
                    'title'   => __('Title', 'techverse-mollie'),
                    'type'    => 'text',
                    'default' => __('European & Global Payments (Mollie / iDEAL / Klarna)', 'techverse-mollie'),
                ),
                'description' => array(
                    'title'   => __('Description', 'techverse-mollie'),
                    'type'    => 'textarea',
                    'default' => __('Pay securely via iDEAL, Bancontact, Klarna Pay Later, or Credit Card.', 'techverse-mollie'),
                ),
                'testmode' => array(
                    'title'   => __('Test Mode', 'techverse-mollie'),
                    'type'    => 'checkbox',
                    'default' => 'yes',
                ),
                'test_api_key' => array(
                    'title'   => __('Test API Key', 'techverse-mollie'),
                    'type'    => 'text',
                    'default' => 'test_'
                ),
                'live_api_key' => array(
                    'title'   => __('Live API Key', 'techverse-mollie'),
                    'type'    => 'password',
                    'default' => 'live_'
                )
            );
        }

        public function process_payment($order_id) {
            $order = wc_get_order($order_id);
            $amount = number_format($order->get_total(), 2, '.', '');
            $currency = $order->get_currency();

            $payload = array(
                'amount'      => array('currency' => $currency, 'value' => $amount),
                'description' => 'Order #' . $order->get_id() . ' - ' . get_bloginfo('name'),
                'redirectUrl' => $this->get_return_url($order),
                'webhookUrl'  => WC()->api_request_url('WC_Gateway_TechVerse_Mollie'),
                'metadata'    => array('order_id' => $order_id)
            );

            $response = wp_remote_post('https://api.mollie.com/v2/payments', array(
                'headers' => array(
                    'Authorization' => 'Bearer ' . $this->api_key,
                    'Content-Type'  => 'application/json'
                ),
                'body'    => json_encode($payload),
                'timeout' => 30
            ));

            if (is_wp_error($response)) {
                wc_add_notice(__('Connection error with Mollie gateway.', 'techverse-mollie'), 'error');
                return;
            }

            $body = json_decode(wp_remote_retrieve_body($response), true);
            if (isset($body['_links']['checkout']['href'])) {
                return array(
                    'result'   => 'success',
                    'redirect' => $body['_links']['checkout']['href']
                );
            }

            wc_add_notice(__('Payment creation error: ', 'techverse-mollie') . ($body['detail'] ?? 'Unknown error'), 'error');
            return;
        }
    }
}

add_filter('woocommerce_payment_gateways', 'techverse_add_mollie_gateway_class');
function techverse_add_mollie_gateway_class($gateways) {
    $gateways[] = 'WC_Gateway_TechVerse_Mollie';
    return $gateways;
}
