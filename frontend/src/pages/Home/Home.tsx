import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../../styles/globals.css';
import '../../styles/sections.css';

const services = [
  {
    icon: '📢',
    title: 'PR & Communication',
    description: 'Social Media, Media Relations, Events PR, KOLs, Post-event coverage. Building your brand voice.',
  },
  {
    icon: '🎪',
    title: 'Exhibitions & Trade Fairs',
    description: 'From 9 sqm booths to full pavilions. Complete expo strategy and execution.',
  },
  {
    icon: '💻',
    title: 'Digital',
    description: 'Websites, Landing pages, Email campaigns, Live streaming, Visual Content, Events Tech.',
  },
  {
    icon: '🎨',
    title: 'Concept & Creative',
    description: 'Events Concept, Visual Content, Themes, formats, agenda design—built for execution.',
  },
  {
    icon: '🏢',
    title: 'Full Service',
    description: 'AV - Staging, Stage, sound, lights, effects, Staffing, Interpreters, Hostess, Catering.',
  },
  {
    icon: '📈',
    title: 'Marketing',
    description: 'Digital Marketing, Ads, Sales Funnel, Event participation strategy, E-commerce.',
  },
  {
    icon: '⚡',
    title: 'Implementation & On-Site',
    description: 'Your agenda, our playbook, no surprises. Professional on-site management.',
  },
  {
    icon: '🌍',
    title: 'Go Big',
    description: 'International events, Global Events as exhibitor, Trips & Ticketing, Team Buildings.',
  },
];

const projects = [
  { 
    id: 1, 
    name: 'Târg de Crăciun Dalles 2025', 
    category: 'Event Concept, Event Management', 
    image: 'https://satoris.ro/wp-content/uploads/2023/09/Targ-de-craciun-Dalles-2025-site-satoris--260x300.png',
    link: 'https://satoris.ro/targ-de-craciun-dalles-2025/'
  },
  { 
    id: 2, 
    name: 'Omi', 
    category: 'Digital Audit, Market Research, User Experience', 
    image: 'https://satoris.ro/wp-content/uploads/2022/01/Post_Omi_Img_Featured-260x300.jpg',
    link: 'https://satoris.ro/omi/'
  },
  { 
    id: 3, 
    name: 'Softy', 
    category: 'Research, Branding, Packaging, Ad Design, PPC', 
    image: 'https://library.elementor.com/digital-marketing-studio/wp-content/uploads/sites/179/2022/03/Post_Softy_Img_1.jpg',
    link: 'https://satoris.ro/softy/'
  },
  { 
    id: 4, 
    name: 'Cela Jewelry', 
    category: 'Ecommerce, Website Development, PPC, SEO', 
    image: 'https://library.elementor.com/digital-marketing-studio/wp-content/uploads/sites/179/2022/03/Post_Cela_Img_1.jpg',
    link: 'https://satoris.ro/cela/'
  },
];

const testimonials = [
  {
    text: "Very good service and helpful person. Natalia handled all issues very professional. I recommend.",
    author: 'Olimpiu G',
    role: 'CEO in Beauty Industry',
  },
  {
    text: "Accurate organization and outstanding support to the exhibitors and to all the attendees are best summarizing Natalia's abilities.",
    author: 'Mihaela P',
    role: 'Project Manager',
  },
  {
    text: "Natalia is a great and skilled project and program manager. Due to her expertise, I strongly recommend her.",
    author: 'Madalina N',
    role: 'Managing Director in Media Industry',
  },
  {
    text: "I know I can count on Natalia when I have a project that implies a complex and creative approach, attention to detail, a strict schedule and great outcomes. So if you ask me if it's a good idea to have her as a business partner, I can only say... Definitely! Yes!",
    author: 'Angela M',
    role: 'Recruitment Manager',
  },
  {
    text: "Natalia is reliable, results oriented, a good professional, always oriented towards achieving the established goal. It was a pleasure working with her. I would do it again without any hesitation.",
    author: 'Cristina G.',
    role: 'Program Manager at Digital Transformations',
  },
];

const clientLogos = [
  { name: 'SMAEB', logo: 'https://satoris.ro/wp-content/uploads/2021/09/SIGLA-SMAEB.gif' },
  { name: 'TotalServe', logo: 'https://satoris.ro/wp-content/uploads/2021/09/totalserve-e1631537248931.jpg' },
  { name: 'NatalChic', logo: 'https://satoris.ro/wp-content/uploads/2021/09/Natalchic-roz-logo-social-media-960px-e1631537328780.jpg' },
  { name: 'Miresmei', logo: 'https://satoris.ro/wp-content/uploads/2021/09/sigla-ME-e1631537317688.jpeg' },
];

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Satoris Events — MICE & Events Agency
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We make brands <span style={{ color: 'var(--color-primary)' }}>Visible & Digital</span>
          </motion.h1>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Celebrating Success Through Unforgettable Events, Social, PR, Digital Brilliance, and Financial PR Expertise. 
            We are Your Action Team.
          </motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link to="/contact" className="btn btn-primary">Contact Us</Link>
            <Link to="/work" className="btn btn-outline">View Our Work</Link>
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Satoris Events — MICE & Events Agency</h2>
            <p>
              At SATORIS PR & DIGITAL, we believe that every business is one-of-a-kind, deserving of solutions 
              as unique as they are. That's why we specialize in crafting personalized experiences tailored 
              to your needs. We are Bucharest-based, delivering MICE & exhibitions across Romania and Moldova.
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/about" className="btn btn-primary">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section" style={{ background: 'var(--color-gray-lightest)' }}>
        <div className="container">
          <div className="section-title">
            <h2>We execute events that actually happen on time.</h2>
            <p>
              Our comprehensive services cover everything from concept to execution.
            </p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <Link to="/services" className="btn btn-primary">All Services</Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Featured Work</h2>
            <p>
              Explore our portfolio of featured work, where precision meets creativity and results shine with experience beyond events.
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                style={{ cursor: 'pointer', textDecoration: 'none' }}
              >
                <img src={project.image} alt={project.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                <div className="project-overlay" style={{ padding: 'var(--space-4)', background: '#1a1a2e' }}>
                  <h3 style={{ color: '#FF9100', marginBottom: 'var(--space-1)' }}>{project.name}</h3>
                  <p style={{ color: '#fff', fontSize: 'var(--text-sm)' }}>{project.category}</p>
                </div>
              </motion.a>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <Link to="/work" className="btn btn-outline">All Projects</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ background: 'var(--color-gray-lightest)' }}>
        <div className="container">
          <div className="section-title">
            <h2>Client Feedback</h2>
            <p>Don't just take our word for it</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-info">
                    <strong>{testimonial.author}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Just a Few of Our Clients</h2>
          </div>
          <div className="clients-grid">
            {clientLogos.map((client, index) => (
              <img
                key={index}
                src={client.logo}
                alt={client.name}
                className="client-logo"
                style={{ maxHeight: '60px', maxWidth: '150px' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Your digital presence is about to take off</h2>
            <p>Schedule a free consultation with our team and let's make things happen!</p>
            <Link to="/contact" className="btn">Contact Us</Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;