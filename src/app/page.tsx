"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">


      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white overflow-hidden"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)',
          paddingBottom: '4rem'
        }}
      >
        <div className="absolute inset-0 bg-[url('/logoimage.png')] opacity-10 bg-auto bg-center bg-no-repeat"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              المركز الأفرو-متوسطي للتفكير والدراسات القانونية والسوسيو اقتصادية
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 font-medium leading-relaxed">
              منصة رائدة للبحث، التحليل، وتطوير السياسات العامة في الفضاء الأفرو-متوسطي.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-4 bg-white text-blue-700 text-lg font-bold rounded-full hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1"
              >
                انضم إلينا الآن
              </Link>
              <Link
                href="#about"
                className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-bold rounded-full hover:bg-white/10 transition-all"
              >
                اكتشف المزيد
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">رؤيتنا ورسالتنا</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                يسعى المركز الأفرو-متوسطي إلى تعزيز النقاش الأكاديمي والعملي حول القضايا القانونية، والسوسيو-اقتصادية التي تهم المنطقتين الإفريقية والمتوسطية.
              </p>
              <p>
                نعمل كجسر تواصل بين الباحثين، صناع القرار، وفعاليات المجتمع المدني لإنتاج أبحاث ودراسات استراتيجية تساهم في التنمية المستدامة وتقوية المؤسسات.
              </p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80"
                alt="About us"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Areas of focus section / Features */}
      <section id="objectives" className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">مجالات اهتمام المركز</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">الدراسات القانونية</h3>
              <p className="text-gray-600">تحليل النظم القانونية وتشريعات المقارنة واقتراح إصلاحات لتعزيز دولة الحق والقانون.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 text-green-600">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">التنمية السوسيو-اقتصادية</h3>
              <p className="text-gray-600">رصد المؤشرات الاقتصادية والاجتماعية وتقديم رؤى حول سياسات الإدماج والتنمية المستدامة.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">التعاون الدولي والإقليمي</h3>
              <p className="text-gray-600">تعميق البحث في قضايا الجيوسياسة، الهجرة، والشراكات في الحوض المتوسطي وإفريقيا.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="bg-white p-2 inline-block rounded-lg mb-4">
                <Image
                  src="/logoecrit.png"
                  alt="Logo"
                  width={150}
                  height={60}
                  className="object-contain"
                />
              </div>
              <p className="text-sm text-gray-400 mt-4 leading-relaxed">
                المركز الأفرو-متوسطي للتفكير والدراسات القانونية والسوسيو اقتصادية. منصة علمية مستقلة تهدف للمساهمة في النقاش الأكاديمي والسياسي.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">روابط سريعة</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-blue-400 transition-colors">الرئيسية</Link></li>
                <li><Link href="#about" className="hover:text-blue-400 transition-colors">من نحن</Link></li>
                <li><Link href="#objectives" className="hover:text-blue-400 transition-colors">مواضيع البحث</Link></li>
                <li><Link href="/register" className="hover:text-blue-400 transition-colors">الانضمام للمركز</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">تواصل معنا</h4>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>contact@centre-afromed.ma</span>
                </li>
              </ul>

              <h4 className="text-white font-bold mb-4">شارك المركز</h4>
              <div className="flex gap-4">
                <a href="https://wa.me/?text=اكتشف المركز الأفرو-متوسطي للتفكير والدراسات القانونية والسوسيو اقتصادية https://centre-afromed.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors" title="WhatsApp">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 21.08h-.01c-1.859 0-3.682-.497-5.286-1.436L2 21l4.823-1.258c.895.526 1.916.804 2.956.805h.009c5.204 0 9.445-4.24 9.447-9.448.001-2.523-.98-4.896-2.763-6.68C14.686 2.637 12.31 1.655 9.782 1.65h-.005c-5.205 0-9.447 4.24-9.449 9.448 0 1.62.404 3.208 1.171 4.607zm4.787-6.526c-.262-.132-1.551-.767-1.79-.855-.238-.088-.412-.132-.586.132-.175.264-.674.855-.826 1.03-.153.176-.306.198-.568.066-1.558-.787-2.618-1.41-3.64-2.693-.266-.334.26-.309.771-.854.128-.135.258-.27.388-.395.148-.143.201-.264.301-.44.1-.176.05-.33-.016-.462-.066-.132-.586-1.41-.803-1.93-.21-.506-.425-.437-.587-.445-.152-.007-.327-.008-.502-.008-.175 0-.458.066-.698.33-.239.264-.913.892-.913 2.178 0 1.287.935 2.53 1.066 2.706.131.176 1.846 2.818 4.473 3.953 1.614.695 2.213.738 2.89.62.637-.11 1.551-.634 1.769-1.246.218-.612.218-1.137.153-1.246-.065-.11-.239-.176-.502-.308z" /></svg>
                </a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=https://centre-afromed.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors" title="Facebook">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                </a>
                <a href="https://twitter.com/intent/tweet?text=اكتشف المركز الأفرو-متوسطي للتفكير والدراسات القانونية والسوسيو اقتصادية&url=https://centre-afromed.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors" title="Twitter">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors" title="Instagram">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="TikTok">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.68a6.34 6.34 0 006.34 6.31 6.34 6.34 0 006.27-5.52v-6.5a8.21 8.21 0 004.39 1.25v-3.46a4.81 4.81 0 01-2.41-.6z" /></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} المركز الأفرو-متوسطي للتفكير والدراسات القانونية والسوسيو اقتصادية. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
