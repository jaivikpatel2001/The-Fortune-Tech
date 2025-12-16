import Image from 'next/image';
import PageHeader from '../../components/ui/PageHeader';
import serviceData from '../../data/services.json';
import * as FaIcons from 'react-icons/fa';
import Button from '../../components/ui/Button';

// Helper to resolve icon from string name
const getIcon = (iconName: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (FaIcons as any)[iconName];
};

// Service images mapping
const serviceImages: Record<string, string> = {
  'web-dev': '/images/services/web-dev.png',
  'mobile-app': '/images/services/mobile-app.png',
  'ui-ux': '/images/services/ui-ux.png',
  'consulting': '/images/services/consulting.png',
  'cloud-devops': '/images/services/cloud-devops.png',
  'maintenance': '/images/services/maintenance.png',
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive technology solutions designed to accelerate your business growth and digital transformation."
      />

      <section className="section">
        <div className="container">
          <div className="services-list">
            {serviceData.map((service, index) => {
              const Icon = getIcon(service.icon);
              return (
                <div key={service.id} className={`service-row ${index % 2 !== 0 ? 'reverse' : ''}`} id={service.id}>
                  <div className="service-content">
                    <div className="service-icon-wrapper">
                      {Icon && <Icon />}
                    </div>
                    <h2 className="service-title-lg">{service.title}</h2>
                    <p className="service-description-lg">{service.description}</p>

                    <div className="service-details">
                      <div className="detail-col">
                        <h4 className="detail-title">Key Features</h4>
                        <ul className="detail-list">
                          {service.features.map((feature, idx) => (
                            <li key={idx}><FaIcons.FaCheck className="check-icon" /> {feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="detail-col">
                        <h4 className="detail-title">Benefits</h4>
                        <ul className="detail-list">
                          {service.benefits.map((benefit, idx) => (
                            <li key={idx}><FaIcons.FaStar className="star-icon" /> {benefit}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="service-image-wrapper">
                    <Image
                      src={serviceImages[service.id] || '/images/services/web-dev.png'}
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
