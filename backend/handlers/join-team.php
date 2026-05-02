<?php
/**
 * Satoris API - Join Team Handler
 * Handles job application submissions
 */

// Load helpers
require_once __DIR__ . '/../includes/helpers.php';

/**
 * Handle join-team route
 * @param string $path The route path
 * @param string $method The HTTP method
 * @param array $input The input data
 * @return array|null Response array or null if not handled
 */
function handle_join_team($path, $method, $input) {
    // POST /api/join-team
    if ($path === 'join-team' || $path === 'join-team/') {
        if ($method === 'POST') {
            return handle_join_team_submit($input);
        }
    }
    
    return null;
}

/**
 * Handle join team application submission
 */
function handle_join_team_submit($input) {
    $fullName = sanitize_input($input['fullName'] ?? null);
    $email = filter_var($input['email'] ?? null, FILTER_SANITIZE_EMAIL);
    $message = sanitize_input($input['message'] ?? null);
    $cvFile = $input['cvFile'] ?? null; // Base64 encoded CV
    
    if (!$fullName || !$email) {
        http_response_code(400);
        return ['error' => 'Full name and email are required'];
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        return ['error' => 'Invalid email format'];
    }
    
    // Save submission to file
    $submissionsFile = __DIR__ . '/join_team_submissions.json';
    $submissions = file_exists($submissionsFile) ? json_decode(file_get_contents($submissionsFile), true) : [];
    
    $submission = [
        'id' => count($submissions) + 1,
        'fullName' => $fullName,
        'email' => $email,
        'message' => $message,
        'cvFile' => $cvFile,
        'created_at' => date('Y-m-d H:i:s'),
        'ip_address' => $_SERVER['REMOTE_ADDR'] ?? ''
    ];
    $submissions[] = $submission;
    file_put_contents($submissionsFile, json_encode($submissions, JSON_PRETTY_PRINT));
    
    // Send email notification
    $settings = get_settings();
    $to = $settings['join_team_email'] ?? $settings['email'] ?? 'team@satoris.ro';
    $fromEmail = get_config('from_email', 'noreply@satoris.ro');
    
    $subject = 'New Join Team Application - ' . $fullName;
    $headers = "From: " . $fromEmail . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    $body = "<html><body>";
    $body .= "<h2>New Join Team Application</h2>";
    $body .= "<p><strong>Name:</strong> " . htmlspecialchars($fullName) . "</p>";
    $body .= "<p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>";
    $body .= "<p><strong>Message:</strong> " . nl2br(htmlspecialchars($message ?? 'No message')) . "</p>";
    $body .= "<p><strong>Date:</strong> " . date('Y-m-d H:i:s') . "</p>";
    $body .= "</body></html>";
    
    @mail($to, $subject, $body, $headers);
    
    // Log activity
    logActivity('join_team_submitted', 'application', null, null, 'New join team application');
    
    return ['success' => true, 'message' => 'Thank you for your interest! We will contact you soon.'];
}