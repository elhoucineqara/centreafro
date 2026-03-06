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
                <header className="sticky top-0 z-40 bg-white/60 backdrop-blur-xl border-b border-gray-100 px-6 py-3 flex justify-between items-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full" />
                        <div>
                            <h1 className="text-lg font-black text-slate-900 tracking-tight leading-none mb-1">لوحة الإدارة</h1>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">الإدارة المركزية</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="flex flex-col items-end">
                            <span className="text-xs font-black text-slate-900 leading-none mb-1">المشرف العام</span>
                            <div className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                <span className="text-[9px] text-slate-500 font-bold tracking-wider uppercase">متصل الآن</span>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-base shadow-lg ring-2 ring-white">
                                AD
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6 max-w-[1600px] mx-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
