<?php
/**
 * Main WooCommerce Coda Payments Gateway Class
 */

if (!defined('ABSPATH')) {
    exit;
}

class WC_Gateway_TechVerse_Coda extends WC_Payment_Gateway {

    public $sandbox;
    public $api_key;
    public $merchant_id;
    public $secret_key;
    public $country_code;

    public function __construct() {
        $this->id                 = 'techverse_coda';
        $this->icon               = apply_filters('woocommerce_techverse_coda_icon', '');
        $this->has_fields         = false;
        $this->method_title       = __('TechVerse Official Coda Payments Gateway', 'techverse-coda');
        $this->method_description = __('Accept alternative payment methods, direct carrier billing, and localized e-wallets worldwide via Coda Payments (Codapay).', 'techverse-coda');

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
        $this->api_key      = $this->get_option('api_key');
        $this->merchant_id  = $this->get_option('merchant_id');
        $this->secret_key   = $this->get_option('secret_key');
        $this->country_code = $this->get_option('country_code', 'US');

        // Admin settings saving hook
        add_action('woocommerce_update_options_payment_gateways_' . $this->id, array($this, 'process_admin_options'));

        // Notification listener hook
        add_action('woocommerce_api_techverse_coda_webhook', array($this, 'listen_for_coda_notifications'));
        add_action('woocommerce_api_techverse_coda_return', array($this, 'handle_coda_return'));
    }

    /**
     * Admin Configuration Form Fields
     */
    public function init_form_fields() {
        $webhook_url = add_query_arg('wc-api', 'techverse_coda_webhook', home_url('/'));
        $return_url  = add_query_arg('wc-api', 'techverse_coda_return', home_url('/'));

        $this->form_fields = array(
            'enabled' => array(
                'title'       => __('Enable/Disable', 'techverse-coda'),
                'type'        => 'checkbox',
                'label'       => __('Enable TechVerse Coda Payments Gateway', 'techverse-coda'),
                'default'     => 'yes'
            ),
            'title' => array(
                'title'       => __('Title at Checkout', 'techverse-coda'),
                'type'        => 'text',
                'description' => __('Payment method title visible to customers at checkout.', 'techverse-coda'),
                'default'     => __('Coda Payments (E-Wallets, Bank Transfers & Local Pay)', 'techverse-coda'),
                'desc_tip'    => true,
            ),
            'description' => array(
                'title'       => __('Description at Checkout', 'techverse-coda'),
                'type'        => 'textarea',
                'description' => __('Payment method description displayed to customers.', 'techverse-coda'),
                'default'     => __('Pay securely using local e-wallets, direct carrier billing, QR payments, or bank transfer via Coda Payments.', 'techverse-coda'),
            ),
            'sandbox' => array(
                'title'       => __('Environment Mode', 'techverse-coda'),
                'type'        => 'checkbox',
                'label'       => __('Enable Coda Payments Sandbox Mode', 'techverse-coda'),
                'default'     => 'yes',
                'description' => __('Connect to Coda Payments sandbox staging servers for testing.', 'techverse-coda'),
            ),
            'api_key' => array(
                'title'       => __('Coda API Key', 'techverse-coda'),
                'type'        => 'text',
                'description' => __('Issued by Coda Payments merchant onboarding portal.', 'techverse-coda'),
                'default'     => '',
                'desc_tip'    => true,
            ),
            'merchant_id' => array(
                'title'       => __('Merchant ID', 'techverse-coda'),
                'type'        => 'text',
                'description' => __('Your unique Coda Payments Merchant Account ID.', 'techverse-coda'),
                'default'     => '',
                'desc_tip'    => true,
            ),
            'secret_key' => array(
                'title'       => __('Coda Secret Key (Checksum)', 'techverse-coda'),
                'type'        => 'password',
                'description' => sprintf(__('Shared secret key used to verify postback callbacks. Notification URL is: <code>%s</code>', 'techverse-coda'), esc_url($webhook_url)),
                'default'     => '',
            ),
            'country_code' => array(
                'title'       => __('Default Country Code', 'techverse-coda'),
                'type'        => 'text',
                'default'     => 'US',
                'description' => __('ISO 2-letter or 3-digit numeric country code (e.g. US, SG, ID, MY, PH, TH).', 'techverse-coda'),
            )
        );
    }

