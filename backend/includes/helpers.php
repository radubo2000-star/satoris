<?php
/**
 * Satoris API - Shared Helper Functions
 * This file contains common functions used across API handlers
 */

// Load configuration
$configFile = __DIR__ . '/../config/settings.php';
if (file_exists($configFile)) {
    require_once $configFile;
}

// Polyfill for PHP < 8.0
if (!function_exists('str_starts_with')) {
    function str_starts_with(string $haystack, string $needle): bool {
        return strpos($haystack, $needle) === 0;
    }
}
if (!function_exists('str_contains')) {
    function str_contains(string $haystack, string $needle): bool {
        return strpos($haystack, $needle) !== false;
    }
}

/**
 * Get configuration value
 */
function get_config($key, $default = null) {
    global $config;
    return $config[$key] ?? $default;
}

/**
 * Get settings from settings.json file
 */
function get_settings() {
    $settingsFile = __DIR__ . '/../settings.json';
    $defaults = [
        'site_name' => 'Satoris Events',
        'tagline' => 'We make brands Visible & Digital',
        'email' => 'hello@satoris.ro',
        'phone' => '+4 0723257755',
        'address' => '70-84 Ion Mihalache Bd, b.45, S1, Bucharest, RO',
    ];
    
    if (file_exists($settingsFile)) {
        $saved = json_decode(file_get_contents($settingsFile), true);
        if (is_array($saved)) {
            return array_merge($defaults, $saved);
        }
    }
    return $defaults;
}

/**
 * Generate JWT token for authenticated user
 */
function generateJWT($user) {
    $secret = get_config('jwt_secret', 'satoris_secret_key_2024');
    $header = base64_encode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
    $payload = base64_encode(json_encode([
        'sub' => $user['id'],
        'email' => $user['email'],
        'role' => $user['role'],
        'name' => $user['name'],
        'exp' => time() + 86400 // 24 hours
    ]));
    $signature = base64_encode(hash_hmac('sha256', "$header.$payload", $secret, true));
    return "$header.$payload.$signature";
}

/**
 * Verify JWT token
 */
function verifyJWT($token) {
    $secret = get_config('jwt_secret', 'satoris_secret_key_2024');
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;
    $signature = base64_encode(hash_hmac('sha256', "{$parts[0]}.{$parts[1]}", $secret, true));
    if ($signature !== $parts[2]) return null;
    $payload = json_decode(base64_decode($parts[1]), true);
    if ($payload['exp'] < time()) return null;
    return $payload;
}

/**
 * Get current user from Authorization header
 */
function getCurrentUser($authHeader) {
    if (!str_starts_with($authHeader, 'Bearer ')) return null;
    $token = substr($authHeader, 7);
    return verifyJWT($token);
}

/**
 * Load users from JSON file
 */
function load_users() {
    $usersFile = __DIR__ . '/../users.json';
    if (file_exists($usersFile)) {
        $users = json_decode(file_get_contents($usersFile), true);
        
        // Check users array has is_primary field (for backwards compatibility)
        if (!isset($users[0]['is_primary'])) {
            foreach ($users as $i => $u) {
                $users[$i]['is_primary'] = ($u['email'] === 'admin@satoris.ro') ? 1 : 0;
            }
        }
        return $users;
    }
    
    // Default super admin user (password: Satoris2024!)
    $users = [
        [
            'id' => 1,
            'email' => 'admin@satoris.ro',
            'password_hash' => password_hash('Satoris2024!', PASSWORD_DEFAULT),
            'name' => 'Satoris Admin',
            'role' => 'super_admin',
            'is_active' => 1,
            'is_primary' => 1,
            'created_at' => date('Y-m-d H:i:s')
        ]
    ];
    file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));
    return $users;
}

/**
 * Save users to JSON file
 */
function save_users($users) {
    $usersFile = __DIR__ . '/../users.json';
    file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));
}

/**
 * Find user by email
 */
function findUserByEmail($email, $users) {
    foreach ($users as $u) {
        if ($u['email'] === $email) return $u;
    }
    return null;
}

/**
 * Find user by ID
 */
function findUserById($id, $users) {
    foreach ($users as $u) {
        if ($u['id'] === $id) return $u;
    }
    return null;
}

/**
 * Log activity to activity.json
 */
function logActivity($action, $entityType = '', $entityId = null, $userId = null, $description = '') {
    $logFile = __DIR__ . '/activity.json';
    $log = file_exists($logFile) ? json_decode(file_get_contents($logFile), true) : [];
    $log[] = [
        'id' => count($log) + 1,
        'action' => $action,
        'entity_type' => $entityType,
        'entity_id' => $entityId,
        'user_id' => $userId,
        'description' => $description,
        'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
        'created_at' => date('Y-m-d H:i:s')
    ];
    // Keep only last 1000 entries
    if (count($log) > 1000) $log = array_slice($log, -1000);
    file_put_contents($logFile, json_encode($log, JSON_PRETTY_PRINT));
}

/**
 * Log page view to page_views.json
 */
function logPageView($pagePath) {
    $viewsFile = __DIR__ . '/page_views.json';
    $views = file_exists($viewsFile) ? json_decode(file_get_contents($viewsFile), true) : [];
    $views[] = [
        'id' => count($views) + 1,
        'page_path' => $pagePath,
        'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
        'created_at' => date('Y-m-d H:i:s')
    ];
    if (count($views) > 2000) $views = array_slice($views, -2000);
    file_put_contents($viewsFile, json_encode($views, JSON_PRETTY_PRINT));
}

/**
 * Sanitize input string
 */
function sanitize_input($value) {
    if (is_array($value)) {
        return array_map('sanitize_input', $value);
    }
    return htmlspecialchars(strip_tags(trim($value)), ENT_QUOTES, 'UTF-8');
}

/**
 * Load data from data.json
 */
function load_data() {
    $dataFile = __DIR__ . '/../data.json';
    if (file_exists($dataFile)) {
        return json_decode(file_get_contents($dataFile), true);
    }
    return [];
}

/**
 * Save data to data.json
 */
function save_data($data) {
    $dataFile = __DIR__ . '/../data.json';
    file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
}