
import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { SunIcon, MoonIcon } from './IconComponents';

const ThemeToggle: React.FC = () => {
    const [theme, toggleTheme] = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-dark-surface hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-offset-dark-background"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? (
                <MoonIcon className="w-5 h-5 text-slate-600" />
            ) : (
                <SunIcon className="w-5 h-5 text-yellow-400" />
            )}
        </button>
    );
};

export default ThemeToggle;
