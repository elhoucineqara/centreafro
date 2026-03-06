'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'فشل تسجيل الدخول');
            }

            toast.success('تم تسجيل الدخول بنجاح');
            router.push('/admin/dashboard');
            router.refresh();
        } catch (error) {
            if (error instanceof Error) toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a192f] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div
                className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none"
                style={{
                    clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)'
                }}
            />
            <div
                className="absolute bottom-0 left-0 w-full h-full opacity-5 pointer-events-none"
                style={{
                    clipPath: 'polygon(0 100%, 0 0, 100% 100%)',
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)'
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-md w-full relative z-10"
            >
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-2xl p-6 sm:p-8 overflow-hidden relative">
                    {/* Top Accent Bar */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600" />

                    <div className="text-center mb-6">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-block p-3 rounded-2xl bg-white/5 mb-4 shadow-inner"
                        >
                            <Image
                                src="/logoecrit.png"
                                alt="Logo"
                                width={140}
                                height={48}
                                className="object-contain"
                                priority
                            />
                        </motion.div>
                        <h1 className="text-2xl font-black text-white tracking-tight mb-1">لوحة الإدارة</h1>
                        <p className="text-blue-200/60 text-sm font-medium">المركز الأفرو-متوسطي للدراسات</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label className="block text-xs font-bold text-blue-100 mb-1.5 mr-1">البريد الإلكتروني</label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    required
                                    dir="ltr"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:bg-white/10 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-white placeholder-white/20 outline-none hover:border-white/30 text-left text-sm"
                                    placeholder="admin@example.com"
                                />
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-blue-400 group-focus-within:text-blue-300 transition-colors">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label className="block text-xs font-bold text-blue-100 mb-1.5 mr-1">كلمة المرور</label>
                            <div className="relative group">
                                <input
                                    type="password"
                                    required
                                    dir="ltr"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:bg-white/10 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-white placeholder-white/20 outline-none hover:border-white/30 text-left text-sm"
                                    placeholder="••••••••"
                                />
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-blue-400 group-focus-within:text-blue-300 transition-colors">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>

                        <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 p-[1px] rounded-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                        >
                            <div className="w-full bg-[#1e3a8a] group-hover:bg-transparent transition-colors py-3.5 rounded-2xl flex justify-center items-center text-white font-black text-base">
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>جاري التحقق...</span>
                                    </div>
                                ) : (
                                    <span>تسجيل الدخول</span>
                                )}
                            </div>
                        </motion.button>
                    </form>

                    <div className="mt-6 pt-5 border-t border-white/10 text-center">
                        <p className="text-white/40 text-[10px] font-medium tracking-wider uppercase">جهاز حماية البيانات والخصوصية نشط</p>
                    </div>
                </div>

                {/* Footer Copyright */}
                <p className="text-center text-white/20 text-[10px] mt-4 font-medium">
                    &copy; {new Date().getFullYear()} المركز الأفرو-متوسطي. جميع الحقوق محفوظة.
                </p>
            </motion.div>
        </div>
    );
}
