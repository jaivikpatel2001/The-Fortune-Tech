'use client';

import { useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import technologiesData from '../../data/technologies.json';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import { FaCode, FaServer, FaDatabase, FaCloud, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

// Combined icons
const AllIcons = { ...FaIcons, ...SiIcons };

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

export default function TechStack() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="section tech-section">
      <div className="container">
        <SectionTitle
          title="Technologies We Use"
          subtitle="Our Tech Stack"
        />

        {/* Tab Navigation */}
        <div className="home-tech-tabs">
          {technologiesData.map((category, index) => {
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

        {/* Tab Content */}
        <div className="home-tech-content">
          {technologiesData.map((category, index) => {
            if (activeTab !== index) return null;
            const colors = categoryColors[category.category];

            return (
              <div key={index} className="home-tech-grid">
                {category.items.map((tech, idx) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const Icon = (AllIcons as any)[tech.icon];

                  return (
                    <div
                      key={idx}
                      className="home-tech-card"
                      style={{
                        '--card-color': colors?.primary,
                        '--card-glow': colors?.glow,
                        animationDelay: `${idx * 0.1}s`,
                      } as React.CSSProperties}
                    >
                      <div className="home-tech-card-icon">
                        {Icon && <Icon />}
                      </div>
                      <span className="home-tech-card-name">{tech.name}</span>
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
