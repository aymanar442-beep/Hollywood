import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { NewsTicker } from './components/NewsTicker';
import { ShaheenIntro } from './components/ShaheenIntro';
import { CinemaAuditStudio } from './components/CinemaAuditStudio';
import { GodfatherScriptStudio } from './components/GodfatherScriptStudio';
import { WatermarkStudio } from './components/WatermarkStudio';
import { CrisisSalvageStudio } from './components/CrisisSalvageStudio';
import { ShaheenApexCore } from './components/ShaheenApexCore';
import { ShaheenCinemaSimulator } from './components/ShaheenCinemaSimulator';
import { DevpostPitchKit } from './components/DevpostPitchKit';
import { RoiGovernanceCalculator } from './components/RoiGovernanceCalculator';
import { CorporateLegalDocs } from './components/CorporateLegalDocs';
import { EconomicFeasibility } from './components/EconomicFeasibility';
import { ProjectPitchDeck } from './components/ProjectPitchDeck';
import { CinematicTrailerShowcase } from './components/CinematicTrailerShowcase';
import { DiagnosticPanel } from './components/DiagnosticPanel';
import { DiagnosticResult, AppLang } from './types';

export default function App() {
  const [hasSeenIntro, setHasSeenIntro] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'studio' | 'godfather' | 'watermark' | 'salvage' | 'core' | 'simulator' | 'economics' | 'roi' | 'pitch' | 'deck' | 'showcase' | 'docs' | 'diagnostic'>('studio');
  const [lang, setLang] = useState<AppLang>('en');
  const [healthStatus, setHealthStatus] = useState<DiagnosticResult | null>(null);
  const [checkingHealth, setCheckingHealth] = useState<boolean>(false);
  const [latencyMs, setLatencyMs] = useState<number | undefined>(undefined);

  const fetchHealth = async (): Promise<DiagnosticResult> => {
    setCheckingHealth(true);
    const start = Date.now();
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      const elapsed = Date.now() - start;
      setLatencyMs(elapsed);

      const statusObj: DiagnosticResult = {
        success: data.status === 'ok',
        hasApiKey: Boolean(data.hasApiKey),
        latencyMs: elapsed,
        message: data.hasApiKey
          ? (lang === 'ar' ? 'خادم CineGuard متصل ومفتاح GEMINI_API_KEY نشط.' : 'CineGuard server and GEMINI_API_KEY are active.')
          : (lang === 'ar' ? 'تنبيه: مفتاح GEMINI_API_KEY غير مضبوط في إعدادات Secrets.' : 'Warning: GEMINI_API_KEY is not set.'),
      };
      setHealthStatus(statusObj);
      return statusObj;
    } catch (err: any) {
      const failObj: DiagnosticResult = {
        success: false,
        hasApiKey: false,
        message: lang === 'ar' ? 'تعذر الاتصال بخادم CineGuard الداخلي.' : 'Could not connect to CineGuard server.',
        rawError: String(err.message || err),
      };
      setHealthStatus(failObj);
      return failObj;
    } finally {
      setCheckingHealth(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  useEffect(() => {
    document.documentElement.dir = (lang === 'ar' || lang === 'fa') ? 'rtl' : 'ltr';
    document.documentElement.lang = lang.replace('_', '-');
  }, [lang]);

  const runDetailedDiagnosis = async (): Promise<DiagnosticResult> => {
    setCheckingHealth(true);
    try {
      const res = await fetch('/api/diagnose', { method: 'POST' });
      const data = await res.json();
      setLatencyMs(data.latencyMs);

      const statusObj: DiagnosticResult = {
        success: data.success,
        hasApiKey: data.success || data.errorType !== 'MISSING_API_KEY',
        latencyMs: data.latencyMs,
        errorType: data.errorType,
        message: data.message,
        advice: data.advice,
        rawError: data.rawError,
      };
      setHealthStatus(statusObj);
      return statusObj;
    } catch (e: any) {
      const failObj: DiagnosticResult = {
        success: false,
        hasApiKey: false,
        message: lang === 'ar' ? 'فشل الفحص التشخيصي المباشر.' : 'Diagnostic test failed.',
        rawError: String(e.message || e),
      };
      setHealthStatus(failObj);
      return failObj;
    } finally {
      setCheckingHealth(false);
    }
  };

  if (!hasSeenIntro) {
    return <ShaheenIntro lang={lang === 'ar' ? 'ar' : 'en'} onComplete={() => setHasSeenIntro(true)} />;
  }

  const isRtl = lang === 'ar' || lang === 'fa';

  return (
    <div 
      dir={isRtl ? 'rtl' : 'ltr'} 
      className={`min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col ${isRtl ? 'text-right' : 'text-left'}`}
    >
      
      {/* Studio Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        isConnected={Boolean(healthStatus?.success)}
        latencyMs={latencyMs}
      />
      <NewsTicker lang={lang === 'ar' ? 'ar' : 'en'} />

      {/* Main Flagship Content Area */}
      <main className="flex-1 w-full">
        {activeTab === 'godfather' && <GodfatherScriptStudio lang={lang} />}
        {activeTab === 'studio' && <CinemaAuditStudio lang={lang === 'ar' ? 'ar' : 'en'} />}
        {activeTab === 'watermark' && <WatermarkStudio lang={lang === 'ar' ? 'ar' : 'en'} />}
        {activeTab === 'salvage' && <CrisisSalvageStudio lang={lang === 'ar' ? 'ar' : 'en'} />}
        {activeTab === 'core' && <ShaheenApexCore lang={lang === 'ar' ? 'ar' : 'en'} />}
        {activeTab === 'simulator' && <ShaheenCinemaSimulator lang={lang === 'ar' ? 'ar' : 'en'} />}
        {activeTab === 'economics' && <EconomicFeasibility lang={lang === 'ar' ? 'ar' : 'en'} />}
        {activeTab === 'roi' && <RoiGovernanceCalculator lang={lang === 'ar' ? 'ar' : 'en'} />}
        {activeTab === 'pitch' && <DevpostPitchKit lang={lang === 'ar' ? 'ar' : 'en'} />}
        {activeTab === 'deck' && <ProjectPitchDeck lang={lang === 'ar' ? 'ar' : 'en'} />}
        {activeTab === 'showcase' && <CinematicTrailerShowcase lang={lang} />}
        {activeTab === 'docs' && <CorporateLegalDocs lang={lang === 'ar' ? 'ar' : 'en'} />}
        {activeTab === 'diagnostic' && (
          <DiagnosticPanel
            onRunTest={runDetailedDiagnosis}
            currentStatus={healthStatus}
            loading={checkingHealth}
            lang={lang === 'ar' ? 'ar' : 'en'}
          />
        )}
      </main>

      {/* Studio Bottom Bar */}
      <footer className="border-t border-sky-500/20 bg-slate-950 py-4 text-xs text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="font-mono text-slate-200">🦅 SHAHEEN APEX AI | CineGuard™ v3.7</span>
            <span>•</span>
            <span className="text-sky-300">{lang === 'ar' ? 'المؤسس والمدير العام: أيمن العرايشي (العرّاب)' : 'Founder & Lead Architect: Ayman (The Godfather)'}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>Google Gemini 3.7 Pro</span>
            <span>•</span>
            <span>Shaheen Steganography</span>
            <span>•</span>
            <span>Hollywood Blockbuster Hackathon</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

