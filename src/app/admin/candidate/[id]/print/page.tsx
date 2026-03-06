'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IMember } from '@/models/Member';
import toast from 'react-hot-toast';
import CandidateCard from '@/components/CandidateCard';

export default function CandidatePrintPage() {
    const { id } = useParams();
    const router = useRouter();
    const [member, setMember] = useState<IMember | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const res = await fetch(`/api/admin/members/${id}`);
                if (!res.ok) throw new Error('فشل جلب بيانات العضو');
                const data = await res.json();
                setMember(data);
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : 'حدث خطأ غير متوقع';
                toast.error(message);
                router.push('/admin/dashboard');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchMember();
    }, [id, router]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3582ba]"></div>
        </div>
    );

    if (!member) return null;

    return (
        <div className="min-h-screen bg-gray-100">
            <CandidateCard member={member} onClose={() => router.back()} />
        </div>
    );
}
