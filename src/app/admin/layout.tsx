'use client';

import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-row-reverse overflow-hidden" dir="rtl">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content Area */}
            <div className="flex-1 mr-72 min-h-screen flex flex-col relative overflow-y-auto">
                {/* Dynamic Header */}
                <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-8 bg-blue-600 rounded-full" />
                        <h1 className="text-xl font-black text-gray-900 tracking-tight">لوحة الإدارة</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-bold text-gray-900">المشرف العام</span>
                            <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase">حساب النشط</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                            AD
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
