'use client';

import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import techData from '../../data/technologies.json';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import { FaCode, FaServer, FaDatabase, FaCloud } from 'react-icons/fa';

// Combine all icons
const AllIcons = { ...FaIcons, ...SiIcons };

// Category icons mapping
const categoryIcons: { [key: string]: React.ComponentType } = {
  'Frontend': FaCode,
  'Backend': FaServer,
  'Database': FaDatabase,
  'Cloud & Tools': FaCloud,
};

// Category descriptions
const categoryDescriptions: { [key: string]: string } = {
  'Frontend': 'Building beautiful, responsive, and interactive user interfaces with modern frameworks and tools.',
  'Backend': 'Powering your applications with robust, scalable, and secure server-side technologies.',
  'Database': 'Managing and storing your data efficiently with the right database solutions.',
  'Cloud & Tools': 'Deploying and managing applications with industry-leading cloud platforms and DevOps tools.',
};

// Category colors
const categoryColors: { [key: string]: { primary: string; glow: string } } = {
  'Frontend': { primary: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.2)' },
  'Backend': { primary: '#06b6d4', glow: 'rgba(6, 182, 212, 0.2)' },
  'Database': { primary: '#22c55e', glow: 'rgba(34, 197, 94, 0.2)' },
  'Cloud & Tools': { primary: '#f59e0b', glow: 'rgba(245, 158, 11, 0.2)' },
};

export default function TechnologiesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <>
      <PageHeader
        title="Our Tech Stack"
        subtitle="We leverage cutting-edge technologies to build powerful, scalable solutions"
      />

      <section className="section">
        <div className="container">
          {/* Interactive Tabs */}
          <div className="tech-tabs-container">
            <div className="tech-tabs">
              {techData.map((category, index) => {
                const CategoryIcon = categoryIcons[category.category] || FaCode;
                const isActive = activeTab === index;
                const colors = categoryColors[category.category];

                return (
                  <button
                    key={index}
                    className={`tech-tab ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveTab(index)}
                    style={{
                      '--tab-color': colors?.primary,
                      '--tab-glow': colors?.glow,
                    } as React.CSSProperties}
                  >
                    <span className="tech-tab-icon">
                      <CategoryIcon />
                    </span>
                    <span className="tech-tab-label">{category.category}</span>
                    {isActive && <span className="tech-tab-indicator" />}
                  </button>
                );
              })}
            </div>

            {/* Active Tab Content */}
            <div className="tech-content">
              {techData.map((category, index) => {
                if (activeTab !== index) return null;
                const colors = categoryColors[category.category];

                return (
                  <div key={index} className="tech-content-inner">
                    {/* Category Description */}
                    <div className="tech-category-header">
                      <p className="tech-category-description">
                        {categoryDescriptions[category.category]}
                      </p>
                    </div>

                    {/* Technology Cards */}
                    <div className="tech-cards-grid">
                      {category.items.map((item, idx) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const Icon = (AllIcons as any)[item.icon];
                        const isHovered = hoveredCard === idx;

                        return (
                          <div
                            key={idx}
                            className={`tech-card-modern ${isHovered ? 'hovered' : ''}`}
                            onMouseEnter={() => setHoveredCard(idx)}
                            onMouseLeave={() => setHoveredCard(null)}
                            style={{
                              '--card-color': colors?.primary,
                              '--card-glow': colors?.glow,
                              animationDelay: `${idx * 0.1}s`,
                            } as React.CSSProperties}
                          >
                            <div className="tech-card-icon-wrapper">
                              <div className="tech-card-icon-bg" />
                              <div className="tech-card-icon">
                                {Icon ? <Icon /> : <span>?</span>}
                              </div>
                            </div>
                            <h4 className="tech-card-name">{item.name}</h4>
                            <div className="tech-card-shine" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="tech-stats-section">
            <div className="tech-stat-card">
              <div className="tech-stat-number">20+</div>
              <div className="tech-stat-label">Technologies Mastered</div>
            </div>
            <div className="tech-stat-card">
              <div className="tech-stat-number">100%</div>
              <div className="tech-stat-label">Modern Stack</div>
            </div>
            <div className="tech-stat-card">
              <div className="tech-stat-number">5+</div>
              <div className="tech-stat-label">Cloud Platforms</div>
            </div>
            <div className="tech-stat-card">
              <div className="tech-stat-number">∞</div>
              <div className="tech-stat-label">Possibilities</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
