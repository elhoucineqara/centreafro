import mongoose, { Schema, Document } from 'mongoose';

export interface IMember extends Document {
    fullNameArabic: string;
    fullNameFrench: string;
    cni: string;
    age: number;
    address: string;
    city: string;
    educationLevel: string;
    specialization: string;
    employed: boolean;
    sector?: string;
    photoUrl: string;
    cinPdfUrl: string;
    phone?: string;
    email?: string;
    birthDate?: Date;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
}

const MemberSchema: Schema = new Schema({
    fullNameArabic: { type: String, required: true },
    fullNameFrench: { type: String, required: true },
    cni: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    educationLevel: { type: String, required: true },
    specialization: { type: String, required: true },
    employed: { type: Boolean, required: true },
    sector: { type: String, default: null },
    photoUrl: { type: String, required: true },
    cinPdfUrl: { type: String, required: true },
    phone: { type: String, default: null },
    email: { type: String, default: null },
    birthDate: { type: Date, default: null },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Member || mongoose.model<IMember>('Member', MemberSchema);
