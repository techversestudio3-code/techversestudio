<?php
/**
 * Main WooCommerce Paddle Payment Gateway Class
 */

if (!defined('ABSPATH')) {
    exit;
}

class WC_Gateway_TechVerse_Paddle extends WC_Payment_Gateway {

    public $sandbox;
    public $client_token;
    public $api_key;
    public $webhook_secret;
    public $checkout_style;

    public function __construct() {
        $this->id                 = 'techverse_paddle';
        $this->icon               = apply_filters('woocommerce_techverse_paddle_icon', '');
        $this->has_fields         = false;
        $this->method_title       = __('TechVerse Official Paddle Gateway', 'techverse-paddle');
        $this->method_description = __('Accept global payments, cards, PayPal, and Apple Pay via Paddle Billing with automated worldwide sales tax (VAT/GST) compliance.', 'techverse-paddle');

        $this->supports = array(
            'products',
            'refunds',
            'subscriptions'
        );

        $this->init_form_fields();
        $this->init_settings();

        $this->title          = $this->get_option('title');
        $this->description    = $this->get_option('description');
        $this->enabled        = $this->get_option('enabled');
        $this->sandbox        = 'yes' === $this->get_option('sandbox');
        $this->client_token   = $this->get_option('client_token');
        $this->api_key        = $this->get_option('api_key');
        $this->webhook_secret = $this->get_option('webhook_secret');
        $this->checkout_style = $this->get_option('checkout_style', 'overlay');

        // Admin settings saving hook
        add_action('woocommerce_update_options_payment_gateways_' . $this->id, array($this, 'process_admin_options'));

        // Client-side script enqueues
        add_action('wp_enqueue_scripts', array($this, 'payment_scripts'));

        // Webhook listener hook
        add_action('woocommerce_api_techverse_paddle_webhook', array($this, 'listen_for_paddle_webhooks'));
    }

    /**
     * Admin Configuration Form Fields
     */
    public function init_form_fields() {
        $webhook_url = add_query_arg('wc-api', 'techverse_paddle_webhook', home_url('/'));

        $this->form_fields = array(
            'enabled' => array(
                'title'       => __('Enable/Disable', 'techverse-paddle'),
                'type'        => 'checkbox',
                'label'       => __('Enable TechVerse Paddle Billing Gateway', 'techverse-paddle'),
                'default'     => 'yes'
            ),
            'title' => array(
                'title'       => __('Title at Checkout', 'techverse-paddle'),
                'type'        => 'text',
                'description' => __('Payment method title visible to customers at checkout.', 'techverse-paddle'),
                'default'     => __('Credit Card / PayPal / Apple Pay (Paddle)', 'techverse-paddle'),
                'desc_tip'    => true,
            ),
            'description' => array(
                'title'       => __('Description at Checkout', 'techverse-paddle'),
                'type'        => 'textarea',
                'description' => __('Payment method description displayed to customers.', 'techverse-paddle'),
                'default'     => __('Encrypted global payment processed securely via Paddle Billing with automated sales tax calculation.', 'techverse-paddle'),
            ),
            'sandbox' => array(
                'title'       => __('Environment Mode', 'techverse-paddle'),
                'type'        => 'checkbox',
                'label'       => __('Enable Sandbox / Test Environment', 'techverse-paddle'),
                'default'     => 'yes',
                'description' => __('Toggle to test transactions in Paddle sandbox before going live.', 'techverse-paddle'),
            ),
            'client_token' => array(
                'title'       => __('Paddle Client-Side Token', 'techverse-paddle'),
                'type'        => 'text',
                'description' => __('Found in your Paddle Dashboard -> Developer tools -> Authentication -> Client-side tokens.', 'techverse-paddle'),
                'default'     => '',
                'desc_tip'    => true,
            ),
            'api_key' => array(
                'title'       => __('Paddle API Secret Key', 'techverse-paddle'),
                'type'        => 'password',
                'description' => __('Found in Paddle Dashboard -> Developer tools -> Authentication -> API keys. Required for automated refunds.', 'techverse-paddle'),
                'default'     => '',
                'desc_tip'    => true,
            ),
            'webhook_secret' => array(
                'title'       => __('Paddle Webhook Secret Key', 'techverse-paddle'),
                'type'        => 'password',
                'description' => sprintf(__('Enter the secret key from Paddle notifications setup. Your Webhook Endpoint URL is: <code>%s</code>', 'techverse-paddle'), esc_url($webhook_url)),
                'default'     => '',
            ),
            'checkout_style' => array(
                'title'       => __('Checkout Experience', 'techverse-paddle'),
                'type'        => 'select',
                'default'     => 'overlay',
                'options'     => array(
                    'overlay' => __('Overlay Modal (Popup)', 'techverse-paddle'),
                    'inline'  => __('Inline Embed', 'techverse-paddle'),
                ),
                'description' => __('Choose whether Paddle checkout opens as an elegant overlay modal or embedded inside the page.', 'techverse-paddle'),
            )
        );
    }

