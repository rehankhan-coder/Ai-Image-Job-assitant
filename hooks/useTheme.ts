
import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = (): [Theme, () => void] => {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        const root = window.document.documentElement;
        const initialTheme = localStorage.getItem('theme') as Theme | null;

        if (initialTheme) {
            setTheme(initialTheme);
            root.classList.toggle('dark', initialTheme === 'dark');
        } else {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initialSystemTheme = systemPrefersDark ? 'dark' : 'light';
            setTheme(initialSystemTheme);
            root.classList.toggle('dark', systemPrefersDark);
        }
    }, []);

    const toggleTheme = useCallback(() => {
        const root = window.document.documentElement;
        const newTheme = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
        root.classList.toggle('dark', newTheme === 'dark');
    }, [theme]);

    return [theme, toggleTheme];
};
