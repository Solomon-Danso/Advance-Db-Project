import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hydot Store | Universal Business & E-Commerce Platform",
  description:
    "Hydot Store is a universal business platform for creating online stores, selling products, offering services, managing customers, and growing your brand worldwide.",
  keywords: [
    // Core business
    "business platform", "online store", "online shop", "ecommerce", "e-commerce", 
    "sell online", "business website", "company website builder", "retail online",
    
    // Selling & marketing
    "digital marketing", "product selling", "service selling", "dropshipping", 
    "B2B ecommerce", "B2C ecommerce", "wholesale business", "marketplace",
    
    // Global targeting
    "global online store", "international ecommerce", "multi-currency store", 
    "sell worldwide", "cross-border business", "export online",
    
    // Business solutions
    "CRM", "inventory management", "order management", "payment gateway", 
    "POS system", "business analytics", "retail management",
    
    // Competitors & alternatives
    "Shopify alternative", "WooCommerce alternative", "Wix store", 
    "BigCommerce alternative", "Squarespace store", "Etsy alternative",
    
    // Long-tail & universal business
    "start a business online", "grow your business", "create website for business", 
    "best ecommerce platform", "how to sell services online", "small business tools",
    
    // Extra reach
    "virtual shop", "online retail", "internet store", "digital store", 
    "global marketplace", "business startup tools"
  ],
  openGraph: {
    title: "Hydot Store | Start & Grow Any Business Worldwide",
    description:
      "Hydot Store is your all-in-one platform for starting, managing, and scaling any business online — from retail to services — anywhere in the world.",
    url: "https://hydotstore.com",
    siteName: "Hydot Store",
    images: [
      {
        url: "https://hydotstore.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hydot Store Global Business Platform"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Hydot Store | Start & Grow Any Business Worldwide",
    description:
      "Build an online store, sell products or services, manage customers, and grow your business — all in one platform.",
    images: ["https://hydotstore.com/og-image.jpg"]
  },
  alternates: {
    canonical: "https://hydotstore.com"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for Business SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Hydot Store",
              url: "https://hydotstore.com",
              logo: "https://hydotstore.com/logo.png",
              description:
                "Hydot Store is a universal business platform for creating online stores, selling services, and managing businesses worldwide.",
              sameAs: [
                "https://facebook.com/hydotstore",
                "https://instagram.com/hydotstore",
                "https://linkedin.com/company/hydotstore",
                "https://twitter.com/hydotstore"
              ],
              potentialAction: {
                "@type": "SearchAction",
                target: "https://hydotstore.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
