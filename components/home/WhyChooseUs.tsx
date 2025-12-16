import SectionTitle from '../ui/SectionTitle';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

// Helper to resolve icon from string name
const getIcon = (iconName: string) => {
    const icons = { ...FaIcons, ...SiIcons };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (icons as any)[iconName];
};

const reasons = [
    {
        title: 'Expert Team',
        description: 'Our developers are top 1% talent with deep industry expertise.',
        icon: 'FaUserTie'
    },
    {
        title: 'Proven Track Record',
        description: 'Over 50+ successful projects delivered for Global 500 clients.',
        icon: 'FaChartLine'
    },
    {
        title: 'Scalable Solutions',
        description: 'Architecture designed to grow with your business needs.',
        icon: 'FaExpandArrowsAlt'
    },
    {
        title: 'Agile Methodology',
        description: 'Flexible development process with rapid iteration and feedback.',
        icon: 'FaSync'
    }
];

export default function WhyChooseUs() {
    return (
        <section className="section choose-us-section">
            <div className="container">
                <SectionTitle title="Why Choose Us" subtitle="Our Advantage" />

                <div className="grid grid-4">
                    {reasons.map((reason, index) => {
                        const Icon = getIcon(reason.icon);
                        return (
                            <div key={index} className="reason-card">
                                <div className="icon-wrapper">
                                    {Icon && <Icon />}
                                </div>
                                <h3 className="reason-title">{reason.title}</h3>
                                <p className="reason-text">{reason.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
