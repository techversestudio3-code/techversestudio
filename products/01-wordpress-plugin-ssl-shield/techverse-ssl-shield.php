<?php
/**
 * Plugin Name: TechVerse SSL Shield & HTTPS Enforcer
 * Plugin URI: https://techversestudio.com
 * Description: Enterprise-grade SSL monitoring, automated HTTPS enforcement, real-time mixed content fixer, and HSTS security header generator by TechVerse LLC.
 * Version: 1.0.0
 * Author: TechVerse LLC
 * Author URI: https://techversestudio.com
 * License: GPL v2 or later
 * Text Domain: techverse-ssl-shield
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class TechVerse_SSL_Shield {
    private static $instance = null;
    private $options;

    public static function get_instance() {
        if (self::$instance == null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        $this->options = get_option('techverse_ssl_settings', array(
            'force_ssl' => 'yes',
            'fix_mixed_content' => 'yes',
            'enable_hsts' => 'yes',
            'hsts_preload' => 'no',
            'hsts_max_age' => 31536000,
            'security_headers' => 'yes'
        ));

        // Hooks
        add_action('init', array($this, 'enforce_https_redirection'), 1);
        add_action('template_redirect', array($this, 'start_mixed_content_buffer'), 1);
        add_action('send_headers', array($this, 'add_security_headers'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('wp_dashboard_setup', array($this, 'add_dashboard_widget'));
        add_action('admin_init', array($this, 'register_settings'));
    }

    /**
     * 301 Permanent Redirection from HTTP to HTTPS
     */
    public function enforce_https_redirection() {
        if (!is_ssl() && $this->options['force_ssl'] === 'yes') {
            if (isset($_SERVER['HTTP_HOST']) && isset($_SERVER['REQUEST_URI'])) {
                $target_url = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
                wp_redirect($target_url, 301);
                exit;
            }
        }
    }

    /**
     * Start Output Buffer for Insecure Content Replacement
     */
    public function start_mixed_content_buffer() {
        if ($this->options['fix_mixed_content'] === 'yes' && is_ssl()) {
            ob_start(array($this, 'filter_mixed_content'));
        }
    }

    /**
     * Filter HTTP references to internal & external resources to prevent browser warnings
     */
    public function filter_mixed_content($buffer) {
        if (empty($buffer)) return $buffer;

        $host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : '';
        if ($host) {
            // Replace internal HTTP links for assets
            $buffer = str_replace('http://' . $host, 'https://' . $host, $buffer);
        }

        // Generic regex for insecure script, stylesheet, and image src attributes
        $patterns = array(
            '#<script([^>]+)src=["\']http://([^"\']+)["\']#i' => '<script$1src="https://$2"',
            '#<link([^>]+)href=["\']http://([^"\']+)["\']#i' => '<link$1href="https://$2"',
            '#<img([^>]+)src=["\']http://([^"\']+)["\']#i' => '<img$1src="https://$2"'
        );

        foreach ($patterns as $pattern => $replacement) {
            $buffer = preg_replace($pattern, $replacement, $buffer);
        }

        return $buffer;
    }

    /**
     * Inject HSTS and Core Hardening Headers
     */
    public function add_security_headers() {
        if (is_ssl() && headers_sent() === false) {
            if ($this->options['enable_hsts'] === 'yes') {
                $hsts_val = 'max-age=' . intval($this->options['hsts_max_age']) . '; includeSubDomains';
                if ($this->options['hsts_preload'] === 'yes') {
                    $hsts_val .= '; preload';
                }
                header('Strict-Transport-Security: ' . $hsts_val);
            }

            if ($this->options['security_headers'] === 'yes') {
                header('X-Content-Type-Options: nosniff');
                header('X-Frame-Options: SAMEORIGIN');
                header('Referrer-Policy: strict-origin-when-cross-origin');
            }
        }
    }

    /**
     * Inspect Live SSL Details for the current server
     */
    public static function check_ssl_status($domain = '') {
        if (empty($domain)) {
            $domain = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : parse_url(home_url(), PHP_URL_HOST);
        }
        $domain = preg_replace('#^https?://#', '', $domain);
        $domain = explode(':', $domain)[0];

        $context = stream_context_create(array(
            "ssl" => array(
                "capture_peer_cert" => true,
                "verify_peer" => false,
                "verify_peer_name" => false,
            )
        ));

        $read = @stream_socket_client("ssl://" . $domain . ":443", $errno, $errstr, 5, STREAM_CLIENT_CONNECT, $context);
        if (!$read) {
            return array(
                'status' => 'error',
                'message' => 'Unable to connect over port 443: ' . $errstr
            );
        }

        $params = stream_context_get_params($read);
        fclose($read);

        if (!isset($params["options"]["ssl"]["peer_certificate"])) {
            return array('status' => 'error', 'message' => 'No certificate found.');
        }

        $cert = openssl_x509_parse($params["options"]["ssl"]["peer_certificate"]);
        if (!$cert) {
            return array('status' => 'error', 'message' => 'Failed to parse certificate data.');
        }

        $valid_from = isset($cert['validFrom_time_t']) ? $cert['validFrom_time_t'] : 0;
        $valid_to = isset($cert['validTo_time_t']) ? $cert['validTo_time_t'] : 0;
        $now = time();
        $days_left = floor(($valid_to - $now) / 86400);

        return array(
            'status' => 'active',
            'common_name' => isset($cert['subject']['CN']) ? $cert['subject']['CN'] : 'N/A',
            'issuer' => isset($cert['issuer']['O']) ? $cert['issuer']['O'] : (isset($cert['issuer']['CN']) ? $cert['issuer']['CN'] : 'Unknown'),
            'valid_from' => date('Y-m-d H:i:s', $valid_from),
            'valid_to' => date('Y-m-d H:i:s', $valid_to),
            'days_left' => $days_left,
            'is_valid' => ($days_left > 0)
        );
    }

    /**
     * Admin Menu Setup
     */
    public function add_admin_menu() {
        add_menu_page(
            'TechVerse SSL Shield',
            'SSL Shield',
            'manage_options',
            'techverse-ssl-shield',
            array($this, 'render_admin_page'),
            'dashicons-shield',
            80
        );
    }

    public function register_settings() {
        register_setting('techverse_ssl_group', 'techverse_ssl_settings');
    }

    /**
     * Dashboard Widget
     */
    public function add_dashboard_widget() {
        wp_add_dashboard_widget(
            'techverse_ssl_widget',
            'TechVerse SSL & Security Status',
            array($this, 'render_dashboard_widget')
        );
    }

    public function render_dashboard_widget() {
        $status = self::check_ssl_status();
        if ($status['status'] === 'active') {
            $badge_color = ($status['days_left'] > 15) ? '#10b981' : '#f59e0b';
            echo '<div style="padding:10px; font-family:sans-serif;">';
            echo '<p><strong>Status:</strong> <span style="background:' . $badge_color . '; color:#fff; padding:2px 8px; border-radius:4px; font-weight:bold;">Active (' . $status['days_left'] . ' days left)</span></p>';
            echo '<p><strong>Issuer:</strong> ' . esc_html($status['issuer']) . '</p>';
            echo '<p><strong>Valid Until:</strong> ' . esc_html($status['valid_to']) . '</p>';
            echo '<p><a href="' . admin_url('admin.php?page=techverse-ssl-shield') . '" class="button button-primary">Manage Shield Settings</a></p>';
            echo '</div>';
        } else {
            echo '<div style="color:#ef4444; font-weight:bold;">SSL Warning: ' . esc_html($status['message']) . '</div>';
        }
    }

    public function render_admin_page() {
        $status = self::check_ssl_status();
        ?>
        <div class="wrap" style="max-width: 900px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <h1 style="display:flex; align-items:center; gap:10px;">
                <span class="dashicons dashicons-shield" style="font-size:32px; width:32px; height:32px; color:#2563eb;"></span>
                TechVerse SSL Shield &amp; Security Enforcer
            </h1>
            <p style="color:#64748b;">Developed by TechVerse LLC &bull; Official Platform: <a href="https://techversestudio.com" target="_blank">techversestudio.com</a></p>

            <div style="background:#fff; border-radius:8px; padding:20px; box-shadow:0 1px 3px rgba(0,0,0,0.1); margin-top:20px;">
                <h2 style="margin-top:0; border-bottom:1px solid #e2e8f0; padding-bottom:10px;">Live Certificate Diagnostics</h2>
                <?php if ($status['status'] === 'active'): ?>
                    <table class="widefat striped" style="margin-top:15px;">
                        <tbody>
                            <tr><td style="width:200px; font-weight:600;">Domain / Common Name</td><td><code><?php echo esc_html($status['common_name']); ?></code></td></tr>
                            <tr><td style="font-weight:600;">Certificate Authority (Issuer)</td><td><strong><?php echo esc_html($status['issuer']); ?></strong></td></tr>
                            <tr><td style="font-weight:600;">Valid From</td><td><?php echo esc_html($status['valid_from']); ?></td></tr>
                            <tr><td style="font-weight:600;">Valid Until</td><td><?php echo esc_html($status['valid_to']); ?></td></tr>
                            <tr>
                                <td style="font-weight:600;">Days Remaining</td>
                                <td>
                                    <span style="font-size:16px; font-weight:bold; color:<?php echo ($status['days_left'] > 15 ? '#059669' : '#dc2626'); ?>">
                                        <?php echo intval($status['days_left']); ?> Days Remaining
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                <?php else: ?>
                    <div class="notice notice-error"><p><?php echo esc_html($status['message']); ?></p></div>
                <?php endif; ?>
            </div>

            <form method="post" action="options.php" style="background:#fff; border-radius:8px; padding:20px; box-shadow:0 1px 3px rgba(0,0,0,0.1); margin-top:20px;">
                <?php
                settings_fields('techverse_ssl_group');
                $opts = $this->options;
                ?>
                <h2 style="margin-top:0; border-bottom:1px solid #e2e8f0; padding-bottom:10px;">Security &amp; Redirection Controls</h2>
                
                <table class="form-table">
                    <tr>
                        <th scope="row">Force HTTPS Redirection</th>
                        <td>
                            <label>
                                <input type="checkbox" name="techverse_ssl_settings[force_ssl]" value="yes" <?php checked($opts['force_ssl'], 'yes'); ?>>
                                Automatically redirect all non-secure HTTP traffic to secure HTTPS (301 Permanent)
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Fix Mixed Content</th>
                        <td>
                            <label>
                                <input type="checkbox" name="techverse_ssl_settings[fix_mixed_content]" value="yes" <?php checked($opts['fix_mixed_content'], 'yes'); ?>>
                                Automatically rewrite insecure HTTP scripts, styles, and images to prevent browser warnings
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">HTTP Strict Transport Security (HSTS)</th>
                        <td>
                            <label>
                                <input type="checkbox" name="techverse_ssl_settings[enable_hsts]" value="yes" <?php checked($opts['enable_hsts'], 'yes'); ?>>
                                Enable HSTS Header (tells browsers to strictly use HTTPS for 1 year)
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Strict Security Headers</th>
                        <td>
                            <label>
                                <input type="checkbox" name="techverse_ssl_settings[security_headers]" value="yes" <?php checked($opts['security_headers'], 'yes'); ?>>
                                Inject <code>X-Content-Type-Options: nosniff</code> and <code>X-Frame-Options: SAMEORIGIN</code>
                            </label>
                        </td>
                    </tr>
                </table>

                <?php submit_button('Save Shield Settings'); ?>
            </form>
        </div>
        <?php
    }
}

// Initialize Plugin
add_action('plugins_loaded', array('TechVerse_SSL_Shield', 'get_instance'));
