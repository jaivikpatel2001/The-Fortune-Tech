import Image from 'next/image';
import Button from '../ui/Button';
import { FaArrowRight } from 'react-icons/fa';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Available for new projects
          </div>

          <h1 className="hero-title">
            We Build Digital
            <br />
            <span className="highlight">Experiences</span> That Matter
          </h1>

          <p className="hero-text">
            Transform your business with cutting-edge technology solutions.
            We craft premium web and mobile experiences that drive growth,
            engage users, and deliver measurable results.
          </p>

          <div className="hero-buttons">
            <Button href="/contact" variant="primary">
              Start Your Project <FaArrowRight />
            </Button>
            <Button href="/portfolio" variant="outline">
              View Our Work
            </Button>
          </div>
        </div>

        <div className="hero-visual">
          <Image
            src="/images/hero/hero.png"
            alt="Modern tech team collaborating"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>
  );
}
