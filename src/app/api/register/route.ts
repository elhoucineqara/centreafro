import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        await dbConnect();

        // Check if CNI already exists
        const existingMember = await Member.findOne({ cni: data.cni });
        if (existingMember) {
            return NextResponse.json(
                { error: 'رقم بطاقة التعريف الوطنية مسجل مسبقاً' },
                { status: 400 }
            );
        }

        const member = new Member(data);
        await member.save();

        return NextResponse.json(
            { message: 'تم تسجيل الطلب بنجاح', member },
            { status: 201 }
        );
    } catch (err: unknown) {
        if (typeof err === 'object' && err !== null && 'name' in err && (err as { name: string }).name === 'ValidationError') {
            return NextResponse.json({ error: 'الرجاء التأكد من صحة البيانات المدخلة' }, { status: 400 });
        }
        return NextResponse.json(
            { error: 'حدث خطأ أثناء التسجيل، يرجى المحاولة لاحقاً' },
            { status: 500 }
        );
    }
}
