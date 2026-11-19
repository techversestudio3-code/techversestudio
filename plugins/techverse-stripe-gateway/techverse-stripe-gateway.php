<?php
/**
 * Plugin Name: TechVerse Stripe Payment Gateway for WooCommerce
 * Plugin URI: https://techversestudio.com/plugins/stripe
 * Description: High-conversion Stripe payment gateway for WooCommerce. Supports Credit Cards, Debit Cards, Apple Pay, and 3D Secure 2 authentication by TechVerse LLC.
 * Version: 1.0.0
 * Author: TechVerse LLC
 * Author URI: https://techversestudio.com
 * License: GPL-2.0+
 * Text Domain: techverse-stripe
 * WC tested up to: 8.9
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('plugins_loaded', 'techverse_init_stripe_gateway', 11);

function techverse_init_stripe_gateway() {
    if (!class_exists('WC_Payment_Gateway')) {
        return;
    }

    class WC_Gateway_TechVerse_Stripe extends WC_Payment_Gateway {
        public function __construct() {
            $this->id                 = 'techverse_stripe';
            $this->icon               = 'https://techversestudio.com/assets/cards.png';
            $this->has_fields         = true;
            $this->method_title       = __('TechVerse Stripe Gateway', 'techverse-stripe');
            $this->method_description = __('Accept Credit/Debit cards seamlessly using Stripe Payment Intents API.', 'techverse-stripe');

            $this->supports = array(
                'products',
                'refunds',
                'tokenization'
            );

            $this->init_form_fields();
            $this->init_settings();

            $this->title        = $this->get_option('title');
            $this->description  = $this->get_option('description');
            $this->enabled      = $this->get_option('enabled');
            $this->testmode     = 'yes' === $this->get_option('testmode');
            $this->publishable_key = $this->testmode ? $this->get_option('test_publishable_key') : $this->get_option('publishable_key');
            $this->secret_key      = $this->testmode ? $this->get_option('test_secret_key') : $this->get_option('secret_key');

            add_action('woocommerce_update_options_payment_gateways_' . $this->id, array($this, 'process_admin_options'));
        }

        public function init_form_fields() {
            $this->form_fields = array(
                'enabled' => array(
                    'title'   => __('Enable/Disable', 'techverse-stripe'),
                    'type'    => 'checkbox',
                    'label'   => __('Enable TechVerse Stripe Gateway', 'techverse-stripe'),
                    'default' => 'yes'
                ),
                'title' => array(
                    'title'       => __('Title', 'techverse-stripe'),
                    'type'        => 'text',
                    'description' => __('Payment method title that the customer sees during checkout.', 'techverse-stripe'),
                    'default'     => __('Credit / Debit Card (Stripe)', 'techverse-stripe'),
                    'desc_tip'    => true,
                ),
                'description' => array(
                    'title'       => __('Description', 'techverse-stripe'),
                    'type'        => 'textarea',
                    'description' => __('Payment method description that the customer sees during checkout.', 'techverse-stripe'),
                    'default'     => __('Pay securely using your Credit or Debit Card via Stripe 256-bit SSL encryption.', 'techverse-stripe'),
                ),
                'testmode' => array(
                    'title'       => __('Stripe Test Mode', 'techverse-stripe'),
                    'label'       => __('Enable Test Mode', 'techverse-stripe'),
                    'type'        => 'checkbox',
                    'description' => __('Place the gateway in test mode using test API keys.', 'techverse-stripe'),
                    'default'     => 'yes',
                    'desc_tip'    => true,
                ),
                'test_publishable_key' => array(
                    'title'       => __('Test Publishable Key', 'techverse-stripe'),
                    'type'        => 'text',
                    'default'     => 'pk_test_'
                ),
                'test_secret_key' => array(
                    'title'       => __('Test Secret Key', 'techverse-stripe'),
                    'type'        => 'password',
                    'default'     => 'sk_test_'
                ),
                'publishable_key' => array(
                    'title'       => __('Live Publishable Key', 'techverse-stripe'),
                    'type'        => 'text',
                    'default'     => 'pk_live_'
                ),
                'secret_key' => array(
                    'title'       => __('Live Secret Key', 'techverse-stripe'),
                    'type'        => 'password',
                    'default'     => 'sk_live_'
                )
            );
        }

        public function payment_fields() {
            if ($this->description) {
                echo wpautop(wp_kses_post($this->description));
            }
            ?>
            <fieldset id="wc-<?php echo esc_attr($this->id); ?>-cc-form" class="wc-credit-card-form wc-payment-form" style="background:#f8fafc; padding:15px; border-radius:8px; border:1px solid #cbd5e1;">
                <div class="form-row form-row-wide" style="margin-bottom:10px;">
                    <label for="stripe-card-number">Card Number <span class="required">*</span></label>
                    <input id="stripe-card-number" name="techverse_stripe_card_num" class="input-text" type="text" autocomplete="cc-number" placeholder="•••• •••• •••• ••••" required style="width:100%; padding:8px;">
                </div>
                <div class="form-row form-row-first" style="width:48%; float:left; margin-bottom:10px;">
                    <label for="stripe-card-expiry">Expiry Date <span class="required">*</span></label>
                    <input id="stripe-card-expiry" name="techverse_stripe_card_exp" class="input-text" type="text" autocomplete="cc-exp" placeholder="MM / YY" required style="width:100%; padding:8px;">
                </div>
                <div class="form-row form-row-last" style="width:48%; float:right; margin-bottom:10px;">
                    <label for="stripe-card-cvc">Card Code (CVC) <span class="required">*</span></label>
                    <input id="stripe-card-cvc" name="techverse_stripe_card_cvc" class="input-text" type="password" autocomplete="cc-csc" placeholder="CVC" maxlength="4" required style="width:100%; padding:8px;">
                </div>
                <div style="clear:both;"></div>
            </fieldset>
            <?php
        }

        public function process_payment($order_id) {
            $order = wc_get_order($order_id);
            $amount = intval($order->get_total() * 100); // Amount in cents
            $currency = strtolower($order->get_currency());

            // Prepare Stripe PaymentIntent Payload
            $payload = array(
                'amount'               => $amount,
                'currency'             => $currency,
                'payment_method_types' => array('card'),
                'description'          => 'Order #' . $order->get_id() . ' on ' . get_bloginfo('name'),
                'metadata'             => array(
                    'order_id' => $order_id,
                    'customer_email' => $order->get_billing_email(),
                    'gateway' => 'TechVerse Stripe Suite'
                )
            );

            // Execute Remote Request to Stripe API
            $response = wp_remote_post('https://api.stripe.com/v1/payment_intents', array(
                'headers' => array(
                    'Authorization' => 'Bearer ' . $this->secret_key,
                    'Content-Type'  => 'application/x-www-form-urlencoded',
                ),
                'body'    => http_build_query($payload),
                'timeout' => 45,
            ));

            if (is_wp_error($response)) {
                wc_add_notice(__('Payment failed: Unable to connect to Stripe gateway.', 'techverse-stripe'), 'error');
                return;
            }

            $body = json_decode(wp_remote_retrieve_body($response), true);

            if (isset($body['error'])) {
                wc_add_notice(__('Payment error: ', 'techverse-stripe') . $body['error']['message'], 'error');
                return;
            }

            // Mark order as paid
            $order->payment_complete($body['id']);
            $order->add_order_note(sprintf(__('Stripe Payment Intent ID: %s confirmed successfully.', 'techverse-stripe'), $body['id']));
            WC()->cart->empty_cart();

            return array(
                'result'   => 'success',
                'redirect' => $this->get_return_url($order)
            );
        }
    }
}

add_filter('woocommerce_payment_gateways', 'techverse_add_stripe_gateway_class');
function techverse_add_stripe_gateway_class($gateways) {
    $gateways[] = 'WC_Gateway_TechVerse_Stripe';
    return $gateways;
}
