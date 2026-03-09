"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">من نحن</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p className="font-semibold text-xl text-gray-900">
                المركز الأفرو-متوسطي للتفكير والدراسات القانونية والسوسيو اقتصادية
              </p>
              <p>
                هو مؤسسة بحثية علمية رائدة، تسعى إلى تعزيز النقاش الفكري وتعميق البحث الأكاديمي في القضايا القانونية، الاقتصادية، والاجتماعية التي تهم المنطقتين الأفريقية والمتوسطية.
              </p>
              <p>
                نحن نؤمن بأن البحث العلمي هو القاطرة الأساسية للتنمية، ولذلك نعمل على خلق فضاء يجمع بين الباحثين الأكاديميين والطلبة الطموحين لتبادل الخبرات وتطوير المهارات القيادية والمنهجية.
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

      {/* Vision and Goals Section */}
      <section id="objectives" className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">رؤيتنا وأهدافنا</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نهدف في المركز إلى أن نكون مرجعاً بحثياً يساهم في:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-2 h-full bg-blue-500 transform origin-right scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 text-xl font-bold">1</div>
              <p className="text-gray-700 font-medium">إعداد دراسات وأبحاث معمقة في مجالات القانون والسياسة والاقتصاد.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-2 h-full bg-indigo-500 transform origin-right scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 text-xl font-bold">2</div>
              <p className="text-gray-700 font-medium">تنظيم ندوات وملتقيات علمية دولية ووطنية لمناقشة قضايا الراهن.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-2 h-full bg-purple-500 transform origin-right scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4 text-xl font-bold">3</div>
              <p className="text-gray-700 font-medium">دعم الباحثين الشباب من خلال برامج التكوين والدعم المنهجي والمعرفي.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-2 h-full bg-pink-500 transform origin-right scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
              <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center mb-4 text-xl font-bold">4</div>
              <p className="text-gray-700 font-medium">نشر المعرفة عبر مجلة المركز والمؤلفات الجماعية الرصينة.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Labs and Teams Section */}
      <section id="labs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">مختبراتنا وفرق البحث</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              يضم المركز نخبة من المتخصصين موزعين على فرق بحثية متكاملة تشمل:
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-6 py-3 bg-blue-50 text-blue-700 font-semibold rounded-full border border-blue-100 hover:bg-blue-600 hover:text-white transition-colors cursor-default shadow-sm">
              الدراسات القانونية والسياسية والدولية
            </span>
            <span className="px-6 py-3 bg-indigo-50 text-indigo-700 font-semibold rounded-full border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-colors cursor-default shadow-sm">
              الدراسات الاقتصادية والتدبيرية
            </span>
            <span className="px-6 py-3 bg-purple-50 text-purple-700 font-semibold rounded-full border border-purple-100 hover:bg-purple-600 hover:text-white transition-colors cursor-default shadow-sm">
              الدراسات الاجتماعية والنفسية
            </span>
            <span className="px-6 py-3 bg-pink-50 text-pink-700 font-semibold rounded-full border border-pink-100 hover:bg-pink-600 hover:text-white transition-colors cursor-default shadow-sm">
              الدراسات التاريخية والمجالية
            </span>
            <span className="px-6 py-3 bg-emerald-50 text-emerald-700 font-semibold rounded-full border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-colors cursor-default shadow-sm">
              الدراسات البيئية والتنمية المستدامة
            </span>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white border-t-4 border-b-4 border-blue-500 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <svg className="w-16 h-16 mx-auto text-blue-400 mb-6 opacity-80" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 8.56l-1.07.46A.999.999 0 002 9.93v5.07c0 .553.448 1 1 1s1-.447 1-1v-4.57l.024-.01zM10 13a1 1 0 00.394-.08l5-2.143V14c0 1.104-.896 2-2 2H7c-1.104 0-2-.896-2-2v-3.22l4.606 1.973c.125.054.26.08.394.08z" />
          </svg>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">لماذا تنضم إلينا؟</h2>
          <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto mb-10">
            نحن لا نقدم مجرد عضوية، بل نفتح آفاقاً لتطوير المسار البحثي والعلمي، حيث يستفيد أعضاؤنا من الأولوية في المشاركة في الفعاليات، النشر العلمي، والمساهمة الفعالة في تنظيم وتأطير الأنشطة العلمية والثقافية.
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-4 bg-white text-blue-900 text-lg font-bold rounded-full hover:bg-gray-100 transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl"
          >
            قدم طلب الانضمام الآن
          </Link>
        </div>
        <div className="absolute inset-0 bg-[url('/logoimage.png')] opacity-5 bg-auto bg-center bg-no-repeat pointer-events-none"></div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">تواصل معنا مباشرة</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
              لديكم استفسار أو ترغبون في معرفة المزيد عن أنشطتنا؟ فريقنا جاهز للإجابة على جميع تساؤلاتكم.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[3rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-100 p-8 sm:p-12 relative overflow-hidden group hover:shadow-[0_40px_120px_-30px_rgba(37,99,235,0.15)] transition-all duration-700">
              <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-blue-600 to-indigo-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-700"></div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const target = e.target as HTMLFormElement;
                  const formData = new FormData(target);
                  const data = Object.fromEntries(formData.entries());

                  const btn = target.querySelector('button[type="submit"]') as HTMLButtonElement;
                  const originalText = btn.innerHTML;
                  btn.disabled = true;
                  btn.innerHTML = '<div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>';

                  try {
                    const res = await fetch('/api/contact', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data),
                    });

                    if (res.ok) {
                      import('react-hot-toast').then(t => t.default.success('تم إرسال رسالتكم بنجاح!'));
                      target.reset();
                      router.push('/');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      throw new Error();
                    }
                  } catch (error) {
                    import('react-hot-toast').then(t => t.default.error('حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً.'));
                  } finally {
                    btn.disabled = false;
                    btn.innerHTML = originalText;
                  }
                }}
                className="grid sm:grid-cols-2 gap-8"
              >
                <div className="space-y-2 text-right">
                  <label htmlFor="name" className="text-sm font-bold text-slate-700 mr-2 uppercase tracking-wider block">الاسم الكامل</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="أدخل اسمك هنا"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 font-medium placeholder:text-slate-300 text-right"
                  />
                </div>
                <div className="space-y-2 text-right">
                  <label htmlFor="email" className="text-sm font-bold text-slate-700 mr-2 uppercase tracking-wider block">البريد الإلكتروني</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="example@mail.com"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 font-medium placeholder:text-slate-300 text-right"
                    dir="ltr"
                  />
                </div>
                <div className="sm:col-span-2 space-y-2 text-right">
                  <label htmlFor="subject" className="text-sm font-bold text-slate-700 mr-2 uppercase tracking-wider block">الموضوع</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="عن ماذا تود الاستفسار؟"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 font-medium placeholder:text-slate-300 text-right"
                  />
                </div>
                <div className="sm:col-span-2 space-y-2 text-right">
                  <label htmlFor="message" className="text-sm font-bold text-slate-700 mr-2 uppercase tracking-wider block">رسالتكم</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="اكتب تفاصيل استفسارك هنا..."
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 font-medium placeholder:text-slate-300 resize-none text-right"
                  ></textarea>
                </div>
                <div className="sm:col-span-2 pt-4 flex justify-start">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-10 py-5 bg-[#020617] text-white text-lg font-black rounded-2xl shadow-2xl shadow-blue-900/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group/btn"
                  >
                    إرسال الرسالة
                    <svg className="w-5 h-5 transform rotate-180 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative bg-[#020617] text-slate-400 py-20 border-t border-slate-800/50 mt-auto overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="bg-white p-3 inline-block rounded-2xl shadow-xl shadow-blue-900/10 transition-transform hover:scale-105 duration-300">
                <Image
                  src="/logoecrit.png"
                  alt="Logo"
                  width={160}
                  height={64}
                  className="object-contain"
                />
              </div>
              <p className="text-sm leading-relaxed text-slate-400 font-medium">
                المركز الأفرو-متوسطي للتفكير والدراسات القانونية والسوسيو اقتصادية. منصة علمية مستقلة تهدف للمساهمة في النقاش الأكاديمي والسياسي وتطوير السياسات العامة.
              </p>
            </div>

            {/* Quick Links Section */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                روابط سريعة
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link href="#" className="group flex items-center gap-2 hover:text-white transition-all duration-300">
                    <span className="w-1.5 h-1.5 bg-slate-700 rounded-full group-hover:bg-blue-500 transition-colors"></span>
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="group flex items-center gap-2 hover:text-white transition-all duration-300">
                    <span className="w-1.5 h-1.5 bg-slate-700 rounded-full group-hover:bg-blue-500 transition-colors"></span>
                    من نحن
                  </Link>
                </li>
                <li>
                  <Link href="#objectives" className="group flex items-center gap-2 hover:text-white transition-all duration-300">
                    <span className="w-1.5 h-1.5 bg-slate-700 rounded-full group-hover:bg-blue-500 transition-colors"></span>
                    مواضيع البحث
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="group flex items-center gap-2 hover:text-white transition-all duration-300">
                    <span className="w-1.5 h-1.5 bg-slate-700 rounded-full group-hover:bg-blue-500 transition-colors"></span>
                    الانضمام للمركز
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                تواصل معنا
              </h4>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 shadow-inner">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="dir-ltr text-left" dir="ltr">
                    <a href="mailto:afromediterrneen.rejse@gmail.com" className="text-slate-300 hover:text-blue-400 transition-colors block text-sm">
                      afromediterrneen.rejse@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0 shadow-inner">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="dir-ltr text-left" dir="ltr">
                    <div className="space-y-1">
                      <a href="tel:+212665109766" className="text-slate-300 hover:text-indigo-400 transition-colors block text-sm font-medium">+212 665-109766</a>
                      <a href="tel:+212666840553" className="text-slate-300 hover:text-indigo-400 transition-colors block text-sm font-medium">+212 666-840553</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social & Share Section */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-purple-600 rounded-full"></span>
                تابعنا وشاركنا
              </h4>
              <div className="flex gap-4">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/212665109766"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-green-500/20 transition-transform hover:scale-110 duration-300 group"
                  title="WhatsApp"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 21.08h-.01c-1.859 0-3.682-.497-5.286-1.436L2 21l4.823-1.258c.895.526 1.916.804 2.956.805h.009c5.204 0 9.445-4.24 9.447-9.448.001-2.523-.98-4.896-2.763-6.68C14.686 2.637 12.31 1.655 9.782 1.65h-.005c-5.205 0-9.447 4.24-9.449 9.448 0 1.62.404 3.208 1.171 4.607zm4.787-6.526c-.262-.132-1.551-.767-1.79-.855-.238-.088-.412-.132-.586.132-.175.264-.674.855-.826 1.03-.153.176-.306.198-.568.066-1.558-.787-2.618-1.41-3.64-2.693-.266-.334.26-.309.771-.854.128-.135.258-.27.388-.395.148-.143.201-.264.301-.44.1-.176.05-.33-.016-.462-.066-.132-.586-1.41-.803-1.93-.21-.506-.425-.437-.587-.445-.152-.007-.327-.008-.502-.008-.175 0-.458.066-.698.33-.239.264-.913.892-.913 2.178 0 1.287.935 2.53 1.066 2.706.131.176 1.846 2.818 4.473 3.953 1.614.695 2.213.738 2.89.62.637-.11 1.551-.634 1.769-1.246.218-.612.218-1.137.153-1.246-.065-.11-.239-.176-.502-.308z" /></svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/sharer/sharer.php?u=https://centre-afromed.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center shadow-lg shadow-blue-500/20 transition-transform hover:scale-110 duration-300 group"
                  title="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center shadow-lg shadow-white/10 transition-transform hover:scale-110 duration-300 group"
                  title="TikTok"
                >
                  <div className="relative">
                    <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.68a6.34 6.34 0 006.34 6.31 6.34 6.34 0 006.27-5.52v-6.5a8.21 8.21 0 004.39 1.25v-3.46a4.81 4.81 0 01-2.41-.6z" /></svg>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800/50 mt-16 pt-8 text-center sm:flex sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500 font-medium">
              &copy; {new Date().getFullYear()} المركز الأفرو-متوسطي. جميع الحقوق محفوظة.
            </p>
            <p className="text-sm text-slate-600 mt-2 sm:mt-0">
              صمم بكل <span className="text-red-500">♥</span> للمستقبل الأكاديمي
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
