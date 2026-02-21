'use client';

import { useEffect, useState } from 'react';

interface ScrollPosition {
    scrollY: number;
    scrollDirection: 'up' | 'down' | null;
    isScrolled: boolean;
    isHidden: boolean;
}

const HIDE_DELTA = 30; // must scroll down this many px before hiding

export function useScrollPosition(threshold: number = 50, hideAfterVh: number = 0.6): ScrollPosition {
    const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
        scrollY: 0,
        scrollDirection: null,
        isScrolled: false,
        isHidden: false,
    });

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;
        let downAccum = 0;
        let hidden = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    const delta = currentScrollY - lastScrollY;
                    const direction: 'up' | 'down' | null =
                        delta > 0 ? 'down' : delta < 0 ? 'up' : null;

                    const hideAt = window.innerHeight * hideAfterVh;

                    if (direction === 'down' && currentScrollY > hideAt) {
                        downAccum += delta;
                        if (downAccum >= HIDE_DELTA) hidden = true;
                    } else if (direction === 'up') {
                        downAccum = 0;
                        hidden = false;
                    }

                    if (currentScrollY <= hideAt) {
                        downAccum = 0;
                        hidden = false;
                    }

                    setScrollPosition({
                        scrollY: currentScrollY,
                        scrollDirection: direction,
                        isScrolled: currentScrollY > threshold,
                        isHidden: hidden,
                    });

                    lastScrollY = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold, hideAfterVh]);

    return scrollPosition;
}
