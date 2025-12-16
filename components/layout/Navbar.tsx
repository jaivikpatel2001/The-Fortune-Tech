'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaSun, FaMoon, FaUser, FaUserPlus } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Technologies', href: '/technologies' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Don't show navbar on admin pages
    if (pathname?.startsWith('/admin')) {
        return null;
    }

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <Link href="/" className="nav-logo" onClick={() => setIsOpen(false)}>
                    <Image
                        src="/logo.png"
                        alt="Fortune Tech Logo"
                        width={150}
                        height={150}
                        className="nav-logo-img"
                    />


                </Link>

                {/* Desktop Menu */}
                <div className="nav-links">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="nav-actions">
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
                    </button>

                    <Link href="/login" className="btn btn-ghost nav-auth-btn">
                        <FaUser size={14} />
                        <span>Login</span>
                    </Link>

                    <Link href="/signup" className="btn btn-primary nav-auth-btn">
                        <FaUserPlus size={14} />
                        <span>Sign Up</span>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="mobile-actions">
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
                    </button>
                    <button
                        className="mobile-menu-btn"
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="mobile-menu">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`mobile-nav-link ${pathname === link.href ? 'active' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="mobile-auth-buttons">
                            <Link href="/login" className="btn btn-outline mobile-auth-btn" onClick={() => setIsOpen(false)}>
                                <FaUser size={14} />
                                <span>Login</span>
                            </Link>
                            <Link href="/signup" className="btn btn-primary mobile-auth-btn" onClick={() => setIsOpen(false)}>
                                <FaUserPlus size={14} />
                                <span>Sign Up</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav >
    );
}
