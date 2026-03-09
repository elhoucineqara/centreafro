'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface Message {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    archived: boolean;
    createdAt: string;
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [view, setView] = useState<'inbox' | 'archived'>('inbox');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const fetchMessages = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/contact?archived=${view === 'archived'}`);
            if (res.ok) {
                const data = await res.json();
                setMessages(data);
                setSelectedIds([]);
            }
        } catch {
            toast.error('حدث خطأ أثناء تحميل الرسائل');
        } finally {
            setLoading(false);
        }
    }, [view]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    const handleBulkAction = async (action: 'delete' | 'archive' | 'unarchive') => {
        const ids = selectedIds.length > 0 ? selectedIds : (selectedMessage ? [selectedMessage._id] : []);

        if (ids.length === 0) return;

        if (action === 'delete' && !confirm('هل أنت متأكد من حذف الرسائل المختارة؟')) return;

        try {
            const method = action === 'delete' ? 'DELETE' : 'PATCH';
            const body = action === 'delete'
                ? { ids }
                : { ids, archived: action === 'archive' };

            const res = await fetch('/api/contact', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                toast.success(action === 'delete' ? 'تم الحذف بنجاح' : 'تم التحديث بنجاح');
                if (selectedMessage && ids.includes(selectedMessage._id)) {
                    setSelectedMessage(null);
                }
                fetchMessages();
            } else {
                throw new Error();
            }
        } catch {
            toast.error('حدث خطأ أثناء تنفيذ العملية');
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        setSelectedIds(selectedIds.length === messages.length ? [] : messages.map(m => m._id));
    };

    if (loading && messages.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">رسائل التواصل</h1>
                    <p className="text-xs sm:text-slate-500 font-medium font-tajawal">عرض وإدارة الرسائل الواردة من نموذج الاتصال.</p>
                </div>

                {/* View Switcher */}
                <div className="flex p-1.5 bg-gray-100 rounded-2xl w-fit">
                    <button
                        onClick={() => setView('inbox')}
                        className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${view === 'inbox' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        البريد الوارد
                    </button>
                    <button
                        onClick={() => setView('archived')}
                        className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${view === 'archived' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        الأرشيف
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start relative">
                {/* Messages List - Hidden on mobile if a message is selected */}
                <div className={`bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden ${selectedMessage ? 'hidden lg:block' : 'block'}`}>
                    {/* List Actions */}
                    <div className="p-4 sm:p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <input
                                type="checkbox"
                                checked={messages.length > 0 && selectedIds.length === messages.length}
                                onChange={toggleSelectAll}
                                className="w-5 h-5 rounded-lg border-gray-200 text-blue-600 focus:ring-blue-500/20"
                            />
                            <h2 className="font-bold text-sm sm:text-base text-slate-800 flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${view === 'inbox' ? 'bg-blue-500' : 'bg-slate-400'}`}></span>
                                {view === 'inbox' ? 'البريد الوارد' : 'الأرشيف'} ({messages.length})
                            </h2>
                        </div>

                        {selectedIds.length > 0 && (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleBulkAction(view === 'inbox' ? 'archive' : 'unarchive')}
                                    className="p-2 sm:p-2.5 rounded-xl bg-white text-slate-500 hover:text-blue-600 border border-gray-100 shadow-sm transition-all"
                                    title={view === 'inbox' ? 'أرشفة المختار' : 'استعادة المختار'}
                                >
                                    {view === 'inbox' ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l5 5m-5-5l5-5" />
                                        </svg>
                                    )}
                                </button>
                                <button
                                    onClick={() => handleBulkAction('delete')}
                                    className="p-2 sm:p-2.5 rounded-xl bg-white text-rose-500 hover:bg-rose-50 border border-gray-100 shadow-sm transition-all"
                                    title="حذف المختار"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="divide-y divide-gray-50 lg:max-h-[700px] overflow-y-auto custom-scrollbar">
                        {messages.length === 0 ? (
                            <div className="p-12 text-center text-slate-400 font-medium">
                                {view === 'inbox' ? 'لا توجد رسائل في البريد الوارد.' : 'الأرشيف فارغ.'}
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <div key={msg._id} className="flex relative group">
                                    <div className="flex items-center px-4 bg-gray-50/10 group-hover:bg-blue-50/20 transition-colors border-l border-transparent">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(msg._id)}
                                            onChange={() => toggleSelect(msg._id)}
                                            className="w-5 h-5 rounded-lg border-gray-200 text-blue-600 focus:ring-blue-500/20"
                                        />
                                    </div>
                                    <button
                                        onClick={() => setSelectedMessage(msg)}
                                        className={`flex-1 text-right p-4 sm:p-6 transition-all duration-300 hover:bg-blue-50/50 flex flex-col gap-2 relative ${selectedMessage?._id === msg._id ? 'bg-blue-50/80 shadow-inner' : ''
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                {new Date(msg.createdAt).toLocaleDateString('ar-MA', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                            <div className={`w-2 h-2 rounded-full ${selectedMessage?._id === msg._id ? 'bg-blue-600 animate-pulse' : 'bg-transparent'}`}></div>
                                        </div>
                                        <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">{msg.subject}</h3>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                            {msg.name}
                                        </div>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Message Detail View */}
                <AnimatePresence mode="wait">
                    {selectedMessage ? (
                        <motion.div
                            key={selectedMessage._id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden lg:sticky lg:top-6"
                        >
                            <div className="p-6 sm:p-8 border-b border-gray-50 flex flex-col gap-4 sm:gap-6">
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col gap-1 pr-10 lg:pr-0">
                                        <span className="text-[9px] sm:text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-1">تفاصيل الرسالة</span>
                                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{selectedMessage.subject}</h2>
                                    </div>
                                    <div className="flex gap-2">
                                        {/* Mobile Back Button */}
                                        <button
                                            onClick={() => setSelectedMessage(null)}
                                            className="lg:hidden p-2 rounded-xl bg-gray-50 text-slate-500 hover:bg-gray-200 transition-all"
                                            title="العودة للقائمة"
                                        >
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>

                                        <button
                                            onClick={() => handleBulkAction(view === 'inbox' ? 'archive' : 'unarchive')}
                                            className="p-2 sm:p-3 rounded-2xl bg-gray-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 hidden sm:flex"
                                            title={view === 'inbox' ? 'نقل للأرشيف' : 'نقل للبريد الوارد'}
                                        >
                                            {view === 'inbox' ? (
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l5 5m-5-5l5-5" />
                                                </svg>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleBulkAction('delete')}
                                            className="p-2 sm:p-3 rounded-2xl bg-gray-50 text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition-all duration-300 hidden sm:flex"
                                            title="حذف نهائي"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => setSelectedMessage(null)}
                                            className="p-2 sm:p-3 rounded-2xl bg-gray-50 text-slate-400 hover:bg-gray-200 transition-all duration-300 hidden lg:flex"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div className="p-4 rounded-3xl bg-slate-50 border border-slate-100/50">
                                        <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase mb-1">المرسل</p>
                                        <p className="text-sm font-bold text-slate-900">{selectedMessage.name}</p>
                                    </div>
                                    <div className="p-4 rounded-3xl bg-slate-50 border border-slate-100/50">
                                        <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase mb-1" dir="ltr">EMAIL</p>
                                        <p className="text-sm font-bold text-slate-900 break-all" dir="ltr">{selectedMessage.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 sm:p-10">
                                <p className="text-slate-400 text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-4">نص الرسالة</p>
                                <div className="bg-slate-50/50 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-100 text-slate-700 text-sm sm:text-base leading-relaxed font-medium whitespace-pre-wrap">
                                    {selectedMessage.message}
                                </div>
                                <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-6">
                                    <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold">تاريخ الاستلام: {new Date(selectedMessage.createdAt).toLocaleString('ar-MA')}</p>
                                    <div className="flex w-full sm:w-auto gap-3">
                                        {/* Mobile Actions Overlay on Bottom? No, let's just show them here */}
                                        <div className="flex sm:hidden flex-1 gap-2">
                                            <button
                                                onClick={() => handleBulkAction(view === 'inbox' ? 'archive' : 'unarchive')}
                                                className="flex-1 py-3 bg-gray-100 text-slate-600 rounded-2xl font-bold text-xs transition-all"
                                            >
                                                {view === 'inbox' ? 'أرشفة' : 'استعادة'}
                                            </button>
                                            <button
                                                onClick={() => handleBulkAction('delete')}
                                                className="flex-1 py-3 bg-rose-50 text-rose-600 rounded-2xl font-bold text-xs transition-all"
                                            >
                                                حذف
                                            </button>
                                        </div>
                                        <a
                                            href={`mailto:${selectedMessage.email}`}
                                            className="px-6 py-3 bg-[#020617] text-white rounded-2xl font-bold text-xs sm:text-sm hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-xl shadow-blue-900/10 flex-1 sm:flex-initial"
                                        >
                                            الرد
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="lg:h-[700px] flex flex-col items-center justify-center bg-gray-50/30 rounded-[1.5rem] sm:rounded-[2.5rem] border-2 border-dashed border-gray-100 p-8 sm:p-12 text-center group transition-colors hover:border-blue-100 hover:bg-blue-50/10 hidden lg:flex">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center text-slate-200 mb-6 group-hover:scale-110 group-hover:text-blue-200 transition-all duration-500">
                                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2">اختر رسالة لعرضها</h3>
                            <p className="text-xs sm:text-slate-400 font-medium max-w-xs leading-relaxed">حدد أي رسالة من القائمة الجانبية لمراجعة التفاصيل، أرشفتها أو حذفها.</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
