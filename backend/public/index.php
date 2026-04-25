<?php
/**
 * Satoris API - Entry Point
 * Port 12001
 */

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Simple router
$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Parse URL
$parsedUrl = parse_url($requestUri);
$path = $parsedUrl['path'] ?? '/';

// Remove leading/trailing slashes
$path = trim($path, '/');

// Route to API
if (strpos($path, 'api/') === 0) {
    require_once __DIR__ . '/src/Routes/api.php';
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Not found']);
}