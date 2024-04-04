import type { Metadata } from "next";
import { Raleway, Inter, Montserrat } from "next/font/google";
import "./globals.css";

const raleway = Raleway({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TUM Blockchain Conference 24",
  description: "Germany's leading student-run conference exploring the frontiers of blockchain technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
