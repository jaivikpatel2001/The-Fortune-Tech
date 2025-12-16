import type { Metadata } from "next";
import "../styles/variables.css";
import "../styles/globals.css";
import "../styles/layout.css";
import "../styles/components.css";
import "../styles/auth.css";
import "../styles/admin.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { ThemeProvider } from "../contexts/ThemeContext";

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
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            </head>
            <body>
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
