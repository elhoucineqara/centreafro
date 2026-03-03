import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo in Navbar */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <div className="relative w-48 h-16">
                  <Image
                    src="/logoecrit.png"
                    alt="Logo المركز"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 space-x-reverse items-center">
              <Link href="#about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">من نحن</Link>
              <Link href="#objectives" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">أهدافنا</Link>
              <Link href="#contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">اتصل بنا</Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-sm"
              >
                بوابة التسجيل
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white overflow-hidden">
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
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>contact@centre-afromed.ma</span>
                </li>
              </ul>
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
