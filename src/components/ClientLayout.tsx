'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';

export default function ClientLayout({
    children,
    tajawalClass,
}: {
    children: React.ReactNode;
    tajawalClass: string;
}) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin');

    return (
        <body className={`${tajawalClass} antialiased bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
            {!isAdminRoute && (
                <>
                    <Navbar />
                    <div className="h-20 shrink-0" />
                </>
            )}
            {children}
            <Toaster position="top-center" />
        </body>
    );
}
