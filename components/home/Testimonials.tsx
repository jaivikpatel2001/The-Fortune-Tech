import Image from 'next/image';
import SectionTitle from '../ui/SectionTitle';
import testimonialData from '../../data/testimonials.json';
import { FaQuoteLeft } from 'react-icons/fa';

export default function Testimonials() {
  const avatarImages: Record<number, string> = {
    1: '/images/testimonials/sarah.png',
    2: '/images/testimonials/michael.png',
    3: '/images/testimonials/emily.png',
  };

  return (
    <section className="section testimonials-section">
      <div className="container">
        <SectionTitle
          title="What Our Clients Say"
          subtitle="Testimonials"
        />

        <div className="grid grid-3">
          {testimonialData.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="quote-icon">
                <FaQuoteLeft />
              </div>
              <p className="testimonial-content">"{testimonial.content}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <Image
                    src={avatarImages[testimonial.id] || '/images/testimonials/sarah.png'}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <span className="author-role">{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
