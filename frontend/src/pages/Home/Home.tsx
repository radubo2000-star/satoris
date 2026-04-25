import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../../styles/globals.css';
import '../../styles/sections.css';

const services = [
  {
    title: 'marketing',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 94 79"><path d="M32.96,30.33a4.42,4.42,0,1,0-3.82,2.16,4.37,4.37,0,0,0,2.39-.72L47.21,47A1.0047,1.0047,0,0,0,48.6106,45.56Z" style="fill-rule:evenodd"></path><path d="M88.2011,16.2769A22.21,22.21,0,0,0,56.7835,14.81L52.5,18.7192,48.2165,14.81a22.21,22.21,0,0,0-30.6084.622L3.76,2H18.05a1,1,0,0,0,0-2H0V18.04a1,1,0,0,0,2,0V3.08L16.2458,16.9083a22.3119,22.3119,0,0,0,2.0174,30.8454L52.5,79,86.7368,47.7537A22.3111,22.3111,0,0,0,88.2011,16.2769Zm-2.8125,30L52.5,76.2923,19.6114,46.2764A20.2626,20.2626,0,0,1,46.8683,16.2871l4.2835,3.9093a2,2,0,0,0,2.6964,0l4.2835-3.9093A20.2626,20.2626,0,0,1,85.3886,46.2764Z" style="fill-rule:evenodd"></path></svg>`,
    description: 'Digital Marketing\nAds\nSales Funnel \nEvent participation strategy\nE-commerce \nBranded merch\nStands & BoothRegistration \nTicketing',
  },
  {
    title: 'Implementation & On-Site Management',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 91.8547 74.6427"><path d="M90.7044,1.4952a4.5,4.5,0,1,0-.345,6.3547A4.5,4.5,0,0,0,90.7044,1.4952Z" transform="translate(0 0)"></path><path d="M61,11.1453a1,1,0,0,0,1,1H75.5877C65.2629,19.8084,61.428,27.2272,56.11,37.5163c-1.74,3.3672-3.64,7.0417-5.9777,11.1328C37.52,70.72,13.5082,72.5605.9954,72.6425A1.0012,1.0012,0,0,0,0,73.6457a.9909.9909,0,0,0,.9949.997c12.5657-.08,37.6686-1.893,50.8733-25.0013,2.4318-4.2555,4.3782-8.0176,6.1389-11.4208C63.4713,27.659,67.1484,20.5517,78,12.8665V28.1453a1,1,0,0,0,2,0v-18H62A1,1,0,0,0,61,11.1453Z" transform="translate(0 0)"></path></svg>`,
    description: 'Your agenda, our playbook, no surprises',
  },
  {
    title: 'PR & Communication',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83.1669 79.4606"><path d="M57.3667,51.8579a4.5,4.5,0,1,0,6.3546.345A4.5,4.5,0,0,0,57.3667,51.8579Z" transform="translate(0 0)" style="fill-rule:evenodd"></path><path d="M81.739,44.1024,30.33.9368a4,4,0,0,0-5.6355.4912L.9368,29.7228a4,4,0,0,0,.4912,5.6354L52.8369,78.5239a4,4,0,0,0,5.6355-.4912L82.23,49.7378A4,4,0,0,0,81.739,44.1024Zm-1.0405,4.3494L56.9407,76.7466a2,2,0,0,1-2.8177.2456L2.7141,33.8266a2,2,0,0,1-.2457-2.8178L26.2262,2.7141a2,2,0,0,1,2.8177-.2457L80.4529,45.634A2,2,0,0,1,80.6985,48.4518Z" transform="translate(0 0)" style="fill-rule:evenodd"></path></svg>`,
    description: 'Social Media \nPre-buzz\nMedia\nSocial Media \nExposure\nEvents PR \nKOLs \nPost-event coverage',
  },
  {
    title: 'Exhibitions & Trade Fairs',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81.3509 75.4557"><path d="M78.9252,22.1966A4.5,4.5,0,1,0,76.8238,30.69c2.9986,13.2136-2.9278,28.21-15.96,36.9757C44.34,78.7806,22.9031,75.5376,12.9226,60.7A30.6173,30.6173,0,0,1,9.1464,34.51c4.8142,1.9311,10.8685,1.7539,16.6905-.4468l.0109.0273q.6289-.2515,1.2652-.5439.5529-.2388,1.1012-.5022l-.0125-.026a33.254,33.254,0,0,0,5.1743-3.2978,28.36,28.36,0,0,0,8.3591-9.8678c1.5464-3.2907,1.902-6.6877.0615-9.07S36.5794,7.886,33.0048,8.551a26.9591,26.9591,0,0,0-9.781,4.2415l-.0011-.0016A39.7647,39.7647,0,0,0,7.986,31.7032a12.1035,12.1035,0,0,1-3.916-3.66C1.6747,24.4823,1.3992,19.89,3.028,15.2672A26.1139,26.1139,0,0,1,13.2317,2.6594,1,1,0,1,0,12.1155,1,28.1054,28.1054,0,0,0,1.1417,14.6025C-.6437,19.67-.4186,24.9537,2.4105,29.16a14.1486,14.1486,0,0,0,4.9113,4.483A32.57,32.57,0,0,0,11.263,61.8158c10.6948,15.9,33.4288,19.1383,50.7167,7.51,13.6576-9.1866,19.9884-24.987,16.7966-39.069a4.5,4.5,0,0,0,.1489-8.06Zm-56.3666-6.48.01.0124a26.3845,26.3845,0,0,1,10.8024-5.2119c3.32-.6176,5.6992.0069,6.8433,1.4879s1.1472,3.9412-.2889,6.9972a26.3857,26.3857,0,0,1-7.7716,9.1356,30.6156,30.6156,0,0,1-5.8766,3.592c-5.9205,2.5524-11.9271,2.7521-16.4927.8681A37.327,37.327,0,0,1,22.5586,15.7168Z" transform="translate(0 -0.8296)" style="fill-rule:evenodd"></path></svg>`,
    description: 'From 9 sqm booths to full pavilions',
  },
  {
    title: 'Digital',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83.1669 79.4606"><path d="M57.3667,51.8579a4.5,4.5,0,1,0,6.3546.345A4.5,4.5,0,0,0,57.3667,51.8579Z" transform="translate(0 0)" style="fill-rule:evenodd"></path><path d="M81.739,44.1024,30.33.9368a4,4,0,0,0-5.6355.4912L.9368,29.7228a4,4,0,0,0,.4912,5.6354L52.8369,78.5239a4,4,0,0,0,5.6355-.4912L82.23,49.7378A4,4,0,0,0,81.739,44.1024Zm-1.0405,4.3494L56.9407,76.7466a2,2,0,0,1-2.8177.2456L2.7141,33.8266a2,2,0,0,1-.2457-2.8178L26.2262,2.7141a2,2,0,0,1,2.8177-.2457L80.4529,45.634A2,2,0,0,1,80.6985,48.4518Z" transform="translate(0 0)" style="fill-rule:evenodd"></path></svg>`,
    description: 'Digital for Events\nWebsite \nLanding pages \nemail \nSocial amplification\nCustom Build SMS Solution \nLive streaming\nVisual Content\nEvents Tech\nAV - Staging',
  },
  {
    title: 'Concept & Creative',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81.3509 75.4557"><path d="M78.9252,22.1966A4.5,4.5,0,1,0,76.8238,30.69c2.9986,13.2136-2.9278,28.21-15.96,36.9757C44.34,78.7806,22.9031,75.5376,12.9226,60.7A30.6173,30.6173,0,0,1,9.1464,34.51c4.8142,1.9311,10.8685,1.7539,16.6905-.4468l.0109.0273q.6289-.2515,1.2652-.5439.5529-.2388,1.1012-.5022l-.0125-.026a33.254,33.254,0,0,0,5.1743-3.2978,28.36,28.36,0,0,0,8.3591-9.8678c1.5464-3.2907,1.902-6.6877.0615-9.07S36.5794,7.886,33.0048,8.551a26.9591,26.9591,0,0,0-9.781,4.2415l-.0011-.0016A39.7647,39.7647,0,0,0,7.986,31.7032a12.1035,12.1035,0,0,1-3.916-3.66C1.6747,24.4823,1.3992,19.89,3.028,15.2672A26.1139,26.1139,0,0,1,13.2317,2.6594,1,1,0,1,0,12.1155,1,28.1054,28.1054,0,0,0,1.1417,14.6025C-.6437,19.67-.4186,24.9537,2.4105,29.16a14.1486,14.1486,0,0,0,4.9113,4.483A32.57,32.57,0,0,0,11.263,61.8158c10.6948,15.9,33.4288,19.1383,50.7167,7.51,13.6576-9.1866,19.9884-24.987,16.7966-39.069a4.5,4.5,0,0,0,.1489-8.06Zm-56.3666-6.48.01.0124a26.3845,26.3845,0,0,1,10.8024-5.2119c3.32-.6176,5.6992.0069,6.8433,1.4879s1.1472,3.9412-.2889,6.9972a26.3857,26.3857,0,0,1-7.7716,9.1356,30.6156,30.6156,0,0,1-5.8766,3.592c-5.9205,2.5524-11.9271,2.7521-16.4927.8681A37.327,37.327,0,0,1,22.5586,15.7168Z" transform="translate(0 -0.8296)" style="fill-rule:evenodd"></path></svg>`,
    description: 'Events Concept\nVisual Content\nThemes, formats, agenda design—built for execution.',
  },
  {
    title: 'Full Service',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83.1669 79.4606"><path d="M57.3667,51.8579a4.5,4.5,0,1,0,6.3546.345A4.5,4.5,0,0,0,57.3667,51.8579Z" transform="translate(0 0)" style="fill-rule:evenodd"></path><path d="M81.739,44.1024,30.33.9368a4,4,0,0,0-5.6355.4912L.9368,29.7228a4,4,0,0,0,.4912,5.6354L52.8369,78.5239a4,4,0,0,0,5.6355-.4912L82.23,49.7378A4,4,0,0,0,81.739,44.1024Zm-1.0405,4.3494L56.9407,76.7466a2,2,0,0,1-2.8177.2456L2.7141,33.8266a2,2,0,0,1-.2457-2.8178L26.2262,2.7141a2,2,0,0,1,2.8177-.2457L80.4529,45.634A2,2,0,0,1,80.6985,48.4518Z" transform="translate(0 0)" style="fill-rule:evenodd"></path></svg>`,
    description: 'AV - Staging \nStage, sound, lights, effects \nStaffing \nInterpreters, Hostess \nCatering & goody bags',
  },
  {
    title: 'Go big',
    icon: `<svg viewBox="0 0 496 512" xmlns="http://www.w3.org/2000/svg"><path d="M347.94 129.86L203.6 195.83a31.938 31.938 0 0 0-15.77 15.77l-65.97 144.34c-7.61 16.65 9.54 33.81 26.2 26.2l144.34-65.97a31.938 31.938 0 0 0 15.77-15.77l65.97-144.34c7.61-16.66-9.54-33.81-26.2-26.2zm-77.36 148.72c-12.47 12.47-32.69 12.47-45.16 0-12.47-12.47-12.47-32.69 0-45.16 12.47-12.47 32.69-12.47 45.16 0 12.47 12.47 12.47 32.69 0 45.16zM248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm0 448c-110.28 0-200-89.72-200-200S137.72 56 248 56s200 89.72 200 200-89.72 200-200 200z"></path></svg>`,
    description: 'International events Participations\nGlobal Events as exhibitor \nTrips & Ticketing \nInternational team Buildings & client meetups',
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
  { name: 'OAR', logo: 'https://satoris.ro/wp-content/uploads/2023/09/1-1.png' },
  { name: 'PM', logo: 'https://satoris.ro/wp-content/uploads/2023/09/2-1.png' },
  { name: 'UAUIM', logo: 'https://satoris.ro/wp-content/uploads/2023/09/3-1.png' },
  { name: 'Rombeer', logo: 'https://satoris.ro/wp-content/uploads/2023/09/4-1.png' },
  { name: 'EXPOBIKE', logo: 'https://satoris.ro/wp-content/uploads/2023/09/5-1.png' },
  { name: 'Arvi', logo: 'https://satoris.ro/wp-content/uploads/2023/09/6-1.png' },
  { name: 'Patrimoniu', logo: 'https://satoris.ro/wp-content/uploads/2023/09/7-1.png' },
  { name: 'Stone Deco', logo: 'https://satoris.ro/wp-content/uploads/2023/09/14-1.png' },
  { name: 'Basa Stone', logo: 'https://satoris.ro/wp-content/uploads/2023/09/15-1.png' },
  { name: 'Fit Class', logo: 'https://satoris.ro/wp-content/uploads/2023/09/16-1.png' },
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
                whileHover={{ y: -5 }}
                style={{ padding: 'var(--space-6)', background: '#fff', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid #d9d9e3' }}
              >
                <div 
                  dangerouslySetInnerHTML={{ __html: service.icon }}
                  style={{ width: '60px', height: '45px', margin: '0 auto var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  className="service-icon-svg"
                />
                <h4 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-3)', color: '#1a1a2e', textTransform: 'lowercase', fontWeight: 600 }}>
                  {service.title}
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: '#374151', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{service.description}</p>
                <Link 
                  to="/services" 
                  style={{ color: '#FF9100', fontSize: 'var(--text-sm)', fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginTop: 'var(--space-3)' }}
                >
                  Learn More
                </Link>
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

      {/* Clients - Carousel */}
      <section className="section" style={{ overflow: 'hidden', padding: 'var(--space-10) 0' }}>
        <div className="container">
          <div className="section-title">
            <h2>Just a Few of Our Clients</h2>
          </div>
        </div>
        <div className="clients-carousel-wrapper" style={{ position: 'relative', overflow: 'hidden', padding: 'var(--space-6) 0' }}>
          <div className="clients-carousel" style={{ display: 'flex', animation: 'scroll 40s linear infinite', width: 'fit-content' }}>
            {[...clientLogos, ...clientLogos].map((client, index) => (
              <div key={index} className="client-logo-wrapper" style={{ flex: '0 0 180px', padding: '0 var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={client.logo}
                  alt={client.name}
                  className="client-logo"
                  style={{ maxHeight: '60px', maxWidth: '150px', objectFit: 'contain' }}
                />
              </div>
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