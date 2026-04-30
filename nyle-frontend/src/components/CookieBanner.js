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
      const timer = setTimeout(() => setIsVisible(true), 2000);
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
    
    // Connect to backend if user is logged in
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
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-6 right-6 z-[200] md:left-auto md:max-w-md"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-100 p-6 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-12 -mt-12 opacity-50" />
          
          <div className="flex items-start gap-4 relative z-10">
            <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200">
              <Cookie size={24} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900">Cookie Settings</h3>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                We use cookies to personalize content, analyze traffic, and provide a better experience. Choose how you want to interact with Nyle Store.
              </p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
                >
                  <Check size={18} />
                  Accept All
                </button>
                <div className="flex gap-2">
                  <Link 
                    href="/others/cookies"
                    className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold text-center text-sm transition-colors border border-gray-200 flex items-center justify-center gap-2"
                  >
                    <Settings size={16} />
                    Customize
                  </Link>
                  <button
                    onClick={handleDecline}
                    className="px-6 bg-white hover:bg-red-50 text-red-600 py-3 rounded-xl font-semibold text-sm transition-colors border border-red-100"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 text-[10px] text-gray-400 text-center">
            View our <Link href="/auth/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link> for more details.
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
