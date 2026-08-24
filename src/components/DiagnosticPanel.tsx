import React, { useState } from 'react';
import { Activity, CheckCircle, AlertCircle, RefreshCw, Key, ShieldCheck, Zap, Server, Cpu, Lock } from 'lucide-react';
import { DiagnosticResult } from '../types';

interface DiagnosticPanelProps {
  onRunTest: () => Promise<DiagnosticResult>;
  currentStatus: DiagnosticResult | null;
  loading: boolean;
  lang: 'ar' | 'en';
}

export const DiagnosticPanel: React.FC<DiagnosticPanelProps> = ({ onRunTest, currentStatus, loading, lang }) => {
  const [testResult, setTestResult] = useState<DiagnosticResult | null>(currentStatus);
  const [isRunning, setIsRunning] = useState(false);

  const handleTest = async () => {
    setIsRunning(true);
    try {
      const res = await onRunTest();
      setTestResult(res);
    } catch (e: any) {
      setTestResult({
        success: false,
        hasApiKey: false,
        message: lang === 'ar' ? 'فشل الاتصال بخادم CineGuard الداخلي.' : 'Failed to connect to internal CineGuard server.',
        rawError: String(e.message || e)
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6" id="diagnostic-panel">
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 md:p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {lang === 'ar' ? 'تشخيص النظام والاتصال بنموذج Gemini 3.7' : 'System Diagnostic & Gemini 3.7 Link'}
              </h2>
              <p className="text-xs text-zinc-400">
                {lang === 'ar'
                  ? 'فحص زمن الاستجابة، سلامة الاتصال بالسرب الذكي، وخوارزميات التشفير'
                  : 'Check latency, AI swarm connectivity, and cryptographic encoding pipeline.'}
              </p>
            </div>
          </div>

          <button
            onClick={handleTest}
            disabled={isRunning || loading}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-zinc-950 font-bold text-xs md:text-sm rounded-xl transition-all shadow-lg shadow-amber-500/10 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isRunning || loading ? 'animate-spin' : ''}`} />
            <span>{isRunning ? (lang === 'ar' ? 'جاري الفحص...' : 'Running Diagnostics...') : (lang === 'ar' ? 'تشغيل الفحص الفوري' : 'Run Live Diagnostic')}</span>
          </button>
        </div>

        {/* Status Indicators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/70 flex items-center gap-3">
            <div className={`p-2.5 rounded-lg ${testResult?.hasApiKey ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60' : 'bg-amber-950/60 text-amber-400 border border-amber-800/60'}`}>
              <Key className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-zinc-400 font-medium">{lang === 'ar' ? 'مفتاح GEMINI_API_KEY' : 'API Key Status'}</div>
              <div className={`text-sm font-bold font-mono ${testResult?.hasApiKey ? 'text-emerald-400' : 'text-amber-400'}`}>
                {testResult?.hasApiKey ? (lang === 'ar' ? 'متصل وجاهز' : 'Connected') : (lang === 'ar' ? 'غير مكتشف' : 'Missing')}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/70 flex items-center gap-3">
            <div className={`p-2.5 rounded-lg ${testResult?.success ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60' : 'bg-rose-950/60 text-rose-400 border border-rose-800/60'}`}>
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-zinc-400 font-medium">{lang === 'ar' ? 'خادم CineGuard الداخلي' : 'CineGuard Server'}</div>
              <div className={`text-sm font-bold font-mono ${testResult?.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                {testResult?.success ? 'Active (Port 3000)' : 'Error'}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/70 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-800/60">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-zinc-400 font-medium">{lang === 'ar' ? 'نموذج الذكاء الاصطناعي' : 'AI Model'}</div>
              <div className="text-sm font-bold text-zinc-100 font-mono">
                gemini-3.7-flash
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/70 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-800/60">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-zinc-400 font-medium">{lang === 'ar' ? 'زمن الاستجابة' : 'Latency'}</div>
              <div className="text-sm font-bold text-zinc-100 font-mono">
                {testResult?.latencyMs ? `${testResult.latencyMs} ms` : (lang === 'ar' ? 'لم يُقس بعد' : 'Not tested')}
              </div>
            </div>
          </div>
        </div>

        {/* Result Output Alert */}
        {testResult && (
          <div className={`p-5 rounded-xl border ${testResult.success ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/30 border-rose-500/40 text-rose-300'}`}>
            <div className="flex items-start gap-3">
              {testResult.success ? (
                <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1.5 flex-1">
                <h4 className="font-bold text-base text-white">
                  {testResult.success
                    ? (lang === 'ar' ? 'نتيجة الفحص: محرك CineGuard متصل ويعمل بكفاءة خارقة' : 'Diagnostic Status: Operational')
                    : (lang === 'ar' ? 'تم اكتشاف سبب التنبيه' : 'Diagnostic Issue Identified')}
                </h4>
                <p className="text-sm leading-relaxed">{testResult.message}</p>

                {testResult.advice && (
                  <div className="mt-3 p-3 bg-zinc-950 rounded-lg text-xs font-mono text-zinc-300 border border-zinc-800 dir-ltr text-left">
                    <strong>Advice:</strong> {testResult.advice}
                  </div>
                )}

                {testResult.rawError && (
                  <div className="mt-2 text-xs font-mono bg-rose-950/80 p-2.5 rounded-lg text-rose-300 overflow-x-auto text-left dir-ltr border border-rose-800/60">
                    {testResult.rawError}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Security and Confidentiality notice */}
        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl flex items-start gap-3 text-xs text-zinc-400">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-sm text-zinc-200 block">
              {lang === 'ar' ? 'معايير السرية والأمان السينمائي:' : 'Studio-Grade Sandbox Security:'}
            </span>
            <p className="leading-relaxed">
              {lang === 'ar'
                ? 'تتم جميع العمليات والتحليلات عبر خادم معزول، ولا يتم إرسال أي مفاتيح سرية إلى المتصفح. تبقى نصوص الأفلام محمية داخل بيئة تشغيل آمنة.'
                : 'All script evaluations run within an isolated server-side container without exposing API credentials. Screenplays remain secure within your private production environment.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
