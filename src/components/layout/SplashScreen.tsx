import { useEffect, useState } from 'react';

interface SplashScreenProps {
    onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Start exit animation after 2.5 seconds
        const exitTimer = setTimeout(() => {
            setIsExiting(true);
        }, 2500);

        // Call onComplete after exit animation finishes (0.8s)
        const completeTimer = setTimeout(() => {
            onComplete();
        }, 3200);

        return () => {
            clearTimeout(exitTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0f] transition-all duration-700 ease-in-out
      ${isExiting ? 'opacity-0 scale-110 pointer-events-none blur-sm' : 'opacity-100 scale-100 blur-0'}`}
        >
            <div className="relative z-10 flex flex-col items-center">
                {/* Logo Container */}
                <div className="flex items-baseline gap-1 splash-animate-logo relative">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-[#E50914] drop-shadow-[0_0_25px_rgba(229,9,20,0.6)]">
                        NETFLIX
                    </h1>
                    <span className="text-5xl md:text-7xl lg:text-8xl font-light text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                        +
                    </span>

                    {/* Subtle reflection/glow specifically behind the logo */}
                    <div className="absolute -inset-10 bg-[#E50914] opacity-20 blur-[100px] rounded-full z-[-1]" />
                </div>

                {/* Tagline */}
                <div className="mt-6 splash-animate-sub">
                    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gray-500 to-transparent mb-3 mx-auto" />
                    <p className="text-sm md:text-lg text-gray-300 font-medium tracking-[0.3em] uppercase opacity-90">
                        By Yeshu
                    </p>
                </div>
            </div>

            {/* Background Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-[#050505] to-[#121212] z-[-2]" />

            {/* Cinematic vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_120%)] z-[-1] opacity-80" />
        </div>
    );
};
