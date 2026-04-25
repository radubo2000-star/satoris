import { motion } from 'framer-motion';
import '../../styles/globals.css';
import '../../styles/sections.css';

const servicesData = [
  {
    category: 'Strategy',
    title: 'strategy',
    description: 'Strategy is the first step, the cornerstone upon which successful journeys are built. At Satoris PR & Digital Communication Studio, we understand that a well-crafted strategy is not just a roadmap; it\'s the key to unlocking your brand\'s full potential. We dive deep into the heart of your goals, challenges, and aspirations, crafting personalised strategies that illuminate the path to success. With our commitment to strategy, we ensure that every move is purposeful, every decision is informed, and every outcome is exceptional.',
    items: [
      { title: 'social Media strategy', description: 'Crafting a tailored roadmap for your brand\'s social media success. From content calendars to engagement tactics, we strategize every aspect to maximize your digital presence' },
      { title: 'platform strategy', description: 'Navigating the digital landscape with precision. We analyze, select, and optimize the right platforms to ensure your message reaches your target audience effectively' },
      { title: 'digital audit', description: 'A comprehensive health check for your online presence. Our digital audit pinpoints strengths and opportunities, guiding strategic decisions for growth' },
      { title: 'market research', description: 'Empowering decisions with data-driven insights. Our market research uncovers trends, competition, and audience preferences, enabling informed strategies for success' },
      { title: 'Communication Strategy', description: 'Mastering the art of brand conversation. Our communication strategy aligns your messaging with objectives, ensuring clear, impactful, and cohesive interactions, both internal and external' },
      { title: 'content strategy', description: 'Fueling engagement through compelling storytelling. Our content strategy harmonizes brand narratives with audience interests, creating meaningful connections' },
    ]
  },
  {
    category: 'Branding',
    title: 'branding',
    description: 'Our branding crafts narratives that resonate, transforming your identity into an unforgettable story.',
    items: []
  },
  {
    category: 'Digital Marketing',
    title: 'website design',
    description: 'Our websites are more than pages; they\'re canvases of expression and user-friendliness into every click',
    items: []
  },
  {
    category: 'Digital Marketing',
    title: 'user experience',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
    items: []
  },
  {
    category: 'Digital Marketing',
    title: 'app design',
    description: 'In the mobile realm, we create apps that blend aesthetics with seamless functionality, delivering user experiences that captivate.',
    items: []
  },
  {
    category: 'Creative & Design',
    title: 'creative & design',
    description: 'We believe that the most impactful solutions are born from the fusion of artistry and forward-thinking strategies. Explore our array of services designed to elevate your brand, captivate your audience, and redefine industry standards',
    items: []
  },
  {
    category: 'Technology',
    title: 'technology',
    description: 'We\'re passionate enthusiasts of technology. We firmly believe that technology isn\'t just a tool; it\'s a powerful accelerator on our journey to success. Our in-house technology expertise empowers innovation, ensuring that your vision becomes reality with the speed and precision that modern technology allows',
    items: [
      { title: 'website development', description: 'Our websites are more than pixels; they\'re the result of in-house web development expertise, tailored to your unique needs, either if it is a custom code build or an open platform' },
      { title: 'SMS promo Machine', description: 'Take control of your SMS marketing with our in-house SMS Promo Machine, a versatile tool crafted to supercharge your campaigns' },
      { title: 'app development', description: 'Crafting tailored mobile solutions from the ground up, our in-house app development ensures your vision becomes a reality' },
      { title: 'ecommerce', description: 'From idea to marketplace, our in-house ecommerce solutions build robust online stores that thrive in the digital realm' },
    ]
  },
  {
    category: 'Events',
    title: 'Events',
    description: 'From memorable corporate gatherings to immersive product launches, our event marketing expertise brings your brand to life',
    items: []
  },
  {
    category: 'Marketing',
    title: 'marketing',
    description: 'Marketing isn\'t just a service; it\'s the heartbeat of your brand\'s journey. At Satoris Communication Studio, we view marketing as the engine that propels your brand forward. Our strategic marketing expertise serves as the compass guiding your path to success. We\'re passionate about crafting marketing solutions that elevate your brand, captivate your audience, and drive results. From the art of storytelling to the science of data-driven strategies, we are your partners in creating marketing experiences that resonate, engage, and leave a lasting impact',
    items: []
  },
  {
    category: 'Events',
    title: 'Content Creation',
    description: 'Crafting compelling stories, visuals  and engaging content that resonate with and capture attention of your audience and drive meaningful connections',
    items: []
  },
  {
    category: 'Events',
    title: 'social Media managment',
    description: 'From content creation to engagement, our social media management ensures your brand shines in the digital spotlight',
    items: []
  },
  {
    category: 'Events',
    title: 'SEO',
    description: 'Boosting your online visibility and search rankings with our SEO strategies that drive organic growth',
    items: []
  },
  {
    category: 'Events',
    title: 'Affiliate Management',
    description: 'Optimizing affiliate programs to expand your reach and drive results, all under expert management',
    items: []
  },
  {
    category: 'Events',
    title: 'Email Marketing',
    description: 'Engaging your audience directly through personalized and effective email campaigns that convert',
    items: []
  },
  {
    category: 'Events',
    title: 'Events',
    description: 'At Satoris PR & Digital Communication Studio, we are masters of transforming fleeting moments into enduring memories. With over 15 years of hands-on experience in orchestrating events, ranging from intimate teambuilding sessions to grand-scale exhibitions that draw crowds from far and wide, we have honed our craft to perfection. Events are more than just gatherings; they are the stages upon which your brand\'s essence takes center stage. We\'re dedicated to turning your vision into a tangible reality, creating experiences that captivate, inspire, and resonate. Whether it\'s a corporate party, product launch, partner meetup, convention, exhibition, or a custom event that defies categorization, our expertise shines through, leaving an indelible mark on every occasion',
    items: [
      { title: 'Custom Events', description: 'For any occasion that demands excellence, our custom events deliver tailored solutions that exceed expectations' },
      { title: 'Conventions', description: 'Crafting immersive convention experiences that engage attendees and convey your brand\'s essence' },
      { title: 'Exhibitions', description: 'Captivating exhibitions that tell your brand\'s story and leave a lasting impression on attendees' },
      { title: 'Teambuilding', description: 'Building stronger, more cohesive teams through dynamic, meaningful and engaging teambuilding experiences' },
      { title: 'Product Launch', description: 'Launching your product with flair and precision, from concept to grand unveiling' },
      { title: 'Partner Meetups', description: 'Strengthening partnerships and fostering collaboration through meticulously planned meetups' },
    ]
  },
  {
    category: 'Financial PR',
    title: 'Relationship Management',
    description: 'Building and nurturing strong, lasting relationships that are the foundation of successful financial communication',
    items: []
  },
  {
    category: 'Financial PR',
    title: 'Investor Relations',
    description: 'Crafting strategic and transparent communication that fosters investor trust and confidence in your financial journey',
    items: []
  },
  {
    category: 'Financial PR',
    title: 'Financial PR',
    description: 'We specialise in Financial PR, where every word and message matters, we understand the nuances of financial communication, from investor relations to market announcements.  Our goal is to take the burden of this often tedious and complex task off your shoulders, passing it on to a dedicated key manager who ensures seamless communication across different departments and countries, allowing you to focus on what matters most: your financial success.',
    items: []
  },
];

