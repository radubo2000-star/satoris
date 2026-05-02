<?php
/**
 * Satoris API - Settings Handler
 * Handles site settings
 */

// Load helpers
require_once __DIR__ . '/../includes/helpers.php';

/**
 * Handle settings route
 * @param string $path The route path
 * @param string $method The HTTP method
 * @param array $input The input data
 * @return array|null Response array or null if not handled
 */
function handle_settings($path, $method, $input) {
    // GET or POST /api/settings
    if ($path === 'settings' || $path === 'settings/') {
        if ($method === 'POST') {
            return handle_settings_save($input);
        } elseif ($method === 'GET') {
            return handle_settings_get();
        }
    }
    
    return null;
}

/**
 * Get settings
 */
function handle_settings_get() {
    return get_settings();
}

/**
 * Save settings
 */
function handle_settings_save($input) {
    $input_data = json_decode(file_get_contents('php://input'), true);
    
    if ($input_data) {
        // Save settings to file
        $settingsFile = __DIR__ . '/settings.json';
        file_put_contents($settingsFile, json_encode($input_data, JSON_PRETTY_PRINT));
        
        // Log activity
        logActivity('settings_updated', 'settings', null, null, 'Site settings updated');
        
        return ['success' => true, 'settings' => get_settings()];
    }
    
    http_response_code(400);
    return ['error' => 'Invalid data'];
}