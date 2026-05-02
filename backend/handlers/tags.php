<?php
/**
 * Satoris API - Tags Handler
 * Handles blog tags
 */

// Load helpers
require_once __DIR__ . '/../includes/helpers.php';

/**
 * Handle tags route
 * @param string $path The route path
 * @param string $method The HTTP method
 * @param array $input The input data
 * @param array $data The data store
 * @return array|null Response array or null if not handled
 */
function handle_tags($path, $method, $input, $data) {
    // GET /api/tags - List tags
    if ($path === 'tags' || $path === 'tags/') {
        if ($method === 'GET') {
            return handle_tags_list($data);
        } elseif ($method === 'POST') {
            return handle_tags_create($input, $data);
        }
    }
    
    return null;
}

/**
 * Handle tags list
 */
function handle_tags_list($data) {
    return $data['tags'] ?? [];
}

/**
 * Handle tag creation
 */
function handle_tags_create($input, $data) {
    $name = sanitize_input($input['name'] ?? null);
    
    if (!$name) {
        http_response_code(400);
        return ['error' => 'Tag name is required'];
    }
    
    $slug = strtolower(preg_replace('/\s+/', '-', $name));
    $newTag = [
        'id' => count($data['tags']) + 1,
        'name' => $name,
        'slug' => $slug
    ];
    
    $data['tags'][] = $newTag;
    save_data($data);
    
    http_response_code(201);
    return $newTag;
}