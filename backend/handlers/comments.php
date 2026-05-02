<?php
/**
 * Satoris API - Comments Handler
 * Handles blog comments
 */

// Load helpers
require_once __DIR__ . '/../includes/helpers.php';

/**
 * Handle comments route
 * @param string $path The route path
 * @param string $method The HTTP method
 * @param array $input The input data
 * @param array $data The data store
 * @return array|null Response array or null if not handled
 */
function handle_comments($path, $method, $input, $data) {
    // GET /api/comments - List comments
    if ($path === 'comments' || $path === 'comments/') {
        if ($method === 'GET') {
            return handle_comments_list($data, $_GET);
        } elseif ($method === 'POST') {
            return handle_comments_create($input, $data);
        }
    }
    
    // PUT/DELETE /api/comments/:id
    if (preg_match('/^comments\/(\d+)$/', $path, $m)) {
        $id = (int)$m[1];
        return handle_comments_update($id, $method, $data);
    }
    
    return null;
}

/**
 * Handle comments list
 */
function handle_comments_list($data, $get) {
    $comments = $data['comments'] ?? [];
    
    // Filter by post_id
    if (!empty($get['post_id'])) {
        $comments = array_values(array_filter($comments, fn($c) => $c['blog_post_id'] === (int)$get['post_id']));
    }
    
    // Filter by approved
    if (isset($get['approved'])) {
        $approved = $get['approved'] === 'true';
        $comments = array_values(array_filter($comments, fn($c) => $c['is_approved'] === $approved));
    }
    
    // Sort by created_at descending (newest first)
    usort($comments, fn($a, $b) => strcmp($b['created_at'] ?? '', $a['created_at'] ?? ''));
    
    return $comments;
}

/**
 * Handle comment creation
 */
function handle_comments_create($input, $data) {
    $blog_post_id = $input['blog_post_id'] ?? null;
    $author_name = sanitize_input($input['author_name'] ?? null);
    $author_email = filter_var($input['author_email'] ?? null, FILTER_SANITIZE_EMAIL);
    $content = sanitize_input($input['content'] ?? null);
    
    if (!$blog_post_id || !$author_name || !$author_email || !$content) {
        http_response_code(400);
        return ['error' => 'All fields are required'];
    }
    
    $newComment = [
        'id' => count($data['comments']) + 1,
        'blog_post_id' => (int)$blog_post_id,
        'author_name' => $author_name,
        'author_email' => $author_email,
        'content' => $content,
        'is_approved' => false,
        'created_at' => date('Y-m-d')
    ];
    
    $data['comments'][] = $newComment;
    save_data($data);
    
    http_response_code(201);
    return ['success' => true, 'message' => 'Comment submitted! It will be visible after approval.', 'comment' => $newComment];
}

/**
 * Handle comment update/delete
 */
function handle_comments_update($id, $method, $data) {
    $comments = $data['comments'] ?? [];
    
    foreach ($comments as $i => $c) {
        if ($c['id'] === $id) {
            if ($method === 'PUT') {
                $data['comments'][$i]['is_approved'] = !$c['is_approved'];
                save_data($data);
                return ['success' => true, 'is_approved' => $data['comments'][$i]['is_approved']];
            } elseif ($method === 'DELETE') {
                array_splice($data['comments'], $i, 1);
                save_data($data);
                return ['success' => true, 'message' => 'Comment deleted'];
            }
        }
    }
    
    http_response_code(404);
    return ['error' => 'Comment not found'];
}