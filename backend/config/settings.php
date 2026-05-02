<?php
/**
 * Satoris API - Configuration
 * 
 * Contains all configurable settings for the API.
 * In production, use environment variables or a secure vault.
 */

// API Configuration
$config = [
    // JWT Secret - CHANGE IN PRODUCTION
    'jwt_secret' => getenv('JWT_SECRET') ?: 'satoris_secret_key_2024',
    
    // Default Admin Credentials
    'admin_email' => 'admin@satoris.ro',
    'admin_password' => 'Satoris2024!',
    
    // Email Settings
    'from_email' => 'noreply@satoris.ro',
    'from_name' => 'Satoris',
    
    // Site Settings
    'site_name' => 'Satoris Events',
    'tagline' => 'We make brands Visible & Digital',
    'contact_email' => 'hello@satoris.ro',
    'join_team_email' => 'team@satoris.ro',
    
    // Feature Flags
    'enable_registration' => true,
    'enable_password_reset' => false,
    
    // Rate Limiting (requests per minute)
    'rate_limit' => 60,
    
    // Log settings
    'log_activity' => true,
    'log_page_views' => true,
    'max_log_entries' => 1000,
    'max_page_view_entries' => 2000,
];