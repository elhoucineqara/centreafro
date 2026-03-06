import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';
import { GridFSBucket, ObjectId } from 'mongodb';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const db = mongoose.connection.db;
        if (!db) {
            return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
        }

        const bucket = new GridFSBucket(db, {
            bucketName: 'uploads',
        });

        const fileId = params.id;
        if (!fileId || !ObjectId.isValid(fileId)) {
            return NextResponse.json({ error: 'Invalid file ID' }, { status: 400 });
        }

        const objId = new ObjectId(fileId);
        const files = await bucket.find({ _id: objId }).toArray();

        if (!files || files.length === 0) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

        const file = files[0] as unknown as Record<string, unknown>;
        const stream = bucket.openDownloadStream(objId);

        // Create a body from the web-standard stream
        // Next.js NextResponse accepts a ReadableStream
        const readableStream = new ReadableStream({
            start(controller) {
                stream.on('data', (chunk) => controller.enqueue(chunk));
                stream.on('end', () => controller.close());
                stream.on('error', (err) => controller.error(err));
            },
        });

        const metadata = file.metadata as unknown as Record<string, string> | undefined;
        return new NextResponse(readableStream, {
            headers: {
                'Content-Type': metadata?.contentType || 'application/octet-stream',
                'Content-Disposition': `inline; filename="${file.filename as string}"`,
            },
        });
    } catch (error) {
        console.error('GridFS Fetch Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
