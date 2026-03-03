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
