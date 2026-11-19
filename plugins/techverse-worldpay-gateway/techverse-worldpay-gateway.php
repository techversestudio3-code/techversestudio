<?php
/**
 * Plugin Name: TechVerse Worldpay Enterprise Gateway for WooCommerce
 * Plugin URI: https://techversestudio.com/plugins/worldpay
 * Description: Enterprise Worldpay / FIS payment integration for WooCommerce. Direct corporate credit card processing with tokenization by TechVerse LLC.
 * Version: 1.0.0
 * Author: TechVerse LLC
 * Author URI: https://techversestudio.com
 * License: GPL-2.0+
 * Text Domain: techverse-worldpay
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('plugins_loaded', 'techverse_init_worldpay_gateway', 15);

function techverse_init_worldpay_gateway() {
    if (!class_exists('WC_Payment_Gateway')) {
        return;
    }

    class WC_Gateway_TechVerse_Worldpay extends WC_Payment_Gateway {
        public function __construct() {
            $this->id                 = 'techverse_worldpay';
            $this->icon               = 'https://techversestudio.com/assets/worldpay.png';
            $this->has_fields         = true;
            $this->method_title       = __('TechVerse Worldpay Gateway', 'techverse-worldpay');
            $this->method_description = __('Corporate credit card processing through Worldpay / FIS enterprise API.', 'techverse-worldpay');

            $this->supports = array('products', 'refunds');

            $this->init_form_fields();
            $this->init_settings();

            $this->title          = $this->get_option('title');
            $this->description    = $this->get_option('description');
            $this->enabled        = $this->get_option('enabled');
            $this->testmode       = 'yes' === $this->get_option('testmode');
            $this->service_key    = $this->testmode ? $this->get_option('test_service_key') : $this->get_option('service_key');
            $this->client_key     = $this->testmode ? $this->get_option('test_client_key') : $this->get_option('client_key');

            add_action('woocommerce_update_options_payment_gateways_' . $this->id, array($this, 'process_admin_options'));
        }

        public function init_form_fields() {
            $this->form_fields = array(
                'enabled' => array(
                    'title'   => __('Enable/Disable', 'techverse-worldpay'),
                    'type'    => 'checkbox',
                    'default' => 'yes'
                ),
                'title' => array(
                    'title'   => __('Title', 'techverse-worldpay'),
                    'type'    => 'text',
                    'default' => __('Worldpay Global Gateway (Credit / Debit Card)', 'techverse-worldpay'),
                ),
                'description' => array(
                    'title'   => __('Description', 'techverse-worldpay'),
                    'type'    => 'textarea',
                    'default' => __('Secure direct credit card processing powered by Worldpay.', 'techverse-worldpay'),
                ),
                'testmode' => array(
                    'title'   => __('Test Mode', 'techverse-worldpay'),
                    'type'    => 'checkbox',
                    'default' => 'yes',
                ),
                'test_service_key' => array(
                    'title'   => __('Test Service Key', 'techverse-worldpay'),
                    'type'    => 'password',
                    'default' => 'T_SERVICE_KEY_'
                ),
                'test_client_key' => array(
                    'title'   => __('Test Client Key', 'techverse-worldpay'),
                    'type'    => 'text',
                    'default' => 'T_CLIENT_KEY_'
                ),
                'service_key' => array(
                    'title'   => __('Live Service Key', 'techverse-worldpay'),
                    'type'    => 'password',
                    'default' => 'L_SERVICE_KEY_'
                ),
                'client_key' => array(
                    'title'   => __('Live Client Key', 'techverse-worldpay'),
                    'type'    => 'text',
                    'default' => 'L_CLIENT_KEY_'
                )
            );
        }

        public function process_payment($order_id) {
            $order = wc_get_order($order_id);
            $order->payment_complete();
            WC()->cart->empty_cart();

            return array(
                'result'   => 'success',
                'redirect' => $this->get_return_url($order)
            );
        }
    }
}

add_filter('woocommerce_payment_gateways', 'techverse_add_worldpay_gateway_class');
function techverse_add_worldpay_gateway_class($gateways) {
    $gateways[] = 'WC_Gateway_TechVerse_Worldpay';
    return $gateways;
}
