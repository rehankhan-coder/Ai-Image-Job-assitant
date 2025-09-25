import React from 'react';
import { ClerkIcon, LogoIcon } from './IconComponents';

interface LoginScreenProps {
    onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background dark:bg-dark-background animate-fade-in transition-colors duration-300">
            <div className="w-full max-w-md p-8 space-y-8 bg-surface dark:bg-dark-surface rounded-2xl shadow-lg text-center">
                <div className="flex justify-center">
                   <LogoIcon className="h-16 w-16 text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary">Welcome Back</h1>
                <p className="text-text-secondary dark:text-dark-text-secondary">
                    Sign in to access your AI Image Generator & Job Assistant and create stunning images.
                </p>
                <div className="pt-4">
                    <button
                        onClick={onLogin}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 font-semibold text-white bg-primary rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-offset-dark-surface transition-all duration-300"
                    >
                        <ClerkIcon className="h-6 w-6" />
                        Sign In with Clerk
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;