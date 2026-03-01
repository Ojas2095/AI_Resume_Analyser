import React, { useEffect, useState } from 'react';

const AIScanningLoader = () => {
    const [dataLines, setDataLines] = useState([]);

    useEffect(() => {
        // Generate random "data streams" for the scanning effect
        const interval = setInterval(() => {
            const newLine = {
                id: Math.random(),
                width: Math.floor(Math.random() * 60) + 20 + '%',
                top: Math.floor(Math.random() * 90) + '%',
                delay: Math.random() * 2 + 's'
            };
            setDataLines(prev => [newLine, ...prev].slice(0, 15));
        }, 200);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-3xl overflow-hidden glass border border-primary/20 bg-background-dark/30 shadow-2xl">
            {/* Laser Scanning Line */}
            <div className="absolute inset-x-0 h-1 bg-primary/40 shadow-[0_0_20px_2px_rgba(0,102,204,0.6)] z-20 animate-scan pointer-events-none">
                <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-primary/0 to-primary/40 blur-sm"></div>
            </div>

            {/* Dynamic Data Streams */}
            <div className="absolute inset-0 p-8 space-y-4 opacity-20 overflow-hidden">
                {dataLines.map(line => (
                    <div
                        key={line.id}
                        className="h-1 bg-primary/30 rounded-full animate-data-pulse"
                        style={{
                            width: line.width,
                            marginLeft: Math.random() * 20 + '%',
                            animationDelay: line.delay
                        }}
                    />
                ))}
            </div>

            {/* Document Mockup Structure */}
            <div className="relative z-10 p-10 h-full flex flex-col pointer-events-none">
                <div className="w-1/3 h-6 bg-foreground-dark/10 rounded-lg mb-8" />
                <div className="w-full h-4 bg-foreground-dark/5 rounded-lg mb-4" />
                <div className="w-5/6 h-4 bg-foreground-dark/5 rounded-lg mb-12" />

                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10" />
                        <div className="flex-1 space-y-2">
                            <div className="w-1/2 h-3 bg-foreground-dark/10 rounded-lg" />
                            <div className="w-full h-3 bg-foreground-dark/5 rounded-lg" />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary/10" />
                        <div className="flex-1 space-y-2">
                            <div className="w-1/2 h-3 bg-foreground-dark/10 rounded-lg" />
                            <div className="w-full h-3 bg-foreground-dark/5 rounded-lg" />
                        </div>
                    </div>
                </div>

                <div className="mt-auto flex justify-center">
                    <div className="px-6 py-2 rounded-full glass border border-primary/20 text-[10px] font-bold tracking-widest text-primary uppercase animate-pulse">
                        Neural Analysis in Progress
                    </div>
                </div>
            </div>

            {/* Atmospheric Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />
        </div>
    );
};

export default AIScanningLoader;
