import SectionTitle from '../ui/SectionTitle';
import technologiesData from '../../data/technologies.json';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

// Combined icons
const AllIcons = { ...FaIcons, ...SiIcons };

export default function TechStack() {
  // Flatten items for marquee or display categorized
  // For home page, let's display a marquee or a simple grid of top techs
  // Let's take first 2 items from each category for a highlight reel

  const highlightedTechs = technologiesData.flatMap(cat => cat.items.slice(0, 3));

  return (
    <section className="section tech-section">
      <div className="container">
        <SectionTitle title="Technologies We Use" subtitle="Our Stack" />

        <div className="tech-grid">
          {highlightedTechs.map((tech, index) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Icon = (AllIcons as any)[tech.icon];
            return (
              <div key={index} className="tech-item" title={tech.name}>
                {Icon && <Icon className="tech-icon" />}
                <span className="tech-name">{tech.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
