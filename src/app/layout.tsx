import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
});

export const metadata: Metadata = {
  title: 'المركز الأفرو-متوسطي للتفكير والدراسات القانونية والسوسيو اقتصادية',
  description: 'بوابة التسجيل الخاصة بالمركز الأفرو-متوسطي للتفكير والدراسات القانونية والسوسيو اقتصادية',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.className} antialiased bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
