<?php
/**
 * Satoris API - Auth Handler
 * Handles all authentication-related endpoints
 */

// Load helpers
require_once __DIR__ . '/../includes/helpers.php';

/**
 * Handle auth route
 * @param string $path The route path
 * @param string $method The HTTP method
 * @param array $input The input data
 * @param array $currentUser The authenticated user (if any)
 * @return array|null Response array or null if not handled
 */
function handle_auth($path, $method, $input, $currentUser) {
    // POST /api/auth/register
    if ($path === 'auth/register' || $path === 'auth/register/') {
        if ($method === 'POST') {
            return handle_auth_register($input);
        }
    }
    
    // POST /api/auth/login
    if ($path === 'auth/login' || $path === 'auth/login/') {
        if ($method === 'POST') {
            return handle_auth_login($input);
        }
    }
    
    // POST /api/auth/logout
    if ($path === 'auth/logout' || $path === 'auth/logout/') {
        if ($method === 'POST') {
            return handle_auth_logout($currentUser);
        }
    }
    
    // GET /api/auth/me
    if ($path === 'auth/me' || $path === 'auth/me/') {
        if ($method === 'GET') {
            return handle_auth_me($currentUser);
        }
    }
    
    // PUT /api/auth/profile
    if ($path === 'auth/profile' || $path === 'auth/profile/') {
        if ($method === 'PUT') {
            return handle_auth_profile($input, $currentUser);
        }
    }
    
    return null;
}

/**
 * Handle user registration
 */
function handle_auth_register($input) {
    $users = load_users();
    
    $email = $input['email'] ?? null;
    $password = $input['password'] ?? null;
    $name = $input['name'] ?? '';
    
    if (!$email || !$password) {
        http_response_code(400);
        return ['error' => 'Email and password are required'];
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        return ['error' => 'Invalid email format'];
    }
    
    // Check if user already exists
    if (findUserByEmail($email, $users)) {
        http_response_code(400);
        return ['error' => 'Email already registered'];
    }
    
    // Check if registration is enabled
    if (!get_config('enable_registration', true)) {
        http_response_code(403);
        return ['error' => 'Registration is disabled'];
    }
    
    // Create new user
    $newUser = [
        'id' => count($users) + 1,
        'email' => $email,
        'password_hash' => password_hash($password, PASSWORD_DEFAULT),
        'name' => $name,
        'role' => 'user',
        'is_active' => 1,
        'is_primary' => 0,
        'created_at' => date('Y-m-d H:i:s')
    ];
    
    $users[] = $newUser;
    save_users($users);
    
    // Log activity
    logActivity('user_registered', 'user', $newUser['id'], $newUser['id'], 'New user registered');
    
    // Generate JWT
    $token = generateJWT($newUser);
    
    return [
        'success' => true,
        'token' => $token,
        'user' => [
            'id' => $newUser['id'],
            'email' => $newUser['email'],
            'name' => $newUser['name'],
            'role' => $newUser['role']
        ]
    ];
}

/**
 * Handle user login
 */
function handle_auth_login($input) {
    $users = load_users();
    
    $email = $input['email'] ?? null;
    $password = $input['password'] ?? null;
    
    if (!$email || !$password) {
        http_response_code(400);
        return ['error' => 'Email and password are required'];
    }
    
    // Find user by email
    $user = findUserByEmail($email, $users);
    
    if (!$user || !password_verify($password, $user['password_hash'])) {
        http_response_code(401);
        return ['error' => 'Invalid email or password'];
    }
    
    if (!isset($user['is_active']) || !$user['is_active']) {
        http_response_code(403);
        return ['error' => 'Account is disabled'];
    }
    
    // Log activity
    logActivity('user_login', 'user', $user['id'], $user['id'], 'User logged in');
    
    // Generate JWT
    $token = generateJWT($user);
    
    return [
        'success' => true,
        'token' => $token,
        'user' => [
            'id' => $user['id'],
            'email' => $user['email'],
            'name' => $user['name'],
            'role' => $user['role']
        ]
    ];
}

/**
 * Handle user logout
 */
function handle_auth_logout($currentUser) {
    if (!$currentUser) {
        http_response_code(401);
        return ['error' => 'Not authenticated'];
    }
    
    // Log activity
    logActivity('user_logout', 'user', $currentUser['sub'], $currentUser['sub'], 'User logged out');
    
    return ['success' => true, 'message' => 'Logged out successfully'];
}

/**
 * Get current user info
 */
function handle_auth_me($currentUser) {
    if (!$currentUser) {
        http_response_code(401);
        return ['error' => 'Not authenticated'];
    }
    
    return [
        'id' => $currentUser['sub'],
        'email' => $currentUser['email'],
        'name' => $currentUser['name'],
        'role' => $currentUser['role']
    ];
}

/**
 * Update user profile
 */
function handle_auth_profile($input, $currentUser) {
    if (!$currentUser) {
        http_response_code(401);
        return ['error' => 'Not authenticated'];
    }
    
    $users = load_users();
    $userId = $currentUser['sub'];
    
    // Find and update user
    foreach ($users as $i => $u) {
        if ($u['id'] === $userId) {
            if (isset($input['name']) && $input['name']) {
                $users[$i]['name'] = $input['name'];
            }
            if (isset($input['password']) && $input['password']) {
                $users[$i]['password_hash'] = password_hash($input['password'], PASSWORD_DEFAULT);
            }
            
            save_users($users);
            
            // Log activity
            logActivity('profile_updated', 'user', $userId, $userId, 'Profile updated');
            
            return [
                'success' => true,
                'user' => [
                    'id' => $users[$i]['id'],
                    'email' => $users[$i]['email'],
                    'name' => $users[$i]['name'],
                    'role' => $users[$i]['role']
                ]
            ];
        }
    }
    
    http_response_code(404);
    return ['error' => 'User not found'];
}