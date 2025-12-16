'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaLinkedin, FaTwitter, FaGithub, FaDribbble, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // Don't show footer on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-col">
            <Link href="/" className="nav-logo footer-logo">
              <Image
                src="/logo.png"
                alt="Fortune Tech Logo"
                width={150}
                height={150}
                className="footer-logo-img"
              />
            </Link>
            <p className="footer-text">
              Transforming businesses through innovative technology solutions.
              We build digital experiences that drive growth and create lasting impact.
            </p>
            <div className="social-links">
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="GitHub"><FaGithub /></a>
              <a href="#" aria-label="Dribbble"><FaDribbble /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/portfolio">Portfolio</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><Link href="/services#web-dev">Web Development</Link></li>
              <li><Link href="/services#mobile-app">Mobile Apps</Link></li>
              <li><Link href="/services#ui-ux">UI/UX Design</Link></li>
              <li><Link href="/services#cloud-devops">Cloud Solutions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">Get in Touch</h4>
            <ul className="contact-list">
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <span>123 Tech Avenue, Silicon Valley, CA 94000</span>
              </li>
              <li>
                <FaPhone className="contact-icon" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li>
                <FaEnvelope className="contact-icon" />
                <span>hello@fortunetech.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Fortune Tech. All rights reserved. Built with ❤️ for innovation.</p>
        </div>
      </div>
    </footer>
  );
}
