'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import PageHeader from '../../../components/ui/PageHeader';
import Button from '../../../components/ui/Button';
import serviceData from '../../../data/services.json';
import * as FaIcons from 'react-icons/fa';
import {
    FaArrowLeft,
    FaArrowRight,
    FaCheck,
    FaStar,
    FaBoxOpen,
    FaCogs,
    FaUsers,
    FaRocket,
    FaLightbulb,
    FaShieldAlt
} from 'react-icons/fa';

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
    seo?: {
        metaTitle: string;
        metaDescription: string;
    };
}

// Helper to resolve icon from string name
const getIcon = (iconName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (FaIcons as any)[iconName];
};

export default function ServiceDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    const services = serviceData as unknown as Service[];
    const service = services.find((s) => s.slug === slug);

    if (!service) {
        return (
            <>
                <PageHeader title="Service Not Found" subtitle="The service you're looking for doesn't exist." />
                <section className="section">
                    <div className="container" style={{ textAlign: 'center' }}>
                        <Button href="/services" variant="primary">
                            <FaArrowLeft /> Back to Services
                        </Button>
                    </div>
                </section>
            </>
        );
    }

    const Icon = getIcon(service.icon);

    // Find related services (same excluding current)
    const relatedServices = services
        .filter((s) => s.id !== service.id)
        .slice(0, 3);

    return (
        <>
            <PageHeader
                title={service.title}
                subtitle={service.tagline}
            />

            <section className="section">
                <div className="container">
                    {/* Back Button */}
                    <Link href="/services" className="back-link">
                        <FaArrowLeft /> Back to Services
                    </Link>

                    {/* Service Hero */}
                    <div className="service-detail-hero">
                        <div className="service-detail-image">
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 60vw"
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                            {service.featured && (
                                <div className="service-detail-badge">
                                    <FaStar /> Popular Choice
                                </div>
                            )}
                        </div>
                        <div className="service-detail-intro">
                            <div className="service-detail-icon">
                                {Icon && <Icon />}
                            </div>
                            <div className="service-detail-meta">
                                <span className="service-detail-price">{service.pricingHint}</span>
                                {service.idealFor && service.idealFor.length > 0 && (
                                    <div className="service-detail-ideal">
                                        <FaUsers className="ideal-icon" />
                                        <span>Ideal for: {service.idealFor.join(', ')}</span>
                                    </div>
                                )}
                            </div>
                            <p className="service-detail-overview">
                                {service.overview || service.description}
                            </p>
                            <Button href="/contact" variant="primary">
                                {service.cta} <FaArrowRight />
                            </Button>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="service-detail-grid">
                        {/* Features Section */}
                        <div className="service-detail-section">
                            <div className="section-header-icon">
                                <FaCheck />
                            </div>
                            <h2 className="section-heading">Key Features</h2>
                            <p className="section-description">What&apos;s included in our {service.title.toLowerCase()} service</p>
                            <ul className="feature-grid">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="feature-card">
                                        <div className="feature-check">
                                            <FaCheck />
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Deliverables Section */}
                        <div className="service-detail-section">
                            <div className="section-header-icon deliverables">
                                <FaBoxOpen />
                            </div>
                            <h2 className="section-heading">What You&apos;ll Get</h2>
                            <p className="section-description">Tangible deliverables from your project</p>
                            <ul className="deliverables-grid">
                                {service.deliverables.map((item, idx) => (
                                    <li key={idx} className="deliverable-card">
                                        <div className="deliverable-number">{idx + 1}</div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Benefits Section */}
                        <div className="service-detail-section">
                            <div className="section-header-icon benefits">
                                <FaRocket />
                            </div>
                            <h2 className="section-heading">Benefits</h2>
                            <p className="section-description">How this service helps your business grow</p>
                            <ul className="benefits-grid">
                                {service.benefits.map((benefit, idx) => (
                                    <li key={idx} className="benefit-card">
                                        <FaStar className="benefit-icon" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Process Section */}
                        {service.process && service.process.length > 0 && (
                            <div className="service-detail-section full-width">
                                <div className="section-header-icon process">
                                    <FaCogs />
                                </div>
                                <h2 className="section-heading">Our Process</h2>
                                <p className="section-description">How we approach your {service.title.toLowerCase()} project</p>
                                <div className="process-timeline">
                                    {service.process.map((step, idx) => (
                                        <div key={idx} className="process-timeline-item">
                                            <div className="process-timeline-number">{idx + 1}</div>
                                            <div className="process-timeline-content">
                                                <h4>{step}</h4>
                                            </div>
                                            {idx < service.process!.length - 1 && (
                                                <div className="process-timeline-connector" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tech Stack Section */}
                        {service.techStack && service.techStack.length > 0 && (
                            <div className="service-detail-section full-width">
                                <div className="section-header-icon tech">
                                    <FaLightbulb />
                                </div>
                                <h2 className="section-heading">Technologies We Use</h2>
                                <p className="section-description">Industry-leading tools and frameworks for your project</p>
                                <div className="tech-stack-grid">
                                    {service.techStack.map((tech, idx) => (
                                        <div key={idx} className="tech-stack-card">
                                            <FaShieldAlt className="tech-stack-icon" />
                                            <span>{tech}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Related Services */}
                    {relatedServices.length > 0 && (
                        <div className="related-services">
                            <h2 className="section-title">Explore Other Services</h2>
                            <div className="related-services-grid">
                                {relatedServices.map((relatedService) => {
                                    const RelatedIcon = getIcon(relatedService.icon);
                                    return (
                                        <Link
                                            key={relatedService.id}
                                            href={`/services/${relatedService.slug}`}
                                            className="related-service-card"
                                        >
                                            <div className="related-service-image">
                                                <Image
                                                    src={relatedService.image}
                                                    alt={relatedService.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                            <div className="related-service-content">
                                                <div className="related-service-icon">
                                                    {RelatedIcon && <RelatedIcon />}
                                                </div>
                                                <h3 className="related-service-title">{relatedService.title}</h3>
                                                <p className="related-service-tagline">{relatedService.tagline}</p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* CTA Section */}
                    <div className="cta-wrapper">
                        <div className="cta-box">
                            <h3>Ready to Get Started with {service.title}?</h3>
                            <p>Contact us today to discuss your project requirements and get a personalized quote.</p>
                            <div className="cta-buttons">
                                <Button href="/contact" variant="primary">
                                    {service.cta} <FaArrowRight />
                                </Button>
                                <Button href="/services" variant="outline">
                                    Explore Other Services
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
