'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Check, Settings } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function CookieBanner() {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = async () => {
    const preferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('cookie-consent', 'true');
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
    
    if (session?.user?.id) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://nyle-store.onrender.com'}/api/user/cookie-preferences`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ preferences }),
          credentials: 'include'
        });
      } catch (err) {
        console.error('Failed to sync cookie preferences to backend:', err);
      }
    }
    
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-[1000] border-t border-gray-200"
      >
        <div className="bg-white/95 backdrop-blur-md shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] py-4 px-6 md:py-3">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg text-white hidden sm:block">
                <Cookie size={18} />
              </div>
              <p className="text-xs md:text-sm text-gray-700 font-medium leading-tight text-center md:text-left max-w-2xl">
                We use cookies to personalize content, analyze traffic, and improve your experience. 
                <Link href="/others/cookies" className="text-blue-600 hover:underline ml-1">Learn more</Link>
              </p>
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                onClick={handleAcceptAll}
                className="flex-1 md:flex-none whitespace-nowrap bg-gray-900 hover:bg-black text-white px-5 py-2 rounded-lg font-bold text-xs md:text-sm transition-all shadow-sm active:scale-95"
              >
                Accept All
              </button>
              <Link 
                href="/others/cookies"
                className="flex-1 md:flex-none whitespace-nowrap bg-white hover:bg-gray-50 text-gray-700 px-5 py-2 rounded-lg font-bold text-xs md:text-sm transition-colors border border-gray-200 text-center active:scale-95"
              >
                Customize
              </Link>
              <button
                onClick={handleDecline}
                className="flex-none text-gray-400 hover:text-red-500 p-2 transition-colors ml-1"
                title="Decline all"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
