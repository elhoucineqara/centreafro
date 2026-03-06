'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
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
        <aside className="w-72 bg-[#0a192f] text-white min-h-screen flex flex-col fixed inset-y-0 right-0 z-50 border-l border-white/10 shadow-2xl">
            {/* Branding */}
            <div className="p-8 border-b border-white/5 bg-white/5 backdrop-blur-sm">
                <Link href="/admin/dashboard" className="flex flex-col items-center">
                    <div className="p-3 bg-white/5 rounded-2xl mb-4 shadow-inner ring-1 ring-white/10">
                        <Image src="/logoecrit.png" alt="Logo" width={140} height={46} className="object-contain brightness-110" priority />
                    </div>
                    <span className="text-blue-200 text-xs font-black tracking-[0.2em] uppercase">لوحة الإدارة</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive
                                ? 'bg-blue-600/90 text-white shadow-[0_8px_16px_rgba(37,99,235,0.2)] ring-1 ring-white/20'
                                : 'text-blue-100/60 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'}`}>
                                <svg className="w-5 h-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                </svg>
                            </div>
                            <span className="font-bold tracking-tight">{item.name}</span>
                            {isActive && (
                                <div className="mr-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Account */}
            <div className="p-6 border-t border-white/5 bg-white/5">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all group"
                >
                    <div className="p-2 rounded-xl bg-red-500/5 group-hover:bg-red-500/20 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </div>
                    <span className="font-bold">تسجيل الخروج</span>
                </button>
            </div>
        </aside>
    );
}
