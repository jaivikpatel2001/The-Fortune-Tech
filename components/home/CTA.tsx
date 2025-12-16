import Button from '../ui/Button';
import { FaRocket } from 'react-icons/fa';

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Your Project?</h2>
          <p className="cta-text">
            Let's build something extraordinary together. Schedule a free consultation
            and discover how we can transform your ideas into reality.
          </p>
          <Button href="/contact" variant="primary">
            <FaRocket /> Get Started Today
          </Button>
        </div>
      </div>
    </section>
  );
}
