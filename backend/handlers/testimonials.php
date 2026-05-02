<?php
/**
 * Satoris API - Testimonials Handler
 * Handles testimonials display
 */

// Load helpers
require_once __DIR__ . '/../includes/helpers.php';

/**
 * Handle testimonials route
 * @param string $path The route path
 * @param string $method The HTTP method
 * @return array|null Response array or null if not handled
 */
function handle_testimonials($path, $method) {
    // GET /api/testimonials
    if ($path === 'testimonials' || $path === 'testimonials/') {
        if ($method === 'GET') {
            return handle_testimonials_list();
        }
    }
    
    return null;
}

/**
 * Get testimonials list
 */
function handle_testimonials_list() {
    $testimonials = [
        ['id' => 1, 'text' => 'Natalia is reliable, results oriented, a good professional, always oriented towards achieving the established goal.', 'author' => 'Cristina G.', 'role' => 'Program Manager at Digital Transformations'],
        ['id' => 2, 'text' => 'Very good service and helpful person. Natalia handled all issues very professional.', 'author' => 'Olimpiu G', 'role' => 'CEO in Beauty Industry'],
        ['id' => 3, 'text' => 'Accurate organization and outstanding support to the exhibitors and to all the attendees.', 'author' => 'Mihaela P', 'role' => 'Project Manager'],
    ];
    
    return $testimonials;
}