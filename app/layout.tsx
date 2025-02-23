import { Navbar } from "@/components/navigation/navbar";
import FooterSection from "@/components/sections/footer/default";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-poppins",
});

const montserrat = Montserrat({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-montserrat",
});

export const metadata: Metadata = {
    title: "Projeli",
    description:
        "Projeli is a platform for all creators to share their projects and wiki pages.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider
            appearance={{
                variables: {
                    colorPrimary: "hsl(221 90% 44%)",
                },
            }}
        >
            <html lang="en" suppressHydrationWarning>
                <body
                    className={`${poppins.style.fontFamily} ${montserrat.style.fontFamily} antialiased flex flex-col min-h-screen`}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Navbar />
                        <main className="flex flex-grow flex-col">
                            {children}
                        </main>
                        <FooterSection />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
