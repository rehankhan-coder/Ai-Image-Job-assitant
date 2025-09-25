
import React, { useState, useCallback } from 'react';
import LoginScreen from './components/LoginScreen';
import Header from './components/Header';
import ChatAssistant from './components/ChatAssistant';
import ImageGenerator from './components/ImageGenerator';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = useCallback(() => {
        setIsAuthenticated(true);
    }, []);

    const handleLogout = useCallback(() => {
        setIsAuthenticated(false);
    }, []);

    if (!isAuthenticated) {
        return <LoginScreen onLogin={handleLogin} />;
    }

    return (
        // The body tag now handles the base background color and transition
        <div className="min-h-screen flex flex-col">
            <Header onLogout={handleLogout} />
            <main className="flex-grow container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
                <div className="lg:col-span-5 xl:col-span-4">
                    <ChatAssistant />
                </div>
                <div className="lg:col-span-7 xl:col-span-8">
                    <ImageGenerator />
                </div>
            </main>
        </div>
    );
};

export default App;
