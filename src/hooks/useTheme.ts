'use client';

import { useCallback, useEffect, useState } from 'react';

export function useTheme() {
    const [theme, setThemeState] = useState<'light' | 'dark'>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem('rapsora-theme') as
            | 'light'
            | 'dark'
            | null;

        if (stored) {
            setThemeState(stored);
            document.documentElement.classList.toggle('dark', stored === 'dark');
        } else {
            // Default to dark (matches the logo aesthetic)
            const prefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches;
            const initial = prefersDark ? 'dark' : 'light';
            setThemeState(initial);
            document.documentElement.classList.toggle('dark', initial === 'dark');
        }
    }, []);

    const setTheme = useCallback((newTheme: 'light' | 'dark') => {
        setThemeState(newTheme);
        localStorage.setItem('rapsora-theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }, [theme, setTheme]);

    return { theme, setTheme, toggleTheme, mounted };
}
