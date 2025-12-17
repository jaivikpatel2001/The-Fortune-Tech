'use client';

import Image from 'next/image';
import Link from 'next/link';
import SectionTitle from '../ui/SectionTitle';
import testimonialData from '../../data/testimonials.json';
import { FaQuoteLeft, FaStar, FaLinkedin, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';

interface Testimonial {
  id: number;
  slug: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  serviceProvided: string;
  projectType: string;
  rating: number;
  content: string;
  metrics: {
    [key: string]: string;
  };
  avatar: string;
  linkedin: string | null;
  website: string | null;
  verified: boolean;
  featured: boolean;
}

export default function Testimonials() {
  const testimonials = testimonialData as unknown as Testimonial[];

  const avatarImages: Record<number, string> = {
    1: '/images/testimonials/sarah.png',
    2: '/images/testimonials/michael.png',
    3: '/images/testimonials/emily.png',
  };

  // Render star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} className={`star ${i < rating ? 'filled' : 'empty'}`} />
    ));
  };

  return (
    <section className="section testimonials-section">
      <div className="container">
        <SectionTitle
          title="What Our Clients Say"
          subtitle="Testimonials"
        />

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`testimonial-card-new ${testimonial.featured ? 'featured' : ''}`}
            >
              {/* Header */}
              <div className="testimonial-header">
                <div className="quote-icon-wrapper">
                  <FaQuoteLeft />
                </div>
                {testimonial.verified && (
                  <div className="verified-badge">
                    <FaCheckCircle /> Verified
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="testimonial-rating">
                {renderStars(testimonial.rating)}
              </div>

              {/* Content */}
              <p className="testimonial-text">&ldquo;{testimonial.content}&rdquo;</p>

              {/* Metrics */}
              <div className="testimonial-metrics">
                {Object.entries(testimonial.metrics).slice(0, 2).map(([key, value]) => (
                  <div key={key} className="metric-badge">
                    <span className="metric-val">{value}</span>
                    <span className="metric-key">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </div>
                ))}
              </div>

              {/* Service Tag */}
              <div className="testimonial-service">
                <span className="service-label">{testimonial.serviceProvided}</span>
              </div>

              {/* Author */}
              <div className="testimonial-author-new">
                <div className="author-avatar-new">
                  <Image
                    src={avatarImages[testimonial.id] || '/images/testimonials/sarah.png'}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="author-details">
                  <h4 className="author-name-new">{testimonial.name}</h4>
                  <span className="author-title">{testimonial.role}</span>
                  <span className="author-company">{testimonial.company}</span>
                </div>
                <div className="author-links">
                  {testimonial.linkedin && (
                    <Link href={testimonial.linkedin} target="_blank" className="author-link" aria-label="LinkedIn">
                      <FaLinkedin />
                    </Link>
                  )}
                  {testimonial.website && (
                    <Link href={testimonial.website} target="_blank" className="author-link" aria-label="Website">
                      <FaExternalLinkAlt />
                    </Link>
                  )}
                </div>
              </div>

              {/* Industry Badge */}
              <div className="testimonial-footer">
                <span className="industry-badge">{testimonial.industry}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
