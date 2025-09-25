import React from 'react';
import { LogoIcon, LogoutIcon } from './IconComponents';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
    return (
        <header className="bg-surface shadow-md sticky top-0 z-10 dark:bg-dark-surface dark:border-b dark:border-dark-border dark:shadow-none transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <LogoIcon className="h-8 w-8 text-primary" />
                        <h1 className="text-xl font-bold text-text-primary dark:text-dark-text-primary hidden sm:block">AI Image & Job Assistant</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-secondary bg-slate-100 rounded-md hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:bg-dark-surface dark:text-dark-text-secondary dark:hover:bg-slate-700 dark:focus:ring-offset-dark-background transition-colors"
                        >
                            <LogoutIcon className="h-5 w-5" />
                            <span className="hidden md:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;