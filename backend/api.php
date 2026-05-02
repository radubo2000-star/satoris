<?php
/**
 * Satoris API - Main Router
 * 
 * PHP Backend for cPanel hosting
 * Endpoint: /api/
 * 
 * Architecture:
 * - backend/api.php (this file) - Main entry point/router
 * - backend/includes/helpers.php - Shared helper functions
 * - backend/includes/auth.php - Authentication handlers
 * - backend/handlers/*.php - Feature handlers
 */

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    exit;
}

// Parse request info
$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];
$path = parse_url($requestUri, PHP_URL_PATH);
$path = str_replace('/api/', '', $path);
$path = trim($path ?? '', '/');

// Sanitize path - basic alphanumeric, hyphens, slashes only
if ($path) {
    $path = preg_replace('/[^a-zA-Z0-9\-_\/]/', '', $path);
    $path = strtolower($path);
}

// Load includes
require_once __DIR__ . '/includes/helpers.php';

// Load data
$data = load_data();

// Get input data
$input = json_decode(file_get_contents('php://input'), true) ?? [];
if (empty($input) && !empty($_POST)) {
    $input = $_POST;
}

// Get auth header
$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? '';

// Get current user
$currentUser = getCurrentUser($authHeader);

// Initialize response
$response = ['error' => 'Not found'];

// Try image handler first (serves images directly)
if (str_starts_with($path, 'images/')) {
    require_once __DIR__ . '/handlers/images.php';
    handle_images($path);
    exit;
}

// Route to appropriate handler using if-else for regex matching
// Root API info
if (empty($path)) {
    $response = ['api' => 'Satoris API', 'version' => '1.0', 'status' => 'running'];
}
// Auth routes
elseif ($path === 'auth/register' || $path === 'auth/register/' || 
      $path === 'auth/login' || $path === 'auth/login/' ||
      $path === 'auth/logout' || $path === 'auth/logout/' ||
      $path === 'auth/me' || $path === 'auth/me/' ||
      $path === 'auth/profile' || $path === 'auth/profile/') {
    require_once __DIR__ . '/includes/auth.php';
    $response = handle_auth($path, $method, $input, $currentUser);
}
// Blog by ID or publish (numeric ID)
elseif (preg_match('/^blog\/(\d+)$/', $path) || preg_match('/^blog\/(\d+)\/publish$/', $path)) {
    require_once __DIR__ . '/handlers/blog.php';
    $response = handle_blog($path, $method, $input, $data);
}
// Blog by slug (non-numeric - e.g., blog/t-rg-de-cr-ciun-dalles-2025)
elseif (preg_match('/^blog\/[^/]+$/', $path) && $path !== 'blog' && $path !== 'blog/') {
    require_once __DIR__ . '/handlers/blog.php';
    $response = handle_blog($path, $method, $input, $data);
}
// Blog list
elseif ($path === 'blog' || $path === 'blog/') {
    require_once __DIR__ . '/handlers/blog.php';
    $response = handle_blog($path, $method, $input, $data);
}
// Comments by ID
elseif (preg_match('/^comments\/(\d+)$/', $path)) {
    require_once __DIR__ . '/handlers/comments.php';
    $response = handle_comments($path, $method, $input, $data);
}
// Comments list
elseif ($path === 'comments' || $path === 'comments/') {
    require_once __DIR__ . '/handlers/comments.php';
    $response = handle_comments($path, $method, $input, $data);
}
// Tags
elseif ($path === 'tags' || $path === 'tags/') {
    require_once __DIR__ . '/handlers/tags.php';
    $response = handle_tags($path, $method, $input, $data);
}
// Projects by slug
elseif (str_starts_with($path, 'projects/') && strlen($path) > 9) {
    require_once __DIR__ . '/handlers/projects.php';
    $response = handle_projects($path, $method, $input, $data);
}
// Projects list
elseif ($path === 'projects' || $path === 'projects/') {
    require_once __DIR__ . '/handlers/projects.php';
    $response = handle_projects($path, $method, $input, $data);
}
// Services
elseif ($path === 'services' || $path === 'services/') {
    require_once __DIR__ . '/handlers/services.php';
    $response = handle_services($path, $method, $data);
}
// Contact
elseif ($path === 'contact' || $path === 'contact/') {
    require_once __DIR__ . '/handlers/contact.php';
    $response = handle_contact($path, $method, $input);
}
// Join team
elseif ($path === 'join-team' || $path === 'join-team/') {
    require_once __DIR__ . '/handlers/join-team.php';
    $response = handle_join_team($path, $method, $input);
}
// Newsletter
elseif ($path === 'newsletter' || $path === 'newsletter/') {
    require_once __DIR__ . '/handlers/newsletter.php';
    $response = handle_newsletter($path, $method, $input);
}
// Testimonials
elseif ($path === 'testimonials' || $path === 'testimonials/') {
    require_once __DIR__ . '/handlers/testimonials.php';
    $response = handle_testimonials($path, $method);
}
// Settings
elseif ($path === 'settings' || $path === 'settings/') {
    require_once __DIR__ . '/handlers/settings.php';
    $response = handle_settings($path, $method, $input);
}

// Send response
echo json_encode($response);