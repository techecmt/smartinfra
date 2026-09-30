import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const title =
  "Smart Infratech | Infrastructure, Engineering & Renovation Solutions Singapore";
const description =
  "Smart Infratech Pte. Ltd. provides construction, engineering, M&E, renovation, inspection, consultancy and infrastructure-related solutions for commercial and private environments in Singapore.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "Smart Infratech",
  openGraph: {
    title,
    description,
    siteName: "Smart Infratech",
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-SG"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="min-h-dvh bg-white text-ink">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
