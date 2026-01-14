"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRestorationController() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollRoot = document.getElementById("scroll-root");
    if (!scrollRoot) return;

    // Disable browser auto scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Restore scroll position
    const savedScroll = sessionStorage.getItem(`SCROLL:${pathname}`);
    if (savedScroll) {
      requestAnimationFrame(() => {
        scrollRoot.scrollTo({
          top: Number(savedScroll),
          behavior: "auto",
        });
      });
    }

    return () => {
      // Save scroll position before route change
      sessionStorage.setItem(
        `SCROLL:${pathname}`,
        String(scrollRoot.scrollTop)
      );
    };
  }, [pathname]);

  return null;
}
