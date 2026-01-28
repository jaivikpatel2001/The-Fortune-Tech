import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '../../components/ui/PageHeader';
import portfolioData from '../../data/portfolio.json';
import { FaArrowRight, FaStar } from 'react-icons/fa';

// Type definitions
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

// Helper to get all tech from techStack object
const getAllTech = (techStack: TechStack): string[] => {
  const allTech: string[] = [];
  Object.values(techStack).forEach((techs) => {
    allTech.push(...techs);
  });
  return allTech.slice(0, 4); // Limit to 4 tags for display
};

// Status badge color
const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'status-completed';
    case 'live':
      return 'status-live';
    default:
      return 'status-default';
  }
};

export default function PortfolioPage() {
  const projects = portfolioData as unknown as Project[];

  return (
    <>
      <PageHeader
        title="Our Portfolio"
        subtitle="Explore our latest projects and see how we've helped businesses transform their digital presence."
      />

      <section className="section">
        <div className="container">
          <div className="portfolio-grid">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className="project-card-link"
              >
                <div className="project-card">
                  {project.featured && (
                    <div className="featured-badge">
                      <FaStar /> Featured
                    </div>
                  )}
                  <div className="project-image">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="project-image-overlay">
                      <span className="view-project">
                        View Project <FaArrowRight />
                      </span>
                    </div>
                  </div>
                  <div className="project-content">
                    <div className="project-meta">
                      <span className="project-category">{project.category}</span>
                      <span className={`project-status ${getStatusClass(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-footer">
                      <div className="project-tech">
                        {getAllTech(project.techStack).map((tech, idx) => (
                          <span key={idx} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                      <span className="project-industry">{project.industry}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
