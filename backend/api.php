<?php
/**
 * Satoris API - PHP Backend for cPanel
 * Endpoint: /api/
 */

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Get request info
$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];
$path = parse_url($requestUri, PHP_URL_PATH);
$path = str_replace('/api/', '', $path);
$path = trim($path, '/');

// ULTRA CLEAN - extract only alphanumeric and slashes
$path = preg_replace('/[^a-zA-Z0-9\/_-]/', '', $path);
$path = strtolower($path);

// Get input data
$input = json_decode(file_get_contents('php://input'), true) ?? [];
if (empty($input) && !empty($_POST)) {
    $input = $_POST;
}

// Debug: log actual path
$debugFile = __DIR__ . '/debug.log';
$debug = date('c') . " | $method | $requestUri | $path | " . json_encode($input) . "\n";
@file_put_contents($debugFile, $debug, FILE_APPEND);

// Get headers
$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? '';

// JWT helper functions (simple implementation)
function generateJWT($user) {
    $header = base64_encode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
    $payload = base64_encode(json_encode([
        'sub' => $user['id'],
        'email' => $user['email'],
        'role' => $user['role'],
        'name' => $user['name'],
        'exp' => time() + 86400 // 24 hours
    ]));
    $signature = base64_encode(hash_hmac('sha256', "$header.$payload", 'satoris_secret_key_2024', true));
    return "$header.$payload.$signature";
}

function verifyJWT($token) {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;
    $signature = base64_encode(hash_hmac('sha256', "{$parts[0]}.{$parts[1]}", 'satoris_secret_key_2024', true));
    if ($signature !== $parts[2]) return null;
    $payload = json_decode(base64_decode($parts[1]), true);
    if ($payload['exp'] < time()) return null;
    return $payload;
}

function getCurrentUser($authHeader) {
    if (!str_starts_with($authHeader, 'Bearer ')) return null;
    $token = substr($authHeader, 7);
    return verifyJWT($token);
}

// Users file storage
$usersFile = __DIR__ . '/users.json';
if (file_exists($usersFile)) {
    $users = json_decode(file_get_contents($usersFile), true);
} else {
    // Default admin user (password: admin123)
    $users = [
        [
            'id' => 1,
            'email' => 'admin@satoris.ro',
            'password_hash' => password_hash('admin123', PASSWORD_DEFAULT),
            'name' => 'Admin Satoris',
            'role' => 'admin',
            'is_active' => 1,
            'created_at' => date('Y-m-d H:i:s')
        ]
    ];
    file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));
}

function saveUsers($users) {
    global $usersFile;
    file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));
}

function findUserByEmail($email) {
    global $users;
    foreach ($users as $u) {
        if ($u['email'] === $email) return $u;
    }
    return null;
}

function findUserById($id) {
    global $users;
    foreach ($users as $u) {
        if ($u['id'] === $id) return $u;
    }
    return null;
}

function logActivity($action, $entityType = '', $entityId = null, $userId = null, $description = '') {
    $logFile = __DIR__ . '/activity.json';
    $log = file_exists($logFile) ? json_decode(file_get_contents($logFile), true) : [];
    $log[] = [
        'id' => count($log) + 1,
        'action' => $action,
        'entity_type' => $entityType,
        'entity_id' => $entityId,
        'user_id' => $userId,
        'description' => $description,
        'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
        'created_at' => date('Y-m-d H:i:s')
    ];
    // Keep only last 1000 entries
    if (count($log) > 1000) $log = array_slice($log, -1000);
    file_put_contents($logFile, json_encode($log, JSON_PRETTY_PRINT));
}

function logPageView($pagePath) {
    $viewsFile = __DIR__ . '/page_views.json';
    $views = file_exists($viewsFile) ? json_decode(file_get_contents($viewsFile), true) : [];
    $views[] = [
        'id' => count($views) + 1,
        'page_path' => $pagePath,
        'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
        'created_at' => date('Y-m-d H:i:s')
    ];
    if (count($views) > 2000) $views = array_slice($views, -2000);
    file_put_contents($viewsFile, json_encode($views, JSON_PRETTY_PRINT));
}

