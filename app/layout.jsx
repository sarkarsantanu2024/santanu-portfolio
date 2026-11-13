import "./globals.css";
import { careerYears } from "../lib/career.js";

const YEARS = `${careerYears()}+`;

export const metadata = {
  title:
    "Santanu Sarkar | Frontend Architect & Senior Frontend Engineer – React, Next.js, Vue",
  description: `Santanu Sarkar is an AI-aided Frontend Architect and Senior Frontend Engineer with ${YEARS} years of experience building enterprise web applications using React, Vue, Next.js, and headless Drupal CMS. Based in Kolkata, India.`,
  keywords:
    "Frontend Architect, Senior Frontend Engineer, Senior React Developer, React Developer, Vue Developer, Next.js, Drupal Headless CMS, Tailwind CSS, GSAP, Frontend Developer Kolkata, AI-aided development, Santanu Sarkar",
  authors: [{ name: "Santanu Sarkar" }],
  robots: "index, follow",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
  },
  openGraph: {
    type: "website",
    title: "Santanu Sarkar | Frontend Architect & Senior Frontend Engineer",
    description: `AI-Aided Frontend Architect and Senior Frontend Engineer with ${YEARS} years experience in React, Vue, Next.js, and headless CMS architectures.`,
    url: "https://santanusarkar.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Santanu Sarkar | Frontend Architect",
    description:
      "AI-Aided Frontend Architect – React, Vue, Next.js, Headless Drupal.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('site-theme')||'dark';if(t!=='dark'){document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Santanu Sarkar",
              jobTitle: "Frontend Architect",
              email: "sarkarsantanu69@gmail.com",
              telephone: "+919804243159",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Dumdum",
                addressLocality: "Kolkata",
                postalCode: "700028",
                addressCountry: "IN",
              },
              url: "https://santanusarkar.dev",
              sameAs: ["https://www.linkedin.com/in/santanu-sarkar-095b163b"],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-paper text-ink dark:bg-ink dark:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
