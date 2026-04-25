import { motion } from 'framer-motion';
import '../../styles/globals.css';
import '../../styles/sections.css';

const servicesData = [
  {
    title: 'strategy',
    description: 'Strategy is the first step, the cornerstone upon which successful journeys are built. At Satoris PR & Digital Communication Studio, we understand that a well-crafted strategy is not just a roadmap; it\'s the key to unlocking your brand\'s full potential. We dive deep into the heart of your goals, challenges, and aspirations, crafting personalised strategies that illuminate the path to success. With our commitment to strategy, we ensure that every move is purposeful, every decision is informed, and every outcome is exceptional.'
  },
  {
    title: 'social Media strategy',
    description: 'Crafting a tailored roadmap for your brand\'s social media success. From content calendars to engagement tactics, we strategize every aspect to maximize your digital presence'
  },
  {
    title: 'platform strategy',
    description: 'Navigating the digital landscape with precision. We analyze, select, and optimize the right platforms to ensure your message reaches your target audience effectively'
  },
  {
    title: 'digital audit',
    description: 'A comprehensive health check for your online presence. Our digital audit pinpoints strengths and opportunities, guiding strategic decisions for growth'
  },
  {
    title: 'market research',
    description: 'Empowering decisions with data-driven insights. Our market research uncovers trends, competition, and audience preferences, enabling informed strategies for success'
  },
  {
    title: 'Communication Strategy',
    description: 'Mastering the art of brand conversation. Our communication strategy aligns your messaging with objectives, ensuring clear, impactful, and cohesive interactions, both internal and external'
  },
  {
    title: 'content strategy',
    description: 'Fueling engagement through compelling storytelling. Our content strategy harmonizes brand narratives with audience interests, creating meaningful connections'
  },
  {
    title: 'branding',
    description: 'Our branding crafts narratives that resonate, transforming your identity into an unforgettable story.'
  },
  {
    title: 'website design',
    description: 'Our websites are more than pages; they\'re canvases of expression and user-friendliness into every click'
  },
  {
    title: 'user experience',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'
  },
  {
    title: 'app design',
    description: 'In the mobile realm, we create apps that blend aesthetics with seamless functionality, delivering user experiences that captivate.'
  },
  {
    title: 'creative & design',
    description: 'We believe that the most impactful solutions are born from the fusion of artistry and forward-thinking strategies. Explore our array of services designed to elevate your brand, captivate your audience, and redefine industry standards'
  },
  {
    title: 'technology',
    description: 'We\'re passionate enthusiasts of technology. We firmly believe that technology isn\'t just a tool; it\'s a powerful accelerator on our journey to success. Our in-house technology expertise empowers innovation, ensuring that your vision becomes reality with the speed and precision that modern technology allows'
  },
  {
    title: 'website development',
    description: 'Our websites are more than pixels; they\'re the result of in-house web development expertise, tailored to your unique needs, either if it is a custom code build or an open platform'
  },
  {
    title: 'SMS promo Machine',
    description: 'Take control of your SMS marketing with our in-house SMS Promo Machine, a versatile tool crafted to supercharge your campaigns'
  },
  {
    title: 'app development',
    description: 'Crafting tailored mobile solutions from the ground up, our in-house app development ensures your vision becomes a reality'
  },
  {
    title: 'ecommerce',
    description: 'From idea to marketplace, our in-house ecommerce solutions build robust online stores that thrive in the digital realm'
  },
  {
    title: 'Events',
    description: 'From memorable corporate gatherings to immersive product launches, our event marketing expertise brings your brand to life'
  },
  {
    title: 'Content Creation',
    description: 'Crafting compelling stories, visuals and engaging content that resonate with and capture attention of your audience and drive meaningful connections'
  },
  {
    title: 'social Media managment',
    description: 'From content creation to engagement, our social media management ensures your brand shines in the digital spotlight'
  },
  {
    title: 'SEO',
    description: 'Boosting your online visibility and search rankings with our SEO strategies that drive organic growth'
  },
  {
    title: 'Affiliate Management',
    description: 'Optimizing affiliate programs to expand your reach and drive results, all under expert management'
  },
  {
    title: 'Email Marketing',
    description: 'Engaging your audience directly through personalized and effective email campaigns that convert'
  },
  {
    title: 'marketing',
    description: 'Marketing isn\'t just a service; it\'s the heartbeat of your brand\'s journey. At Satoris Communication Studio, we view marketing as the engine that propels your brand forward. Our strategic marketing expertise serves as the compass guiding your path to success. We\'re passionate about crafting marketing solutions that elevate your brand, captivate your audience, and drive results. From the art of storytelling to the science of data-driven strategies, we are your partners in creating marketing experiences that resonate, engage, and leave a lasting impact'
  },
  {
    title: 'Events',
    description: 'At Satoris PR & Digital Communication Studio, we are masters of transforming fleeting moments into enduring memories. With over 15 years of hands-on experience in orchestrating events, ranging from intimate teambuilding sessions to grand-scale exhibitions that draw crowds from far and wide, we have honed our craft to perfection. Events are more than just gatherings; they are the stages upon which your brand\'s essence takes center stage. We\'re dedicated to turning your vision into a tangible reality, creating experiences that captivate, inspire, and resonate. Whether it\'s a corporate party, product launch, partner meetup, convention, exhibition, or a custom event that defies categorization, our expertise shines through, leaving an indelible mark on every occasion'
  },
  {
    title: 'Custom Events',
    description: 'For any occasion that demands excellence, our custom events deliver tailored solutions that exceed expectations'
  },
  {
    title: 'Conventions',
    description: 'Crafting immersive convention experiences that engage attendees and convey your brand\'s essence'
  },
  {
    title: 'Exhibitions',
    description: 'Captivating exhibitions that tell your brand\'s story and leave a lasting impression on attendees'
  },
  {
    title: 'Teambuilding',
    description: 'Building stronger, more cohesive teams through dynamic, meaningful and engaging teambuilding experiences'
  },
  {
    title: 'Product Launch',
    description: 'Launching your product with flair and precision, from concept to grand unveiling'
  },
  {
    title: 'Partner Meetups',
    description: 'Strengthening partnerships and fostering collaboration through meticulously planned meetups'
  },
  {
    title: 'Relationship Management',
    description: 'Building and nurturing strong, lasting relationships that are the foundation of successful financial communication'
  },
  {
    title: 'Investor Relations',
    description: 'Crafting strategic and transparent communication that fosters investor trust and confidence in your financial journey'
  },
  {
    title: 'Financial PR',
    description: 'We specialise in Financial PR, where every word and message matters, we understand the nuances of financial communication, from investor relations to market announcements. Our goal is to take the burden of this often tedious and complex task off your shoulders, passing it on to a dedicated key manager who ensures seamless communication across different departments and countries, allowing you to focus on what matters most: your financial success.'
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

      {/* Services List - Simple vertical list matching original */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              style={{ 
                marginBottom: 'var(--space-10)',
                paddingBottom: 'var(--space-10)',
                borderBottom: '1px solid #e5e5e5'
              }}
            >
              <h2 style={{ 
                fontSize: 'var(--text-2xl)', 
                color: '#32373c',
                fontWeight: 600,
                marginBottom: 'var(--space-3)',
                textTransform: 'lowercase'
              }}>
                {service.title}
              </h2>
              <p style={{ 
                color: '#666', 
                fontSize: 'var(--text-base)',
                lineHeight: 1.8,
                maxWidth: '900px'
              }}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: '#32373c', padding: 'var(--space-16) 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#fff', marginBottom: 'var(--space-4)', fontSize: 'var(--text-3xl)' }}>
            Your digital presence is about to take off
          </h2>
          <a href="/contact" style={{ 
            background: '#FF9100', 
            color: '#fff', 
            padding: '14px 32px', 
            borderRadius: '4px', 
            textDecoration: 'none', 
            fontWeight: 600,
            display: 'inline-block',
            marginTop: 'var(--space-6)'
          }}>
            Get in touch
          </a>
        </div>
      </section>
    </div>
  );
}

export default Services;