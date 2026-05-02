<?php
/**
 * Satoris API - Newsletter Handler
 * Handles newsletter subscriptions
 */

// Load helpers
require_once __DIR__ . '/../includes/helpers.php';

/**
 * Handle newsletter route
 * @param string $path The route path
 * @param string $method The HTTP method
 * @param array $input The input data
 * @return array|null Response array or null if not handled
 */
function handle_newsletter($path, $method, $input) {
    // POST /api/newsletter
    if ($path === 'newsletter' || $path === 'newsletter/') {
        if ($method === 'POST') {
            return handle_newsletter_subscribe($input);
        }
    }
    
    return null;
}

/**
 * Handle newsletter subscription
 */
function handle_newsletter_subscribe($input) {
    $email = filter_var($input['email'] ?? null, FILTER_SANITIZE_EMAIL);
    
    if (!$email) {
        http_response_code(400);
        return ['error' => 'Email is required'];
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        return ['error' => 'Invalid email format'];
    }
    
    // Save to subscribers file
    $subscribersFile = __DIR__ . '/newsletter_subscribers.json';
    $subscribers = file_exists($subscribersFile) ? json_decode(file_get_contents($subscribersFile), true) : [];
    
    // Check if already subscribed
    foreach ($subscribers as $subscriber) {
        if ($subscriber['email'] === $email) {
            return ['success' => true, 'message' => 'Already subscribed!'];
        }
    }
    
    $subscribers[] = [
        'id' => count($subscribers) + 1,
        'email' => $email,
        'subscribed_at' => date('Y-m-d H:i:s'),
        'ip_address' => $_SERVER['REMOTE_ADDR'] ?? ''
    ];
    
    file_put_contents($subscribersFile, json_encode($subscribers, JSON_PRETTY_PRINT));
    
    // Log activity
    logActivity('newsletter_subscribed', 'newsletter', null, null, 'New newsletter subscriber');
    
    return ['success' => true, 'message' => 'Thank you for subscribing!'];
}