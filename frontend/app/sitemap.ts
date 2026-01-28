/**
 * Dynamic sitemap generation for SEO
 * Helps search engines discover and index all pages
 */

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thefortunetech.com';
    const currentDate = new Date();

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/technologies`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/portfolio`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/careers`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
    ];

    // In the future, you can dynamically fetch portfolio items and services
    // and add them to the sitemap. Example:
    //
    // const services = await fetchServices();
    // const servicePages = services.map(service => ({
    //     url: `${baseUrl}/services/${service.slug}`,
    //     lastModified: new Date(service.updatedAt),
    //     changeFrequency: 'monthly' as const,
    //     priority: 0.7,
    // }));
    //
    // return [...staticPages, ...servicePages];

    return staticPages;
}
