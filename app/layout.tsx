import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/variables.css";
import "../styles/globals.css";
import "../styles/layout.css";
import "../styles/components.css";
import "../styles/auth.css";
import "../styles/admin.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { ThemeProvider } from "../contexts/ThemeContext";

// Optimized font loading using next/font
// This automaticallysubsets the font and serves it from your domain
// with optimal caching and font-display: swap
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
    // Only load the weights we actually use
    weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: {
        template: '%s | Fortune Tech',
        default: 'Fortune Tech - Premium IT Consulting & Development',
    },
    description: "Transform your business with cutting-edge technology solutions. We build premium web and mobile experiences that drive growth and deliver results.",
    keywords: ["IT Consulting", "Web Development", "Mobile App", "UI/UX Design", "Next.js", "React", "Software Development"],
    authors: [{ name: "Fortune Tech" }],
    openGraph: {
        type: "website",
        locale: "en_US",
        siteName: "Fortune Tech",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable} suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider>
                    <Navbar />
                    <main style={{ minHeight: '100vh' }}>
                        {children}
                    </main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}