// Current user from token
$currentUser = getCurrentUser($authHeader);

// In-memory data stores (saved to JSON file)
$dataFile = __DIR__ . '/data.json';
if (file_exists($dataFile)) {
    $data = json_decode(file_get_contents($dataFile), true);
} else {
    $data = [
        'blogPosts' => [
            ['id' => 1, 'title' => 'Târg de Crăciun Dalles 2025', 'slug' => 'targ-de-craciun-dalles-2025', 'excerpt' => 'Event Concept, Event Management & Implementation for the Christmas market.', 'content' => '<p>We are thrilled to share the success of the Christmas market at Dalles Hall in 2025.</p>', 'category' => 'Events', 'author' => 'Satoris Team', 'image' => 'https://satoris.ro/wp-content/uploads/2023/09/Targ-de-craciun-Dalles-2025-site-satoris--260x300.png', 'is_published' => true, 'created_at' => '2025-12-01', 'tags' => ['events', 'case-study']],
            ['id' => 2, 'title' => 'Exhibition Success Blueprint', 'slug' => 'exhibition-success-blueprint', 'excerpt' => 'Event Management, Expo Strategy, Print Design.', 'content' => '<p>Attending or exhibiting at trade shows can be a game-changer.</p>', 'category' => 'Strategy', 'author' => 'Natalia Pruteanu', 'image' => 'https://library.elementor.com/digital-marketing-studio/wp-content/uploads/sites/179/2022/03/Post_Softy_Img_1.jpg', 'is_published' => true, 'created_at' => '2025-10-15', 'tags' => ['strategy', 'marketing']],
            ['id' => 3, 'title' => 'Omi Brand Digital Strategy', 'slug' => 'omi-digital-strategy', 'excerpt' => 'Digital Audit, Market Research, User Experience for Omi brand.', 'content' => '<p>Working with Omi allowed us to completely transform their digital presence.</p>', 'category' => 'Digital', 'author' => 'Satoris Team', 'image' => 'https://satoris.ro/wp-content/uploads/2022/01/Post_Omi_Img_Featured-260x300.jpg', 'is_published' => true, 'created_at' => '2022-01-10', 'tags' => ['digital', 'strategy']],
            ['id' => 4, 'title' => 'Holandria Branding Journey', 'slug' => 'holandria-branding', 'excerpt' => 'Packaging, Branding, Email Marketing for Holandria.', 'content' => '<p>Holandria approached us for a complete brand refresh.</p>', 'category' => 'Branding', 'author' => 'Satoris Team', 'image' => 'https://satoris.ro/wp-content/uploads/2022/01/Post_Holandria_Img_Featured-260x300.jpg', 'is_published' => true, 'created_at' => '2022-01-05', 'tags' => ['branding', 'case-study']],
        ],
        'comments' => [
            ['id' => 1, 'blog_post_id' => 1, 'author_name' => 'Maria Popescu', 'author_email' => 'maria@example.com', 'content' => 'Excelent eveniment!', 'is_approved' => true, 'created_at' => '2025-12-05'],
            ['id' => 2, 'blog_post_id' => 1, 'author_name' => 'Ion Georgescu', 'author_email' => 'ion@example.com', 'content' => 'Când va fi următorul târg?', 'is_approved' => true, 'created_at' => '2025-12-06'],
            ['id' => 3, 'blog_post_id' => 2, 'author_name' => 'Elena Dumitrescu', 'author_email' => 'elena@example.com', 'content' => 'Sfaturile sunt foarte utile!', 'is_approved' => true, 'created_at' => '2025-10-20'],
            ['id' => 4, 'blog_post_id' => 3, 'author_name' => 'Andrei Marin', 'author_email' => 'andrei@example.com', 'content' => 'Impresionant!', 'is_approved' => false, 'created_at' => '2022-01-15'],
        ],
        'tags' => [
            ['id' => 1, 'name' => 'Events', 'slug' => 'events'],
            ['id' => 2, 'name' => 'Strategy', 'slug' => 'strategy'],
            ['id' => 3, 'name' => 'Digital', 'slug' => 'digital'],
            ['id' => 4, 'name' => 'Branding', 'slug' => 'branding'],
            ['id' => 5, 'name' => 'Marketing', 'slug' => 'marketing'],
            ['id' => 6, 'name' => 'Trends', 'slug' => 'trends'],
            ['id' => 7, 'name' => 'Case Study', 'slug' => 'case-study'],
        ],
    ];
}

