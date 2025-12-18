'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    FaHome, FaUsers, FaCog, FaChartBar, FaBox, FaEnvelope,
    FaBell, FaSignOutAlt, FaTimes, FaBars, FaSearch, FaSun, FaMoon
} from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';

const navItems = [
    { name: 'Dashboard', href: '/admin', icon: FaHome },
    { name: 'Users', href: '/admin/users', icon: FaUsers },
    { name: 'Services', href: '/admin/services', icon: FaBox },
    { name: 'Settings', href: '/admin/settings', icon: FaCog },
];

interface AdminLayoutProps {
    children: React.ReactNode;
    pageTitle: string;
}

export default function AdminLayout({ children, pageTitle }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="admin-layout">
            {/* Sidebar Overlay */}
            <div
                className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <Link href="/admin" className="sidebar-logo">
                        <Image src="/logo.png" alt="Fortune Tech" width={100} height={100} />

                    </Link>
                    <button
                        className="sidebar-close"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FaTimes />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-section">
                        <span className="nav-section-title">Main Menu</span>
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`sidebar-nav-link ${pathname === item.href ? 'active' : ''}`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <item.icon />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </nav>

                <div className="sidebar-footer">
                    <div className="sidebar-user">
                        <div className="sidebar-user-avatar">JP</div>
                        <div className="sidebar-user-info">
                            <span className="sidebar-user-name">Jaivik Patel</span>
                            <span className="sidebar-user-role">Administrator</span>
                        </div>
                        <button className="sidebar-logout-btn" title="Logout">
                            <FaSignOutAlt />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="admin-main">
                {/* Header */}
                <header className="admin-header">
                    <div className="admin-header-left">
                        <button
                            className="mobile-menu-toggle"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <FaBars />
                        </button>
                        <h1 className="admin-page-title">{pageTitle}</h1>
                    </div>

                    <div className="admin-header-right">
                        <button
                            className="admin-header-btn"
                            onClick={toggleTheme}
                            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            {theme === 'dark' ? <FaSun /> : <FaMoon />}
                        </button>

                        <Link href="/" className="admin-header-btn" title="Go to Website">
                            <FaHome />
                        </Link>
                    </div>
                </header>

                {/* Content */}
                <main className="admin-content">
                    {children}
                </main>
            </div>
        </div>
    );
}
