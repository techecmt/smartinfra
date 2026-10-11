import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { company } from "@/lib/content";
import { consentDefaultScript } from "@/lib/consent";
import { isOfferActive } from "@/lib/rates";
import { MotionProvider } from "@/components/motion-provider";
import { BookingProvider } from "@/components/booking/booking-provider";
import { OfferBanner } from "@/components/layout/offer-banner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TabBar } from "@/components/layout/tab-bar";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { CookieConsent } from "@/components/layout/cookie-consent";
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
  "Smart Infratech | Air Conditioning & Electrical Engineering Singapore";
const description =
  "Smart Infratech Pte. Ltd. provides aircon servicing, repair and installation, and electrical installation, maintenance and testing for homes and businesses across Singapore.";

export const metadata: Metadata = {
  metadataBase: new URL(company.websiteHref),
  title: { default: title, template: "%s | Smart Infratech" },
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

// Re-render hourly so date-bound content (the Year End Offer) switches off
// by itself once it has ended.
export const revalidate = 3600;

const gtmId = "GTM-NJDFNMLV";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  // Lets the phone tab bar pad itself clear of the home indicator.
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-SG"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <head>
        {/* Consent defaults must be set before Google Tag Manager loads. */}
        <script dangerouslySetInnerHTML={{ __html: consentDefaultScript }} />
      </head>
      <GoogleTagManager gtmId={gtmId} />
      {/* Browser extensions add attributes to <body> before React hydrates. */}
      <body
        className="min-h-dvh bg-white pb-(--tabbar) text-ink"
        suppressHydrationWarning
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <MotionProvider>
          <a
            href="#main"
            className="sr-only z-[60] bg-ink px-4 py-3 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <BookingProvider offerActive={isOfferActive()}>
            <OfferBanner />
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
            <TabBar />
            <WhatsAppFab />
            <CookieConsent />
          </BookingProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