// Services data
$services = [
    ['id' => 1, 'icon' => '📢', 'title' => 'PR & Communication', 'description' => 'Social Media, Media Relations, Events PR, KOLs, Post-event coverage.'],
    ['id' => 2, 'icon' => '🎪', 'title' => 'Exhibitions & Trade Fairs', 'description' => 'From 9 sqm booths to full pavilions.'],
    ['id' => 3, 'icon' => '💻', 'title' => 'Digital', 'description' => 'Websites, Landing pages, Email campaigns, Live streaming.'],
    ['id' => 4, 'icon' => '🎨', 'title' => 'Concept & Creative', 'description' => 'Events Concept, Visual Content, Themes, formats.'],
    ['id' => 5, 'icon' => '🏢', 'title' => 'Full Service', 'description' => 'AV - Staging, Staffing, Catering.'],
    ['id' => 6, 'icon' => '📈', 'title' => 'Marketing', 'description' => 'Digital Marketing, Ads, Sales Funnel, E-commerce.'],
    ['id' => 7, 'icon' => '⚡', 'title' => 'Implementation & On-Site', 'description' => 'Your agenda, our playbook, no surprises.'],
    ['id' => 8, 'icon' => '🌍', 'title' => 'Go Big', 'description' => 'International events, Global Events.'],
];

$projects = [
    ['id' => 1, 'name' => 'marie', 'slug' => 'marie', 'category' => 'Branding', 'description' => 'Event Concept, Event Management & Implementation', 'image' => 'https://satoris.ro/wp-content/uploads/2023/09/Targ-de-craciun-Dalles-2025-site-satoris--260x300.png'],
    ['id' => 2, 'name' => 'softy', 'slug' => 'softy', 'category' => 'Digital', 'description' => 'Digital Audit, Market Research', 'image' => 'https://library.elementor.com/digital-marketing-studio/wp-content/uploads/sites/179/2022/03/Post_Softy_Img_1.jpg'],
    ['id' => 3, 'name' => 'cela', 'slug' => 'cela', 'category' => 'Branding', 'description' => 'Packaging, Branding, Email Marketing', 'image' => 'https://library.elementor.com/digital-marketing-studio/wp-content/uploads/sites/179/2022/03/Post_Cela_Img_1.jpg'],
    ['id' => 4, 'name' => 'omi', 'slug' => 'omi', 'category' => 'Digital', 'description' => 'Digital Audit, Market Research', 'image' => 'https://satoris.ro/wp-content/uploads/2022/01/Post_Omi_Img_Featured-260x300.jpg'],
];

// Helper function to save data
function saveData($data) {
    global $dataFile;
    file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
}

// Router
$response = ['error' => 'Endpoint not found', 'debug' => $path];

// Normalize path to lowercase for case-insensitive matching
$path = strtolower($path);

