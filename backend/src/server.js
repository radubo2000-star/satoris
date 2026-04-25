/**
 * Satoris API - Node.js/Express Backend
 * Port 12001
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 12001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// CORS headers for all responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// In-memory data stores
let contacts = [];
let subscribers = [];

const services = [
  { id: 1, icon: '📢', title: 'PR & Communication', description: 'Social Media, Media Relations, Events PR, KOLs, Post-event coverage.' },
  { id: 2, icon: '🎪', title: 'Exhibitions & Trade Fairs', description: 'From 9 sqm booths to full pavilions.' },
  { id: 3, icon: '💻', title: 'Digital', description: 'Websites, Landing pages, Email campaigns, Live streaming.' },
  { id: 4, icon: '🎨', title: 'Concept & Creative', description: 'Events Concept, Visual Content, Themes, formats.' },
  { id: 5, icon: '🏢', title: 'Full Service', description: 'AV - Staging, Staffing, Catering.' },
  { id: 6, icon: '📈', title: 'Marketing', description: 'Digital Marketing, Ads, Sales Funnel, E-commerce.' },
  { id: 7, icon: '⚡', title: 'Implementation & On-Site', description: 'Your agenda, our playbook, no surprises.' },
  { id: 8, icon: '🌍', title: 'Go Big', description: 'International events, Global Events.' },
];

const projects = [
  { id: 1, name: 'marie', slug: 'marie', category: 'Branding', description: 'Event Concept, Event Management & Implementation', image: 'https://satoris.ro/wp-content/uploads/2023/09/Targ-de-craciun-Dalles-2025-site-satoris--260x300.png' },
  { id: 2, name: 'softy', slug: 'softy', category: 'Digital', description: 'Digital Audit, Market Research', image: 'https://library.elementor.com/digital-marketing-studio/wp-content/uploads/sites/179/2022/03/Post_Softy_Img_1.jpg' },
  { id: 3, name: 'cela', slug: 'cela', category: 'Branding', description: 'Packaging, Branding, Email Marketing', image: 'https://library.elementor.com/digital-marketing-studio/wp-content/uploads/sites/179/2022/03/Post_Cela_Img_1.jpg' },
  { id: 4, name: 'omi', slug: 'omi', category: 'Digital', description: 'Digital Audit, Market Research', image: 'https://satoris.ro/wp-content/uploads/2022/01/Post_Omi_Img_Featured-260x300.jpg' },
];

const blogPosts = [
  { id: 1, title: 'Târg de Crăciun Dalles 2025', slug: 'targ-de-craciun-dalles-2025', excerpt: 'Event Concept, Event Management & Implementation for the Christmas market.', category: 'Events', image: 'https://satoris.ro/wp-content/uploads/2023/09/Targ-de-craciun-Dalles-2025-site-satoris--260x300.png', date: 'December 2025' },
  { id: 2, title: 'Exhibition Success Blueprint', slug: 'exhibition-success-blueprint', excerpt: 'Event Management, Expo Strategy, Print Design.', category: 'Strategy', image: 'https://satoris.ro/wp-content/uploads/2023/10/blurred-background-people-shopping-market-fair-sunny-day-blur-background-with-bokeh-1-300x200.jpg', date: 'October 2025' },
  { id: 3, title: 'Omi', slug: 'omi', excerpt: 'Digital Audit, Market Research, User Experience.', category: 'Digital', image: 'https://satoris.ro/wp-content/uploads/2022/01/Post_Omi_Img_Featured-260x300.jpg', date: 'January 2022' },
  { id: 4, title: 'Holandria', slug: 'holandria', excerpt: 'Packaging, Branding, Email Marketing.', category: 'Branding', image: 'https://satoris.ro/wp-content/uploads/2022/01/Post_Holandria_Img_Featured-260x300.jpg', date: 'January 2022' },
];

const testimonials = [
  { id: 1, text: 'Natalia is reliable, results oriented, a good professional, always oriented towards achieving the established goal. It was a pleasure working with her.', author: 'Cristina G.', role: 'Program Manager at Digital Transformations' },
  { id: 2, text: 'Very good service and helpful person. Natalia handled all issues very professional. I recommend.', author: 'Olimpiu G', role: 'CEO in Beauty Industry' },
  { id: 3, text: 'Accurate organization and outstanding support to the exhibitors and to all the attendees are best summarizing Natalia\'s abilities.', author: 'Mihaela P', role: 'Project Manager' },
];

const settings = {
  site_name: 'Satoris Events',
  tagline: 'We make brands Visible & Digital',
  email: 'contact@satoris.ro',
  phone: '+4 0723257755',
  address: '70-84 Ion Mihalache Bd, b.45, S1, Bucharest, RO',
};

// Routes
app.get('/api/services', (req, res) => {
  res.json(services);
});

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id) || p.slug === req.params.id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

app.get('/api/blog', (req, res) => {
  res.json(blogPosts);
});

app.get('/api/blog/:slug', (req, res) => {
  const post = blogPosts.find(p => p.slug === req.params.slug);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }
  const contact = { id: contacts.length + 1, name, email, phone, subject, message, createdAt: new Date() };
  contacts.push(contact);
  console.log('Contact form received:', contact);
  res.json({ success: true, message: 'Thank you for your message! We will get back to you soon.' });
});

app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  if (subscribers.find(s => s.email === email)) {
    return res.json({ success: true, message: 'You are already subscribed!' });
  }
  const subscriber = { id: subscribers.length + 1, email, subscribedAt: new Date() };
  subscribers.push(subscriber);
  console.log('Newsletter subscription:', subscriber);
  res.json({ success: true, message: 'Thank you for subscribing!' });
});

app.get('/api/testimonials', (req, res) => {
  res.json(testimonials);
});

app.get('/api/settings', (req, res) => {
  res.json(settings);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Satoris API running on http://localhost:${PORT}`);
});

module.exports = app;