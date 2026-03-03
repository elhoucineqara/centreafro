import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const searchParams = req.nextUrl.searchParams;
        const query = searchParams.get('q') || '';
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');

        let filter = {};
        if (query) {
            filter = {
                $or: [
                    { fullNameArabic: { $regex: query, $options: 'i' } },
                    { fullNameFrench: { $regex: query, $options: 'i' } },
                    { cni: { $regex: query, $options: 'i' } },
                ],
            };
        }

        const members = await Member.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Member.countDocuments(filter);

        return NextResponse.json({
            members,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
            },
        }, { status: 200 });
    } catch {
        return NextResponse.json({ error: 'حدث خطأ في جلب البيانات' }, { status: 500 });
    }
}
