'use client';

import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';

/**
 * GoogleIdentitySync Component for Nyle Store
 * Integrates Google Identity Services (One Tap & Popup) with NextAuth.
 */
export default function GoogleIdentitySync() {
  const { status } = useSession();

  useEffect(() => {
    // Only initialize if the user is not authenticated and the SDK is loaded
    if (status === 'authenticated' || typeof window === 'undefined' || !window.google) {
      return;
    }

    const handleCredentialResponse = async (response) => {
      try {
        console.log('[Nyle Store] Google credential received');
        // Sign in via our custom token handler in NextAuth
        await signIn('google-id-token', {
          id_token: response.credential,
          redirect: false,
        });
        
        // Refresh the page or redirect to dashboard
        window.location.href = '/dashboard';
      } catch (error) {
        console.error('[Nyle Store] Login error:', error);
      }
    };

    // Initialize Google Identity
    window.google.accounts.id.initialize({
      client_id: '766373716111-naoh8vma3on54nnhtlolhr2orae6q14v.apps.googleusercontent.com',
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
      context: 'signin',
    });

    // Prompt for One Tap
    window.google.accounts.id.prompt();

  }, [status]);

  return <div id="g_id_onload" style={{ position: 'fixed', top: 0, right: 0, zIndex: 9999 }}></div>;
}
