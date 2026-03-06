'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const navItems = [
    { name: 'قائمة الأعضاء', href: '/admin/dashboard', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    // Future links can be added here
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/admin/logout', { method: 'POST' });
            if (res.ok) {
                toast.success('تم تسجيل الخروج بنجاح');
                router.push('/');
                router.refresh();
            } else {
                throw new Error('فشل تسجيل الخروج');
            }
        } catch {
            toast.error('حدث خطأ أثناء تسجيل الخروج');
        }
    };

    return (
        <aside className="w-72 bg-[#020617] text-white min-h-screen flex flex-col fixed inset-y-0 right-0 z-50 border-l border-white/5 shadow-2xl overflow-hidden">
            {/* Background Accents (Subtle Glows) */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-600/5 rounded-full blur-[80px] -ml-24 -mb-24" />

            {/* Branding */}
            <div className="p-6 border-b border-white/5 relative z-10">
                <Link href="/admin/dashboard" className="flex flex-col items-center group">
                    <div className="p-3 bg-white/5 rounded-2xl mb-3 shadow-2xl ring-1 ring-white/10 group-hover:ring-blue-500/50 transition-all duration-500 hover:scale-105">
                        <Image src="/logoecrit.png" alt="Logo" width={120} height={40} className="object-contain brightness-110 drop-shadow-2xl" priority />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse"></span>
                        <span className="text-blue-200/60 text-[9px] font-black tracking-[0.3em] uppercase">لوحة الإدارة</span>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1.5 relative z-10">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-500 group relative overflow-hidden ${isActive
                                ? 'text-white shadow-[0_15px_30px_-10px_rgba(37,99,235,0.3)]'
                                : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {/* Active Background with Gradient */}
                            {isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 z-0" />
                            )}

                            {/* Icon Container */}
                            <div className={`relative z-10 p-2.5 rounded-2xl transition-all duration-500 ${isActive ? 'bg-white/20 shadow-inner' : 'bg-white/5 group-hover:bg-white/10 group-hover:scale-110'}`}>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={item.icon} />
                                </svg>
                            </div>

                            <span className="relative z-10 font-bold tracking-tight text-sm uppercase">{item.name}</span>

                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="mr-auto relative z-10 w-2 h-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1)]"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Account */}
            <div className="p-8 border-t border-white/5 bg-black/20 backdrop-blur-xl relative z-10">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all duration-300 group ring-1 ring-white/5 hover:ring-rose-500/30"
                >
                    <div className="p-2.5 rounded-2xl bg-rose-500/5 group-hover:bg-rose-500/20 transition-all duration-300 group-hover:scale-110">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </div>
                    <span className="font-bold text-sm uppercase">تسجيل الخروج</span>
                </button>
            </div>
        </aside>
    );
}