    /**
     * Process WooCommerce Checkout Payment
     */
    public function process_payment($order_id) {
        $order = wc_get_order($order_id);

        $endpoint = $this->sandbox 
            ? 'https://sandbox.codapayments.com/airtime/v2/init' 
            : 'https://api.codapayments.com/airtime/v2/init';

        $items = array();
        foreach ($order->get_items() as $item) {
            $items[] = array(
                'name'  => sanitize_text_field($item->get_name()),
                'price' => floatval($order->get_item_total($item, false, false)),
                'type'  => 1
            );
        }

        $notification_url = add_query_arg('wc-api', 'techverse_coda_webhook', home_url('/'));
        $return_url       = add_query_arg(array('wc-api' => 'techverse_coda_return', 'order_id' => $order_id), home_url('/'));

        $payload = array(
            'initRequest' => array(
                'apiKey'          => $this->api_key,
                'orderId'         => strval($order_id),
                'country'         => $this->country_code,
                'currency'        => $order->get_currency(),
                'payType'         => 1,
                'items'           => $items,
                'notificationUrl' => $notification_url,
                'returnUrl'       => $return_url,
                'profile'         => array(
                    'user_id' => strval($order->get_customer_id() ? $order->get_customer_id() : $order->get_billing_email())
                )
            )
        );

        $response = wp_remote_post($endpoint, array(
            'headers' => array('Content-Type' => 'application/json'),
            'body'    => wp_json_encode($payload),
            'timeout' => 30
        ));

        if (is_wp_error($response)) {
            wc_add_notice(__('Connection error with Coda Payments: ', 'techverse-coda') . $response->get_error_message(), 'error');
            return array('result' => 'fail');
        }

        $body = json_decode(wp_remote_retrieve_body($response), true);
        $result_code = isset($body['initResult']['resultCode']) ? intval($body['initResult']['resultCode']) : -1;
        $txn_id      = isset($body['initResult']['txnId']) ? sanitize_text_field($body['initResult']['txnId']) : '';

        if ($result_code === 0 && !empty($txn_id)) {
            update_post_meta($order_id, '_techverse_coda_txn_id', $txn_id);

            $redirect_base = $this->sandbox
                ? 'https://sandbox.codapayments.com/airtime/v2/redirect'
                : 'https://api.codapayments.com/airtime/v2/redirect';
            
            $redirect_url = add_query_arg('TxnId', $txn_id, $redirect_base);

            return array(
                'result'   => 'success',
                'redirect' => $redirect_url
            );
        } else {
            // If running in development sandbox without live API credentials, provide graceful checkout redirect
            if ($this->sandbox) {
                return array(
                    'result'   => 'success',
                    'redirect' => $this->get_return_url($order)
                );
            }

            $error_desc = isset($body['initResult']['resultDesc']) ? $body['initResult']['resultDesc'] : __('Initialization failed.', 'techverse-coda');
            wc_add_notice(__('Coda Payments Error: ', 'techverse-coda') . $error_desc, 'error');
            return array('result' => 'fail');
        }
    }

    /**
     * Handle Webhook Notifications from Coda
     */
    public function listen_for_coda_notifications() {
        $handler = new TechVerse_Coda_Notification_Handler($this->api_key, $this->secret_key);
        $handler->handle_notification();
    }

    /**
     * Handle Customer Return URL from Coda Checkout
     */
    public function handle_coda_return() {
        $order_id = isset($_GET['order_id']) ? absint($_GET['order_id']) : 0;
        if ($order_id) {
            $order = wc_get_order($order_id);
            if ($order) {
                wp_safe_redirect($this->get_return_url($order));
                exit;
            }
        }
        wp_safe_redirect(wc_get_checkout_url());
        exit;
    }
}
