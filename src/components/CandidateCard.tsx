'use client';

import React from 'react';
import Image from 'next/image';
import { IMember } from '@/models/Member';
import { motion } from 'framer-motion';

interface CandidateCardProps {
    member: IMember;
    onClose?: () => void;
}

export default function CandidateCard({ member, onClose }: CandidateCardProps) {
    // Info item component for cleaner sections
    const InfoItem = ({ label, value, dir = "rtl" }: { label: string, value: string | React.ReactNode, dir?: "rtl" | "ltr" }) => (
        <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">{label}</span>
            <span className={`text-lg font-bold text-gray-800 ${dir === "rtl" ? "text-right" : "text-left"}`}>
                {value || '---'}
            </span>
        </div>
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] overflow-hidden relative"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-20 p-2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full transition-all group"
                >
                    <svg className="w-6 h-6 transform group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Header Section */}
                <div className="relative h-48 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-8 flex items-end">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full -ml-10 -mb-20 blur-2xl"></div>

                    <div className="relative z-10 flex items-center gap-6 w-full">
                        <div className="relative w-32 h-32 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/30 bg-white translate-y-12">
                            {member.photoUrl ? (
                                <Image
                                    src={member.photoUrl}
                                    alt={member.fullNameFrench}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl font-black text-blue-100 bg-blue-600">
                                    {member.fullNameFrench.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-0.5 text-white mb-2">
                            <h2 className="text-3xl font-black tracking-tight uppercase leading-tight">
                                {member.fullNameFrench}
                            </h2>
                            <h3 className="text-2xl font-bold bg-white/10 px-3 py-1 rounded-xl backdrop-blur-sm self-start" dir="rtl">
                                {member.fullNameArabic}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="pt-20 px-10 pb-10 space-y-10 max-h-[70vh] overflow-y-auto custom-scrollbar">

                    {/* section 1: Personal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-blue-100 rounded-full"></div>
                        <InfoItem label="رقم البطاقة (CNI)" value={<span className="uppercase tracking-widest">{member.cni}</span>} dir="ltr" />
                        <InfoItem label="السن" value={`${member.age} سنة`} />
                        <div className="md:col-span-2">
                            <InfoItem label="العنوان الكامل" value={member.address} />
                        </div>
                        <InfoItem label="المدينة" value={member.city} />
                        <InfoItem label="تاريخ الازدياد" value={member.birthDate ? new Date(member.birthDate).toLocaleDateString('fr-FR') : '---'} />
                    </div>

                    <div className="h-px bg-gray-100"></div>

                    {/* section 2: Education & Job */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-indigo-100 rounded-full"></div>
                        <InfoItem label="المستوى الدراسي" value={member.educationLevel} />
                        <InfoItem label="التخصص" value={member.specialization} />
                        <InfoItem label="الوضعية المهنية" value={member.employed ? 'موظف' : 'غير موظف'} />
                        {member.employed && (
                            <InfoItem label="القطاع" value={member.sector} />
                        )}
                    </div>

                    {/* Contact Info (If any) */}
                    {(member.phone || member.email) && (
                        <>
                            <div className="h-px bg-gray-100"></div>
                            <div className="flex flex-col sm:flex-row gap-6">
                                {member.phone && (
                                    <div className="flex items-center gap-3 bg-blue-50 px-5 py-3 rounded-2xl border border-blue-100">
                                        <div className="p-2 bg-blue-600 rounded-lg text-white">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-blue-400 uppercase">الهاتف</span>
                                            <span className="font-bold text-gray-700">{member.phone}</span>
                                        </div>
                                    </div>
                                )}
                                {member.email && (
                                    <div className="flex items-center gap-3 bg-indigo-50 px-5 py-3 rounded-2xl border border-indigo-100">
                                        <div className="p-2 bg-indigo-600 rounded-lg text-white">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-indigo-400 uppercase">البريد الإلكتروني</span>
                                            <span className="font-bold text-gray-700">{member.email}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Footer / Status */}
                <div className="px-10 py-6 bg-gray-50 flex justify-between items-center border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">التاريخ: {new Date(member.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter shadow-sm
                        ${member.status === 'approved' ? 'bg-green-100 text-green-700' :
                            member.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}
                    >
                        {member.status === 'approved' ? 'مقبول' : member.status === 'rejected' ? 'مرفوض' : 'في الانتظار'}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
