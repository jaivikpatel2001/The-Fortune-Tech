import Image from 'next/image';
import PageHeader from '../../components/ui/PageHeader';
import portfolioData from '../../data/portfolio.json';

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        title="Our Portfolio"
        subtitle="Explore our latest projects and see how we've helped businesses transform their digital presence."
      />

      <section className="section">
        <div className="container">
          <div className="portfolio-grid">
            {portfolioData.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="project-content">
                  <span className="project-category">{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
