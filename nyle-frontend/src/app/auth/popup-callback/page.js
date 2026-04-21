'use client';

import { useEffect } from 'react';

/**
 * Authentication Popup Callback Page for Nyle Store
 * This page is loaded inside a popup window after successful OAuth.
 * It signals the parent window and closes itself.
 */
export default function AuthPopupCallback() {
  useEffect(() => {
    // Notify the parent window that authentication was successful
    if (window.opener) {
      window.opener.postMessage(
        { type: 'AUTH_SUCCESS', source: 'next-auth-popup' },
        window.location.origin
      );
    }
    
    // Close the popup after a brief delay to ensure message is sent
    const timer = setTimeout(() => {
      window.close();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-8 text-center font-sans">
      <div className="max-w-xs">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Connecting to Nyle Store</h1>
        <p className="text-gray-500 text-sm">Finishing secure authentication... this window will close automatically.</p>
      </div>
    </div>
  );
}
