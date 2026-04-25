<?php
/**
 * Satoris API - Routes
 * PHP Version
 */

// In-memory data stores (for demo - in production use MySQL)
$GLOBALS['contacts'] = [];
$GLOBALS['subscribers'] = [];

// Blog posts with tags
$GLOBALS['blogPosts'] = [
    ['id' => 1, 'title' => 'Târg de Crăciun Dalles 2025', 'slug' => 'targ-de-craciun-dalles-2025', 'excerpt' => 'Event Concept, Event Management & Implementation for the Christmas market.', 'content' => '<p>We are thrilled to share the success of the Christmas market at Dalles Hall in 2025.</p>', 'category' => 'Events', 'author' => 'Satoris Team', 'image' => 'https://satoris.ro/wp-content/uploads/2023/09/Targ-de-craciun-Dalles-2025-site-satoris--260x300.png', 'is_published' => true, 'created_at' => '2025-12-01', 'tags' => ['events', 'case-study']],
    ['id' => 2, 'title' => 'Exhibition Success Blueprint', 'slug' => 'exhibition-success-blueprint', 'excerpt' => 'Event Management, Expo Strategy, Print Design.', 'content' => '<p>Attending or exhibiting at trade shows can be a game-changer for your business.</p>', 'category' => 'Strategy', 'author' => 'Natalia Pruteanu', 'image' => 'https://satoris.ro/wp-content/uploads/2023/10/blurred-background-people-shopping-market-fair-sunny-day-blur-background-with-bokeh-1-300x200.jpg', 'is_published' => true, 'created_at' => '2025-10-15', 'tags' => ['strategy', 'marketing']],
    ['id' => 3, 'title' => 'Omi Brand Digital Strategy', 'slug' => 'omi-digital-strategy', 'excerpt' => 'Digital Audit, Market Research for Omi brand.', 'content' => '<p>Working with Omi allowed us to completely transform their digital presence.</p>', 'category' => 'Digital', 'author' => 'Satoris Team', 'image' => 'https://satoris.ro/wp-content/uploads/2022/01/Post_Omi_Img_Featured-260x300.jpg', 'is_published' => true, 'created_at' => '2022-01-10', 'tags' => ['digital', 'strategy']],
    ['id' => 4, 'title' => 'Holandria Branding Journey', 'slug' => 'holandria-branding', 'excerpt' => 'Packaging, Branding, Email Marketing for Holandria.', 'content' => '<p>Holandria approached us for a complete brand refresh.</p>', 'category' => 'Branding', 'author' => 'Satoris Team', 'image' => 'https://satoris.ro/wp-content/uploads/2022/01/Post_Holandria_Img_Featured-260x300.jpg', 'is_published' => true, 'created_at' => '2022-01-05', 'tags' => ['branding', 'case-study']],
];

// Comments store
$GLOBALS['comments'] = [
    ['id' => 1, 'blog_post_id' => 1, 'author_name' => 'Maria Popescu', 'author_email' => 'maria@example.com', 'content' => 'Excelent eveniment!', 'is_approved' => true, 'created_at' => '2025-12-05'],
    ['id' => 2, 'blog_post_id' => 1, 'author_name' => 'Ion Georgescu', 'author_email' => 'ion@example.com', 'content' => 'Când va fi următorul târg?', 'is_approved' => true, 'created_at' => '2025-12-06'],
    ['id' => 3, 'blog_post_id' => 2, 'author_name' => 'Elena Dumitrescu', 'author_email' => 'elena@example.com', 'content' => 'Sfaturile sunt foarte utile!', 'is_approved' => true, 'created_at' => '2025-10-20'],
    ['id' => 4, 'blog_post_id' => 3, 'author_name' => 'Andrei Marin', 'author_email' => 'andrei@example.com', 'content' => 'Impresionant rezultatele!', 'is_approved' => false, 'created_at' => '2022-01-15'],
];

