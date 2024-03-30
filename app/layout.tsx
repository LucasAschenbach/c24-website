import type { Metadata } from "next";
import { Raleway, Inter, Montserrat, Cabin, DM_Sans, DM_Mono, Merriweather } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });
const raleway = Raleway({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });
const cabin = Cabin({ subsets: ["latin"] });
const dmSans = DM_Sans({ subsets: ["latin"] });
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: "300"
});

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
      <body className={raleway.className}>{children}</body>
    </html>
  );
}
