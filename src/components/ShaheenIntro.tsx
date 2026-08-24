import React, { useState, useRef, useEffect } from 'react';
import { Play, SkipForward } from 'lucide-react';
import cyberneticFalconImg from '../assets/images/cybernetic_falcon_1787579678283.jpg';

interface ShaheenIntroProps {
  onComplete: () => void;
  lang: 'ar' | 'en';
}

export const ShaheenIntro: React.FC<ShaheenIntroProps> = ({ onComplete, lang }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // If video fails to load immediately, just skip
    const checkTimeout = setTimeout(() => {
      if (!isPlaying && videoError) {
        onComplete();
      }
    }, 2000);
    return () => clearTimeout(checkTimeout);
  }, [isPlaying, videoError, onComplete]);

  const handleStart = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // If autoplay/play fails, just skip
        onComplete();
      });
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center overflow-hidden">
      
      {!isPlaying && !videoError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 z-20">
          <div className="relative mb-6 flex flex-col items-center">
            <div className="absolute inset-0 bg-sky-500/25 rounded-full blur-3xl animate-pulse" />
            <img 
              src={cyberneticFalconImg} 
              alt="Shaheen Logo" 
              className="w-48 h-48 md:w-60 md:h-60 object-cover rounded-full border-4 border-sky-400/60 shadow-[0_0_70px_rgba(56,189,248,0.6)] relative z-10"
            />
            <div className="mt-4 text-center relative z-10">
              <h2 className="text-2xl md:text-3xl font-black text-white font-mono tracking-wider">
                🦅 SHAHEEN APEX AI
              </h2>
              <p className="text-xs md:text-sm text-sky-300 font-medium mt-1">
                {lang === 'ar' ? 'شركة شاهين للتقنيات والذكاء الاصطناعي • الإنسان قبل المال' : 'Shaheen Technologies & Predictive AI • Humanity First'}
              </p>
            </div>
          </div>
          <button 
            onClick={handleStart}
            className="px-8 py-4 bg-gradient-to-r from-sky-600 via-cyan-500 to-blue-600 hover:from-sky-500 hover:to-cyan-400 text-white rounded-full font-black text-lg flex items-center gap-3 transition-all transform hover:scale-105 shadow-[0_0_35px_rgba(56,189,248,0.7)] cursor-pointer"
          >
            <Play className="w-6 h-6 fill-current" />
            {lang === 'ar' ? 'دخول المنظومة (صوت شاهين الرسمي)' : 'Enter System (Official Sound)'}
          </button>
          <p className="mt-4 text-slate-400 text-xs md:text-sm text-center max-w-md">
            {lang === 'ar' ? '🔊 المتصفحات تتطلب تفاعلاً لتشغيل الصوت الفخم بدقة عالية. اضغط للاستمتاع بهيبة البداية.' : '🔊 High fidelity audio intro requires a user gesture. Click to enter with full cinematic immersion.'}
          </p>
        </div>
      )}

      {/* Video Element */}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
        onEnded={onComplete}
        onError={() => setVideoError(true)}
        playsInline
      >
        <source src="/intro.mp4" type="video/mp4" />
        <source src="/SHAHEEN_Intro_Falcon (2).mp4" type="video/mp4" />
      </video>

      {/* Skip Button */}
      {isPlaying && (
        <button 
          onClick={handleSkip}
          className="absolute bottom-8 right-8 px-4 py-2 bg-black/50 hover:bg-black/80 text-white/70 hover:text-white rounded-full text-sm flex items-center gap-2 backdrop-blur-sm transition-all"
        >
          {lang === 'ar' ? 'تخطي' : 'Skip'}
          <SkipForward className="w-4 h-4" />
        </button>
      )}

    </div>
  );
};
