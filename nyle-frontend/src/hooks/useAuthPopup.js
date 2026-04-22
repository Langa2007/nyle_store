'use client';

import { useState, useCallback } from 'react';
import { getSession, signIn } from 'next-auth/react';

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

      if (!result?.url) {
        options.onError?.('Unable to start Google sign-in. Please try again.');
        setIsAuthenticating(false);
        return;
      }

      const popup = window.open(result.url, 'NyleStoreAuth', popupFeatures);
      
      if (!popup) {
        const popupBlockedMessage = 'Popup blocked. Please allow popups for this site.';
        options.onError?.(popupBlockedMessage);
        alert(popupBlockedMessage);
        setIsAuthenticating(false);
        return;
      }

      const getFreshSession = async () => {
        for (let attempt = 0; attempt < 5; attempt += 1) {
          const session = await getSession();

          if (session?.user) {
            return session;
          }

          await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
        }

        return null;
      };

      let checkClosed;

      const messageHandler = async (event) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data?.type === 'AUTH_SUCCESS' && event.data?.source === 'next-auth-popup') {
          window.removeEventListener('message', messageHandler);
          clearInterval(checkClosed);

          try {
            const session = await getFreshSession();

            if (options.onSuccess) {
              await options.onSuccess(session);
            } else {
              window.location.reload();
            }
          } catch (callbackError) {
            console.error('Nyle Store Popup Auth Success Handler Error:', callbackError);
            options.onError?.('Google sign-in finished, but we could not complete the session setup.');
          } finally {
            setIsAuthenticating(false);
          }
        }
      };

      window.addEventListener('message', messageHandler);

      // Monitor if popup was closed without finishing
      checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', messageHandler);
          setIsAuthenticating(false);
        }
      }, 1000);
    } catch (error) {
      console.error('Nyle Store Popup Auth Error:', error);
      options.onError?.('Authentication failed. Please try again.');
      setIsAuthenticating(false);
    }
  }, [isAuthenticating]);

  return {
    signInWithPopup,
    isAuthenticating
  };
};
