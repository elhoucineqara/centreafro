"use client";

import React, { useRef } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

// This layout includes the Arabic letters commonly used.
const arabicLayout = {
    default: [
        "ض ص ث ق ف غ ع ه خ ح ج د",
        "ش س ي ب ل ا ت ن م ك ط",
        "ئ ء ؤ ر لا ى ة و ز ظ",
        "{space} {bksp}"
    ]
};

interface ArabicKeyboardProps {
    onKeyPress: (char: string) => void;
    onBackspace: () => void;
    onSpace: () => void;
    onClose: () => void;
}

export default function ArabicKeyboard({ onKeyPress, onBackspace, onSpace, onClose }: ArabicKeyboardProps) {
    const keyboard = useRef<typeof Keyboard | null>(null);

    const handleKeyPress = (button: string) => {
        if (button === "{bksp}") onBackspace();
        else if (button === "{space}") onSpace();
        else onKeyPress(button);
    };

    return (
        <div className="absolute top-[calc(100%+8px)] right-0 bg-white p-3 rounded-2xl shadow-2xl border border-gray-200 z-50 w-[350px] sm:w-[450px]">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
                <span className="text-sm font-bold text-gray-700">لوحة المفاتيح العربية</span>
                <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="arabic-keyboard-theme" dir="ltr">
                <Keyboard
                    keyboardRef={(r: typeof Keyboard) => (keyboard.current = r)}
                    layout={arabicLayout}
                    onKeyPress={handleKeyPress}
                    display={{
                        "{bksp}": "مسح ⌫",
                        "{space}": "مسافة",
                    }}
                    theme={"hg-theme-default my-custom-keyboard"}
                    buttonTheme={[
                        {
                            class: "hg-standard-btn",
                            buttons: "ض ص ث ق ف غ ع ه خ ح ج د ش س ي ب ل ا ت ن م ك ط ئ ء ؤ ر لا ى ة و ز ظ"
                        }
                    ]}
                />
            </div>

            <style jsx global>{`
        .my-custom-keyboard.hg-theme-default {
          background-color: transparent;
          font-family: inherit;
        }
        .my-custom-keyboard .hg-button {
          height: 44px;
          border-radius: 8px;
          font-size: 1.1rem;
          font-family: var(--font-tajawal), sans-serif;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          color: #1f2937;
        }
        .my-custom-keyboard .hg-button:active {
          background: #eff6ff;
          border-color: #bfdbfe;
        }
        .my-custom-keyboard .hg-button.hg-standard-btn {
          font-weight: 500;
        }
        .my-custom-keyboard .hg-button-space, 
        .my-custom-keyboard .hg-button-bksp {
          background: #f3f4f6;
          font-weight: 600;
          font-size: 1rem;
        }
        .my-custom-keyboard .hg-button-bksp {
          color: #ef4444;
          background: #fef2f2;
          border-color: #fecaca;
        }
      `}</style>
        </div>
    );
}
