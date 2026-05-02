<?php
/**
 * Satoris API - Projects Handler
 * Handles all project-related endpoints
 */

// Load helpers
require_once __DIR__ . '/../includes/helpers.php';

/**
 * Handle projects route
 * @param string $path The route path
 * @param string $method The HTTP method
 * @param array $input The input data
 * @param array $data The data store
 * @return array|null Response array or null if not handled
 */
function handle_projects($path, $method, $input, $data) {
    // GET /api/projects - List all projects
    if ($path === 'projects' || $path === 'projects/') {
        if ($method === 'GET') {
            return handle_projects_list($data, $_GET);
        } elseif ($method === 'POST') {
            return handle_projects_create($input, $data);
        } elseif ($method === 'PUT') {
            return handle_projects_update($input, $data);
        }
    }
    
    // GET /api/projects/:slug - Get single project
    if (str_starts_with($path, 'projects/') && strlen($path) > 9) {
        $idSlug = substr($path, 9);
        return handle_projects_get($idSlug, $method, $data);
    }
    
    return null;
}

/**
 * Handle projects list
 */
function handle_projects_list($data, $get) {
    $projects = $data['projects'] ?? [];
    
    // Return by slug
    $slug = $get['slug'] ?? null;
    if ($slug) {
        $project = array_values(array_filter($projects, fn($p) => $p['slug'] === $slug));
        return $project ? $project[0] : ['error' => 'Project not found'];
    }
    
    // Filter by active
    $activeOnly = isset($get['active']) && $get['active'] === 'true';
    $projectsToReturn = $activeOnly 
        ? array_values(array_filter($projects, fn($p) => $p['is_active']))
        : $projects;
    
    // Re-read from file to get persisted changes
    $dataFile = __DIR__ . '/data.json';
    if (file_exists($dataFile)) {
        $data = json_decode(file_get_contents($dataFile), true);
        $projects = $data['projects'] ?? $projects;
    }
    
    // Sort by created_at descending (newest first)
    usort($projectsToReturn, fn($a, $b) => strcmp($b['created_at'] ?? '', $a['created_at'] ?? ''));
    
    return $projectsToReturn;
}

/**
 * Handle project creation
 */
function handle_projects_create($input, $data) {
    $projects = $data['projects'] ?? [];
    
    $newProject = [
        'id' => count($projects) + 1,
        'name' => $input['name'] ?? '',
        'slug' => $input['slug'] ?? '',
        'category' => $input['category'] ?? '',
        'description' => $input['description'] ?? '',
        'image' => $input['image'] ?? '',
        'is_featured' => $input['is_featured'] ?? false,
        'is_active' => $input['is_active'] ?? true,
        'created_at' => date('Y-m-d'),
        'client' => $input['client'] ?? '',
        'services' => $input['services'] ?? '',
        'year' => $input['year'] ?? '',
        'content' => $input['content'] ?? ''
    ];
    
    $projects[] = $newProject;
    $data['projects'] = $projects;
    save_data($data);
    
    http_response_code(201);
    
    // Log activity
    logActivity('project_created', 'project', $newProject['id'], null, 'New project created');
    
    return $newProject;
}

/**
 * Handle project update
 */
function handle_projects_update($input, $data) {
    $projects = $data['projects'] ?? [];
    $id = (int)$input['id'];
    
    // Convert booleans - accept both strings and actual booleans
    if (isset($input['is_active'])) {
        $input['is_active'] = in_array($input['is_active'], ['true', '1', 'on', true], true);
    }
    if (isset($input['is_featured'])) {
        $input['is_featured'] = in_array($input['is_featured'], ['true', '1', 'on', true], true);
    }
    
    foreach ($projects as $i => $p) {
        if ($p['id'] === $id) {
            // Update fields one by one instead of array_merge
            foreach ($input as $key => $value) {
                $projects[$i][$key] = $value;
            }
            $data['projects'] = $projects;
            save_data($data);
            
            // Log activity
            logActivity('project_updated', 'project', $id, null, 'Project updated');
            
            return $projects[$i];
        }
    }
    
    http_response_code(404);
    return ['error' => 'Project not found'];
}

/**
 * Handle project by ID or slug
 */
function handle_projects_get($idSlug, $method, $data) {
    $projects = $data['projects'] ?? [];
    
    // Try to find by ID or slug
    $project = null;
    $isId = is_numeric($idSlug);
    
    foreach ($projects as $p) {
        if ($isId && $p['id'] === (int)$idSlug) {
            $project = $p;
            break;
        } elseif (!$isId && $p['slug'] === $idSlug) {
            $project = $p;
            break;
        }
    }
    
    if (!$project) {
        http_response_code(404);
        return ['error' => 'Project not found'];
    }
    
    if ($method === 'PUT') {
        return handle_projects_update(['id' => $project['id']] + $_PUT, $data);
    } elseif ($method === 'DELETE') {
        return handle_projects_delete($project['id'], $data);
    }
    
    return $project;
}

/**
 * Handle project deletion
 */
function handle_projects_delete($id, $data) {
    $projects = $data['projects'] ?? [];
    
    foreach ($projects as $i => $p) {
        if ($p['id'] === $id) {
            array_splice($projects, $i, 1);
            $data['projects'] = $projects;
            save_data($data);
            
            // Log activity
            logActivity('project_deleted', 'project', $id, null, 'Project deleted');
            
            return ['success' => true, 'message' => 'Project deleted'];
        }
    }
    
    http_response_code(404);
    return ['error' => 'Project not found'];
}