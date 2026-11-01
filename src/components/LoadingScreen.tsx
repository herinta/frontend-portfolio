import React, { useEffect, useState } from 'react';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';

    const CRITICAL_IMAGES = [
      '/images/bg-section.webp',
      '/images/bg.webp',
      '/images/clouds.png',
      '/images/profile.jpg'
    ];

    let targetProgress = 15; // starting buffer for immediate visual response
    let loadedCount = 0;

    const checkImageLoaded = () => {
      loadedCount++;
      // Scale from 15% to 90% based on image loading, saving last 10% for full window load
      const newTarget = 15 + Math.round((loadedCount / CRITICAL_IMAGES.length) * 75);
      if (newTarget > targetProgress) {
        targetProgress = newTarget;
      }
    };

    // Preload critical images
    CRITICAL_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (img.complete) {
        checkImageLoaded();
      } else {
        img.onload = checkImageLoaded;
        img.onerror = checkImageLoaded; // resolve even on error to prevent loading lock
      }
    });

    // Listen for complete window resource load (fonts, subresources)
    const handleWindowLoad = () => {
      targetProgress = 100;
    };

    if (document.readyState === 'complete') {
      targetProgress = 100;
    } else {
      window.addEventListener('load', handleWindowLoad);
    }

    // Smooth easing interpolation for progress value
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= targetProgress) {
          if (targetProgress === 100 && prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev;
        }
        
        // Ease-out progress increment
        const distance = targetProgress - prev;
        const step = Math.ceil(distance * 0.12);
        const next = prev + (step > 0 ? step : 1);
        return next >= 100 ? 100 : next;
      });
    }, 40);

    return () => {
      window.removeEventListener('load', handleWindowLoad);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Small delay for UX satisfaction before fading out
      const timeout = setTimeout(() => {
        setFadeOut(true);
        // Enable scrolling back and force top
        document.body.style.overflow = '';
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Complete unmount after transition completes
        const unmountTimeout = setTimeout(() => {
          window.scrollTo(0, 0);
          onComplete();
        }, 700); // matches transition-opacity duration-700
        
        return () => clearTimeout(unmountTimeout);
      }, 400);

      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#02000a] flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out select-none ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Atmospheric Starry Space Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/20 via-black to-[#010005] overflow-hidden">
        {/* Soft glowing space nebulae */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Central Loading Panel */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Logo / Initials */}
        <div className="flex flex-col items-center mb-2">
          <h1
            className="text-4xl sm:text-5xl font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-sky-300 drop-shadow-[0_0_25px_rgba(6,182,212,0.3)] tracking-wide font-script"
          >
            Herinta Armantya
          </h1>
          <p className="text-[10px] font-bold tracking-[0.4em] text-slate-400 uppercase mt-2">
            Creative Portfolio
          </p>
        </div>

        {/* Numeric Counter */}
        <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-widest tabular-nums drop-shadow-sm select-none">
          {progress}<span className="text-lg text-cyan-400">%</span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-48 sm:w-56 h-1 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px] relative shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-sky-400 rounded-full transition-all duration-100 ease-out shadow-[0_0_10px_rgba(6,182,212,0.7)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Hint */}
        <p className="text-[9px] font-bold tracking-widest text-slate-500 uppercase animate-pulse">
          {progress < 100 ? 'Syncing cosmic parameters...' : 'Welcome aboard'}
        </p>
      </div>
    </div>
  );
};
