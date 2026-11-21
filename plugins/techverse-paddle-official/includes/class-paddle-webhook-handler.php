<?php
/**
 * Paddle Billing v2 Webhook Handler
 */

if (!defined('ABSPATH')) {
    exit;
}

class TechVerse_Paddle_Webhook_Handler {

    private $secret_key;

    public function __construct($secret_key = '') {
        $this->secret_key = $secret_key;
    }

    /**
     * Process incoming webhook request from Paddle
     */
    public function handle_webhook() {
        $raw_body = file_get_contents('php://input');
        $signature_header = isset($_SERVER['HTTP_PADDLE_SIGNATURE']) ? sanitize_text_field($_SERVER['HTTP_PADDLE_SIGNATURE']) : '';

        if (empty($raw_body)) {
            wp_die('Empty webhook payload', 'Webhook Error', array('response' => 400));
        }

        // Verify signature if secret key is configured
        if (!empty($this->secret_key) && !empty($signature_header)) {
            if (!$this->verify_signature($raw_body, $signature_header)) {
                error_log('TechVerse Paddle Webhook: Invalid signature verification failure.');
                wp_die('Invalid signature', 'Webhook Error', array('response' => 403));
            }
        }

        $event = json_decode($raw_body, true);
        if (!$event || !isset($event['event_type'])) {
            wp_die('Malformed JSON event', 'Webhook Error', array('response' => 400));
        }

        $event_type = $event['event_type'];
        $data = isset($event['data']) ? $event['data'] : array();

        switch ($event_type) {
            case 'transaction.completed':
            case 'transaction.paid':
                $this->process_transaction_paid($data);
                break;

            case 'transaction.refunded':
                $this->process_transaction_refunded($data);
                break;

            case 'subscription.canceled':
                $this->process_subscription_canceled($data);
                break;

            default:
                // Log unhandled event gracefully
                break;
        }

        wp_send_json_success(array('received' => true, 'event' => $event_type));
    }

    /**
     * Verify Paddle v2 HMAC-SHA256 signature
     */
    private function verify_signature($raw_body, $signature_header) {
        $parts = explode(';', $signature_header);
        $ts = '';
        $h1 = '';

        foreach ($parts as $part) {
            $kv = explode('=', trim($part), 2);
            if (count($kv) === 2) {
                if ($kv[0] === 'ts') $ts = $kv[1];
                if ($kv[0] === 'h1') $h1 = $kv[1];
            }
        }

        if (empty($ts) || empty($h1)) {
            return false;
        }

        $signed_payload = $ts . ':' . $raw_body;
        $expected_signature = hash_hmac('sha256', $signed_payload, $this->secret_key);

        return hash_equals($expected_signature, $h1);
    }

    /**
     * Complete WooCommerce Order on paid transaction
     */
    private function process_transaction_paid($data) {
        $custom_data = isset($data['custom_data']) ? $data['custom_data'] : array();
        $order_id = isset($custom_data['order_id']) ? absint($custom_data['order_id']) : 0;

        if (!$order_id) {
            return;
        }

        $order = wc_get_order($order_id);
        if (!$order) {
            return;
        }

        if ($order->is_paid()) {
            return;
        }

        $transaction_id = isset($data['id']) ? sanitize_text_field($data['id']) : '';
        $order->payment_complete($transaction_id);
        $order->add_order_note(sprintf(__('Paddle Payment Verified. Transaction ID: %s', 'techverse-paddle'), $transaction_id));
        update_post_meta($order_id, '_techverse_paddle_transaction_id', $transaction_id);
    }

    /**
     * Refund WooCommerce Order on Paddle refund event
     */
    private function process_transaction_refunded($data) {
        $custom_data = isset($data['custom_data']) ? $data['custom_data'] : array();
        $order_id = isset($custom_data['order_id']) ? absint($custom_data['order_id']) : 0;

        if (!$order_id) return;

        $order = wc_get_order($order_id);
        if (!$order) return;

        $order->update_status('refunded', __('Paddle transaction was refunded via Paddle dashboard.', 'techverse-paddle'));
    }

    private function process_subscription_canceled($data) {
        // If WooCommerce Subscriptions is active, trigger subscription cancellation
    }
}
