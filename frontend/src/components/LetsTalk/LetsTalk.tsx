import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LetsTalkProps {
  className?: string;
}

function LetsTalk({ className = '' }: LetsTalkProps) {
  return (
    <section className={`cta-section ${className}`}>
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
  );
}

export default LetsTalk;