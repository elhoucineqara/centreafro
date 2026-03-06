import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';
import './globals.css';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://centre-afromed.vercel.app/'),
  title: 'المركز الأفرو-متوسطي للتفكير والدراسات القانونية والسوسيو اقتصادية',
  description: 'بوابة التسجيل الخاصة بالمركز الأفرو-متوسطي للتفكير والدراسات القانونية والسوسيو اقتصادية',
  icons: {
    icon: '/favicon.ico',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'المركز الأفرو-متوسطي للتفكير والدراسات القانونية والسوسيو اقتصادية',
    description: 'بوابة التسجيل الخاصة بالمركز الأفرو-متوسطي للتفكير والدراسات القانونية والسوسيو اقتصادية',
    url: 'https://centre-afromed.vercel.app/',
    siteName: 'المركز الأفرو-متوسطي',
    images: [
      {
        url: '/logoecrit.png',
        width: 1200,
        height: 630,
        alt: 'Logo المركز الأفرو-متوسطي',
      },
    ],
    locale: 'ar_MA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'المركز الأفرو-متوسطي للتفكير والدراسات القانونية والسوسيو اقتصادية',
    description: 'بوابة التسجيل الخاصة بالمركز الأفرو-متوسطي للتفكير والدراسات القانونية والسوسيو اقتصادية',
    images: ['/logoecrit.png'],
  },
};

import ClientLayout from '@/components/ClientLayout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <ClientLayout tajawalClass={tajawal.variable}>
        {children}
      </ClientLayout>
    </html>
  );
}