    /**
     * Enqueue Paddle v2 SDK
     */
    public function payment_scripts() {
        if (!is_checkout() && !is_checkout_pay_page()) {
            return;
        }

        if ($this->enabled !== 'yes' || empty($this->client_token)) {
            return;
        }

        wp_enqueue_script('paddle-v2-sdk', 'https://cdn.paddle.com/paddle/v2/paddle.js', array(), null, true);

        $env_mode = $this->sandbox ? "Paddle.Environment.set('sandbox');" : "";
        $inline_init = "
            document.addEventListener('DOMContentLoaded', function() {
                if (typeof Paddle !== 'undefined') {
                    {$env_mode}
                    Paddle.Initialize({
                        token: '" . esc_js($this->client_token) . "'
                    });
                }
            });
        ";

        wp_add_inline_script('paddle-v2-sdk', $inline_init);
    }

    /**
     * Process WooCommerce Checkout Payment
     */
    public function process_payment($order_id) {
        $order = wc_get_order($order_id);

        // Build items array for Paddle Billing
        $items = array();
        foreach ($order->get_items() as $item) {
            $product = $item->get_product();
            $items[] = array(
                'quantity' => $item->get_quantity(),
                'price' => array(
                    'description' => $item->get_name(),
                    'unit_price' => array(
                        'amount' => strval(round($order->get_item_total($item, false, false) * 100)),
                        'currency_code' => $order->get_currency()
                    ),
                    'product' => array(
                        'name' => $item->get_name(),
                        'tax_category' => 'standard'
                    )
                )
            );
        }

        // Return order receipt / payment URL with checkout parameters
        return array(
            'result'   => 'success',
            'redirect' => $order->get_checkout_payment_url(true)
        );
    }

    /**
     * Listen for Webhook Notifications from Paddle
     */
    public function listen_for_paddle_webhooks() {
        $handler = new TechVerse_Paddle_Webhook_Handler($this->webhook_secret);
        $handler->handle_webhook();
    }

    /**
     * Process Admin Refund via Paddle API
     */
    public function process_refund($order_id, $amount = null, $reason = '') {
        $order = wc_get_order($order_id);
        if (!$order) {
            return new WP_Error('invalid_order', __('Invalid order ID.', 'techverse-paddle'));
        }

        $transaction_id = get_post_meta($order_id, '_techverse_paddle_transaction_id', true);
        if (empty($transaction_id)) {
            $transaction_id = $order->get_transaction_id();
        }

        if (empty($transaction_id)) {
            return new WP_Error('no_tx', __('No Paddle transaction ID found for this order.', 'techverse-paddle'));
        }

        if (empty($this->api_key)) {
            return new WP_Error('no_api_key', __('Paddle API Secret Key is not configured in settings.', 'techverse-paddle'));
        }

        $endpoint = $this->sandbox 
            ? 'https://sandbox-api.paddle.com/transactions/' . rawurlencode($transaction_id) . '/refunds'
            : 'https://api.paddle.com/transactions/' . rawurlencode($transaction_id) . '/refunds';

        $payload = array(
            'action' => 'refund',
            'reason' => !empty($reason) ? $reason : 'Customer requested refund',
            'type'   => 'full'
        );

        $response = wp_remote_post($endpoint, array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $this->api_key,
                'Content-Type'  => 'application/json'
            ),
            'body'    => wp_json_encode($payload),
            'timeout' => 30
        ));

        if (is_wp_error($response)) {
            return $response;
        }

        $code = wp_remote_retrieve_response_code($response);
        $body = json_decode(wp_remote_retrieve_body($response), true);

        if ($code >= 200 && $code < 300) {
            $order->add_order_note(sprintf(__('Paddle Refund Issued successfully. Amount: %s', 'techverse-paddle'), $amount));
            return true;
        } else {
            $err_msg = isset($body['error']['detail']) ? $body['error']['detail'] : __('Failed to communicate with Paddle API.', 'techverse-paddle');
            return new WP_Error('paddle_refund_error', $err_msg);
        }
    }
}
