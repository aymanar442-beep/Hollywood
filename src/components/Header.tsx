import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Film, 
  Sparkles, 
  Lock, 
  FileText, 
  Activity, 
  Eye, 
  Tv, 
  Flame, 
  Cpu, 
  Briefcase, 
  Download, 
  PlaySquare, 
  Star, 
  Globe, 
  ChevronDown,
  Clock,
  Zap,
  TrendingUp
} from 'lucide-react';
import { AppLang } from '../types';
import cyberneticFalconImg from '../assets/images/cybernetic_falcon_1787579678283.jpg';

interface HeaderProps {
  activeTab: 'studio' | 'godfather' | 'watermark' | 'salvage' | 'core' | 'simulator' | 'economics' | 'roi' | 'pitch' | 'deck' | 'showcase' | 'docs' | 'diagnostic';
  setActiveTab: (tab: 'studio' | 'godfather' | 'watermark' | 'salvage' | 'core' | 'simulator' | 'economics' | 'roi' | 'pitch' | 'deck' | 'showcase' | 'docs' | 'diagnostic') => void;
  lang: AppLang;
  setLang: (l: AppLang) => void;
  isConnected: boolean;
  latencyMs?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  isConnected,
  latencyMs,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentCityLabel, setCurrentCityLabel] = useState<string>('');

  const languages: { code: AppLang; label: string; flag: string; timezone: string; cityAr: string; cityEn: string }[] = [
    { code: 'en', label: 'English (US / Hollywood)', flag: '🇺🇸', timezone: 'America/Los_Angeles', cityAr: 'هوليوود (LA)', cityEn: 'Hollywood (LA)' },
    { code: 'en_gb', label: 'English (UK / London Studios)', flag: '🇬🇧', timezone: 'Europe/London', cityAr: 'لندن (UK)', cityEn: 'London (UK)' },
    { code: 'ar', label: 'العربية (🇸🇦 🇸🇾 الرياض / دمشق)', flag: '🇸🇦 🇸🇾', timezone: 'Asia/Riyadh', cityAr: 'الرياض / دمشق', cityEn: 'Riyadh / Damascus' },
    { code: 'fa', label: 'فارسی (تهران / Persian Hub)', flag: '🇮🇷', timezone: 'Asia/Tehran', cityAr: 'طهران (Tehran)', cityEn: 'Tehran (IR)' },
    { code: 'it', label: 'Italiano (Roma / Cinecittà)', flag: '🇮🇹', timezone: 'Europe/Rome', cityAr: 'روما (Italy)', cityEn: 'Rome (IT)' },
    { code: 'no', label: 'Norsk (Oslo / Nordic)', flag: '🇳🇴', timezone: 'Europe/Oslo', cityAr: 'أوسلو (Norway)', cityEn: 'Oslo (NO)' },
    { code: 'nl', label: 'Nederlands (Amsterdam)', flag: '🇳🇱', timezone: 'Europe/Amsterdam', cityAr: 'أمستردام (NL)', cityEn: 'Amsterdam (NL)' },
    { code: 'es_latam', label: 'Español (Latinoamérica)', flag: '🇲🇽', timezone: 'America/Mexico_City', cityAr: 'مكسيكو سيتي (LATAM)', cityEn: 'Mexico City (LATAM)' },
    { code: 'pt_br', label: 'Português (Brasil)', flag: '🇧🇷', timezone: 'America/Sao_Paulo', cityAr: 'ساو باولو (Brasil)', cityEn: 'São Paulo (BR)' },
    { code: 'fr', label: 'Français (Paris / Cannes)', flag: '🇫🇷', timezone: 'Europe/Paris', cityAr: 'باريس (Paris)', cityEn: 'Paris (FR)' },
    { code: 'es', label: 'Español (Madrid)', flag: '🇪🇸', timezone: 'Europe/Madrid', cityAr: 'مدريد (Spain)', cityEn: 'Madrid (ES)' },
    { code: 'de', label: 'Deutsch (Berlin)', flag: '🇩🇪', timezone: 'Europe/Berlin', cityAr: 'برلين (Germany)', cityEn: 'Berlin (DE)' },
    { code: 'ja', label: '日本語 (Tokyo / Cinema)', flag: '🇯🇵', timezone: 'Asia/Tokyo', cityAr: 'طوكيو (Tokyo)', cityEn: 'Tokyo (JP)' },
    { code: 'zh', label: '中文 (Beijing / Studios)', flag: '🇨🇳', timezone: 'Asia/Shanghai', cityAr: 'بكين (Beijing)', cityEn: 'Beijing (CN)' },
    { code: 'hi', label: 'हिंदी (Mumbai / Bollywood)', flag: '🇮🇳', timezone: 'Asia/Kolkata', cityAr: 'مومباي (Bollywood)', cityEn: 'Mumbai (IN)' },
    { code: 'tr', label: 'Türkçe (Istanbul)', flag: '🇹🇷', timezone: 'Europe/Istanbul', cityAr: 'إسطنبول (Istanbul)', cityEn: 'Istanbul (TR)' },
  ];

  const currentLangObj = languages.find((l) => l.code === lang) || languages[0];

  // Update clock every second according to the selected country's time zone
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: currentLangObj.timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        setCurrentTime(formatter.format(now));
        setCurrentCityLabel(lang === 'ar' ? currentLangObj.cityAr : currentLangObj.cityEn);
      } catch (e) {
        setCurrentTime(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [lang, currentLangObj]);

  return (
    <header className="border-b border-sky-500/20 bg-slate-950/95 backdrop-blur-md sticky top-0 z-50 px-4 lg:px-8 py-3" id="cineguard-header">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Identity */}
        <div className="flex items-center gap-3.5 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl p-0.5 shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center justify-center bg-gradient-to-br from-sky-400 via-cyan-500 to-blue-600 shrink-0">
              <img 
                src={cyberneticFalconImg}
                alt="Shaheen Falcon Logo" 
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-lg text-white font-mono flex items-center gap-1.5">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400">SHAHEEN APEX AI</span>
                  <span className="text-slate-600 text-xs font-normal">|</span>
                  <span className="text-sky-400 text-sm font-semibold">CineGuard</span>
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-sky-500/15 border border-sky-400/40 text-sky-300 font-mono">
                  v3.7
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {lang === 'ar' ? 'منظومة شاهين للأمان والذكاء الاصطناعي التنبؤي' : 'Predictive AI & Cybernetic Security Platform'}
              </p>
            </div>
          </div>

          {/* Quick status badge on mobile */}
          <div className="md:hidden flex items-center gap-1.5 text-xs text-sky-300 bg-sky-950/60 border border-sky-500/40 px-2.5 py-1 rounded-full">
            <Zap className="w-3 h-3 text-sky-400 animate-pulse" />
            <span>AI: {latencyMs ? `${latencyMs}ms` : 'Active'}</span>
          </div>
        </div>

        {/* Navigation Tabs - 3D Glowing Blue Theme */}
        <nav className="flex items-center gap-1.5 bg-slate-900/90 border border-sky-500/30 p-1 rounded-xl w-full md:w-auto overflow-x-auto" id="nav-tabs-group">
          
          <button
            id="tab-studio"
            onClick={() => setActiveTab('studio')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'studio'
                ? 'bg-sky-500/30 text-white border border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>{lang === 'ar' ? 'استوديو فحص وحماية السيناريو' : 'Swarm Audit Studio'}</span>
          </button>

          <button
            id="tab-godfather"
            onClick={() => setActiveTab('godfather')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-black transition-all whitespace-nowrap ${
              activeTab === 'godfather'
                ? 'bg-amber-500/25 text-amber-200 border border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.35)]'
                : 'text-amber-400 hover:text-amber-200 hover:bg-slate-800/60'
            }`}
          >
            <Star className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="flex items-center gap-1.5">
              <span>{lang === 'ar' ? 'خدمة بريميوم تريند العصر: غرفة العرّاب' : 'VIP Trend of the Era: The Godfather'}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300 border border-amber-400/40 uppercase font-mono">
                {lang === 'ar' ? 'تريند مستقبلي' : 'Next-Gen Trend'}
              </span>
            </span>
          </button>

          <button
            id="tab-watermark"
            onClick={() => setActiveTab('watermark')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === 'watermark'
                ? 'bg-sky-500/25 text-sky-200 border border-sky-400/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-sky-400" />
            <span>{lang === 'ar' ? 'العلامة المائية غير المرئية' : 'Steganography Watermark'}</span>
          </button>

          <button
            id="tab-salvage"
            onClick={() => setActiveTab('salvage')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'salvage'
                ? 'bg-sky-500/30 text-white border border-sky-400 shadow-sm shadow-sky-500/20'
                : 'text-slate-400 hover:text-sky-300 hover:bg-slate-800/60'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-sky-400" />
            <span>{lang === 'ar' ? 'إنقاذ السيناريو المحروق' : 'Crisis Script Salvage'}</span>
          </button>

          <button
            id="tab-core"
            onClick={() => setActiveTab('core')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'core'
                ? 'bg-sky-500/30 text-sky-200 border border-sky-400 shadow-sm shadow-sky-500/20'
                : 'text-slate-400 hover:text-sky-300 hover:bg-slate-800/60'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span>{lang === 'ar' ? 'نواة شاهين (Apex Core)' : 'Shaheen Apex Core'}</span>
          </button>

          <button
            id="tab-simulator"
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Tv className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'ar' ? 'المحاكي البيولوجي + الخوارزميات' : 'Bio Simulator & Patents'}</span>
          </button>

          <button
            id="tab-economics"
            onClick={() => setActiveTab('economics')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'economics'
                ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400 shadow-sm shadow-emerald-500/20'
                : 'text-slate-400 hover:text-emerald-300 hover:bg-slate-800/60'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === 'ar' ? 'دراسة الجدوى والعقد' : 'Economics & Contract'}</span>
          </button>

          <button
            id="tab-roi"
            onClick={() => setActiveTab('roi')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === 'roi'
                ? 'bg-sky-500/25 text-sky-200 border border-sky-400/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>{lang === 'ar' ? 'الجدوى والتوفير + شرط الإدارة والحصص' : 'ROI & Founder Directorship'}</span>
          </button>

          <button
            id="tab-pitch"
            onClick={() => setActiveTab('pitch')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === 'pitch'
                ? 'bg-sky-500/25 text-sky-200 border border-sky-400/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span>{lang === 'ar' ? 'ملف التقديم للهاكاثون (Devpost)' : 'Hackathon Pitch Kit'}</span>
          </button>

          <button
            id="tab-deck"
            onClick={() => setActiveTab('deck')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'deck'
                ? 'bg-sky-500/30 text-sky-200 border border-sky-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span>{lang === 'ar' ? 'تحميل العرض الشامل (الملف الكامل)' : 'Full Pitch Export'}</span>
          </button>

          <button
            id="tab-showcase"
            onClick={() => setActiveTab('showcase')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-black transition-all whitespace-nowrap ${
              activeTab === 'showcase'
                ? 'bg-sky-500/30 text-white border border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                : 'text-sky-400 hover:text-sky-200 hover:bg-slate-800/60'
            }`}
          >
            <PlaySquare className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>{lang === 'ar' ? 'العرض السينمائي الخارق (Trailer)' : 'Cinematic Trailer'}</span>
          </button>

          <button
            id="tab-docs"
            onClick={() => setActiveTab('docs')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === 'docs'
                ? 'bg-sky-500/25 text-sky-200 border border-sky-400/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-sky-400" />
            <span>{lang === 'ar' ? 'ملفات الشركة والقانون' : 'Corporate & Legal Docs'}</span>
          </button>

          <button
            id="tab-diagnostic"
            onClick={() => setActiveTab('diagnostic')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === 'diagnostic'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'ar' ? 'التشخيص والربط' : 'Diagnostics'}</span>
          </button>
        </nav>

        {/* Right Tools: Real-time World Clock synced to Country & Multi-Language Dropdown */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Real-time World Clock for Selected Language/Country */}
          <div 
            title={`التوقيت الحي لبلد اللغة المختارة: ${currentCityLabel}`}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-sky-500/40 text-xs shadow-[0_0_15px_rgba(56,189,248,0.15)] font-mono"
          >
            <Clock className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <div className="flex flex-col text-start">
              <span className="text-[9px] text-sky-400 uppercase font-sans font-bold leading-none">
                {currentCityLabel}
              </span>
              <span className="text-white font-bold tracking-wider leading-tight text-xs">
                {currentTime || '00:00:00'}
              </span>
            </div>
          </div>

          {/* International Multi-Language Dropdown */}
          <div className="relative">
            <button
              id="lang-dropdown-btn"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-sky-500/30 hover:border-sky-400 text-xs font-bold text-slate-200 hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>{currentLangObj.flag}</span>
              <span>{currentLangObj.label.split(' ')[0]}</span>
              <ChevronDown className={`w-3 h-3 text-sky-400 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {langMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-900 border border-sky-500/40 shadow-2xl p-1.5 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 max-h-96 overflow-y-auto"
              >
                <div className="px-2 py-1 text-[10px] font-bold text-sky-400 uppercase tracking-wider border-b border-slate-800 mb-1 flex items-center justify-between">
                  <span>Global Creators & Timezones</span>
                  <span className="text-[9px] text-slate-400 font-mono">14 Regions</span>
                </div>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-start px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-all cursor-pointer ${
                      lang === l.code
                        ? 'bg-sky-500/25 text-white font-bold border border-sky-500/40'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{l.flag}</span>
                      <span className="truncate">{l.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};

