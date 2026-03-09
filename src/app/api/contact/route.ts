import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ContactMessage from '@/models/ContactMessage';

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        await dbConnect();
        const newMessage = await ContactMessage.create({
            name,
            email,
            subject,
            message,
        });

        return NextResponse.json({ message: 'Message sent successfully', data: newMessage }, { status: 201 });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const archived = searchParams.get('archived') === 'true';
        const query = archived ? { archived: true } : { $or: [{ archived: false }, { archived: { $exists: false } }] };

        await dbConnect();
        const messages = await ContactMessage.find(query).sort({ createdAt: -1 });
        return NextResponse.json(messages);
    } catch (error) {
        console.error('Contact API GET Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { ids } = await req.json();
        if (!ids || !Array.isArray(ids)) {
            return NextResponse.json({ error: 'Invalid IDs' }, { status: 400 });
        }

        await dbConnect();
        await ContactMessage.deleteMany({ _id: { $in: ids } });

        return NextResponse.json({ message: 'Messages deleted successfully' });
    } catch (error) {
        console.error('Contact API DELETE Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const { ids, archived } = await req.json();
        if (!ids || !Array.isArray(ids)) {
            return NextResponse.json({ error: 'Invalid IDs' }, { status: 400 });
        }

        await dbConnect();
        await ContactMessage.updateMany(
            { _id: { $in: ids } },
            { $set: { archived } }
        );

        return NextResponse.json({ message: 'Messages updated successfully' });
    } catch (error) {
        console.error('Contact API PATCH Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
