<?php
/**
 * Satoris API - Services Handler
 * Handles services listing endpoints
 */

// Load helpers
require_once __DIR__ . '/../includes/helpers.php';

/**
 * Handle services route
 * @param string $path The route path
 * @param string $method The HTTP method
 * @param array $data The data store
 * @return array|null Response array or null if not handled
 */
function handle_services($path, $method, $data) {
    $response = null;
    
    // GET /api/services - List all services
    if ($path === 'services' || $path === 'services/') {
        if ($method === 'GET') {
            return handle_services_list($data);
        }
    }
    
    return null;
}

/**
 * Handle services list
 */
function handle_services_list($data) {
    // Extract unique services from projects
    $projects = $data['projects'] ?? [];
    $servicesList = [];
    
    foreach ($projects as $project) {
        if (!empty($project['services'])) {
            $services = explode("\n", $project['services']);
            foreach ($services as $service) {
                $service = trim($service);
                if ($service && !in_array($service, $servicesList)) {
                    $servicesList[] = $service;
                }
            }
        }
    }
    
    sort($servicesList);
    
    return [
        'services' => $servicesList,
        'count' => count($servicesList)
    ];
}