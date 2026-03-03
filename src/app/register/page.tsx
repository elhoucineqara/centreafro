'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    fullNameArabic: '',
    fullNameFrench: '',
    cni: '',
    age: '',
    address: '',
    city: '',
    educationLevel: '',
    specialization: '',
    employed: null as boolean | null,
    sector: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dbData = {
        ...formData,
        age: parseInt(formData.age),
        sector: formData.employed ? formData.sector : null,
      };

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dbData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'حدث خطأ غير متوقع');
      }

      toast.success(data.message);
      // Reset form
      setFormData({
        fullNameArabic: '',
        fullNameFrench: '',
        cni: '',
        age: '',
        address: '',
        city: '',
        educationLevel: '',
        specialization: '',
        employed: null,
        sector: '',
      });
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
        <div className="bg-blue-600 px-6 py-8 text-center text-white">
          <h1 className="text-3xl font-bold mb-2">المركز الأفرو-متوسطي</h1>
          <h2 className="text-lg opacity-90">للتفكير والدراسات القانونية والسوسيو اقتصادية</h2>
          <p className="mt-4 text-blue-100">استمارة التسجيل</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">الاسم الكامل بالعربية *</label>
              <input type="text" required value={formData.fullNameArabic} onChange={e => setFormData({ ...formData, fullNameArabic: e.target.value })} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">الاسم الكامل بالفرنسية *</label>
              <input type="text" required dir="ltr" value={formData.fullNameFrench} onChange={e => setFormData({ ...formData, fullNameFrench: e.target.value })} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-right" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">رقم بطاقة التعريف الوطنية (CNI) *</label>
              <input type="text" required dir="ltr" value={formData.cni} onChange={e => setFormData({ ...formData, cni: e.target.value })} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-right" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">السن *</label>
              <input type="number" required min="18" max="100" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">العنوان الكامل *</label>
            <input type="text" required value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">مدينة الإقامة *</label>
            <input type="text" required value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">المستوى الدراسي *</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                <input type="radio" value="حاصل على شهادة جامعية" checked={formData.educationLevel === 'حاصل على شهادة جامعية'} onChange={e => setFormData({ ...formData, educationLevel: e.target.value })} required className="w-5 h-5 text-blue-600 border-blue-300 focus:ring-blue-500" />
                <span className="text-gray-700">حاصل على شهادة جامعية</span>
              </label>
              <label className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                <input type="radio" value="في طور الدراسة الجامعية" checked={formData.educationLevel === 'في طور الدراسة الجامعية'} onChange={e => setFormData({ ...formData, educationLevel: e.target.value })} required className="w-5 h-5 text-blue-600 border-blue-300 focus:ring-blue-500" />
                <span className="text-gray-700">في طور الدراسة الجامعية</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">التخصص *</label>
            <input type="text" required value={formData.specialization} onChange={e => setFormData({ ...formData, specialization: e.target.value })} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">هل أنت موظف؟ *</label>
            <div className="flex space-x-6 space-x-reverse">
              <label className="flex items-center space-x-2 space-x-reverse cursor-pointer">
                <input type="radio" name="employed" checked={formData.employed === true} onChange={() => setFormData({ ...formData, employed: true })} required className="w-5 h-5 text-blue-600 border-blue-300 focus:ring-blue-500" />
                <span className="text-gray-700">نعم</span>
              </label>
              <label className="flex items-center space-x-2 space-x-reverse cursor-pointer">
                <input type="radio" name="employed" checked={formData.employed === false} onChange={() => setFormData({ ...formData, employed: false })} required className="w-5 h-5 text-blue-600 border-blue-300 focus:ring-blue-500" />
                <span className="text-gray-700">لا</span>
              </label>
            </div>
          </div>

          {formData.employed && (
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <label className="block text-sm font-semibold text-gray-700 mb-2">القطاع *</label>
              <div className="flex space-x-6 space-x-reverse">
                <label className="flex items-center space-x-2 space-x-reverse cursor-pointer">
                  <input type="radio" value="القطاع العام" checked={formData.sector === 'القطاع العام'} onChange={e => setFormData({ ...formData, sector: e.target.value })} required className="w-5 h-5 text-blue-600 border-blue-300 focus:ring-blue-500" />
                  <span className="text-gray-700">القطاع العام</span>
                </label>
                <label className="flex items-center space-x-2 space-x-reverse cursor-pointer">
                  <input type="radio" value="القطاع الخاص" checked={formData.sector === 'القطاع الخاص'} onChange={e => setFormData({ ...formData, sector: e.target.value })} required className="w-5 h-5 text-blue-600 border-blue-300 focus:ring-blue-500" />
                  <span className="text-gray-700">القطاع الخاص</span>
                </label>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-gray-100">
            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all shadow-md flex justify-center items-center">
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'تسجيل الطلب'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
