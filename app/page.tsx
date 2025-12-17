'use client';

import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import Services from '../components/home/Services';
import WhyChooseUs from '../components/home/WhyChooseUs';
import TechStack from '../components/home/TechStack';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';

export default function Home() {
    return (
        <>
            <Hero />
            <Stats />
            <Services />
            <WhyChooseUs />
            <TechStack />
            <Testimonials />
            <CTA />
        </>
    );
}
