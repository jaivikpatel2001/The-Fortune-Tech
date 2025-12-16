import PageHeader from '../../components/ui/PageHeader';
import techData from '../../data/technologies.json';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

// Combine all icons
const AllIcons = { ...FaIcons, ...SiIcons };

export default function TechnologiesPage() {
  return (
    <>
      <PageHeader
        title="Tools & Technologies"
        subtitle="We use the latest modern tech stack to build scalable and robust applications."
      />

      <section className="section">
        <div className="container">
          <div className="tech-categories">
            {techData.map((category, index) => (
              <div key={index} className="tech-category-section">
                <h3 className="category-title">{category.category}</h3>
                <div className="grid-tech-cards">
                  {category.items.map((item, idx) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Icon = (AllIcons as any)[item.icon];
                    return (
                      <div key={idx} className="tech-card">
                        <div className="icon-box">
                          {Icon ? <Icon /> : <span className="no-icon">?</span>}
                        </div>
                        <span className="tech-name">{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
