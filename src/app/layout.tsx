import { Afacad_Flux } from "next/font/google";
import "./globals.css";

const afacad_flux = Afacad_Flux({
    variable: "--font-afacad_flux",
    subsets: ["latin"]
})

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