// Tags store
$GLOBALS['tags'] = [
    ['id' => 1, 'name' => 'Events', 'slug' => 'events'],
    ['id' => 2, 'name' => 'Strategy', 'slug' => 'strategy'],
    ['id' => 3, 'name' => 'Digital', 'slug' => 'digital'],
    ['id' => 4, 'name' => 'Branding', 'slug' => 'branding'],
    ['id' => 5, 'name' => 'Marketing', 'slug' => 'marketing'],
    ['id' => 6, 'name' => 'Trends', 'slug' => 'trends'],
    ['id' => 7, 'name' => 'Case Study', 'slug' => 'case-study'],
];

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

$testimonials = [
    ['id' => 1, 'text' => 'Natalia is reliable, results oriented, a good professional, always oriented towards achieving the established goal.', 'author' => 'Cristina G.', 'role' => 'Program Manager at Digital Transformations'],
    ['id' => 2, 'text' => 'Very good service and helpful person. Natalia handled all issues very professional.', 'author' => 'Olimpiu G', 'role' => 'CEO in Beauty Industry'],
    ['id' => 3, 'text' => 'Accurate organization and outstanding support to the exhibitors and to all the attendees.', 'author' => 'Mihaela P', 'role' => 'Project Manager'],
];

$settings = [
    'site_name' => 'Satoris Events',
    'tagline' => 'We make brands Visible & Digital',
    'email' => 'contact@satoris.ro',
    'phone' => '+4 0723257755',
    'address' => '70-84 Ion Mihalache Bd, b.45, S1, Bucharest, RO',
];

// Helper function to find array item
function findByIdOrSlug($array, $key) {
    foreach ($array as $item) {
        if ($item['id'] == $key || $item['slug'] == $key) {
            return $item;
        }
    }
    return null;
}

function findIndexById($array, $id) {
    foreach ($array as $index => $item) {
        if ($item['id'] == $id) {
            return $index;
        }
    }
    return -1;
}

// Parse API path
$apiPath = str_replace('api/', '', $path);
$parts = explode('/', $apiPath);
$endpoint = $parts[0];
$param = $parts[1] ?? null;

