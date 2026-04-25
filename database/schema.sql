-- Satoris Database Schema
-- MySQL

CREATE DATABASE IF NOT EXISTS satoris_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE satoris_db;

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    icon VARCHAR(10) DEFAULT '',
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) DEFAULT '',
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) DEFAULT '',
    description TEXT,
    image VARCHAR(500) DEFAULT '',
    is_featured TINYINT(1) DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    category VARCHAR(100) DEFAULT '',
    image VARCHAR(500) DEFAULT '',
    is_published TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    role VARCHAR(255) DEFAULT '',
    avatar VARCHAR(500) DEFAULT '',
    is_active TINYINT(1) DEFAULT 1,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Contacts table (from contact form)
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) DEFAULT '',
    subject VARCHAR(255) DEFAULT '',
    message TEXT,
    is_read TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_active TINYINT(1) DEFAULT 1,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default settings
INSERT INTO settings (setting_key, setting_value) VALUES
    ('site_name', 'Satoris Events'),
    ('tagline', 'We make brands Visible & Digital'),
    ('email', 'contact@satoris.ro'),
    ('phone', '+4 0723257755'),
    ('address', '70-84 Ion Mihalache Bd, b.45, S1, Bucharest, RO')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);

-- Insert default services
INSERT INTO services (icon, title, description, category, sort_order) VALUES
    ('📢', 'PR & Communication', 'Social Media, Media Relations, Events PR, KOLs, Post-event coverage.', 'Events', 1),
    ('🎪', 'Exhibitions & Trade Fairs', 'From 9 sqm booths to full pavilions.', 'Events', 2),
    ('💻', 'Digital', 'Websites, Landing pages, Email campaigns, Live streaming.', 'Digital', 3),
    ('🎨', 'Concept & Creative', 'Events Concept, Visual Content, Themes, formats.', 'Creative', 4),
    ('🏢', 'Full Service', 'AV - Staging, Staffing, Catering, goody bags.', 'Events', 5),
    ('📈', 'Marketing', 'Digital Marketing, Ads, Sales Funnel, E-commerce.', 'Digital', 6),
    ('⚡', 'Implementation & On-Site', 'Your agenda, our playbook, no surprises.', 'Events', 7),
    ('🌍', 'Go Big', 'International events, Global Events, Team Buildings.', 'Events', 8)
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Insert default projects
INSERT INTO projects (name, slug, category, description, is_featured) VALUES
    ('marie', 'marie', 'Branding', 'Event Concept, Event Management & Implementation, Research, Print Design', 1),
    ('softy', 'softy', 'Digital', 'Digital Audit, Market Research, User Experience', 1),
    ('cela', 'cela', 'Branding', 'Packaging, Branding, Email Marketing, Affiliate Management', 1),
    ('omi', 'omi', 'Digital', 'Digital Audit, Market Research, User Experience', 1)
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Insert default blog posts
INSERT INTO blog_posts (title, slug, excerpt, category, is_published) VALUES
    ('Târg de Crăciun Dalles 2025', 'targ-de-craciun-dalles-2025', 'Event Concept, Event Management & Implementation for the Christmas market at Dalles.', 'Events', 1),
    ('Exhibition Success Blueprint', 'exhibition-success-blueprint', 'Event Management, Expo Strategy, Print Design, Content Strategy for successful trade shows.', 'Strategy', 1),
    ('Omi', 'omi', 'Digital Audit, Market Research, User Experience for Omi brand.', 'Digital', 1),
    ('Holandria', 'holandria', 'Packaging, Branding, Email Marketing for Holandria.', 'Branding', 1)
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Insert default testimonials
INSERT INTO testimonials (text, author, role, sort_order) VALUES
    ('Natalia is reliable, results oriented, a good professional, always oriented towards achieving the established goal. It was a pleasure working with her. I would do it again without any hesitation.', 'Cristina G.', 'Program Manager at Digital Transformations', 1),
    ('Very good service and helpful person. Natalia handled all issues very professional. I recommend.', 'Olimpiu G.', 'CEO in Beauty Industry', 2),
    ('Accurate organization and outstanding support to the exhibitors and to all the attendees are best summarizing Natalia\'s abilities.', 'Mihaela P.', 'Project Manager', 3),
    ('Natalia is a great and skilled project and program manager. Due to her expertise, i strongly recommend her.', 'Madalina N.', 'Managing Director in Media Industry', 4),
    ('I know I can count on Natalia when I have a project that implies a complex and creative approach, attention to detail, a strict schedule and great outcomes.', 'Angela M.', 'Recruitment Manager', 5)
ON DUPLICATE KEY UPDATE text = VALUES(text);