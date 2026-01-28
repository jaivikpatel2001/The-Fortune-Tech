/**
 * Database Seed Script
 * Seeds the database with initial data
 */

import mongoose from 'mongoose';
import { env } from '../config/env';
import { User, Service, Portfolio, TechnologyCategory, Testimonial, Career, CMSPage, WebsiteConfig } from '../models';
import { USER_ROLES, USER_STATUSES, EXPERTISE_LEVELS, CMS_STATUSES, PORTFOLIO_STATUSES, JOB_TYPES } from '../constants';

const seedData = async (): Promise<void> => {
    try {
        console.log('🌱 Connecting to database...');
        await mongoose.connect(env.MONGODB_URI);
        console.log('✅ Connected to database');

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await Promise.all([
            User.deleteMany({}),
            Service.deleteMany({}),
            Portfolio.deleteMany({}),
            TechnologyCategory.deleteMany({}),
            Testimonial.deleteMany({}),
            Career.deleteMany({}),
            CMSPage.deleteMany({}),
            WebsiteConfig.deleteMany({}),
        ]);

        // Seed Admin User
        console.log('👤 Creating admin user...');
        const adminUser = await User.create({
            email: 'admin@thefortunetech.com',
            password: 'Admin@123',
            firstName: 'Admin',
            lastName: 'User',
            displayName: 'Admin',
            role: USER_ROLES.SUPER_ADMIN,
            status: USER_STATUSES.ACTIVE,
            metadata: {
                isVerified: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        console.log(`  ✅ Admin user created: ${adminUser.email}`);

        // Seed Services
        console.log('📦 Creating services...');
        const services = await Service.create([
            {
                slug: 'web-development',
                title: 'Web Development',
                tagline: 'Transform your vision into a powerful web presence',
                description: 'We build modern, responsive, and high-performance web applications using cutting-edge technologies.',
                overview: 'Our web development service covers everything from simple landing pages to complex enterprise applications.',
                icon: 'FiCode',
                features: ['Custom Web Applications', 'Progressive Web Apps', 'API Development', 'Database Design'],
                deliverables: ['Source Code', 'Documentation', 'Deployment'],
                process: ['Discovery', 'Design', 'Development', 'Testing', 'Deployment'],
                techStack: ['React', 'Next.js', 'Node.js', 'MongoDB'],
                benefits: ['Scalable Solutions', 'Modern Architecture', 'Performance Optimized'],
                idealFor: ['Startups', 'Enterprises', 'E-commerce'],
                cta: 'Get Started',
                seo: {
                    metaTitle: 'Web Development Services | The Fortune Tech',
                    metaDescription: 'Professional web development services for businesses of all sizes.',
                },
                featured: true,
            },
            {
                slug: 'mobile-app-development',
                title: 'Mobile App Development',
                tagline: 'Build apps that users love',
                description: 'Native and cross-platform mobile applications for iOS and Android.',
                overview: 'We create mobile apps that provide seamless user experiences.',
                icon: 'FiSmartphone',
                features: ['iOS Apps', 'Android Apps', 'Cross-Platform', 'App Store Optimization'],
                deliverables: ['App Source Code', 'Store Listings', 'Analytics Setup'],
                process: ['Planning', 'UI/UX Design', 'Development', 'Testing', 'Launch'],
                techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
                benefits: ['Native Performance', 'Cross-Platform', 'User-Centric Design'],
                idealFor: ['Consumer Apps', 'Enterprise Apps', 'Startups'],
                cta: 'Build Your App',
                seo: {
                    metaTitle: 'Mobile App Development | The Fortune Tech',
                    metaDescription: 'Expert mobile app development for iOS and Android.',
                },
                featured: true,
            },
            {
                slug: 'ui-ux-design',
                title: 'UI/UX Design',
                tagline: 'Design experiences that delight',
                description: 'User-centered design that balances aesthetics with functionality.',
                overview: 'From wireframes to prototypes, we design interfaces that users love.',
                icon: 'FiLayout',
                features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
                deliverables: ['Design Files', 'Style Guides', 'Prototypes'],
                process: ['Research', 'Ideation', 'Design', 'Validation'],
                techStack: ['Figma', 'Adobe XD', 'Sketch'],
                benefits: ['Increased Engagement', 'Better Conversion', 'Brand Consistency'],
                idealFor: ['Web Apps', 'Mobile Apps', 'SaaS Products'],
                cta: 'Start Design',
                seo: {
                    metaTitle: 'UI/UX Design Services | The Fortune Tech',
                    metaDescription: 'Professional UI/UX design services.',
                },
                featured: true,
            },
        ]);
        console.log(`  ✅ Created ${services.length} services`);

        // Seed Portfolio
        console.log('🎨 Creating portfolio items...');
        const portfolios = await Portfolio.create([
            {
                slug: 'ecommerce-platform',
                title: 'E-Commerce Platform',
                category: 'Web Development',
                industry: 'Retail',
                client: { name: 'Fashion Store', location: 'New York, USA' },
                description: 'A full-featured e-commerce platform with real-time inventory management.',
                keyFeatures: ['Real-time Inventory', 'Payment Integration', 'Order Management'],
                techStack: { Frontend: ['React', 'Redux'], Backend: ['Node.js', 'MongoDB'] },
                metrics: { 'Page Load': '< 2s', 'Uptime': '99.9%' },
                timeline: '4 months',
                status: PORTFOLIO_STATUSES.LIVE,
                servicesProvided: ['Web Development', 'UI/UX Design'],
                links: { live: 'https://example.com' },
                featured: true,
            },
            {
                slug: 'health-app',
                title: 'Health & Fitness App',
                category: 'Mobile Development',
                industry: 'Healthcare',
                client: { name: 'FitLife', location: 'San Francisco, USA' },
                description: 'A comprehensive health tracking mobile application.',
                keyFeatures: ['Activity Tracking', 'Nutrition Log', 'Health Insights'],
                techStack: { Mobile: ['React Native', 'Firebase'] },
                metrics: { 'Downloads': '50K+', 'Rating': '4.8' },
                timeline: '6 months',
                status: PORTFOLIO_STATUSES.LIVE,
                servicesProvided: ['Mobile Development', 'UI/UX Design'],
                links: { live: 'https://example.com/app' },
                featured: true,
            },
        ]);
        console.log(`  ✅ Created ${portfolios.length} portfolio items`);

        // Seed Technologies
        console.log('🔧 Creating technology categories...');
        const technologies = await TechnologyCategory.create([
            {
                slug: 'frontend',
                category: 'Frontend',
                description: 'Modern frontend technologies for building user interfaces',
                items: [
                    { name: 'React', icon: 'react', expertiseLevel: EXPERTISE_LEVELS.EXPERT, experienceYears: 5, useCases: ['Web Apps', 'SPAs'], featured: true },
                    { name: 'Next.js', icon: 'nextjs', expertiseLevel: EXPERTISE_LEVELS.EXPERT, experienceYears: 4, useCases: ['SSR', 'Static Sites'], featured: true },
                    { name: 'TypeScript', icon: 'typescript', expertiseLevel: EXPERTISE_LEVELS.EXPERT, experienceYears: 4, useCases: ['Type Safety', 'Large Apps'], featured: true },
                ],
            },
            {
                slug: 'backend',
                category: 'Backend',
                description: 'Server-side technologies and databases',
                items: [
                    { name: 'Node.js', icon: 'nodejs', expertiseLevel: EXPERTISE_LEVELS.EXPERT, experienceYears: 6, useCases: ['APIs', 'Microservices'], featured: true },
                    { name: 'Express', icon: 'express', expertiseLevel: EXPERTISE_LEVELS.EXPERT, experienceYears: 6, useCases: ['REST APIs', 'Middleware'], featured: true },
                    { name: 'MongoDB', icon: 'mongodb', expertiseLevel: EXPERTISE_LEVELS.ADVANCED, experienceYears: 5, useCases: ['NoSQL', 'Flexible Schema'], featured: true },
                ],
            },
        ]);
        console.log(`  ✅ Created ${technologies.length} technology categories`);

        // Seed Testimonials
        console.log('💬 Creating testimonials...');
        const testimonials = await Testimonial.create([
            {
                slug: 'john-smith-techcorp',
                name: 'John Smith',
                role: 'CEO',
                company: 'TechCorp',
                industry: 'Technology',
                rating: 5,
                content: 'The Fortune Tech delivered an exceptional product that exceeded our expectations. Their attention to detail and commitment to quality is unmatched.',
                verified: true,
                featured: true,
            },
            {
                slug: 'sarah-johnson-retailco',
                name: 'Sarah Johnson',
                role: 'CTO',
                company: 'RetailCo',
                industry: 'Retail',
                rating: 5,
                content: 'Working with The Fortune Tech was a game-changer for our business. They transformed our digital presence completely.',
                verified: true,
                featured: true,
            },
        ]);
        console.log(`  ✅ Created ${testimonials.length} testimonials`);

        // Seed Careers
        console.log('💼 Creating career listings...');
        const careers = await Career.create([
            {
                title: 'Senior Frontend Developer',
                department: 'Engineering',
                location: 'Remote',
                experience: '5+ years',
                type: JOB_TYPES.FULL_TIME,
                description: 'We are looking for a Senior Frontend Developer to join our team.',
                requirements: ['5+ years React experience', 'TypeScript proficiency', 'Team leadership'],
                benefits: ['Competitive salary', 'Health insurance', 'Remote work'],
                applyLink: 'mailto:careers@thefortunetech.com',
            },
            {
                title: 'UI/UX Designer',
                department: 'Design',
                location: 'Hybrid',
                experience: '3+ years',
                type: JOB_TYPES.FULL_TIME,
                description: 'Join our design team to create beautiful user experiences.',
                requirements: ['3+ years design experience', 'Figma expertise', 'User research skills'],
                benefits: ['Creative environment', 'Learning budget', 'Flexible hours'],
                applyLink: 'mailto:careers@thefortunetech.com',
            },
        ]);
        console.log(`  ✅ Created ${careers.length} career listings`);

        // Seed CMS Pages
        console.log('📄 Creating CMS pages...');
        const cmsPages = await CMSPage.create([
            {
                slug: 'about-us',
                title: 'About Us',
                status: CMS_STATUSES.PUBLISHED,
                metaTitle: 'About Us | The Fortune Tech',
                metaDescription: 'Learn about The Fortune Tech and our mission.',
                content: '## About The Fortune Tech\n\nWe are a team of passionate developers and designers dedicated to building exceptional digital products.',
            },
            {
                slug: 'privacy-policy',
                title: 'Privacy Policy',
                status: CMS_STATUSES.PUBLISHED,
                metaTitle: 'Privacy Policy | The Fortune Tech',
                metaDescription: 'Our privacy policy and data protection practices.',
                content: '## Privacy Policy\n\nYour privacy is important to us. This policy explains how we collect, use, and protect your data.',
            },
        ]);
        console.log(`  ✅ Created ${cmsPages.length} CMS pages`);

        // Seed Website Config
        console.log('⚙️  Creating website config...');
        await WebsiteConfig.create({
            site: {
                name: 'The Fortune Tech',
                tagline: 'Transforming Ideas into Digital Reality',
                description: 'We build exceptional web and mobile applications for businesses of all sizes.',
                url: 'https://thefortunetech.com',
            },
            company: {
                legalName: 'The Fortune Tech',
                email: 'info@thefortunetech.com',
                phone: '+1 (555) 123-4567',
                address: {
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'USA',
                },
            },
            social: {
                linkedin: 'https://linkedin.com/company/thefortunetech',
                github: 'https://github.com/thefortunetech',
                twitter: 'https://twitter.com/thefortunetech',
            },
            seo: {
                title: 'The Fortune Tech | Web & Mobile Development',
                description: 'Expert web and mobile development services.',
                keywords: ['web development', 'mobile apps', 'software development'],
            },
            features: {
                blog: true,
                careers: true,
                testimonials: true,
            },
        });
        console.log(`  ✅ Created website config`);

        console.log('\n🎉 Database seeding completed successfully!\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Admin Login Credentials:');
        console.log(`  Email: admin@thefortunetech.com`);
        console.log(`  Password: Admin@123`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from database');
    }
};

seedData();
