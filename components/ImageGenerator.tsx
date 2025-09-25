
import React, { useState, useCallback } from 'react';
import { generateImage } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import { ImageIcon, SparklesIcon } from './IconComponents';

const ImageGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt to generate an image.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setImageUrl(null);

        try {
            const base64Image = await generateImage(prompt);
            setImageUrl(`data:image/jpeg;base64,${base64Image}`);
        } catch (err) {
            const e = err as Error;
            setError(e.message || 'An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [prompt]);

    return (
        <div className="bg-surface dark:bg-dark-surface rounded-2xl shadow-lg p-6 md:p-8 flex flex-col gap-6 animate-slide-in-up transition-colors duration-300">
            <div>
                <h2 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">AI Image Generator</h2>
                <p className="text-text-secondary dark:text-dark-text-secondary mt-1">Create unique images for your profile or projects.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., A minimalist logo for a tech startup"
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-text-primary dark:text-dark-text-primary placeholder:text-text-secondary dark:placeholder:text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-light transition"
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-accent rounded-lg shadow-md hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300"
                >
                    <SparklesIcon className="w-5 h-5" />
                    <span>{isLoading ? 'Generating...' : 'Generate'}</span>
                </button>
            </div>

            {error && <p className="text-red-500 dark:text-red-400 text-sm mt-2">{error}</p>}

            <div className="mt-4 aspect-square bg-slate-100 dark:bg-dark-background/50 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-dark-border overflow-hidden">
                {isLoading && <LoadingSpinner className="w-12 h-12 text-primary" />}
                {!isLoading && !imageUrl && (
                    <div className="text-center text-text-secondary dark:text-dark-text-secondary p-4">
                        <ImageIcon className="w-16 h-16 mx-auto" />
                        <p className="mt-2 font-medium">Your generated image will appear here</p>
                    </div>
                )}
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={prompt}
                        className="w-full h-full object-cover animate-fade-in"
                    />
                )}
            </div>
        </div>
    );
};

export default ImageGenerator;
