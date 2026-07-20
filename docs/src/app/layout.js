import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
const normalizedBasePath = (process.env.BASE_PATH || '').replace(/\/$/, '');
const basePath = normalizedBasePath
  ? normalizedBasePath.startsWith('/')
    ? normalizedBasePath
    : `/${normalizedBasePath}`
  : '';
const socialStylesHref = `${basePath}/all.min.css`;

export const metadata = {
  title: 'TailwindCSS-Social - Social Buttons & Brand Colors',
  description:
    'A lightweight, customizable collection of social buttons and brand colors. Supports all major platforms with multiple distinct styles.',
  keywords:
    'tailwindcss, tailwind, social buttons, brand colors, ui components, react, nextjs, css, html, font-awesome, oauth, login, facebook, twitter, github, google, social icons, free ui',
  authors: [{ name: 'Aldi Duzha', url: 'https://github.com/aldi' }],
  metadataBase: new URL('https://aldi.github.io'),
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7.3.0/css/all.min.css"
          integrity="sha384-sTlsophtwz/I4myskS3OIJf5VvEojkXKZyBTWZm0YD/K1pN7C5wpBPLyrsbr1SU2"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href={socialStylesHref} />
      </head>
      <body className={inter.variable}>
        <ThemeProvider>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
