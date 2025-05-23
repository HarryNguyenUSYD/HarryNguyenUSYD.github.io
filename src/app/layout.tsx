import type { Metadata } from "next";
import { Afacad_Flux } from "next/font/google";
import "./globals.css";

const afacad_flux = Afacad_Flux({
    variable: "--font-afacad_flux",
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "Welcome to Harry's website",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${afacad_flux.className} antialiased pt-10`}
            >
                {children}
            </body>
        </html>
    );
}
