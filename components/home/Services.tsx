import Card from '../ui/Card';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import serviceData from '../../data/services.json';

export default function Services() {
    // Only show first 3 services on home page
    const displayedServices = serviceData.slice(0, 3);

    return (
        <section className="section services-section">
            <div className="container">
                <SectionTitle
                    title="Our Expertise"
                    subtitle="What We Do"
                />

                <div className="grid grid-3">
                    {displayedServices.map((service) => (
                        <Card
                            key={service.id}
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                        />
                    ))}
                </div>

                <div className="flex justify-center" style={{ marginTop: '3rem' }}>
                    <Button href="/services" variant="outline">
                        View All Services
                    </Button>
                </div>
            </div>
        </section>
    );
}
