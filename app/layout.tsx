import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Providers from "@/components/Providers";

export const metadata: Metadata = {
    title: "Trendy Men Tunisia | Mode Homme Premium",
    description: "Découvrez la meilleure collection de vêtements pour homme en Tunisie.",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="fr">
            <body className="bg-background text-foreground min-h-screen flex flex-col">
                <Providers>
                    <Navbar />
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
