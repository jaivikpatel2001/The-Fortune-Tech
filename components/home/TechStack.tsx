'use client';

import { useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import technologiesData from '../../data/technologies.json';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import { FaCode, FaServer, FaDatabase, FaCloud, FaArrowRight, FaStar } from 'react-icons/fa';
import Link from 'next/link';

// Combined icons
const AllIcons = { ...FaIcons, ...SiIcons };

interface TechItem {
  name: string;
  icon: string;
  expertiseLevel: string;
  experienceYears: number;
  useCases: string[];
  featured: boolean;
}

interface TechCategory {
  category: string;
  slug: string;
  description: string;
  items: TechItem[];
}

// Category icons mapping
const categoryIcons: { [key: string]: React.ComponentType } = {
  'Frontend': FaCode,
  'Backend': FaServer,
  'Database': FaDatabase,
  'Cloud & Tools': FaCloud,
};

// Category colors
const categoryColors: { [key: string]: { primary: string; glow: string } } = {
  'Frontend': { primary: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.2)' },
  'Backend': { primary: '#06b6d4', glow: 'rgba(6, 182, 212, 0.2)' },
  'Database': { primary: '#22c55e', glow: 'rgba(34, 197, 94, 0.2)' },
  'Cloud & Tools': { primary: '#f59e0b', glow: 'rgba(245, 158, 11, 0.2)' },
};

// Expertise level colors
const expertiseColors: { [key: string]: string } = {
  'Expert': '#22c55e',
  'Advanced': '#8b5cf6',
  'Intermediate': '#06b6d4',
  'Beginner': '#f59e0b',
};

export default function TechStack() {
  const [activeTab, setActiveTab] = useState(0);
  const technologies = technologiesData as TechCategory[];

  return (
    <section className="section tech-section">
      <div className="container">
        <SectionTitle
          title="Technologies We Use"
          subtitle="Our Tech Stack"
        />

        {/* Tab Navigation */}
        <div className="home-tech-tabs">
          {technologies.map((category, index) => {
            const CategoryIcon = categoryIcons[category.category] || FaCode;
            const isActive = activeTab === index;
            const colors = categoryColors[category.category];

            return (
              <button
                key={index}
                className={`home-tech-tab ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
                style={{
                  '--tab-color': colors?.primary,
                  '--tab-glow': colors?.glow,
                } as React.CSSProperties}
              >
                <span className="home-tech-tab-icon">
                  <CategoryIcon />
                </span>
                <span className="home-tech-tab-label">{category.category}</span>
              </button>
            );
          })}
        </div>

        {/* Category Description */}
        <div className="tech-category-desc">
          <p>{technologies[activeTab]?.description}</p>
        </div>

        {/* Tab Content */}
        <div className="home-tech-content">
          {technologies.map((category, index) => {
            if (activeTab !== index) return null;
            const colors = categoryColors[category.category];

            return (
              <div key={index} className="home-tech-grid-new">
                {category.items.map((tech, idx) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const Icon = (AllIcons as any)[tech.icon];

                  return (
                    <div
                      key={idx}
                      className={`home-tech-card-new ${tech.featured ? 'featured' : ''}`}
                      style={{
                        '--card-color': colors?.primary,
                        '--card-glow': colors?.glow,
                        animationDelay: `${idx * 0.1}s`,
                      } as React.CSSProperties}
                    >
                      {/* Featured Star */}
                      {tech.featured && (
                        <div className="tech-featured-star">
                          <FaStar />
                        </div>
                      )}

                      {/* Icon */}
                      <div className="tech-card-icon-new">
                        {Icon && <Icon />}
                      </div>

                      {/* Name */}
                      <span className="tech-card-name-new">{tech.name}</span>

                      {/* Expertise Badge */}
                      <span
                        className="tech-expertise-badge"
                        style={{
                          '--expertise-color': expertiseColors[tech.expertiseLevel]
                        } as React.CSSProperties}
                      >
                        {tech.expertiseLevel}
                      </span>

                      {/* Experience */}
                      <span className="tech-experience">
                        {tech.experienceYears}+ years
                      </span>

                      {/* Use Cases (show on hover) */}
                      <div className="tech-use-cases">
                        {tech.useCases.slice(0, 2).map((useCase, i) => (
                          <span key={i} className="use-case-tag">{useCase}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="home-tech-footer">
          <Link href="/technologies" className="btn btn-outline home-tech-link">
            View All Technologies <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
