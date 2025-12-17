import SectionTitle from '../ui/SectionTitle';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import websiteConfig from '../../data/website-config.json';

// Helper to resolve icon from string name
const getIcon = (iconName: string) => {
    const icons = { ...FaIcons, ...SiIcons };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (icons as any)[iconName];
};

export default function WhyChooseUs() {
    const { whyChooseUs } = websiteConfig;

    return (
        <section className="section choose-us-section">
            <div className="container">
                <SectionTitle title={whyChooseUs.title} subtitle={whyChooseUs.subtitle} />

                <div className="grid grid-4">
                    {whyChooseUs.features.map((feature, index) => {
                        const Icon = getIcon(feature.icon);
                        return (
                            <div key={index} className="reason-card">
                                <div className="icon-wrapper">
                                    {Icon && <Icon />}
                                </div>
                                <h3 className="reason-title">{feature.title}</h3>
                                <p className="reason-text">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
