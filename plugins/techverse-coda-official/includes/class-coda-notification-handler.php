<?php
/**
 * Coda Payments (Codapay) Notification Handler
 */

if (!defined('ABSPATH')) {
    exit;
}

class TechVerse_Coda_Notification_Handler {

    private $secret_key;
    private $api_key;

    public function __construct($api_key = '', $secret_key = '') {
        $this->api_key = $api_key;
        $this->secret_key = $secret_key;
    }

    /**
     * Process incoming Server-to-Server notification from Coda
     */
    public function handle_notification() {
        $raw_input = file_get_contents('php://input');
        $params = array();

        if (!empty($raw_input)) {
            $json = json_decode($raw_input, true);
            if (is_array($json)) {
                $params = $json;
            }
        }

        if (empty($params)) {
            $params = $_REQUEST;
        }

        $order_id    = isset($params['OrderId']) ? absint($params['OrderId']) : (isset($params['order_id']) ? absint($params['order_id']) : 0);
        $txn_id      = isset($params['TxnId']) ? sanitize_text_field($params['TxnId']) : '';
        $result_code = isset($params['ResultCode']) ? intval($params['ResultCode']) : -1;
        $checksum    = isset($params['Checksum']) ? sanitize_text_field($params['Checksum']) : '';

        if (!$order_id) {
            wp_send_json(array('ResultCode' => 1, 'Message' => 'Order not found'));
            exit;
        }

        $order = wc_get_order($order_id);
        if (!$order) {
            wp_send_json(array('ResultCode' => 1, 'Message' => 'Invalid WooCommerce order'));
            exit;
        }

        // Verify Checksum if secret is provided
        if (!empty($this->secret_key) && !empty($checksum)) {
            $raw_string = $txn_id . $order_id . $result_code . $this->secret_key;
            $calculated_checksum = hash('sha256', $raw_string);

            if (!hash_equals(strtolower($calculated_checksum), strtolower($checksum))) {
                error_log('TechVerse Coda Payments: Checksum validation failed for order ' . $order_id);
                wp_send_json(array('ResultCode' => 2, 'Message' => 'Invalid Checksum'));
                exit;
            }
        }

        // ResultCode 0 indicates payment success in Coda Payments API
        if ($result_code === 0) {
            if (!$order->is_paid()) {
                $order->payment_complete($txn_id);
                $order->add_order_note(sprintf(__('Coda Payments transaction approved. TxnId: %s', 'techverse-coda'), $txn_id));
                update_post_meta($order_id, '_techverse_coda_txn_id', $txn_id);
            }
            wp_send_json(array('ResultCode' => 0, 'Message' => 'Success'));
            exit;
        } else {
            $order->update_status('failed', sprintf(__('Coda Payments transaction failed or cancelled. ResultCode: %d', 'techverse-coda'), $result_code));
            wp_send_json(array('ResultCode' => 0, 'Message' => 'Failure recorded'));
            exit;
        }
    }
}
