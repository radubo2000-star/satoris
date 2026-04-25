/**
 * Satoris API - Node.js/Express Backend
 * Port 12001
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 12001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

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

// Blog posts with tags
let blogPosts = [
  { id: 1, title: 'Târg de Crăciun Dalles 2025', slug: 'targ-de-craciun-dalles-2025', excerpt: 'Event Concept, Event Management & Implementation for the Christmas market.', content: '<p>We are thrilled to share the success of the Christmas market at Dalles Hall in 2025. This event brought together over 50 exhibitors and thousands of visitors during the holiday season.</p>', category: 'Events', author: 'Satoris Team', image: 'https://satoris.ro/wp-content/uploads/2023/09/Targ-de-craciun-Dalles-2025-site-satoris--260x300.png', is_published: true, created_at: '2025-12-01', tags: ['events', 'case-study'] },
  { id: 2, title: 'Exhibition Success Blueprint', slug: 'exhibition-success-blueprint', excerpt: 'Event Management, Expo Strategy, Print Design.', content: '<p>Attending or exhibiting at trade shows can be a game-changer for your business.</p>', category: 'Strategy', author: 'Natalia Pruteanu', image: 'https://satoris.ro/wp-content/uploads/2023/10/blurred-background-people-shopping-market-fair-sunny-day-blur-background-with-bokeh-1-300x200.jpg', is_published: true, created_at: '2025-10-15', tags: ['strategy', 'marketing'] },
  { id: 3, title: 'Omi Brand Digital Strategy', slug: 'omi-digital-strategy', excerpt: 'Digital Audit, Market Research, User Experience for Omi brand.', content: '<p>Working with Omi allowed us to completely transform their digital presence.</p>', category: 'Digital', author: 'Satoris Team', image: 'https://satoris.ro/wp-content/uploads/2022/01/Post_Omi_Img_Featured-260x300.jpg', is_published: true, created_at: '2022-01-10', tags: ['digital', 'strategy'] },
  { id: 4, title: 'Holandria Branding Journey', slug: 'holandria-branding', excerpt: 'Packaging, Branding, Email Marketing for Holandria.', content: '<p>Holandria approached us for a complete brand refresh.</p>', category: 'Branding', author: 'Satoris Team', image: 'https://satoris.ro/wp-content/uploads/2022/01/Post_Holandria_Img_Featured-260x300.jpg', is_published: true, created_at: '2022-01-05', tags: ['branding', 'case-study'] },
];

// Comments store
let comments = [
  { id: 1, blog_post_id: 1, author_name: 'Maria Popescu', author_email: 'maria@example.com', content: 'Excelent eveniment! A fost o experiență minunată.', is_approved: true, created_at: '2025-12-05' },
  { id: 2, blog_post_id: 1, author_name: 'Ion Georgescu', author_email: 'ion@example.com', content: 'Când va fi următorul târg?', is_approved: true, created_at: '2025-12-06' },
  { id: 3, blog_post_id: 2, author_name: 'Elena Dumitrescu', author_email: 'elena@example.com', content: 'Sfaturile sunt foarte utile. Mulțumesc!', is_approved: true, created_at: '2025-10-20' },
  { id: 4, blog_post_id: 3, author_name: 'Andrei Marin', author_email: 'andrei@example.com', content: 'Impresionant rezultatele!', is_approved: false, created_at: '2022-01-15' },
];

// Tags store
let tags = [
  { id: 1, name: 'Events', slug: 'events' },
  { id: 2, name: 'Strategy', slug: 'strategy' },
  { id: 3, name: 'Digital', slug: 'digital' },
  { id: 4, name: 'Branding', slug: 'branding' },
  { id: 5, name: 'Marketing', slug: 'marketing' },
  { id: 6, name: 'Trends', slug: 'trends' },
  { id: 7, name: 'Case Study', slug: 'case-study' },
];

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

const testimonials = [
  { id: 1, text: 'Natalia is reliable, results oriented, a good professional, always oriented towards achieving the established goal.', author: 'Cristina G.', role: 'Program Manager at Digital Transformations' },
  { id: 2, text: 'Very good service and helpful person. Natalia handled all issues very professional.', author: 'Olimpiu G', role: 'CEO in Beauty Industry' },
  { id: 3, text: 'Accurate organization and outstanding support to the exhibitors and to all the attendees.', author: 'Mihaela P', role: 'Project Manager' },
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

// ==================== BLOG ROUTES ====================

// GET all blog posts (with optional search and filter)
app.get('/api/blog', (req, res) => {
  const { search, category, tag, page = 1, limit = 10 } = req.query;
  
  let filteredPosts = [...blogPosts].filter(p => p.is_published);
  
  // Search filter
  if (search) {
    const searchLower = search.toLowerCase();
    filteredPosts = filteredPosts.filter(p => 
      p.title.toLowerCase().includes(searchLower) || 
      (p.content && p.content.toLowerCase().includes(searchLower))
    );
  }
  
  // Category filter
  if (category) {
    filteredPosts = filteredPosts.filter(p => p.category === category);
  }
  
  // Tag filter
  if (tag) {
    filteredPosts = filteredPosts.filter(p => p.tags && p.tags.includes(tag));
  }
  
  // Pagination
  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const endIndex = startIndex + parseInt(limit);
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
  
  res.json({
    posts: paginatedPosts,
    total: filteredPosts.length,
    page: parseInt(page),
    totalPages: Math.ceil(filteredPosts.length / parseInt(limit))
  });
});

// GET single blog post with comments and tags
app.get('/api/blog/:slug', (req, res) => {
  const post = blogPosts.find(p => p.slug === req.params.slug);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  // Get comments for this post (only approved)
  const postComments = comments.filter(c => c.blog_post_id === post.id && c.is_approved);
  
  // Get tags for this post
  const postTags = tags.filter(t => post.tags && post.tags.includes(t.slug));
  
  res.json({
    ...post,
    comments: postComments,
    tags: postTags
  });
});

// POST create new blog post (admin)
app.post('/api/blog', (req, res) => {
  const { title, slug, excerpt, content, category, author, image, is_published, tags: postTags } = req.body;
  
  if (!title || !slug) {
    return res.status(400).json({ error: 'Title and slug are required' });
  }
  
  // Check if slug exists
  if (blogPosts.find(p => p.slug === slug)) {
    return res.status(400).json({ error: 'Slug already exists' });
  }
  
  const newPost = {
    id: blogPosts.length + 1,
    title,
    slug,
    excerpt: excerpt || '',
    content: content || '',
    category: category || 'Uncategorized',
    author: author || 'Satoris Team',
    image: image || '',
    is_published: is_published || false,
    tags: postTags || [],
    created_at: new Date().toISOString()
  };
  
  blogPosts.push(newPost);
  res.status(201).json(newPost);
});

// PUT update blog post (admin)
app.put('/api/blog/:id', (req, res) => {
  const postIndex = blogPosts.findIndex(p => p.id === parseInt(req.params.id));
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  const { title, slug, excerpt, content, category, author, image, is_published, tags: postTags } = req.body;
  
  blogPosts[postIndex] = {
    ...blogPosts[postIndex],
    title: title || blogPosts[postIndex].title,
    slug: slug || blogPosts[postIndex].slug,
    excerpt: excerpt !== undefined ? excerpt : blogPosts[postIndex].excerpt,
    content: content !== undefined ? content : blogPosts[postIndex].content,
    category: category || blogPosts[postIndex].category,
    author: author || blogPosts[postIndex].author,
    image: image !== undefined ? image : blogPosts[postIndex].image,
    is_published: is_published !== undefined ? is_published : blogPosts[postIndex].is_published,
    tags: postTags || blogPosts[postIndex].tags
  };
  
  res.json(blogPosts[postIndex]);
});

// DELETE blog post (admin)
app.delete('/api/blog/:id', (req, res) => {
  const postIndex = blogPosts.findIndex(p => p.id === parseInt(req.params.id));
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  blogPosts.splice(postIndex, 1);
  // Also delete related comments
  comments = comments.filter(c => c.blog_post_id !== parseInt(req.params.id));
  
  res.json({ success: true, message: 'Post deleted' });
});

// POST publish/unpublish blog post (admin)
app.post('/api/blog/:id/publish', (req, res) => {
  const post = blogPosts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  post.is_published = !post.is_published;
  res.json({ success: true, is_published: post.is_published });
});

// ==================== COMMENTS ROUTES ====================

// GET all comments (admin) - optionally filter by post
app.get('/api/comments', (req, res) => {
  const { post_id, approved } = req.query;
  
  let filteredComments = [...comments];
  
  if (post_id) {
    filteredComments = filteredComments.filter(c => c.blog_post_id === parseInt(post_id));
  }
  
  if (approved !== undefined) {
    filteredComments = filteredComments.filter(c => c.is_approved === (approved === 'true'));
  }
  
  res.json(filteredComments);
});

// POST add comment (public)
app.post('/api/comments', (req, res) => {
  const { blog_post_id, author_name, author_email, content } = req.body;
  
  if (!blog_post_id || !author_name || !author_email || !content) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  // Check if post exists
  const post = blogPosts.find(p => p.id === parseInt(blog_post_id));
  if (!post) {
    return res.status(404).json({ error: 'Blog post not found' });
  }
  
  const newComment = {
    id: comments.length + 1,
    blog_post_id: parseInt(blog_post_id),
    author_name,
    author_email,
    content,
    is_approved: false, // Requires approval
    created_at: new Date().toISOString()
  };
  
  comments.push(newComment);
  console.log('New comment awaiting approval:', newComment);
  
  res.status(201).json({ 
    success: true, 
    message: 'Comment submitted! It will be visible after approval.',
    comment: newComment
  });
});

// PUT approve/unapprove comment (admin)
app.put('/api/comments/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  
  comment.is_approved = !comment.is_approved;
  res.json({ success: true, is_approved: comment.is_approved });
});

// DELETE comment (admin)
app.delete('/api/comments/:id', (req, res) => {
  const commentIndex = comments.findIndex(c => c.id === parseInt(req.params.id));
  if (commentIndex === -1) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  
  comments.splice(commentIndex, 1);
  res.json({ success: true, message: 'Comment deleted' });
});

// ==================== TAGS ROUTES ====================

// GET all tags
app.get('/api/tags', (req, res) => {
  res.json(tags);
});

// POST create tag (admin)
app.post('/api/tags', (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Tag name is required' });
  }
  
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  
  if (tags.find(t => t.slug === slug)) {
    return res.status(400).json({ error: 'Tag already exists' });
  }
  
  const newTag = {
    id: tags.length + 1,
    name,
    slug
  };
  
  tags.push(newTag);
  res.status(201).json(newTag);
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