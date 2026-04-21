'use client';

import { useState, useCallback } from 'react';
import { signIn } from 'next-auth/react';

/**
 * useAuthPopup Hook for Nyle Store
 * Manages the lifecycle of an authentication popup window.
 */
export const useAuthPopup = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const signInWithPopup = useCallback(async (provider, options = {}) => {
    if (isAuthenticating) return;
    
    setIsAuthenticating(true);
    
    // Define popup parameters
    const width = 600;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    const popupFeatures = `width=${width},height=${height},left=${left},top=${top},status=no,menubar=no,toolbar=no`;
    
    // The callback URL points to the Nyle Store auth-popup-callback route
    const callbackUrl = `${window.location.origin}/auth/popup-callback`;
    
    try {
      // Trigger NextAuth signIn but handle the URL manually for the popup
      const result = await signIn(provider, {
        callbackUrl,
        redirect: false,
      });

      if (result?.url) {
        const popup = window.open(result.url, 'NyleStoreAuth', popupFeatures);
        
        if (!popup) {
          alert('Popup blocked. Please allow popups for this site.');
          setIsAuthenticating(false);
          return;
        }

        const messageHandler = (event) => {
          if (event.origin !== window.location.origin) return;
          
          if (event.data?.type === 'AUTH_SUCCESS' && event.data?.source === 'next-auth-popup') {
            window.removeEventListener('message', messageHandler);
            
            // Success! 
            if (options.onSuccess) {
              options.onSuccess();
            } else {
              window.location.reload();
            }
            setIsAuthenticating(false);
          }
        };

        window.addEventListener('message', messageHandler);

        // Monitor if popup was closed without finishing
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed);
            setIsAuthenticating(false);
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Nyle Store Popup Auth Error:', error);
      setIsAuthenticating(false);
    }
  }, [isAuthenticating]);

  return {
    signInWithPopup,
    isAuthenticating
  };
};
