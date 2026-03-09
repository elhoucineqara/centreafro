'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-row-reverse overflow-hidden" dir="rtl">
            {/* Sidebar */}
            <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content Area */}
            <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:mr-72' : 'lg:mr-72'} h-screen flex flex-col relative overflow-hidden text-right`}>
                {/* Fixed Header */}
                <header className="z-40 bg-white/60 backdrop-blur-xl border-b border-gray-100 px-4 sm:px-6 py-3 flex justify-between items-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] shrink-0">
                    <div className="flex items-center gap-3">
                        {/* Mobile Toggle Button */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 -mr-2 text-slate-600 hover:bg-gray-100 rounded-xl transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <div className="hidden sm:block w-1.5 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full" />
                        <div>
                            <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-none mb-1 text-right">لوحة الإدارة</h1>
                            <p className="text-[8px] sm:text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none text-right">الإدارة المركزية</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-5">
                        <div className="flex flex-col items-end hidden xs:flex">
                            <span className="text-[10px] sm:text-xs font-black text-slate-900 leading-none mb-1">المشرف العام</span>
                            <div className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                <span className="text-[8px] sm:text-[9px] text-slate-500 font-bold tracking-wider uppercase">متصل الآن</span>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-sm sm:text-base shadow-lg ring-2 ring-white">
                                AD
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#f8fafc]">
                    <main className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
