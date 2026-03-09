'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { motion } from 'framer-motion';

export default function RegistrationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // ... (I will use multi_replace to do this properly to avoid replacing the whole file)
    fullNameArabic: '',
    fullNameFrench: '',
    cni: '',
    phone: '',
    birthDate: '',
    email: '',
    address: '',
    city: '',
    educationLevel: '',
    specialization: '',
    employed: null as boolean | null,
    sector: '',
    photo: null as File | null,
    cinPdf: null as File | null,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.photo) {
        toast.error('يرجى تحميل الصورة الشخصية');
        setLoading(false);
        return;
      }
      if (!formData.cinPdf) {
        toast.error('يرجى تحميل نسخة البطاقة الوطنية (PDF)');
        setLoading(false);
        return;
      }

      const dataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value === null || value === undefined) return;
        if (value instanceof File) {
          dataToSend.append(key, value);
        } else {
          dataToSend.append(key, String(value));
        }
      });

      const res = await fetch('/api/register', {
        method: 'POST',
        body: dataToSend,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'حدث خطأ غير متوقع');
      }

      toast.success(data.message);
      router.push('/');
      // Reset form
      setFormData({
        fullNameArabic: '',
        fullNameFrench: '',
        cni: '',
        phone: '',
        birthDate: '',
        email: '',
        address: '',
        city: '',
        educationLevel: '',
        specialization: '',
        employed: null,
        sector: '',
        photo: null,
        cinPdf: null,
      });
      // Reset file inputs manually if needed
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach((input) => {
        (input as HTMLInputElement).value = '';
      });
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-10 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/logoimage.png')] opacity-5 bg-auto bg-center bg-no-repeat"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative z-10"
            >
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">انضم إلينا</h1>
              <p className="text-blue-100 text-lg">المركز الأفرو-متوسطي للتفكير والدراسات القانونية والسوسيو اقتصادية</p>
            </motion.div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="group relative"
            >
              <label className="text-sm font-bold text-gray-700 block mb-2">الاسم الكامل بالعربية <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                value={formData.fullNameArabic}
                onChange={e => setFormData({ ...formData, fullNameArabic: e.target.value })}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm outline-none hover:border-blue-300"
                placeholder="الاسم العائلي والشخصي"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.32, duration: 0.4 }}
              className="group"
            >
              <label className="block text-sm font-bold text-gray-700 mb-2">الاسم الكامل بالفرنسية <span className="text-red-500">*</span></label>
              <input type="text" required dir="ltr" value={formData.fullNameFrench} onChange={e => setFormData({ ...formData, fullNameFrench: e.target.value })} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm outline-none hover:border-blue-300 text-right" placeholder="Nom et Prénom" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="group"
            >
              <label className="block text-sm font-bold text-gray-700 mb-2">الصورة الشخصية <span className="text-red-500">*</span></label>
              <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-colors bg-gray-50/50">
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={e => setFormData({ ...formData, photo: e.target.files?.[0] || null })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex items-center justify-center gap-4">
                  <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-gray-500 font-medium">{formData.photo ? formData.photo.name : 'اسحب صورتك هنا (JPG, PNG)'}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.38, duration: 0.4 }}
              className="group"
            >
              <label className="block text-sm font-bold text-gray-700 mb-2">تاريخ الازدياد <span className="text-red-500">*</span></label>
              <input type="date" required value={formData.birthDate} onChange={e => setFormData({ ...formData, birthDate: e.target.value })} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm outline-none hover:border-blue-300" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.39, duration: 0.4 }}
              className="group"
            >
              <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني <span className="text-red-500">*</span></label>
              <input type="email" required dir="ltr" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm outline-none hover:border-blue-300 text-right" placeholder="example@email.com" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="group"
            >
              <label className="block text-sm font-bold text-gray-700 mb-2">رقم بطاقة التعريف الوطنية (CNI) <span className="text-red-500">*</span></label>
              <input type="text" required dir="ltr" value={formData.cni} onChange={e => setFormData({ ...formData, cni: e.target.value })} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm outline-none hover:border-blue-300 text-right" placeholder="AB123456" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.42, duration: 0.4 }}
              className="group"
            >
              <label className="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف <span className="text-red-500">*</span></label>
              <input type="tel" required dir="ltr" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm outline-none hover:border-blue-300 text-right" placeholder="0600000000" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="group"
            >
              <label className="block text-sm font-bold text-gray-700 mb-2">نسخة البطاقة الوطنية (PDF) <span className="text-red-500">*</span></label>
              <div className="relative border border-gray-300 rounded-xl p-3 hover:border-blue-400 transition-colors bg-white shadow-sm flex items-center justify-between">
                <input
                  type="file"
                  accept="application/pdf"
                  required
                  onChange={e => setFormData({ ...formData, cinPdf: e.target.files?.[0] || null })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <span className="text-xs text-gray-500 truncate max-w-[120px]">{formData.cinPdf ? formData.cinPdf.name : 'اختر ملف PDF'}</span>
                <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="group"
            >
              <label className="block text-sm font-bold text-gray-700 mb-2">العنوان الكامل <span className="text-red-500">*</span></label>
              <input type="text" required value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm outline-none hover:border-blue-300" placeholder="شارع، حي، رقم العمارة/المنزل" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="group"
            >
              <label className="block text-sm font-bold text-gray-700 mb-2">مدينة الإقامة <span className="text-red-500">*</span></label>
              <input type="text" required value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none shadow-sm hover:border-blue-300" placeholder="المدينة" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="group"
            >
              <label className="block text-sm font-bold text-gray-700 mb-3">المستوى الدراسي <span className="text-red-500">*</span></label>
              <div className="space-y-4">
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.educationLevel === 'حاصل على شهادة جامعية' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500 shadow-sm' : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-blue-300'}`}>
                  <input type="radio" value="حاصل على شهادة جامعية" checked={formData.educationLevel === 'حاصل على شهادة جامعية'} onChange={e => setFormData({ ...formData, educationLevel: e.target.value })} required className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 ml-3" />
                  <span className="text-gray-700 font-medium">حاصل على شهادة جامعية</span>
                </label>
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.educationLevel === 'في طور الدراسة الجامعية' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500 shadow-sm' : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-blue-300'}`}>
                  <input type="radio" value="في طور الدراسة الجامعية" checked={formData.educationLevel === 'في طور الدراسة الجامعية'} onChange={e => setFormData({ ...formData, educationLevel: e.target.value })} required className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 ml-3" />
                  <span className="text-gray-700 font-medium">في طور الدراسة الجامعية</span>
                </label>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="group"
            >
              <label className="block text-sm font-bold text-gray-700 mb-2">التخصص <span className="text-red-500">*</span></label>
              <input type="text" required value={formData.specialization} onChange={e => setFormData({ ...formData, specialization: e.target.value })} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none shadow-sm hover:border-blue-300" placeholder="مثال: القانون العام، الاقتصاد..." />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="group bg-gray-50 p-6 border border-gray-200 rounded-2xl shadow-sm hover:shadow transition-shadow"
            >
              <label className="block text-sm font-bold text-gray-700 mb-4">هل أنت مهني / موظف ؟ <span className="text-red-500">*</span></label>
              <div className="flex space-x-6 space-x-reverse mb-6">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="employed" checked={formData.employed === true} onChange={() => setFormData({ ...formData, employed: true, sector: '' })} required className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 ml-2" />
                  <span className="text-gray-700 font-medium">نعم</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="employed" checked={formData.employed === false} onChange={() => setFormData({ ...formData, employed: false, sector: '' })} required className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 ml-2" />
                  <span className="text-gray-700 font-medium">لا</span>
                </label>
              </div>

              {formData.employed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pt-4 border-t border-gray-200 overflow-hidden"
                >
                  <label className="block text-sm font-bold text-gray-700 mb-3">القطاع <span className="text-red-500">*</span></label>
                  <div className="space-y-4">
                    <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${formData.sector === 'القطاع العام' ? 'border-blue-500 bg-white ring-1 ring-blue-500 shadow-md transform scale-[1.02]' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
                      <input type="radio" value="القطاع العام" checked={formData.sector === 'القطاع العام'} onChange={e => setFormData({ ...formData, sector: e.target.value })} required className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 ml-3" />
                      <span className="text-gray-700 font-medium">القطاع العام</span>
                    </label>
                    <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${formData.sector === 'القطاع الخاص' ? 'border-blue-500 bg-white ring-1 ring-blue-500 shadow-md transform scale-[1.02]' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
                      <input type="radio" value="القطاع الخاص" checked={formData.sector === 'القطاع الخاص'} onChange={e => setFormData({ ...formData, sector: e.target.value })} required className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 ml-3" />
                      <span className="text-gray-700 font-medium">القطاع الخاص</span>
                    </label>
                  </div>
                </motion.div>
              )}
            </motion.div>


            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-6"
            >
              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white text-lg font-bold py-4 px-6 rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all shadow-lg flex justify-center items-center">
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 'تسجيل الطلب'}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
