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

// Route to appropriate handler
switch ($path) {
    // Root API info
    case '':
        $response = ['api' => 'Satoris API', 'version' => '1.0', 'status' => 'running'];
        break;
    
    // Auth routes
    case 'auth/register':
    case 'auth/register/':
    case 'auth/login':
    case 'auth/login/':
    case 'auth/logout':
    case 'auth/logout/':
    case 'auth/me':
    case 'auth/me/':
    case 'auth/profile':
    case 'auth/profile/':
        require_once __DIR__ . '/includes/auth.php';
        $response = handle_auth($path, $method, $input, $currentUser);
        break;
    
    // Blog routes
    case 'blog':
    case 'blog/':
        require_once __DIR__ . '/handlers/blog.php';
        $response = handle_blog($path, $method, $input, $data);
        break;
    
    // Blog by ID and publish
    case preg_match('/^blog\/(\d+)$/', $path) ? true : false:
    case preg_match('/^blog\/(\d+)\/publish$/', $path) ? true : false:
        require_once __DIR__ . '/handlers/blog.php';
        $response = handle_blog($path, $method, $input, $data);
        break;
    
    // Comments routes
    case 'comments':
    case 'comments/':
        require_once __DIR__ . '/handlers/comments.php';
        $response = handle_comments($path, $method, $input, $data);
        break;
    
    case preg_match('/^comments\/(\d+)$/', $path) ? true : false:
        require_once __DIR__ . '/handlers/comments.php';
        $response = handle_comments($path, $method, $input, $data);
        break;
    
    // Tags routes
    case 'tags':
    case 'tags/':
        require_once __DIR__ . '/handlers/tags.php';
        $response = handle_tags($path, $method, $input, $data);
        break;
    
    // Projects routes
    case 'projects':
    case 'projects/':
        require_once __DIR__ . '/handlers/projects.php';
        $response = handle_projects($path, $method, $input, $data);
        break;
    
    case str_starts_with($path, 'projects/') && strlen($path) > 9:
        require_once __DIR__ . '/handlers/projects.php';
        $response = handle_projects($path, $method, $input, $data);
        break;
    
    // Services routes
    case 'services':
    case 'services/':
        require_once __DIR__ . '/handlers/services.php';
        $response = handle_services($path, $method, $data);
        break;
    
    // Contact route
    case 'contact':
    case 'contact/':
        require_once __DIR__ . '/handlers/contact.php';
        $response = handle_contact($path, $method, $input);
        break;
    
    // Join team route
    case 'join-team':
    case 'join-team/':
        require_once __DIR__ . '/handlers/join-team.php';
        $response = handle_join_team($path, $method, $input);
        break;
    
    // Newsletter route
    case 'newsletter':
    case 'newsletter/':
        require_once __DIR__ . '/handlers/newsletter.php';
        $response = handle_newsletter($path, $method, $input);
        break;
    
    // Testimonials route
    case 'testimonials':
    case 'testimonials/':
        require_once __DIR__ . '/handlers/testimonials.php';
        $response = handle_testimonials($path, $method);
        break;
    
    // Settings route
    case 'settings':
    case 'settings/':
        require_once __DIR__ . '/handlers/settings.php';
        $response = handle_settings($path, $method, $input);
        break;
    
    default:
        // No route found - check if it's empty for root API
        if (empty($path)) {
            $response = ['api' => 'Satoris API', 'version' => '1.0', 'status' => 'running'];
        }
}

// Send response
echo json_encode($response);