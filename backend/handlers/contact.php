<?php
/**
 * Satoris API - Contact Handler
 * Handles contact form submissions
 */

// Load helpers
require_once __DIR__ . '/../includes/helpers.php';

/**
 * Handle contact route
 * @param string $path The route path
 * @param string $method The HTTP method
 * @param array $input The input data
 * @return array|null Response array or null if not handled
 */
function handle_contact($path, $method, $input) {
    // POST /api/contact
    if ($path === 'contact' || $path === 'contact/') {
        if ($method === 'POST') {
            return handle_contact_submit($input);
        }
    }
    
    return null;
}

/**
 * Handle contact form submission
 */
function handle_contact_submit($input) {
    $first_name = sanitize_input($input['first_name'] ?? null);
    $last_name = sanitize_input($input['last_name'] ?? null);
    $email = filter_var($input['email'] ?? null, FILTER_SANITIZE_EMAIL);
    $phone = sanitize_input($input['phone'] ?? null);
    $organization = sanitize_input($input['organization'] ?? null);
    $website = sanitize_input($input['website'] ?? null);
    $message = sanitize_input($input['message'] ?? null);
    
    if (!$first_name || !$last_name || !$email || !$message) {
        http_response_code(400);
        return ['error' => 'First name, last name, email and message are required'];
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        return ['error' => 'Invalid email format'];
    }
    
    // Save submission to file
    $submissionsFile = __DIR__ . '/contact_submissions.json';
    $submissions = file_exists($submissionsFile) ? json_decode(file_get_contents($submissionsFile), true) : [];
    
    $submission = [
        'id' => count($submissions) + 1,
        'first_name' => $first_name,
        'last_name' => $last_name,
        'email' => $email,
        'phone' => $phone,
        'organization' => $organization,
        'website' => $website,
        'message' => $message,
        'created_at' => date('Y-m-d H:i:s'),
        'ip_address' => $_SERVER['REMOTE_ADDR'] ?? ''
    ];
    $submissions[] = $submission;
    file_put_contents($submissionsFile, json_encode($submissions, JSON_PRETTY_PRINT));
    
    // Send email notification
    $settings = get_settings();
    $to = $settings['contact_email'] ?? $settings['email'] ?? 'hello@satoris.ro';
    $fromEmail = get_config('from_email', 'noreply@satoris.ro');
    
    $subject = 'New Contact Form - ' . $first_name . ' ' . $last_name;
    $headers = "From: " . $fromEmail . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    $body = "<html><body>";
    $body .= "<h2>New Contact Form Submission</h2>";
    $body .= "<p><strong>First Name:</strong> " . htmlspecialchars($first_name) . "</p>";
    $body .= "<p><strong>Last Name:</strong> " . htmlspecialchars($last_name) . "</p>";
    $body .= "<p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>";
    $body .= "<p><strong>Phone:</strong> " . htmlspecialchars($phone ?? 'Not provided') . "</p>";
    $body .= "<p><strong>Organization:</strong> " . htmlspecialchars($organization ?? 'Not provided') . "</p>";
    $body .= "<p><strong>Website:</strong> " . htmlspecialchars($website ?? 'Not provided') . "</p>";
    $body .= "<p><strong>Message:</strong> " . nl2br(htmlspecialchars($message)) . "</p>";
    $body .= "<p><strong>Date:</strong> " . date('Y-m-d H:i:s') . "</p>";
    $body .= "</body></html>";
    
    @mail($to, $subject, $body, $headers);
    
    // Log activity
    logActivity('contact_form_submitted', 'contact', null, null, 'New contact form submission');
    
    return ['success' => true, 'message' => 'Thank you! We will contact you soon.'];
}