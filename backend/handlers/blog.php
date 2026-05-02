<?php
/**
 * Satoris API - Blog Handler
 * Handles all blog-related endpoints
 */

// Load helpers
require_once __DIR__ . '/../includes/helpers.php';

/**
 * Handle blog route
 * @param string $path The route path
 * @param string $method The HTTP method
 * @param array $input The input data
 * @param array $data The data store
 * @return array|null Response array or null if not handled
 */
function handle_blog($path, $method, $input, $data) {
    $response = null;
    
    // GET /api/blog - List all posts
    if ($path === 'blog' || $path === 'blog/') {
        if ($method === 'GET') {
            return handle_blog_list($data, $_GET);
        } elseif ($method === 'POST') {
            return handle_blog_create($input, $data);
        }
    }
    
    // GET /api/blog/:id - Get single post by ID
    if (preg_match('/^blog\/(\d+)$/', $path, $m)) {
        $id = (int)$m[1];
        return handle_blog_id($id, $method, $input, $data);
    }
    
    // POST /api/blog/:id/publish - Toggle publish status
    if (preg_match('/^blog\/(\d+)\/publish$/', $path, $m)) {
        $id = (int)$m[1];
        return handle_blog_publish($id, $data);
    }
    
    return null;
}

/**
 * Handle blog list (GET /api/blog)
 */
function handle_blog_list($data, $get) {
    // Return all posts by default (for admin). With ?published=true return only published (for site)
    $publishedOnly = isset($get['published']) && $get['published'] === 'true';
    $posts = $publishedOnly 
        ? array_values(array_filter($data['blogPosts'], fn($p) => $p['is_published']))
        : $data['blogPosts'];
    
    // Search
    if (!empty($get['search'])) {
        $search = strtolower($get['search']);
        $posts = array_values(array_filter($posts, fn($p) => 
            str_contains(strtolower($p['title']), $search) || 
            str_contains(strtolower($p['content'] ?? ''), $search)
        ));
    }
    
    // Category filter
    if (!empty($get['category'])) {
        $posts = array_values(array_filter($posts, fn($p) => $p['category'] === $get['category']));
    }
    
    // Tag filter
    if (!empty($get['tag'])) {
        $posts = array_values(array_filter($posts, fn($p) => in_array($get['tag'], $p['tags'] ?? [])));
    }
    
    // Pagination
    $page = (int)($get['page'] ?? 1);
    $limit = (int)($get['limit'] ?? 10);
    $total = count($posts);
    $posts = array_slice($posts, ($page - 1) * $limit, $limit);
    
    return [
        'posts' => $posts,
        'total' => $total,
        'page' => $page,
        'totalPages' => ceil($total / $limit)
    ];
}

/**
 * Handle blog create (POST /api/blog)
 */
function handle_blog_create($input, $data) {
    $title = $input['title'] ?? null;
    $slug = $input['slug'] ?? null;
    
    if (!$title || !$slug) {
        http_response_code(400);
        return ['error' => 'Title and slug are required'];
    }
    
    $newPost = [
        'id' => count($data['blogPosts']) + 1,
        'title' => $title,
        'slug' => $slug,
        'excerpt' => $input['excerpt'] ?? '',
        'content' => $input['content'] ?? '',
        'category' => $input['category'] ?? 'Uncategorized',
        'author' => $input['author'] ?? 'Satoris Team',
        'image' => $input['image'] ?? '',
        'is_published' => $input['is_published'] ?? false,
        'tags' => $input['tags'] ?? [],
        'created_at' => date('Y-m-d')
    ];
    
    $data['blogPosts'][] = $newPost;
    save_data($data);
    
    http_response_code(201);
    return $newPost;
}

/**
 * Handle blog by ID (GET/PUT/DELETE /api/blog/:id)
 */
function handle_blog_id($id, $method, $input, $data) {
    $idx = null;
    $id = (int)$id;
    foreach ($data['blogPosts'] as $i => $p) {
        if ((int)$p['id'] === $id) {
            $idx = $i;
            break;
        }
    }
    
    if ($idx === null) {
        http_response_code(404);
        return ['error' => 'Post not found'];
    }
    
    if ($method === 'PUT') {
        // Keep all input fields, do not use array_filter which removes false values
        $data['blogPosts'][$idx] = array_merge($data['blogPosts'][$idx], $input);
        save_data($data);
        return $data['blogPosts'][$idx];
    } elseif ($method === 'DELETE') {
        array_splice($data['blogPosts'], $idx, 1);
        // Also delete related comments
        $data['comments'] = array_values(array_filter($data['comments'], fn($c) => $c['blog_post_id'] !== $id));
        save_data($data);
        return ['success' => true, 'message' => 'Post deleted'];
    }
    
    return $data['blogPosts'][$idx];
}

/**
 * Handle blog publish toggle (POST /api/blog/:id/publish)
 */
function handle_blog_publish($id, $data) {
    $id = (int)$id;
    foreach ($data['blogPosts'] as $i => $p) {
        if ((int)$p['id'] === $id) {
            $data['blogPosts'][$i]['is_published'] = !$p['is_published'];
            save_data($data);
            return ['success' => true, 'is_published' => $data['blogPosts'][$i]['is_published']];
        }
    }
    
    http_response_code(404);
    return ['error' => 'Post not found'];
}