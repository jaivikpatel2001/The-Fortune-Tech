import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '../../../components/ui/PageHeader';
import Button from '../../../components/ui/Button';
import portfolioData from '../../../data/portfolio.json';
import { FaArrowLeft, FaExternalLinkAlt, FaGithub, FaCheck, FaClock, FaMapMarkerAlt, FaIndustry, FaChartLine } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiPython, SiPostgresql, SiRedis, SiDocker, SiFirebase, SiStripe, SiMongodb, SiFigma } from 'react-icons/si';
import { FaReact, FaNodeJs, FaAws } from 'react-icons/fa';

// Type definitions based on the new data structure
interface TechStack {
    [key: string]: string[];
}

interface Project {
    id: number;
    slug: string;
    title: string;
    category: string;
    industry: string;
    client: {
        name: string;
        location: string;
    };
    description: string;
    keyFeatures: string[];
    techStack: TechStack;
    metrics: {
        [key: string]: string;
    };
    timeline: string;
    status: string;
    servicesProvided: string[];
    links: {
        live: string | null;
        caseStudy: string | null;
        github: string | null;
    };
    thumbnail: string;
    featured: boolean;
}

// Generate Static Params for SSG
export async function generateStaticParams() {
    return portfolioData.map((project) => ({
        slug: project.slug,
    }));
}

// Generate Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = portfolioData.find((p) => p.slug === slug);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: project.title,
        description: project.description,
    };
}

// Helper to get tech icon
const getTechIcon = (tech: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
        'Next.js': SiNextdotjs,
        'TypeScript': SiTypescript,
        'Python': SiPython,
        'FastAPI': SiPython,
        'PostgreSQL': SiPostgresql,
        'Redis': SiRedis,
        'AWS': FaAws,
        'Docker': SiDocker,
        'React': FaReact,
        'React Native': FaReact,
        'Node.js': FaNodeJs,
        'Express': FaNodeJs,
        'Firebase': SiFirebase,
        'Firebase Functions': SiFirebase,
        'Firestore': SiFirebase,
        'Stripe': SiStripe,
        'MongoDB': SiMongodb,
        'Figma': SiFigma,
        'D3.js': FaReact,
    };
    return iconMap[tech] || null;
};

// Status badge color
const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'completed':
            return 'status-completed';
        case 'live':
            return 'status-live';
        case 'in-progress':
            return 'status-progress';
        default:
            return 'status-default';
    }
};

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = portfolioData.find((p) => p.slug === slug) as Project | undefined;

    if (!project) {
        notFound();
    }


    // Get all tech items from techStack object
    const getAllTech = () => {
        const allTech: string[] = [];
        Object.values(project.techStack).forEach((techs) => {
            allTech.push(...techs);
        });
        return allTech;
    };

    return (
        <>
            <PageHeader
                title={project.title}
                subtitle={project.description}
            />

            <section className="section">
                <div className="container">
                    {/* Back Button */}
                    <Link href="/portfolio" className="back-link">
                        <FaArrowLeft /> Back to Portfolio
                    </Link>

                    {/* Project Hero */}
                    <div className="project-detail-hero">
                        <div className="project-detail-image">
                            <Image
                                src={project.thumbnail}
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 80vw"
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                            <div className="project-overlay">
                                <span className={`status-badge ${getStatusColor(project.status)}`}>
                                    {project.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Project Info Grid */}
                    <div className="project-info-grid">
                        {/* Main Content */}
                        <div className="project-main-content">
                            {/* Key Features */}
                            <div className="detail-section">
                                <h2 className="detail-section-title">Key Features</h2>
                                <ul className="feature-list">
                                    {project.keyFeatures.map((feature, idx) => (
                                        <li key={idx} className="feature-item">
                                            <FaCheck className="feature-icon" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Tech Stack */}
                            <div className="detail-section">
                                <h2 className="detail-section-title">Technology Stack</h2>
                                <div className="tech-stack-grid">
                                    {Object.entries(project.techStack).map(([category, techs]) => (
                                        <div key={category} className="tech-stack-category">
                                            <h4 className="tech-category-label">{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                                            <div className="tech-pills">
                                                {techs.map((tech, idx) => {
                                                    const Icon = getTechIcon(tech);
                                                    return (
                                                        <span key={idx} className="tech-pill">
                                                            {Icon && <Icon className="tech-pill-icon" />}
                                                            {tech}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Services Provided */}
                            <div className="detail-section">
                                <h2 className="detail-section-title">Services Provided</h2>
                                <div className="services-tags">
                                    {project.servicesProvided.map((service, idx) => (
                                        <span key={idx} className="service-tag">{service}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="project-sidebar">
                            {/* Project Details Card */}
                            <div className="sidebar-card">
                                <h3 className="sidebar-title">Project Details</h3>

                                <div className="sidebar-item">
                                    <FaIndustry className="sidebar-icon" />
                                    <div>
                                        <span className="sidebar-label">Industry</span>
                                        <span className="sidebar-value">{project.industry}</span>
                                    </div>
                                </div>

                                <div className="sidebar-item">
                                    <span className="sidebar-icon">🏢</span>
                                    <div>
                                        <span className="sidebar-label">Client</span>
                                        <span className="sidebar-value">{project.client.name}</span>
                                    </div>
                                </div>

                                <div className="sidebar-item">
                                    <FaMapMarkerAlt className="sidebar-icon" />
                                    <div>
                                        <span className="sidebar-label">Location</span>
                                        <span className="sidebar-value">{project.client.location}</span>
                                    </div>
                                </div>

                                <div className="sidebar-item">
                                    <FaClock className="sidebar-icon" />
                                    <div>
                                        <span className="sidebar-label">Timeline</span>
                                        <span className="sidebar-value">{project.timeline}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Metrics Card */}
                            <div className="sidebar-card metrics-card">
                                <h3 className="sidebar-title">
                                    <FaChartLine className="title-icon" /> Key Metrics
                                </h3>
                                <div className="metrics-grid">
                                    {Object.entries(project.metrics).map(([key, value]) => (
                                        <div key={key} className="metric-item">
                                            <span className="metric-value">{value}</span>
                                            <span className="metric-label">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="sidebar-actions">
                                {project.links.live && (
                                    <Button href={project.links.live} variant="primary" target="_blank">
                                        <FaExternalLinkAlt /> View Live Site
                                    </Button>
                                )}
                                {project.links.github && (
                                    <Button href={project.links.github} variant="outline" target="_blank">
                                        <FaGithub /> View Code
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Related Projects */}
                    <div className="related-projects">
                        <h2 className="section-title">Related Projects</h2>
                        <div className="related-grid">
                            {portfolioData
                                .filter((p) => p.id !== project.id && p.category === project.category)
                                .slice(0, 2)
                                .map((relatedProject) => (
                                    <Link
                                        key={relatedProject.id}
                                        href={`/portfolio/${relatedProject.slug}`}
                                        className="related-card"
                                    >
                                        <div className="related-image">
                                            <Image
                                                src={relatedProject.thumbnail}
                                                alt={relatedProject.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="related-content">
                                            <span className="related-category">{relatedProject.category}</span>
                                            <h3 className="related-title">{relatedProject.title}</h3>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="cta-wrapper">
                        <div className="cta-box">
                            <h3>Have a Similar Project in Mind?</h3>
                            <p>Let&apos;s discuss how we can help bring your vision to life with cutting-edge technology solutions.</p>
                            <Button href="/contact" variant="primary">Start Your Project</Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
