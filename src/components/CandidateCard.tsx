'use client';

import React from 'react';
import Image from 'next/image';
import { IMember } from '@/models/Member';
import { motion } from 'framer-motion';

interface CandidateCardProps {
    member: IMember;
    onClose?: () => void;
    onStatusUpdate?: (id: string, newStatus: 'approved' | 'rejected') => void;
}

export default function CandidateCard({ member, onClose, onStatusUpdate }: CandidateCardProps) {
    // Info item component for cleaner sections
    const InfoItem = ({ label, value }: { label: string, value: string | React.ReactNode }) => (
        <div className="flex flex-col gap-0.5 text-right">
            <span className="text-[9px] sm:text-[10px] font-bold text-blue-500 uppercase tracking-wider">{label}</span>
            <span className="text-sm sm:text-base font-bold text-gray-800 leading-tight">
                {value || '---'}
            </span>
        </div>
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-gray-900/60 backdrop-blur-md overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white w-full max-w-2xl rounded-[1.5rem] sm:rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] overflow-hidden relative max-h-[95vh] flex flex-col"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 p-2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full transition-all group"
                >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Header Section */}
                <div className="relative h-24 sm:h-32 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-4 sm:p-6 flex items-end shrink-0">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full -ml-10 -mb-20 blur-2xl"></div>

                    <div className="relative z-10 flex items-center gap-3 sm:gap-5 w-full">
                        <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl ring-4 ring-white/30 bg-white translate-y-6 sm:translate-y-8">
                            {member.photoUrl ? (
                                <Image
                                    src={member.photoUrl}
                                    alt={member.fullNameFrench}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl sm:text-4xl font-black text-blue-100 bg-blue-600">
                                    {member.fullNameFrench.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-0 text-white mb-1">
                            <h2 className="text-base sm:text-xl font-black tracking-tight uppercase leading-tight truncate max-w-[150px] sm:max-w-none">
                                {member.fullNameFrench}
                            </h2>
                            <h3 className="text-sm sm:text-lg font-bold bg-white/10 px-2.5 py-0.5 rounded-lg backdrop-blur-sm self-start" dir="rtl">
                                {member.fullNameArabic}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="pt-10 sm:pt-14 px-5 sm:px-8 pb-6 space-y-5 sm:space-y-6 overflow-y-auto custom-scrollbar flex-1">

                    {/* section 1: Personal */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 sm:gap-x-8 gap-y-4 relative">
                        <div className="absolute -left-3 top-0 bottom-0 w-1 bg-blue-100/50 rounded-full hidden sm:block"></div>
                        <InfoItem label="رقم البطاقة" value={<span className="uppercase tracking-widest text-xs sm:text-sm">{member.cni}</span>} />
                        <InfoItem label="رقم الهاتف" value={<span className="text-xs sm:text-sm">{member.phone}</span>} />
                        <InfoItem label="تاريخ الازدياد" value={<span className="text-xs sm:text-sm">{member.birthDate ? new Date(member.birthDate).toLocaleDateString('fr-FR') : '---'}</span>} />
                        <InfoItem label="المدينة" value={<span className="text-xs sm:text-sm">{member.city}</span>} />
                        <div className="col-span-2">
                            <InfoItem label="العنوان" value={<span className="text-xs sm:text-sm">{member.address}</span>} />
                        </div>
                    </div>

                    <div className="h-px bg-gray-100"></div>

                    {/* section 2: Education & Job */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 sm:gap-x-8 gap-y-4 relative">
                        <div className="absolute -left-3 top-0 bottom-0 w-1 bg-indigo-100/50 rounded-full hidden sm:block"></div>
                        <InfoItem label="المستوى الدراسي" value={<span className="text-xs sm:text-sm">{member.educationLevel}</span>} />
                        <InfoItem label="التخصص" value={<span className="text-xs sm:text-sm">{member.specialization}</span>} />
                        <InfoItem label="الوضعية المهنية" value={<span className="text-xs sm:text-sm">{member.employed ? 'موظف' : 'غير موظف'}</span>} />
                        {member.employed && (
                            <InfoItem label="القطاع" value={<span className="text-xs sm:text-sm">{member.sector}</span>} />
                        )}
                    </div>

                    {/* Contact Info (If any) */}
                    {(member.phone || member.email) && (
                        <>
                            <div className="h-px bg-gray-100"></div>
                            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                                {member.phone && (
                                    <div className="flex items-center gap-2.5 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                                        <div className="p-1.5 bg-blue-600 rounded-lg text-white shrink-0">
                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-[8px] font-bold text-blue-400 uppercase">الهاتف</span>
                                            <span className="text-[10px] sm:text-xs font-bold text-gray-700 truncate">{member.phone}</span>
                                        </div>
                                    </div>
                                )}
                                {member.email && (
                                    <div className="flex items-center gap-2.5 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 min-w-0 flex-1">
                                        <div className="p-1.5 bg-indigo-600 rounded-lg text-white shrink-0">
                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-[8px] font-bold text-indigo-400 uppercase">البريد الإلكتروني</span>
                                            <span className="text-[10px] sm:text-xs font-bold text-gray-700 truncate lowercase">{member.email}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Footer / Status */}
                <div className="px-5 sm:px-8 py-4 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-100 shrink-0">
                    <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                            <span className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none truncate">التاريخ: {new Date(member.createdAt).toLocaleDateString('fr-FR')}</span>
                        </div>

                        {member.status === 'pending' && onStatusUpdate && (
                            <div className="flex gap-2 mr-0 sm:mr-4 pr-0 sm:pl-4 border-r-0 sm:border-r border-gray-200">
                                <button
                                    onClick={() => onStatusUpdate(member._id as unknown as string, 'approved')}
                                    className="px-3 sm:px-4 py-1.5 bg-emerald-600 text-white rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-md flex items-center gap-1.5"
                                >
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                    قبول
                                </button>
                                <button
                                    onClick={() => onStatusUpdate(member._id as unknown as string, 'rejected')}
                                    className="px-3 sm:px-4 py-1.5 bg-rose-600 text-white rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-md flex items-center gap-1.5"
                                >
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    رفض
                                </button>
                            </div>
                        )}
                    </div>
                    <div className={`px-4 py-1 sm:py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm border w-full sm:w-auto text-center
                        ${member.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            member.status === 'rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}
                    >
                        {member.status === 'approved' ? 'مقبول' : member.status === 'rejected' ? 'مرفوض' : 'في الانتظار'}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
