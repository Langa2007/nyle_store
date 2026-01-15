"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ScrollRestorationController() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const scrollPositions = useRef({});

  // Restore scroll position on route change
  useEffect(() => {
    const scrollRoot = document.getElementById("scroll-root");
    if (!scrollRoot) return;

    const key = `${pathname}?${searchParams.toString()}`;

    // Disable browser's default scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const restoreScroll = () => {
      const savedPosition = scrollPositions.current[key];
    
      // Otherwise, ONLY scroll to top if we explicitly don't want to preserve (e.g., new navigation).
      // However, typical behavior for "new page" is top.
      // But for "back" navigation, we want the saved position.

      // Since Next.js doesn't easily distinguish "back" vs "push" in this effect without more complex router events,
      // use a simple heuristic:
      //  have a saved position, try to use it. 
      // NOTE: usePathname triggers on both push and pop.

      if (savedPosition !== undefined) {
        // Create a small retry mechanism to handle dynamic content loading (e.g. images expanding layout)
        let attempts = 0;
        const attemptScroll = () => {
          if (Math.abs(scrollRoot.scrollTop - savedPosition) > 10) {
            scrollRoot.scrollTo({ top: savedPosition, behavior: "auto" });
          }

          // If the document height is less than savedPosition, can't scroll there yet
          if (attempts < 5) {
            attempts++;
            requestAnimationFrame(attemptScroll);
          }
        };
        requestAnimationFrame(attemptScroll);

      } else {
        // New route or no history: scroll to top
        scrollRoot.scrollTo({ top: 0, behavior: "auto" });
      }
    };

    // Wait delay slightly to allow DOM to settle
    const timeoutId = setTimeout(restoreScroll, 50);

    return () => clearTimeout(timeoutId);
  }, [pathname, searchParams]);

  // Save scroll position before leaving or when scrolling
  useEffect(() => {
    const scrollRoot = document.getElementById("scroll-root");
    if (!scrollRoot) return;

    const handleScroll = () => {
      const key = `${pathname}?${searchParams.toString()}`;
      scrollPositions.current[key] = scrollRoot.scrollTop;
    };

    // Debounce scroll event for performance
    let timeout;
    const debouncedScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleScroll, 100);
    };

    scrollRoot.addEventListener("scroll", debouncedScroll);
    return () => {
      scrollRoot.removeEventListener("scroll", debouncedScroll);
      clearTimeout(timeout);
    };
  }, [pathname, searchParams]);

  return null;
}
