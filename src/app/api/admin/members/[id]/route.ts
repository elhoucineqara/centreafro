import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const { id } = params;

        const deletedMember = await Member.findByIdAndDelete(id);

        if (!deletedMember) {
            return NextResponse.json({ error: 'لم يتم العثور على العضو' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'تم حذف العضو بنجاح' }, { status: 200 });
    } catch {
        return NextResponse.json({ error: 'حدث خطأ أثناء الحذف' }, { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const { id } = params;
        const { status } = await req.json();

        if (!['approved', 'rejected', 'pending'].includes(status)) {
            return NextResponse.json({ error: 'حالة غير صالحة' }, { status: 400 });
        }

        const updatedMember = await Member.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedMember) {
            return NextResponse.json({ error: 'لم يتم العثور على العضو' }, { status: 404 });
        }

        return NextResponse.json({ success: true, member: updatedMember }, { status: 200 });
    } catch {
        return NextResponse.json({ error: 'حدث خطأ أثناء تحديث الحالة' }, { status: 500 });
    }
}
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const { id } = params;

        const member = await Member.findById(id);

        if (!member) {
            return NextResponse.json({ error: 'لم يتم العثور على العضو' }, { status: 404 });
        }

        return NextResponse.json(member, { status: 200 });
    } catch {
        return NextResponse.json({ error: 'حدث خطأ أثناء جلب البيانات' }, { status: 500 });
    }
}
