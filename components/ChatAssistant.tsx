
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { type Message, Role } from '../types';
import { type Chat } from "@google/genai";
import { createChat, sendMessage } from '../services/geminiService';
import { UserIcon, AssistantIcon, SendIcon } from './IconComponents';
import LoadingSpinner from './LoadingSpinner';

const ChatAssistant: React.FC = () => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([
        { role: Role.ASSISTANT, content: "Hello! How can I assist you with your job search or platform questions today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setChat(createChat());
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chat) return;

        const userMessage: Message = { role: Role.USER, content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const responseText = await sendMessage(chat, input);
            const assistantMessage: Message = { role: Role.ASSISTANT, content: responseText };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            const errorMessage: Message = { role: Role.ASSISTANT, content: "Sorry, I'm having trouble connecting. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, chat]);

    return (
        <div className="bg-surface dark:bg-dark-surface rounded-2xl shadow-lg flex flex-col h-full max-h-[85vh] animate-slide-in-up transition-colors duration-300">
            <div className="p-4 border-b border-slate-200 dark:border-dark-border">
                <h2 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">Job Application Assistant</h2>
            </div>
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === Role.USER ? 'justify-end' : ''}`}>
                        {msg.role === Role.ASSISTANT && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white"><AssistantIcon className="w-5 h-5" /></div>}
                        <div className={`max-w-xs md:max-w-sm lg:max-w-md px-4 py-3 rounded-2xl ${msg.role === Role.USER ? 'bg-primary text-white rounded-br-none' : 'bg-slate-100 text-slate-700 rounded-bl-none dark:bg-slate-700 dark:text-dark-text-primary'}`}>
                            <p className="text-sm break-words">{msg.content}</p>
                        </div>
                        {msg.role === Role.USER && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300"><UserIcon className="w-5 h-5" /></div>}
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white"><AssistantIcon className="w-5 h-5" /></div>
                        <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl rounded-bl-none px-4 py-3 flex items-center">
                            <LoadingSpinner className="w-5 h-5 text-primary" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-dark-border">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask for help..."
                        disabled={isLoading}
                        className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full text-text-primary dark:text-dark-text-primary placeholder:text-text-secondary dark:placeholder:text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-light transition"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center disabled:bg-slate-400 dark:disabled:bg-slate-600 hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-offset-dark-surface"
                    >
                        <SendIcon className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatAssistant;
