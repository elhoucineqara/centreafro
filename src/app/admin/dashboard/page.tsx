'use client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IMember } from '@/models/Member';
import CandidateCard from '@/components/CandidateCard';

export default function AdminDashboardPage() {
    const [members, setMembers] = useState<IMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedMember, setSelectedMember] = useState<IMember | null>(null);

    const router = useRouter();

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/members?q=${search}&page=${page}&limit=10`);
            if (!res.ok) {
                if (res.status === 401) {
                    router.push('/admin/login');
                    return;
                }
                throw new Error('فشل جلب البيانات');
            }
            const data = await res.json();
            setMembers(data.members);
            setTotalPages(data.pagination.pages);
        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, page]);

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`هل أنت متأكد أنك تريد حذف العضو ${name}؟`)) return;

        try {
            const res = await fetch(`/api/admin/members/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('فشل החذف');

            toast.success('تم الحذف بنجاح');
            fetchMembers();
        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message);
        }
    };

    const handleStatusUpdate = async (id: string, newStatus: 'approved' | 'rejected') => {
        try {
            const res = await fetch(`/api/admin/members/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!res.ok) throw new Error('فشل تحديث الحالة');

            toast.success(newStatus === 'approved' ? 'تمت الموافقة بنجاح' : 'تم الرفض بنجاح');
            fetchMembers();
        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message);
        }
    };

    const handlePrintView = (member: IMember) => {
        setSelectedMember(member);
    };


    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Professional Greeting & Date */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">مرحباً بك مجدداً، أيها المشرف</h2>
                    <p className="text-slate-500 font-bold text-sm active:text-blue-600 transition-colors cursor-default">
                        إليك نظرة شاملة على نشاط المركز.
                    </p>
                </div>
                <div className="flex items-center gap-2.5 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">التاريخ الحالي</span>
                        <span className="text-xs font-black text-slate-900">{new Date().toLocaleDateString('ar-MA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>
            </div>

            {/* Stats Overview Engine */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'إجمالي الأعضاء', value: members.length, color: 'blue', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
                    { label: 'طلبات قيد الانتظار', value: members.filter(m => m.status === 'pending').length, color: 'amber', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                    { label: 'الأعضاء المقبولين', value: members.filter(m => m.status === 'approved').length, color: 'emerald', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                    { label: 'الطلبات المرفوضة', value: members.filter(m => m.status === 'rejected').length, color: 'rose', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-lg transition-all duration-500"
                    >
                        <div className={`absolute top-0 left-0 w-1.5 h-full bg-${stat.color}-500 opacity-20 group-hover:opacity-100 transition-opacity`} />
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 rounded-xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600 group-hover:scale-110 transition-transform duration-500`}>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">{stat.label}</span>
                            <span className="text-2xl font-black text-slate-900">{stat.value}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Members Table Section */}
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
                {/* Table Header / Search */}
                <div className="px-6 py-5 border-b border-slate-50 flex flex-col lg:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse"></div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">قائمة الأعضاء المسجلين</h3>
                    </div>

                    <div className="relative w-full lg:w-96 group">
                        <input
                            type="text"
                            placeholder="ابحث عن عضو..."
                            className="w-full pr-10 pl-3 py-2.5 bg-slate-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-bold text-slate-900 placeholder-slate-400 shadow-inner"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        />
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="py-32 text-center">
                            <div className="inline-block relative">
                                <div className="animate-spin rounded-full h-16 w-16 border-[6px] border-blue-600/10 border-t-blue-600"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></div>
                                </div>
                            </div>
                            <p className="mt-6 text-slate-400 font-black uppercase tracking-widest text-xs">جاري جلب البيانات</p>
                        </div>
                    ) : members.length === 0 ? (
                        <div className="py-32 text-center">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200 group-hover:scale-110 transition-transform">
                                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <p className="text-slate-500 font-black text-xl mb-4">لا توجد نتائج مطابقة</p>
                            <button onClick={() => setSearch('')} className="px-6 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">إعادة تعيين البحث</button>
                        </div>
                    ) : (
                        <table className="w-full text-right border-collapse">
                            <thead>
                                <tr className="bg-slate-50/30 border-b border-slate-100">
                                    <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">المعلومات الشخصية</th>
                                    <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">المؤهلات</th>
                                    <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">الوضعية المهنية</th>
                                    <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">الوثائق</th>
                                    <th className="px-6 py-4 text-center text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">الحالة</th>
                                    <th className="px-6 py-4 text-center text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {members.map((member, i) => (
                                    <motion.tr
                                        key={member._id as unknown as string}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group hover:bg-blue-50/40 transition-all duration-300 cursor-default"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-5">
                                                <div className="relative">
                                                    <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:scale-110 transition-transform duration-500 shadow-inner overflow-hidden relative border-2 border-transparent group-hover:border-blue-500/20">
                                                        {member.photoUrl ? (
                                                            <Image src={member.photoUrl} alt="" fill className="object-cover" unoptimized />
                                                        ) : (
                                                            member.fullNameFrench.charAt(0)
                                                        )}
                                                    </div>
                                                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-[3px] border-white transition-all duration-300 shadow-lg ${member.status === 'approved' ? 'bg-emerald-500' :
                                                        member.status === 'rejected' ? 'bg-rose-500' : 'bg-amber-500'
                                                        }`} />
                                                </div>
                                                <div>
                                                    <div className="text-lg font-black text-slate-900 mb-0.5 tracking-tight group-hover:text-blue-600 transition-colors uppercase">{member.fullNameArabic}</div>
                                                    <div className="text-[10px] text-slate-400 font-black flex items-center gap-2 uppercase tracking-widest leading-none">
                                                        <span>{member.fullNameFrench}</span>
                                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                                        <span className="text-slate-500">{member.cni}</span>
                                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                                        <span className="text-blue-500/70 lowercase">{member.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-black text-slate-900 mb-1">{member.educationLevel}</div>
                                            <div className="inline-flex px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[9px] font-black uppercase tracking-widest">{member.specialization}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {member.employed ? (
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                        موظف
                                                    </span>
                                                    <span className="text-[10px] px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg font-black border border-emerald-100 self-start uppercase">{member.sector}</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-slate-300 italic font-bold">
                                                    <span className="text-[10px] uppercase tracking-widest">غير موظف</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                {member.photoUrl && (
                                                    <a href={member.photoUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-50 text-blue-600 rounded-[1.25rem] hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:shadow-blue-200 hover:-translate-y-1" title="الصورة">
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </a>
                                                )}
                                                {member.cinPdfUrl && (
                                                    <a href={member.cinPdfUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-rose-50 text-rose-600 rounded-[1.25rem] hover:bg-rose-600 hover:text-white transition-all shadow-sm hover:shadow-rose-200 hover:-translate-y-1" title="البطاقة (PDF)">
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                        </svg>
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm border
                                                ${member.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                    member.status === 'rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                                        'bg-amber-50 text-amber-600 border-amber-100'}`}
                                            >
                                                {member.status === 'approved' ? 'مقبول' :
                                                    member.status === 'rejected' ? 'مرفوض' : 'في الانتظار'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                {member.status === 'pending' && (
                                                    <div className="flex gap-2 ml-4 pl-4 border-r border-slate-100">
                                                        <button onClick={() => handleStatusUpdate(member._id as unknown as string, 'approved')} className="p-3 bg-emerald-50 text-emerald-600 rounded-[1.25rem] hover:bg-emerald-600 hover:text-white transition-all shadow-sm group/btn" title="قبول">
                                                            <svg className="w-5 h-5 group-hover/btn:scale-125 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </button>
                                                        <button onClick={() => handleStatusUpdate(member._id as unknown as string, 'rejected')} className="p-3 bg-amber-50 text-amber-600 rounded-[1.25rem] hover:bg-amber-600 hover:text-white transition-all shadow-sm group/btn" title="رفض">
                                                            <svg className="w-5 h-5 group-hover/btn:scale-125 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                )}
                                                <button onClick={() => handlePrintView(member)} className="p-3 bg-slate-50 text-slate-600 rounded-[1.25rem] hover:bg-slate-900 hover:text-white transition-all shadow-sm" title="مشاهدة التفاصيل">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                                <button onClick={() => handleDelete(member._id as unknown as string, member.fullNameArabic)} className="p-3 bg-rose-50 text-rose-600 rounded-[1.25rem] hover:bg-rose-600 hover:text-white transition-all shadow-sm group/del" title="حذف">
                                                    <svg className="w-5 h-5 group-hover/del:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Pagination UI - Luxury Redesign */}
                {!loading && totalPages > 1 && (
                    <div className="px-6 py-4 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">الصفحة</span>
                            <div className="px-2 py-0.5 bg-white rounded-md border border-slate-200 shadow-sm text-xs font-black text-blue-600">
                                {page} <span className="text-slate-300 mx-0.5">/</span> {totalPages}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(p => p - 1)}
                                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                            >
                                السابق
                            </button>
                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(p => p + 1)}
                                className="px-6 py-2 bg-slate-900 border border-transparent rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-white hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg active:scale-95"
                            >
                                التالي
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {/* Preview Modal */}
            {selectedMember && (
                <CandidateCard
                    member={selectedMember}
                    onClose={() => setSelectedMember(null)}
                />
            )}
        </div>
    );
}
