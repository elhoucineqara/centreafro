'use client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Stats / Controls Bar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="البحث بواسطة الاسم الكامل، رقم البطاقة، أو المدينة..."
                            className="w-full pr-12 pl-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-gray-900 placeholder-gray-400 font-medium"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        />
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-[2rem] shadow-lg shadow-green-500/20 p-6 flex items-center justify-between text-white overflow-hidden relative">
                    <div className="relative z-10">
                        <p className="text-emerald-100 text-xs font-black tracking-widest uppercase mb-1">إجمالي المسجلين</p>
                        <h3 className="text-4xl font-black">{members.length}</h3>
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                </div>
            </div>

            {/* Members Table */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="py-24 text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
                            <p className="text-gray-400 font-bold">جاري تحميل البيانات...</p>
                        </div>
                    ) : members.length === 0 ? (
                        <div className="py-24 text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <p className="text-gray-500 font-bold text-lg">لم يتم العثور على أي نتائج</p>
                            <button onClick={() => setSearch('')} className="mt-2 text-blue-600 font-bold hover:underline">إعادة ضبط البحث</button>
                        </div>
                    ) : (
                        <table className="w-full text-right border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100/50">
                                    <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">العضو المستهدف</th>
                                    <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">المستوى الدراسي</th>
                                    <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">الوضع المهني</th>
                                    <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">الوثائق المرفقة</th>
                                    <th className="px-8 py-6 text-center text-xs font-black text-gray-400 uppercase tracking-[0.2em]">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {members.map((member) => (
                                    <tr key={member._id as unknown as string} className="group hover:bg-blue-50/30 transition-colors duration-300">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center font-black text-gray-500 group-hover:from-blue-100 group-hover:to-blue-200 group-hover:text-blue-600 transition-all duration-300 shadow-inner overflow-hidden relative">
                                                        {member.photoUrl ? (
                                                            <Image
                                                                src={member.photoUrl}
                                                                alt=""
                                                                fill
                                                                className="object-cover"
                                                                unoptimized={true}
                                                            />
                                                        ) : (
                                                            member.fullNameFrench.charAt(0)
                                                        )}
                                                    </div>
                                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white transition-all duration-300 ${member.status === 'approved' ? 'bg-green-500' :
                                                        member.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
                                                        }`} />
                                                </div>
                                                <div>
                                                    <div className="text-base font-black text-gray-900 mb-0.5">{member.fullNameArabic}</div>
                                                    <div className="text-xs text-gray-400 font-bold flex items-center gap-2">
                                                        <span>{member.fullNameFrench}</span>
                                                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                                                        <span>{member.cni}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-sm font-bold text-gray-700 mb-0.5">{member.educationLevel}</div>
                                            <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{member.specialization}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            {member.employed ? (
                                                <div className="inline-flex flex-col">
                                                    <span className="text-xs font-black text-emerald-600 mb-1">✓ موظف</span>
                                                    <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-lg font-bold border border-emerald-100 self-start">{member.sector}</span>
                                                </div>
                                            ) : (
                                                <span className="text-xs font-black text-gray-400 italic">غير موظف</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex gap-2">
                                                {member.photoUrl && (
                                                    <a href={member.photoUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm" title="مشاهدة الصورة الشخصية">
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </a>
                                                )}
                                                {member.cinPdfUrl && (
                                                    <a href={member.cinPdfUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm" title="مشاهدة البطاقة الوطنية PDF">
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                        </svg>
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-center gap-2">
                                                {member.status === 'pending' && (
                                                    <div className="flex gap-2 mr-2 pr-2 border-r border-gray-100">
                                                        <button
                                                            onClick={() => handleStatusUpdate(member._id as unknown as string, 'approved')}
                                                            className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                                            title="قبول الطلب"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(member._id as unknown as string, 'rejected')}
                                                            className="p-2.5 bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-600 hover:text-white transition-all shadow-sm"
                                                            title="رفض الطلب"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                )}
                                                <button
                                                    onClick={() => handlePrintView(member)}
                                                    className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                                    title="مشاهدة وطباعة ملف العضو"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(member._id as unknown as string, member.fullNameArabic)}
                                                    className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                                    title="حذف العضو"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Pagination UI Redesign */}
                {!loading && totalPages > 1 && (
                    <div className="bg-gray-50/50 px-8 py-6 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            صفحة <span className="text-blue-600 font-black">{page}</span> من <span className="text-gray-900 font-black">{totalPages}</span>
                        </p>
                        <div className="flex gap-2">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(p => p - 1)}
                                className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                            >
                                السابق
                            </button>
                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(p => p + 1)}
                                className="px-5 py-2.5 bg-blue-600 rounded-xl text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/20"
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