function Services() {
  return (
    <div className="services-page">
      {/* Hero Section */}
      <section 
        className="hero" 
        style={{ 
          minHeight: '60vh',
          backgroundImage: 'url(https://satoris.ro/wp-content/uploads/2023/09/services_hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.4)'
        }}></div>
        <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ 
              color: '#fff', 
              fontSize: 'var(--text-lg)', 
              fontWeight: 500,
              marginBottom: 'var(--space-2)'
            }}
          >
            We're here to help you
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ 
              color: '#fff', 
              fontSize: 'var(--text-5xl)',
              fontWeight: 800
            }}
          >
            Grow & stand out from the crowd
          </motion.h1>
        </div>
      </section>

      {/* Services List - Matching Original Format */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          {servicesData.map((service, index) => {
            const isReversed = index % 2 === 1;
            
            // If service has items, show them in the two-column layout
            if (service.items && service.items.length > 0) {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'var(--space-8)',
                    marginBottom: 'var(--space-12)',
                    paddingBottom: 'var(--space-12)',
                    borderBottom: '1px solid #e5e5e5'
                  }}
                >
                  <div style={{ 
                    paddingRight: isReversed ? '0' : 'var(--space-6)',
                    paddingLeft: isReversed ? 'var(--space-6)' : '0',
                  }}>
                    <span style={{ 
                      fontSize: 'var(--text-xs)', 
                      color: '#FF9100', 
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em'
                    }}>
                      {service.category}
                    </span>
                    <h2 style={{ 
                      fontSize: 'var(--text-xl)', 
                      color: '#32373c',
                      fontWeight: 600,
                      marginTop: 'var(--space-2)',
                      textTransform: 'capitalize'
                    }}>
                      {service.title}
                    </h2>
                    <p style={{ 
                      color: '#666', 
                      fontSize: 'var(--text-sm)',
                      lineHeight: 1.7,
                      marginTop: 'var(--space-3)'
                    }}>
                      {service.description}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                      {service.items.map((item, i) => (
                        <div key={i} style={{ borderLeft: '2px solid #FF9100', paddingLeft: 'var(--space-3)' }}>
                          <h3 style={{ 
                            fontSize: 'var(--text-sm)', 
                            color: '#32373c',
                            fontWeight: 600,
                            textTransform: 'capitalize',
                            marginBottom: '4px'
                          }}>
                            {item.title}
                          </h3>
                          <p style={{ 
                            color: '#666', 
                            fontSize: 'var(--text-xs)',
                            lineHeight: 1.5
                          }}>
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            }
            
            // For services without items (single column layout)
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                style={{ 
                  marginBottom: 'var(--space-10)',
                  paddingBottom: 'var(--space-10)',
                  borderBottom: '1px solid #e5e5e5'
                }}
              >
                <span style={{ 
                  fontSize: 'var(--text-xs)', 
                  color: '#FF9100', 
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  {service.category}
                </span>
                <h2 style={{ 
                  fontSize: 'var(--text-xl)', 
                  color: '#32373c',
                  fontWeight: 600,
                  marginTop: 'var(--space-2)',
                  textTransform: 'capitalize'
                }}>
                  {service.title}
                </h2>
                <p style={{ 
                  color: '#666', 
                  fontSize: 'var(--text-sm)',
                  lineHeight: 1.7,
                  marginTop: 'var(--space-3)',
                  maxWidth: '800px'
                }}>
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: '#32373c', padding: 'var(--space-16) 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#fff', marginBottom: 'var(--space-4)', fontSize: 'var(--text-3xl)' }}>
            let's create together
          </h2>
          <p style={{ color: '#fff', opacity: 0.8, marginBottom: 'var(--space-6)' }}>
            Your vision, our expertise - let's build something extraordinary
          </p>
          <a href="/contact" style={{ 
            background: '#FF9100', 
            color: '#fff', 
            padding: '14px 32px', 
            borderRadius: '4px', 
            textDecoration: 'none', 
            fontWeight: 600,
            display: 'inline-block'
          }}>
            Get in touch
          </a>
        </div>
      </section>
    </div>
  );
}

export default Services;