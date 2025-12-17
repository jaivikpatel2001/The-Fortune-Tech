import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '../../components/ui/PageHeader';
import serviceData from '../../data/services.json';
import * as FaIcons from 'react-icons/fa';
import Button from '../../components/ui/Button';
import { FaCheck, FaStar, FaArrowRight } from 'react-icons/fa';

// Type definition for services
interface Service {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  overview?: string;
  icon: string;
  image: string;
  features: string[];
  deliverables: string[];
  process?: string[];
  techStack?: string[];
  benefits: string[];
  idealFor?: string[];
  cta: string;
  pricingHint: string;
  featured: boolean;
}

// Helper to resolve icon from string name
const getIcon = (iconName: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (FaIcons as any)[iconName];
};

export default function ServicesPage() {
  const services = serviceData as unknown as Service[];

  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive technology solutions designed to accelerate your business growth and digital transformation."
      />

      <section className="section">
        <div className="container">
          <div className="services-list">
            {services.map((service, index) => {
              const Icon = getIcon(service.icon);
              return (
                <div
                  key={service.id}
                  className={`service-row ${index % 2 !== 0 ? 'reverse' : ''}`}
                  id={service.id}
                >
                  <div className="service-content">
                    {/* Featured Badge */}
                    {service.featured && (
                      <div className="service-featured-tag">
                        <FaStar /> Popular Choice
                      </div>
                    )}

                    <div className="service-icon-wrapper">
                      {Icon && <Icon />}
                    </div>

                    {/* Tagline */}
                    <span className="service-tagline-pill">{service.tagline}</span>

                    <h2 className="service-title-lg">{service.title}</h2>
                    <p className="service-description-lg">{service.description}</p>

                    <div className="service-details">
                      <div className="detail-col">
                        <h4 className="detail-title">Key Features</h4>
                        <ul className="detail-list">
                          {service.features.slice(0, 4).map((feature, idx) => (
                            <li key={idx}><FaCheck className="check-icon" /> {feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="detail-col">
                        <h4 className="detail-title">Benefits</h4>
                        <ul className="detail-list">
                          {service.benefits.slice(0, 4).map((benefit, idx) => (
                            <li key={idx}><FaStar className="star-icon" /> {benefit}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Tech Stack Preview */}
                    {service.techStack && service.techStack.length > 0 && (
                      <div className="service-tech-preview">
                        <span className="tech-label">Technologies:</span>
                        {service.techStack.slice(0, 5).map((tech, idx) => (
                          <span key={idx} className="tech-pill-sm">{tech}</span>
                        ))}
                        {service.techStack.length > 5 && (
                          <span className="tech-pill-sm more">+{service.techStack.length - 5}</span>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="service-actions">
                      <Link href={`/services/${service.slug}`} className="btn btn-primary">
                        View Full Details <FaArrowRight />
                      </Link>
                      <span className="service-price-tag">{service.pricingHint}</span>
                    </div>
                  </div>

                  <div className="service-image-wrapper">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cta-wrapper">
            <div className="cta-box">
              <h3>Need a Custom Solution?</h3>
              <p>Contact our experts to discuss your specific requirements and get a tailored proposal.</p>
              <Button href="/contact" variant="primary">Get a Free Quote</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}