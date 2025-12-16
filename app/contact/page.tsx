'use client';

import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('Form Submitted:', formData);
        alert('Thank you for reaching out! We\'ll get back to you within 24 hours.');
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
        setIsSubmitting(false);
    };

    return (
        <>
            <PageHeader
                title="Let's Work Together"
                subtitle="Have a project in mind? We'd love to hear about it. Get in touch and let's create something amazing."
            />

            <section className="section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Info */}
                        <div className="contact-info">
                            <h2 className="info-title">Get in Touch</h2>
                            <p className="info-text">
                                Whether you have a question about our services, want to discuss a new project,
                                or just want to say hello, we're always here to help.
                            </p>

                            <div className="info-list">
                                <div className="info-item">
                                    <div className="info-icon"><FaMapMarkerAlt /></div>
                                    <div>
                                        <h4 className="item-title">Visit Our Office</h4>
                                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>123 Tech Avenue, Silicon Valley, CA 94000</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-icon"><FaEnvelope /></div>
                                    <div>
                                        <h4 className="item-title">Email Us</h4>
                                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>hello@fortunetech.com</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-icon"><FaPhone /></div>
                                    <div>
                                        <h4 className="item-title">Call Us</h4>
                                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>+1 (555) 123-4567</p>
                                    </div>
                                </div>
                            </div>

                            {/* Map Embed */}
                            <div className="map-container">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.628236556408!2d-122.08374688469227!3d37.42199997982517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba02425dad8f%3A0x6c296c66619367e0!2sGoogleplex!5e0!3m2!1sen!2sus!4v1617832262791!5m2!1sen!2sus"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    title="Office Location"
                                ></iframe>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-form-wrapper">
                            <h3 className="form-title">Send a Message</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-2" style={{ gap: '1rem' }}>
                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">Full Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-input"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email" className="form-label">Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-input"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-2" style={{ gap: '1rem' }}>
                                    <div className="form-group">
                                        <label htmlFor="phone" className="form-label">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className="form-input"
                                            placeholder="+1 (555) 000-0000"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="company" className="form-label">Company</label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            className="form-input"
                                            placeholder="Your company name"
                                            value={formData.company}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message" className="form-label">Project Details *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="form-textarea"
                                        placeholder="Tell us about your project, goals, and timeline..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <Button type="submit" variant="primary" className="w-full" style={{ width: '100%' }}>
                                    {isSubmitting ? 'Sending...' : (<span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaPaperPlane /> Send Message</span>)}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