switch ($path) {
    // HEALTH
    case 'health':
        $response = ['status' => 'ok', 'timestamp' => date('c')];
        break;

    // AUTH: REGISTER
    case 'auth/register':
        // Support both POST and GET for testing
        if ($method === 'POST' || $method === 'GET') {
            if ($method === 'GET') {
                $response = ['message' => 'Use POST to register', 'example' => ['email'=>'test@test.ro','password'=>'123456','name'=>'Test']];
                break;
            }
            $email = $input['email'] ?? null;
            $password = $input['password'] ?? null;
            $name = $input['name'] ?? null;
            
            if (!$email || !$password || !$name) {
                http_response_code(400);
                $response = ['error' => 'Name, email and password are required'];
            } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                http_response_code(400);
                $response = ['error' => 'Invalid email format'];
            } elseif (findUserByEmail($email)) {
                http_response_code(400);
                $response = ['error' => 'Email already registered'];
            } else {
                $newUser = [
                    'id' => count($users) + 1,
                    'email' => $email,
                    'password_hash' => password_hash($password, PASSWORD_DEFAULT),
                    'name' => $name,
                    'role' => 'user',
                    'is_active' => 1,
                    'created_at' => date('Y-m-d H:i:s')
                ];
                $users[] = $newUser;
                saveUsers($users);
                logActivity('register', 'user', $newUser['id'], $newUser['id'], 'User registered');
                unset($newUser['password_hash']);
                http_response_code(201);
                $response = ['success' => true, 'message' => 'Registration successful', 'user' => $newUser];
            }
        }
        break;

    // AUTH: LOGIN
    case 'auth/login':
        if ($method === 'POST') {
            $email = $input['email'] ?? null;
            $password = $input['password'] ?? null;
            
            if (!$email || !$password) {
                http_response_code(400);
                $response = ['error' => 'Email and password are required'];
            } else {
                $user = findUserByEmail($email);
                if (!$user || !password_verify($password, $user['password_hash'])) {
                    http_response_code(401);
                    $response = ['error' => 'Invalid credentials'];
                } elseif (!$user['is_active']) {
                    http_response_code(403);
                    $response = ['error' => 'Account is disabled'];
                } else {
                    $token = generateJWT($user);
                    logActivity('login', 'user', $user['id'], $user['id'], 'User logged in');
                    unset($user['password_hash']);
                    $response = ['success' => true, 'message' => 'Login successful', 'token' => $token, 'user' => $user];
                }
            }
        }
        break;

    // AUTH: LOGOUT
    case 'auth/logout':
        if ($method === 'POST' && $currentUser) {
            logActivity('logout', 'user', $currentUser['sub'], $currentUser['sub'], 'User logged out');
            $response = ['success' => true, 'message' => 'Logout successful'];
        } else {
            http_response_code(401);
            $response = ['error' => 'Not authenticated'];
        }
        break;

    // AUTH: ME (get current user)
    case 'auth/me':
        if ($method === 'GET' && $currentUser) {
            $user = findUserById($currentUser['sub']);
            if ($user) {
                unset($user['password_hash']);
                $response = $user;
            } else {
                http_response_code(404);
                $response = ['error' => 'User not found'];
            }
        } else {
            http_response_code(401);
            $response = ['error' => 'Not authenticated'];
        }
        break;

    // AUTH: PROFILE UPDATE
    case 'auth/profile':
        if ($method === 'PUT' && $currentUser) {
            $name = $input['name'] ?? null;
            $password = $input['password'] ?? null;
            
            foreach ($users as $i => $u) {
                if ($u['id'] === $currentUser['sub']) {
                    if ($name) $users[$i]['name'] = $name;
                    if ($password) $users[$i]['password_hash'] = password_hash($password, PASSWORD_DEFAULT);
                    saveUsers($users);
                    logActivity('profile_update', 'user', $users[$i]['id'], $users[$i]['id'], 'Profile updated');
                    unset($users[$i]['password_hash']);
                    $response = $users[$i];
                    break;
                }
            }
        } else {
            http_response_code(401);
            $response = ['error' => 'Not authenticated'];
        }
        break;

    // DASHBOARD: STATS
    case 'dashboard/stats':
        if ($method === 'GET') {
            // Load activity data
            $activityFile = __DIR__ . '/activity.json';
            $activities = file_exists($activityFile) ? json_decode(file_get_contents($activityFile), true) : [];
            
            // Load page views
            $viewsFile = __DIR__ . '/page_views.json';
            $pageViews = file_exists($viewsFile) ? json_decode(file_get_contents($viewsFile), true) : [];
            
            $today = date('Y-m-d');
            $todayViews = array_values(array_filter($pageViews, fn($v) => str_starts_with($v['created_at'], $today)));
            
            $response = [
                'total_visits' => count($pageViews),
                'today_visits' => count($todayViews),
                'total_users' => count($users),
                'total_blog_posts' => count($data['blogPosts']),
                'published_posts' => count(array_filter($data['blogPosts'], fn($p) => $p['is_published'])),
                'pending_comments' => count(array_filter($data['comments'], fn($c) => !$c['is_approved'])),
                'total_services' => count($services),
                'total_projects' => count($projects),
                'recent_activities' => array_slice(array_reverse($activities), 0, 10)
            ];
        }
        break;

    // DASHBOARD: ACTIVITY
    case 'dashboard/activity':
        if ($method === 'GET') {
            $activityFile = __DIR__ . '/activity.json';
            $activities = file_exists($activityFile) ? json_decode(file_get_contents($activityFile), true) : [];
            $limit = (int)($_GET['limit'] ?? 50);
            $response = array_slice(array_reverse($activities), 0, $limit);
        }
        break;

    // DASHBOARD: ERRORS
    case 'dashboard/errors':
        if ($method === 'GET') {
            $activityFile = __DIR__ . '/activity.json';
            $activities = file_exists($activityFile) ? json_decode(file_get_contents($activityFile), true) : [];
            $errors = array_values(array_filter($activities, fn($a) => $a['action'] === 'error'));
            $limit = (int)($_GET['limit'] ?? 20);
            $response = array_slice(array_reverse($errors), 0, $limit);
        }
        break;

    // DASHBOARD: TOP PAGES
    case 'dashboard/top-pages':
        if ($method === 'GET') {
            $viewsFile = __DIR__ . '/page_views.json';
            $pageViews = file_exists($viewsFile) ? json_decode(file_get_contents($viewsFile), true) : [];
            
            $pageCounts = [];
            foreach ($pageViews as $v) {
                $path = $v['page_path'];
                $pageCounts[$path] = ($pageCounts[$path] ?? 0) + 1;
            }
            arsort($pageCounts);
            $response = array_slice($pageCounts, 0, 10, true);
        }
        break;

    // ANALYTICS: PAGE VIEW
    case 'analytics/page-view':
        if ($method === 'POST') {
            $pagePath = $input['page_path'] ?? $_SERVER['REQUEST_URI'];
            logPageView($pagePath);
            $response = ['success' => true];
        }
        break;

    // ANALYTICS: ERROR LOG
    case 'analytics/error':
        if ($method === 'POST') {
            $errorMessage = $input['message'] ?? 'Unknown error';
            $errorStack = $input['stack'] ?? '';
            logActivity('error', 'js_error', null, $currentUser['sub'] ?? null, $errorMessage);
            $response = ['success' => true];
        }
        break;

    // ANALYTICS: SUMMARY
    case 'analytics/summary':
        if ($method === 'GET') {
            $viewsFile = __DIR__ . '/page_views.json';
            $pageViews = file_exists($viewsFile) ? json_decode(file_get_contents($viewsFile), true) : [];
            
            $today = date('Y-m-d');
            $weekAgo = date('Y-m-d', strtotime('-7 days'));
            $monthAgo = date('Y-m-d', strtotime('-30 days'));
            
            $todayViews = array_values(array_filter($pageViews, fn($v) => str_starts_with($v['created_at'], $today)));
            $weekViews = array_values(array_filter($pageViews, fn($v) => $v['created_at'] >= $weekAgo));
            $monthViews = array_values(array_filter($pageViews, fn($v) => $v['created_at'] >= $monthAgo));
            
            $response = [
                'today' => count($todayViews),
                'this_week' => count($weekViews),
                'this_month' => count($monthViews),
                'all_time' => count($pageViews)
            ];
        }
        break;

    // USERS (admin only)
    case 'users':
        if ($method === 'GET') {
            if (!$currentUser || $currentUser['role'] !== 'admin') {
                http_response_code(403);
                $response = ['error' => 'Admin access required'];
            } else {
                $safeUsers = array_map(fn($u) => [
                    'id' => $u['id'],
                    'email' => $u['email'],
                    'name' => $u['name'],
                    'role' => $u['role'],
                    'is_active' => $u['is_active'],
                    'created_at' => $u['created_at']
                ], $users);
                $response = $safeUsers;
            }
        }
        break;

    // USERS/:ID/ROLE
    case preg_match('/^users\/(\d+)\/role$/', $path, $m) ? $path = $m[0] : '':
        if ($method === 'PUT' && $currentUser && $currentUser['role'] === 'admin') {
            $userId = (int)$m[1];
            $newRole = $input['role'] ?? null;
            
            if (!in_array($newRole, ['admin', 'user'])) {
                http_response_code(400);
                $response = ['error' => 'Invalid role'];
            } else {
                foreach ($users as $i => $u) {
                    if ($u['id'] === $userId) {
                        $users[$i]['role'] = $newRole;
                        saveUsers($users);
                        logActivity('role_change', 'user', $userId, $currentUser['sub'], "Role changed to $newRole");
                        $response = ['success' => true, 'role' => $newRole];
                        break;
                    }
                }
            }
        } else {
            http_response_code(403);
            $response = ['error' => 'Admin access required'];
        }
        break;

    // USERS/:ID
    case preg_match('/^users\/(\d+)$/', $path, $m) ? true : false:
        $userId = (int)$m[1];
        if ($method === 'DELETE' && $currentUser && $currentUser['role'] === 'admin') {
            foreach ($users as $i => $u) {
                if ($u['id'] === $userId) {
                    if ($u['id'] === $currentUser['sub']) {
                        http_response_code(400);
                        $response = ['error' => 'Cannot delete yourself'];
                    } else {
                        array_splice($users, $i, 1);
                        saveUsers($users);
                        logActivity('user_delete', 'user', $userId, $currentUser['sub'], 'User deleted');
                        $response = ['success' => true, 'message' => 'User deleted'];
                    }
                    break;
                }
            }
        }
        break;

    // SERVICES
    case 'services':
        $response = $services;
        break;

    // PROJECTS
    case 'projects':
        $response = $projects;
        break;

    // PROJECTS/:ID
    case str_starts_with($path, 'projects/'):
        $idSlug = substr($path, 9);
        foreach ($projects as $p) {
            if ((string)$p['id'] === $idSlug || $p['slug'] === $idSlug) {
                $response = $p;
                break;
            }
        }
        if ($response === ['error' => 'Endpoint not found']) {
            http_response_code(404);
            $response = ['error' => 'Project not found'];
        }
        break;

    // BLOG
    case 'blog':
        if ($method === 'GET') {
            $posts = array_values(array_filter($data['blogPosts'], fn($p) => $p['is_published']));
            
            // Search
            if (!empty($_GET['search'])) {
                $search = strtolower($_GET['search']);
                $posts = array_values(array_filter($posts, fn($p) => 
                    str_contains(strtolower($p['title']), $search) || 
                    str_contains(strtolower($p['content'] ?? ''), $search)
                ));
            }
            
            // Category filter
            if (!empty($_GET['category'])) {
                $posts = array_values(array_filter($posts, fn($p) => $p['category'] === $_GET['category']));
            }
            
            // Tag filter
            if (!empty($_GET['tag'])) {
                $posts = array_values(array_filter($posts, fn($p) => in_array($_GET['tag'], $p['tags'] ?? [])));
            }
            
            // Pagination
            $page = (int)($_GET['page'] ?? 1);
            $limit = (int)($_GET['limit'] ?? 10);
            $total = count($posts);
            $posts = array_slice($posts, ($page - 1) * $limit, $limit);
            
            $response = [
                'posts' => $posts,
                'total' => $total,
                'page' => $page,
                'totalPages' => ceil($total / $limit)
            ];
        } elseif ($method === 'POST') {
            $title = $input['title'] ?? null;
            $slug = $input['slug'] ?? null;
            
            if (!$title || !$slug) {
                http_response_code(400);
                $response = ['error' => 'Title and slug are required'];
            } else {
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
                saveData($data);
                http_response_code(201);
                $response = $newPost;
            }
        }
        break;

    // BLOG/:SLUG
    case str_starts_with($path, 'blog/') && !str_contains($path, '/'):
        $slug = substr($path, 5);
        $post = null;
        foreach ($data['blogPosts'] as $p) {
            if ($p['slug'] === $slug) {
                $post = $p;
                break;
            }
        }
        
        if ($post) {
            $postComments = array_values(array_filter($data['comments'], fn($c) => $c['blog_post_id'] === $post['id'] && $c['is_approved']));
            $postTags = array_values(array_filter($data['tags'], fn($t) => in_array($t['slug'], $post['tags'] ?? [])));
            $response = array_merge($post, ['comments' => $postComments, 'tags' => $postTags]);
        } else {
            http_response_code(404);
            $response = ['error' => 'Post not found'];
        }
        break;

    // BLOG/:ID (PUT/DELETE)
    case preg_match('/^blog\/(\d+)$/', $path, $m) ? $path = $m[0] : '':
        $id = (int)$m[1];
        $idx = null;
        foreach ($data['blogPosts'] as $i => $p) {
            if ($p['id'] === $id) {
                $idx = $i;
                break;
            }
        }
        
        if ($idx !== null) {
            if ($method === 'PUT') {
                $data['blogPosts'][$idx] = array_merge($data['blogPosts'][$idx], array_filter($input));
                saveData($data);
                $response = $data['blogPosts'][$idx];
            } elseif ($method === 'DELETE') {
                array_splice($data['blogPosts'], $idx, 1);
                $data['comments'] = array_values(array_filter($data['comments'], fn($c) => $c['blog_post_id'] !== $id));
                saveData($data);
                $response = ['success' => true, 'message' => 'Post deleted'];
            }
        } else {
            http_response_code(404);
            $response = ['error' => 'Post not found'];
        }
        break;

    // BLOG/:ID/PUBLISH (POST)
    case preg_match('/^blog\/(\d+)\/publish$/', $path, $m) ? $path = $m[0] : '':
        $id = (int)$m[1];
        foreach ($data['blogPosts'] as $i => $p) {
            if ($p['id'] === $id) {
                $data['blogPosts'][$i]['is_published'] = !$p['is_published'];
                saveData($data);
                $response = ['success' => true, 'is_published' => $data['blogPosts'][$i]['is_published']];
                break;
            }
        }
        break;

    // COMMENTS
    case 'comments':
        if ($method === 'GET') {
            $comments = $data['comments'];
            if (!empty($_GET['post_id'])) {
                $comments = array_values(array_filter($comments, fn($c) => $c['blog_post_id'] === (int)$_GET['post_id']));
            }
            if (isset($_GET['approved'])) {
                $approved = $_GET['approved'] === 'true';
                $comments = array_values(array_filter($comments, fn($c) => $c['is_approved'] === $approved));
            }
            $response = $comments;
        } elseif ($method === 'POST') {
            $blog_post_id = $input['blog_post_id'] ?? null;
            $author_name = $input['author_name'] ?? null;
            $author_email = $input['author_email'] ?? null;
            $content = $input['content'] ?? null;
            
            if (!$blog_post_id || !$author_name || !$author_email || !$content) {
                http_response_code(400);
                $response = ['error' => 'All fields are required'];
            } else {
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
                saveData($data);
                http_response_code(201);
                $response = ['success' => true, 'message' => 'Comment submitted! It will be visible after approval.', 'comment' => $newComment];
            }
        }
        break;

    // COMMENTS/:ID (PUT/DELETE)
    case preg_match('/^comments\/(\d+)$/', $path, $m) ? true : false:
        $id = (int)$m[1];
        foreach ($data['comments'] as $i => $c) {
            if ($c['id'] === $id) {
                if ($method === 'PUT') {
                    $data['comments'][$i]['is_approved'] = !$c['is_approved'];
                    saveData($data);
                    $response = ['success' => true, 'is_approved' => $data['comments'][$i]['is_approved']];
                } elseif ($method === 'DELETE') {
                    array_splice($data['comments'], $i, 1);
                    saveData($data);
                    $response = ['success' => true, 'message' => 'Comment deleted'];
                }
                break;
            }
        }
        break;

    // TAGS
    case 'tags':
        if ($method === 'GET') {
            $response = $data['tags'];
        } elseif ($method === 'POST') {
            $name = $input['name'] ?? null;
            if (!$name) {
                http_response_code(400);
                $response = ['error' => 'Tag name is required'];
            } else {
                $slug = strtolower(preg_replace('/\s+/', '-', $name));
                $newTag = ['id' => count($data['tags']) + 1, 'name' => $name, 'slug' => $slug];
                $data['tags'][] = $newTag;
                saveData($data);
                http_response_code(201);
                $response = $newTag;
            }
        }
        break;

    // CONTACT
    case 'contact':
        if ($method === 'POST') {
            $name = $input['name'] ?? null;
            $email = $input['email'] ?? null;
            $message = $input['message'] ?? null;
            
            if (!$name || !$email || !$message) {
                http_response_code(400);
                $response = ['error' => 'Name, email and message are required'];
            } else {
                // In production, you would send email here
                $response = ['success' => true, 'message' => 'Thank you! We will contact you soon.'];
            }
        }
        break;

    // NEWSLETTER
    case 'newsletter':
        if ($method === 'POST') {
            $email = $input['email'] ?? null;
            
            if (!$email) {
                http_response_code(400);
                $response = ['error' => 'Email is required'];
            } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                http_response_code(400);
                $response = ['error' => 'Invalid email format'];
            } else {
                // Save to subscribers (in production, use database)
                $response = ['success' => true, 'message' => 'Thank you for subscribing!'];
            }
        }
        break;

    // TESTIMONIALS
    case 'testimonials':
        $testimonials = [
            ['id' => 1, 'text' => 'Natalia is reliable, results oriented, a good professional, always oriented towards achieving the established goal.', 'author' => 'Cristina G.', 'role' => 'Program Manager at Digital Transformations'],
            ['id' => 2, 'text' => 'Very good service and helpful person. Natalia handled all issues very professional.', 'author' => 'Olimpiu G', 'role' => 'CEO in Beauty Industry'],
            ['id' => 3, 'text' => 'Accurate organization and outstanding support to the exhibitors and to all the attendees.', 'author' => 'Mihaela P', 'role' => 'Project Manager'],
        ];
        $response = $testimonials;
        break;

    // SETTINGS
    case 'settings':
        $settings = [
            'site_name' => 'Satoris Events',
            'tagline' => 'We make brands Visible & Digital',
            'email' => 'contact@satoris.ro',
            'phone' => '+4 0723257755',
            'address' => '70-84 Ion Mihalache Bd, b.45, S1, Bucharest, RO',
        ];
        $response = $settings;
        break;

    default:
        if (empty($path)) {
            $response = ['api' => 'Satoris API', 'version' => '1.0', 'status' => 'running'];
        }
}

// Send response
echo json_encode($response);