"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50 h-20">
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
                        <Link href="/#about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">من نحن</Link>
                        <Link href="/#objectives" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">أهدافنا</Link>
                        <Link href="/#contact-form" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">اتصل بنا</Link>
                        <Link
                            href="/register"
                            className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            بوابة التسجيل
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-600 hover:text-blue-600 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-1 shadow-lg absolute inset-x-0 top-20">
                    <Link href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 text-right">من نحن</Link>
                    <Link href="/#objectives" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 text-right">أهدافنا</Link>
                    <Link href="/#contact-form" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 text-right">اتصل بنا</Link>
                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center mt-4 bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors">
                        بوابة التسجيل
                    </Link>
                </div>
            )}
        </nav>
    );
}
