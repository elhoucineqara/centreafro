import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import { Readable } from 'stream';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const db = mongoose.connection.db;
        if (!db) {
            throw new Error('Database connection not established');
        }

        const formData = await req.formData();

        // Extract fields
        const fullNameArabic = formData.get('fullNameArabic') as string;
        const fullNameFrench = formData.get('fullNameFrench') as string;
        const cni = formData.get('cni') as string;
        const age = formData.get('age') as string;
        const address = formData.get('address') as string;
        const city = formData.get('city') as string;
        const educationLevel = formData.get('educationLevel') as string;
        const specialization = formData.get('specialization') as string;
        const employed = formData.get('employed') === 'true';
        const sector = formData.get('sector') as string;

        // Validations
        if (!fullNameArabic || !fullNameFrench || !cni || !age || !address || !city || !educationLevel || !specialization) {
            return NextResponse.json(
                { error: 'جميع الحقول التي تحمل علامة (*) مطلوبة' },
                { status: 400 }
            );
        }

        if (employed && !sector) {
            return NextResponse.json(
                { error: 'يرجى تحديد القطاع (الخاص أو العام)' },
                { status: 400 }
            );
        }

        // Check if CNI already exists
        const existingMember = await Member.findOne({ cni: cni.trim().toUpperCase() });
        if (existingMember) {
            return NextResponse.json(
                { error: 'رقم بطاقة التعريف الوطنية مسجل مسبقاً' },
                { status: 400 }
            );
        }

        // Handle File Uploads via GridFS
        const photoFile = formData.get('photo') as File;
        const cinPdfFile = formData.get('cinPdf') as File;

        if (!photoFile || photoFile.size === 0 || photoFile.name === 'undefined') {
            return NextResponse.json(
                { error: 'يرجى تحميل الصورة الشخصية' },
                { status: 400 }
            );
        }

        if (!cinPdfFile || cinPdfFile.size === 0 || cinPdfFile.name === 'undefined') {
            return NextResponse.json(
                { error: 'يرجى تحميل نسخة البطاقة الوطنية (PDF)' },
                { status: 400 }
            );
        }

        const bucket = new GridFSBucket(db, {
            bucketName: 'uploads'
        });

        const uploadToGridFS = async (file: File, prefix: string) => {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = `${prefix}_${cni.trim().toUpperCase()}_${Date.now()}${file.name.substring(file.name.lastIndexOf('.')) || (prefix === 'photo' ? '.jpg' : '.pdf')}`;

            return new Promise<string>((resolve, reject) => {
                const uploadStream = bucket.openUploadStream(filename, {
                    metadata: {
                        contentType: file.type || (prefix === 'photo' ? 'image/jpeg' : 'application/pdf')
                    }
                });

                const readableStream = Readable.from(buffer);
                readableStream.pipe(uploadStream)
                    .on('error', reject)
                    .on('finish', () => {
                        resolve(uploadStream.id.toString());
                    });
            });
        };

        const photoFileId = await uploadToGridFS(photoFile, 'photo');
        const cinPdfFileId = await uploadToGridFS(cinPdfFile, 'cin');

        const member = new Member({
            fullNameArabic,
            fullNameFrench,
            cni: cni.trim().toUpperCase(),
            age: parseInt(age),
            address,
            city,
            educationLevel,
            specialization,
            employed,
            sector,
            photoUrl: `/api/files/${photoFileId}`,
            cinPdfUrl: `/api/files/${cinPdfFileId}`
        });

        await member.save();

        return NextResponse.json(
            { message: 'تم تسجيل طلبك بنجاح', member },
            { status: 201 }
        );
    } catch (err: unknown) {
        console.error('Registration Error:', err);
        if (err instanceof Error) {
            const error = err as unknown as Record<string, unknown>;
            if (error.name === 'ValidationError') {
                return NextResponse.json({ error: 'الرجاء التأكد من صحة البيانات المدخلة' }, { status: 400 });
            }
            if (error.code === 11000) {
                return NextResponse.json({ error: 'رقم بطاقة التعريف الوطنية مسجل مسبقاً' }, { status: 400 });
            }
        }
        return NextResponse.json(
            { error: 'حدث خطأ أثناء التسجيل، يرجى المحاولة لاحقاً' },
            { status: 500 }
        );
    }
}