// Route handling
switch ($endpoint) {
    case 'services':
        echo json_encode($services);
        break;
    
    case 'projects':
        if ($param) {
            $project = findByIdOrSlug($projects, $param);
            if ($project) {
                echo json_encode($project);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Project not found']);
            }
        } else {
            echo json_encode($projects);
        }
        break;
    
    case 'blog':
        if ($param) {
            $post = findByIdOrSlug($GLOBALS['blogPosts'], $param);
            if ($post) {
                $postComments = array_filter($GLOBALS['comments'], function($c) use ($post) {
                    return $c['blog_post_id'] == $post['id'] && $c['is_approved'];
                });
                
                $postTags = array_filter($GLOBALS['tags'], function($t) use ($post) {
                    return in_array($t['slug'], $post['tags']);
                });
                
                echo json_encode(array_merge($post, [
                    'comments' => array_values($postComments),
                    'tags' => array_values($postTags)
                ]));
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Post not found']);
            }
        } else {
            $filteredPosts = array_filter($GLOBALS['blogPosts'], function($p) {
                return $p['is_published'];
            });
            
            if (!empty($_GET['search'])) {
                $search = strtolower($_GET['search']);
                $filteredPosts = array_filter($filteredPosts, function($p) use ($search) {
                    return strpos(strtolower($p['title']), $search) !== false || 
                           strpos(strtolower($p['content']), $search) !== false;
                });
            }
            
            if (!empty($_GET['category'])) {
                $cat = $_GET['category'];
                $filteredPosts = array_filter($filteredPosts, function($p) use ($cat) {
                    return $p['category'] == $cat;
                });
            }
            
            if (!empty($_GET['tag'])) {
                $tg = $_GET['tag'];
                $filteredPosts = array_filter($filteredPosts, function($p) use ($tg) {
                    return in_array($tg, $p['tags']);
                });
            }
            
            echo json_encode([
                'posts' => array_values($filteredPosts),
                'total' => count($filteredPosts),
                'page' => 1,
                'totalPages' => 1
            ]);
        }
        break;
    
    case 'comments':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $filteredComments = $GLOBALS['comments'];
            
            if (!empty($_GET['post_id'])) {
                $pid = $_GET['post_id'];
                $filteredComments = array_filter($filteredComments, function($c) use ($pid) {
                    return $c['blog_post_id'] == $pid;
                });
            }
            
            echo json_encode(array_values($filteredComments));
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (empty($input['blog_post_id']) || empty($input['author_name']) || 
                empty($input['author_email']) || empty($input['content'])) {
                http_response_code(400);
                echo json_encode(['error' => 'All fields are required']);
                break;
            }
            
            $newComment = [
                'id' => count($GLOBALS['comments']) + 1,
                'blog_post_id' => (int)$input['blog_post_id'],
                'author_name' => $input['author_name'],
                'author_email' => $input['author_email'],
                'content' => $input['content'],
                'is_approved' => false,
                'created_at' => date('Y-m-d')
            ];
            
            $GLOBALS['comments'][] = $newComment;
            
            echo json_encode([
                'success' => true,
                'message' => 'Comment submitted! It will be visible after approval.',
                'comment' => $newComment
            ]);
        } elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            $commentId = (int)$param;
            $index = findIndexById($GLOBALS['comments'], $commentId);
            
            if ($index === -1) {
                http_response_code(404);
                echo json_encode(['error' => 'Comment not found']);
                break;
            }
            
            $GLOBALS['comments'][$index]['is_approved'] = !$GLOBALS['comments'][$index]['is_approved'];
            
            echo json_encode([
                'success' => true,
                'is_approved' => $GLOBALS['comments'][$index]['is_approved']
            ]);
        } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            $commentId = (int)$param;
            $index = findIndexById($GLOBALS['comments'], $commentId);
            
            if ($index === -1) {
                http_response_code(404);
                echo json_encode(['error' => 'Comment not found']);
                break;
            }
            
            unset($GLOBALS['comments'][$index]);
            $GLOBALS['comments'] = array_values($GLOBALS['comments']);
            
            echo json_encode(['success' => true, 'message' => 'Comment deleted']);
        }
        break;
    
    case 'tags':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            echo json_encode($GLOBALS['tags']);
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (empty($input['name'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Tag name is required']);
                break;
            }
            
            $slug = strtolower(preg_replace('/\s+/', '-', $input['name']));
            
            $newTag = [
                'id' => count($GLOBALS['tags']) + 1,
                'name' => $input['name'],
                'slug' => $slug
            ];
            
            $GLOBALS['tags'][] = $newTag;
            
            echo json_encode($newTag);
        }
        break;
    
    case 'contact':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (empty($input['name']) || empty($input['email']) || empty($input['message'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Name, email and message are required']);
                break;
            }
            
            $contact = [
                'id' => count($GLOBALS['contacts']) + 1,
                'name' => $input['name'],
                'email' => $input['email'],
                'phone' => $input['phone'] ?? '',
                'subject' => $input['subject'] ?? '',
                'message' => $input['message'],
                'createdAt' => date('c')
            ];
            
            $GLOBALS['contacts'][] = $contact;
            
            echo json_encode(['success' => true, 'message' => 'Thank you for your message!']);
        }
        break;
    
    case 'newsletter':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (empty($input['email'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Email is required']);
                break;
            }
            
            foreach ($GLOBALS['subscribers'] as $sub) {
                if ($sub['email'] === $input['email']) {
                    echo json_encode(['success' => true, 'message' => 'You are already subscribed!']);
                    exit;
                }
            }
            
            $subscriber = [
                'id' => count($GLOBALS['subscribers']) + 1,
                'email' => $input['email'],
                'subscribedAt' => date('c')
            ];
            
            $GLOBALS['subscribers'][] = $subscriber;
            
            echo json_encode(['success' => true, 'message' => 'Thank you for subscribing!']);
        }
        break;
    
    case 'testimonials':
        echo json_encode($testimonials);
        break;
    
    case 'settings':
        echo json_encode($settings);
        break;
    
    case 'health':
        echo json_encode(['status' => 'ok', 'timestamp' => date('c')]);
        break;
    
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
}
