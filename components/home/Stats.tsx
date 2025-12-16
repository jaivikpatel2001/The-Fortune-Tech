'use client';

import { useEffect, useRef, useState } from 'react';
import { FaRocket, FaUsers, FaAward, FaClock, FaCode, FaGlobe } from 'react-icons/fa';

const stats = [
    {
        icon: FaRocket,
        value: 150,
        suffix: '+',
        label: 'Projects Delivered',
        description: 'Successfully completed',
    },
    {
        icon: FaUsers,
        value: 50,
        suffix: '+',
        label: 'Happy Clients',
        description: 'Worldwide partnerships',
    },
    {
        icon: FaAward,
        value: 8,
        suffix: '+',
        label: 'Years Experience',
        description: 'Industry expertise',
    },
    {
        icon: FaCode,
        value: 99,
        suffix: '%',
        label: 'Client Satisfaction',
        description: 'Excellence delivered',
    },
];

// Animated counter hook
function useCountUp(end: number, duration: number = 2000, startCounting: boolean = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!startCounting) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, startCounting]);

    return count;
}

function StatCard({ stat, index, isVisible }: { stat: typeof stats[0]; index: number; isVisible: boolean }) {
    const count = useCountUp(stat.value, 2000, isVisible);
    const Icon = stat.icon;

    return (
        <div
            className="stats-card"
            style={{ animationDelay: `${index * 0.15}s` }}
        >
            <div className="stats-card-icon">
                <Icon />
            </div>
            <div className="stats-card-content">
                <div className="stats-card-value">
                    {count}{stat.suffix}
                </div>
                <div className="stats-card-label">{stat.label}</div>
                <div className="stats-card-description">{stat.description}</div>
            </div>
            <div className="stats-card-glow" />
        </div>
    );
}

export default function Stats() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="stats-section section ">
            <div className="stats-bg-decoration">
                <div className="stats-bg-circle stats-bg-circle-1" />
                <div className="stats-bg-circle stats-bg-circle-2" />
            </div>

            <div className="container">
                <div className="stats-header">
                    <span className="stats-badge">Our Impact</span>
                    <h2 className="stats-title">
                        Numbers That <span className="gradient-text">Speak</span>
                    </h2>
                    <p className="stats-subtitle">
                        Years of dedication, innovation, and client success stories
                    </p>
                </div>

                <div className={`stats-grid ${isVisible ? 'visible' : ''}`}>
                    {stats.map((stat, index) => (
                        <StatCard key={index} stat={stat} index={index} isVisible={isVisible} />
                    ))}
                </div>

                <div className="stats-footer">
                    <div className="stats-testimonial">
                        <FaGlobe className="stats-testimonial-icon" />
                        <p>Trusted by businesses across <strong>15+ countries</strong> worldwide</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
