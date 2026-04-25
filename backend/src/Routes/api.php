<?php
/**
 * API Routes
 */

$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Parse URL
$parsedUrl = parse_url($requestUri);
$path = trim($parsedUrl['path'] ?? '/', '/');

// Remove 'api/' prefix
$path = str_replace('api/', '', $path);

// Get request body
$jsonData = json_decode(file_get_contents('php://input'), true) ?? [];

// Simple routing
switch ($path) {
    // Services
    case 'services':
        if ($requestMethod === 'GET') {
            echo json_encode([
                [
                    'id' => 1,
                    'icon' => '📢',
                    'title' => 'PR & Communication',
                    'description' => 'Social Media, Media Relations, Events PR, KOLs, Post-event coverage.',
                ],
                [
                    'id' => 2,
                    'icon' => '🎪',
                    'title' => 'Exhibitions & Trade Fairs',
                    'description' => 'From 9 sqm booths to full pavilions.',
                ],
                [
                    'id' => 3,
                    'icon' => '💻',
                    'title' => 'Digital',
                    'description' => 'Websites, Landing pages, Email campaigns, Live streaming.',
                ],
                [
                    'id' => 4,
                    'icon' => '🎨',
                    'title' => 'Concept & Creative',
                    'description' => 'Events Concept, Visual Content, Themes, formats.',
                ],
                [
                    'id' => 5,
                    'icon' => '🏢',
                    'title' => 'Full Service',
                    'description' => 'AV - Staging, Staffing, Catering.',
                ],
                [
                    'id' => 6,
                    'icon' => '📈',
                    'title' => 'Marketing',
                    'description' => 'Digital Marketing, Ads, Sales Funnel, E-commerce.',
                ],
                [
                    'id' => 7,
                    'icon' => '⚡',
                    'title' => 'Implementation & On-Site',
                    'description' => 'Your agenda, our playbook, no surprises.',
                ],
                [
                    'id' => 8,
                    'icon' => '🌍',
                    'title' => 'Go Big',
                    'description' => 'International events, Global Events.',
                ],
            ]);
        }
        break;

    // Projects
    case 'projects':
        if ($requestMethod === 'GET') {
            echo json_encode([
                [
                    'id' => 1,
                    'name' => 'marie',
                    'category' => 'Branding',
                    'description' => 'Event Concept, Event Management & Implementation',
                    'image' => 'https://satoris.ro/wp-content/uploads/2023/09/Targ-de-craciun-Dalles-2025-site-satoris--260x300.png',
                ],
                [
                    'id' => 2,
                    'name' => 'softy',
                    'category' => 'Digital',
                    'description' => 'Digital Audit, Market Research',
                    'image' => 'https://satoris.ro/wp-content/uploads/2022/01/Post_Omi_Img_Featured-260x300.jpg',
                ],
                [
                    'id' => 3,
                    'name' => 'cela',
                    'category' => 'Branding',
                    'description' => 'Packaging, Branding, Email Marketing',
                    'image' => 'https://satoris.ro/wp-content/uploads/2022/01/Post_Holandria_Img_Featured-260x300.jpg',
                ],
                [
                    'id' => 4,
                    'name' => 'omi',
                    'category' => 'Digital',
                    'description' => 'Digital Audit, Market Research',
                    'image' => 'https://satoris.ro/wp-content/uploads/2022/01/Post_Omi_Img_Featured-260x300.jpg',
                ],
            ]);
        }
        break;

    // Blog Posts
    case 'blog':
        if ($requestMethod === 'GET') {
            echo json_encode([
                [
                    'id' => 1,
                    'title' => 'Târg de Crăciun Dalles 2025',
                    'excerpt' => 'Event Concept, Event Management & Implementation for the Christmas market.',
                    'category' => 'Events',
                    'date' => 'December 2025',
                    'image' => 'https://satoris.ro/wp-content/uploads/2023/09/Targ-de-craciun-Dalles-2025-site-satoris--260x300.png',
                ],
                [
                    'id' => 2,
                    'title' => 'Exhibition Success Blueprint',
                    'excerpt' => 'Event Management, Expo Strategy, Print Design.',
                    'category' => 'Strategy',
                    'date' => 'October 2025',
                    'image' => 'https://satoris.ro/wp-content/uploads/2023/10/blurred-background-people-shopping-market-fair-sunny-day-blur-background-with-bokeh-1-300x200.jpg',
                ],
                [
                    'id' => 3,
                    'title' => 'Omi',
                    'excerpt' => 'Digital Audit, Market Research, User Experience.',
                    'category' => 'Digital',
                    'date' => 'January 2022',
                    'image' => 'https://satoris.ro/wp-content/uploads/2022/01/Post_Omi_Img_Featured-260x300.jpg',
                ],
                [
                    'id' => 4,
                    'title' => 'Holandria',
                    'excerpt' => 'Packaging, Branding, Email Marketing.',
                    'category' => 'Branding',
                    'date' => 'January 2022',
                    'image' => 'https://satoris.ro/wp-content/uploads/2022/01/Post_Holandria_Img_Featured-260x300.jpg',
                ],
            ]);
        }
        break;

    // Contact Form
    case 'contact':
        if ($requestMethod === 'POST') {
            // In production, save to database and/or send email
            $name = $jsonData['name'] ?? '';
            $email = $jsonData['email'] ?? '';
            $message = $jsonData['message'] ?? '';
            
            echo json_encode([
                'success' => true,
                'message' => 'Thank you for your message! We will get back to you soon.',
            ]);
        }
        break;

    // Newsletter
    case 'newsletter':
        if ($requestMethod === 'POST') {
            $email = $jsonData['email'] ?? '';
            
            echo json_encode([
                'success' => true,
                'message' => 'Thank you for subscribing!',
            ]);
        }
        break;

    // Testimonials
    case 'testimonials':
        if ($requestMethod === 'GET') {
            echo json_encode([
                [
                    'id' => 1,
                    'text' => 'Natalia is reliable, results oriented, a good professional, always oriented towards achieving the established goal. It was a pleasure working with her.',
                    'author' => 'Cristina G.',
                    'role' => 'Program Manager at Digital Transformations',
                ],
                [
                    'id' => 2,
                    'text' => 'Very good service and helpful person. Natalia handled all issues very professional. I recommend.',
                    'author' => 'Olimpiu G',
                    'role' => 'CEO in Beauty Industry',
                ],
                [
                    'id' => 3,
                    'text' => 'Accurate organization and outstanding support to the exhibitors and to all the attendees are best summarizing Natalia\'s abilities.',
                    'author' => 'Mihaela P',
                    'role' => 'Project Manager',
                ],
            ]);
        }
        break;

    // Settings
    case 'settings':
        if ($requestMethod === 'GET') {
            echo json_encode([
                'site_name' => 'Satoris Events',
                'tagline' => 'We make brands Visible & Digital',
                'email' => 'contact@satoris.ro',
                'phone' => '+4 0723257755',
                'address' => '70-84 Ion Mihalache Bd, b.45, S1, Bucharest, RO',
            ]);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
}