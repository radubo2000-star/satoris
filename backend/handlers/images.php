<?php
/**
 * Satoris API - Image Handler
 * Serves images from the backend/images directory
 */

// Load helpers
require_once __DIR__ . '/../includes/helpers.php';

/**
 * Handle image serving request
 * @param string $path The image path (e.g., 'images/filename.jpg')
 */
function handle_images($path) {
    if (!str_starts_with($path, 'images/')) {
        return false;
    }
    
    $baseDir = realpath(__DIR__ . '/../images');
    $requested = realpath(__DIR__ . '/../' . $path);
    
    // Security: Ensure the requested path is within the images directory
    if (!$requested || !$baseDir || !str_starts_with($requested, $baseDir) || !is_file($requested)) {
        http_response_code(404);
        return false;
    }
    
    $ext = strtolower(pathinfo($requested, PATHINFO_EXTENSION));
    
    $mimeTypes = [
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'png' => 'image/png',
        'gif' => 'image/gif',
        'webp' => 'image/webp'
    ];
    
    if (!isset($mimeTypes[$ext])) {
        http_response_code(403);
        return false;
    }
    
    header('Content-Type: ' . $mimeTypes[$ext]);
    header('Cache-Control: public, max-age=31536000');
    
    readfile($requested);
    return true;
}