"use client";

import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import { useIsMobile } from "@/lib/useMobile";

export default function ScrollToTop() {
    const isMobile = useIsMobile();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isMobile) return;

        const scrollRoot = document.getElementById("scroll-root");
        if (!scrollRoot) return;

        const toggleVisibility = () => {
            if (scrollRoot.scrollTop > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        scrollRoot.addEventListener("scroll", toggleVisibility);

        return () => {
            scrollRoot.removeEventListener("scroll", toggleVisibility);
        };
    }, [isMobile]);

    if (isMobile) return null;

    const scrollToTop = () => {
        const scrollRoot = document.getElementById("scroll-root");
        if (scrollRoot) {
            scrollRoot.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-[100] w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-all"
                    aria-label="Scroll to top"
                >
                    <FaArrowUp />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
