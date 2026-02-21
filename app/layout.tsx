import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { Inter } from 'next/font/google';
import { SiteLayout } from '@/components/layout/site-layout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const satoshi = localFont({
  src: [
    { path: '../public/fonts/Satoshi-Regular.otf', weight: '400' },
    { path: '../public/fonts/Satoshi-Medium.otf', weight: '500' },
    { path: '../public/fonts/Satoshi-Bold.otf', weight: '700' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'RapSora — Web Development Agency',
    template: '%s | RapSora',
  },
  description:
    'RapSora is a premium web development agency crafting digital experiences that turn visitors into paying customers. Web Design, Branding, E-Commerce & SEO.',
  keywords: [
    'web development agency',
    'web design',
    'branding',
    'ecommerce',
    'SEO',
    'UI/UX design',
    'RapSora',
  ],
  openGraph: {
    title: 'RapSora — Web Development Agency',
    description:
      'We build websites that actually convert. A premium web development agency crafting digital experiences that drive real business growth.',
    url: 'https://rapsora.com',
    siteName: 'RapSora',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RapSora — Web Development Agency',
    description:
      'We build websites that actually convert. A premium web development agency crafting digital experiences that drive real business growth.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent FOUC — set dark class before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('rapsora-theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${satoshi.variable} antialiased`}
      >
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
