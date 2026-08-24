import React, { useState, useRef } from 'react';
import { 
  ShieldAlert, 
  Scale, 
  Film, 
  TrendingUp, 
  Sparkles, 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  FileCode2, 
  Layers, 
  AlertTriangle,
  Lock,
  ChevronRight,
  Download
} from 'lucide-react';
import { CINEMA_AGENTS, BLOCKBUSTER_SCENARIOS } from '../data/cinemaAgents';
import { AgentRole } from '../types';

interface CinemaAuditStudioProps {
  lang: 'ar' | 'en';
}

export const CinemaAuditStudio: React.FC<CinemaAuditStudioProps> = ({ lang }) => {
  const [selectedAgent, setSelectedAgent] = useState<AgentRole>('full_swarm');
  const [projectTitle, setProjectTitle] = useState<string>('ECHOES OF ORION: THE ZERO-G VAULT');
  const [securityLevel, setSecurityLevel] = useState<string>('Tier-1 Classified (Studio Eyes Only)');
  const [targetDemographic, setTargetDemographic] = useState<string>('Global IMAX Theatrical (Ages 18-45)');
  const [scriptContent, setScriptContent] = useState<string>(BLOCKBUSTER_SCENARIOS[0].excerpt);
  
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSelectScenario = (scenarioId: string) => {
    const sc = BLOCKBUSTER_SCENARIOS.find((s) => s.id === scenarioId);
    if (sc) {
      setProjectTitle(sc.title);
      setSecurityLevel(sc.securityLevel);
      setTargetDemographic(sc.targetDemographic);
      setScriptContent(sc.excerpt);
      setAuditResult('');
      setErrorMsg(null);
    }
  };

  const handleStartAudit = async () => {
    if (!scriptContent.trim()) {
      setErrorMsg(lang === 'ar' ? 'يرجى كتابة أو اختيار نص السيناريو أولاً' : 'Please provide script material.');
      return;
    }

    setIsAuditing(true);
    setAuditResult('');
    setErrorMsg(null);

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/cinema/audit/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scriptContent,
          projectTitle,
          agentRole: selectedAgent,
          targetDemographic,
          securityLevel,
          language: lang,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `HTTP ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No streaming response body received.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.replace('data: ', ''));
              if (data.text) {
                setAuditResult((prev) => prev + data.text);
              }
              if (data.error) {
                setErrorMsg(data.error + (data.details ? `: ${data.details}` : ''));
              }
            } catch {
              // Non-JSON line or chunk
            }
          }
        }
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setErrorMsg(err.message || 'حدث خطأ أثناء إجراء الفحص الاستخباري للسيناريو.');
      }
    } finally {
      setIsAuditing(false);
      abortControllerRef.current = null;
    }
  };

  const handleCancelAudit = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsAuditing(false);
    }
  };

  const handleCopyReport = () => {
    if (!auditResult) return;
    navigator.clipboard.writeText(auditResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadReport = () => {
    if (!auditResult) return;
    const blob = new Blob([auditResult], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CineGuard_Audit_${projectTitle.replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentAgent = CINEMA_AGENTS.find((a) => a.id === selectedAgent) || CINEMA_AGENTS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6" id="cinema-audit-studio">
      
      {/* Studio Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-sky-950/80 border border-sky-500/30 p-5 md:p-6 relative overflow-hidden shadow-[0_0_40px_rgba(56,189,248,0.15)]">
        <div className="absolute -right-10 -top-10 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>{lang === 'ar' ? 'المنظومة العالمية لفحص واستخبارات السيناريو' : 'Global Screenplay Security & Intelligence Swarm'}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>{lang === 'ar' ? 'استوديو فحص وحماية السيناريو (CineGuard Swarm)' : 'Screenplay Intelligence & Anti-Leak Swarm Studio'}</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl font-sans">
              {lang === 'ar'
                ? 'فحص فوري متعدد الوكلاء لكشف تسريبات الحبكة، التحقق من حقوق الملكية الفكرية، حل الثغرات الدرامية، وحساب مؤشرات شباك التذاكر بالذكاء الاصطناعي.'
                : 'Concurrent multi-agent forensic audit powered by Gemini 3.7: leak vulnerability detection, IP compliance, script continuity, and box office forecasting.'}
            </p>
          </div>

          {/* Quick Scenario Picker */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-sky-300">
              {lang === 'ar' ? '🎬 سيناريوهات هوليوود الجاهزة للاختبار:' : '🎬 Preloaded Blockbuster Scenarios:'}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {BLOCKBUSTER_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  id={`scenario-btn-${scenario.id}`}
                  onClick={() => handleSelectScenario(scenario.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    projectTitle === scenario.title
                      ? 'bg-sky-500/25 border-sky-400 text-sky-200 font-bold shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {scenario.title.split(':')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Agents Selection Strip */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>{lang === 'ar' ? 'اختر نمط الوكيل الذكي (AI Agent Mode):' : 'Select Autonomous Agent Specialty:'}</span>
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3" id="agent-selector-grid">
          {CINEMA_AGENTS.map((agent) => {
            const isSelected = selectedAgent === agent.id;
            return (
              <button
                key={agent.id}
                id={`agent-card-${agent.id}`}
                onClick={() => setSelectedAgent(agent.id)}
                className={`p-3.5 rounded-xl border text-right transition-all flex flex-col justify-between gap-2.5 relative overflow-hidden ${
                  isSelected
                    ? 'bg-zinc-900 border-amber-500/60 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/30'
                    : 'bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-500" />
                )}
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-300">
                    {agent.id === 'full_swarm' ? '★ SWARM' : 'AGENT'}
                  </span>
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-amber-500/20 text-amber-400' : 'bg-zinc-800 text-zinc-400'}`}>
                    {agent.id === 'full_swarm' && <Sparkles className="w-4 h-4" />}
                    {agent.id === 'security_auditor' && <ShieldAlert className="w-4 h-4" />}
                    {agent.id === 'ip_counsel' && <Scale className="w-4 h-4" />}
                    {agent.id === 'drama_doctor' && <Film className="w-4 h-4" />}
                    {agent.id === 'box_office' && <TrendingUp className="w-4 h-4" />}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-zinc-100">{lang === 'ar' ? agent.nameAr : agent.nameEn}</h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                    {lang === 'ar' ? agent.specialtyAr : agent.specialtyEn}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace (Editor + Live Stream Report) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Script Input & Parameters (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-4 space-y-3.5">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'ar' ? 'عنوان العمل السينمائي:' : 'Production Title:'}</span>
              </label>
              <input
                id="input-project-title"
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500/60 font-medium"
                placeholder="e.g. DUNE: CHRONICLES OF ARRAKIS"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-rose-400" />
                  <span>{lang === 'ar' ? 'مستوى الحماية:' : 'Security Clearance:'}</span>
                </label>
                <select
                  id="select-security-level"
                  value={securityLevel}
                  onChange={(e) => setSecurityLevel(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-amber-500/60"
                >
                  <option value="Tier-1 Classified (Studio Eyes Only)">Tier-1 Top Secret</option>
                  <option value="Confidential (Cast Redacted Draft)">Confidential (Redacted)</option>
                  <option value="Public Production Draft">Standard Production</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-cyan-400" />
                  <span>{lang === 'ar' ? 'الجمهور المستهدف:' : 'Audience Target:'}</span>
                </label>
                <input
                  id="input-demographic"
                  type="text"
                  value={targetDemographic}
                  onChange={(e) => setTargetDemographic(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-amber-500/60"
                />
              </div>
            </div>

            {/* Script Textarea */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'ar' ? 'محتوى السيناريو / المشهد:' : 'Screenplay / Scene Dialogue:'}</span>
                </label>
                <span className="text-[11px] font-mono text-zinc-400">
                  {scriptContent.length} {lang === 'ar' ? 'حرف' : 'chars'}
                </span>
              </div>
              <textarea
                id="textarea-script-content"
                rows={12}
                value={scriptContent}
                onChange={(e) => setScriptContent(e.target.value)}
                placeholder={lang === 'ar' ? 'الصق نص المشهد أو الحوار هنا للبدء في الفحص الفوري...' : 'Paste your screenplay scene, action lines, or dialogue here...'}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-xs md:text-sm font-mono text-zinc-200 focus:outline-none focus:border-amber-500/60 resize-y leading-relaxed"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              {!isAuditing ? (
                <button
                  id="btn-start-audit"
                  onClick={handleStartAudit}
                  className="flex-1 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-amber-500/20 text-xs md:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-zinc-950" />
                  <span>
                    {lang === 'ar' ? `تشغيل فحص ${currentAgent.nameAr}` : `Run ${currentAgent.nameEn} Audit`}
                  </span>
                </button>
              ) : (
                <button
                  id="btn-cancel-audit"
                  onClick={handleCancelAudit}
                  className="flex-1 bg-rose-600/20 border border-rose-500/50 hover:bg-rose-600/30 text-rose-300 font-bold py-2.5 px-4 rounded-xl text-xs md:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 animate-spin text-rose-400" />
                  <span>{lang === 'ar' ? 'إيقاف التحليل الجاري' : 'Cancel Live Audit'}</span>
                </button>
              )}
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Live Audit Intelligence Dashboard (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-4 md:p-5 flex flex-col h-full min-h-[500px]">
            
            {/* Report Header & Actions */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-sm font-bold text-white font-mono">
                  {lang === 'ar' ? 'تقرير الفحص الاستخباري المباشر' : 'Forensic Intelligence Stream'}
                </span>
                {isAuditing && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 animate-pulse">
                    Gemini 3.7 Streaming...
                  </span>
                )}
              </div>

              {auditResult && (
                <div className="flex items-center gap-2">
                  <button
                    id="btn-copy-report"
                    onClick={handleCopyReport}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all text-xs flex items-center gap-1"
                    title={lang === 'ar' ? 'نسخ التقرير' : 'Copy Report'}
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline">{copied ? (lang === 'ar' ? 'تم النسخ' : 'Copied') : (lang === 'ar' ? 'نسخ' : 'Copy')}</span>
                  </button>

                  <button
                    id="btn-download-report"
                    onClick={handleDownloadReport}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all text-xs flex items-center gap-1"
                    title={lang === 'ar' ? 'تحميل التقرير' : 'Download Markdown'}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{lang === 'ar' ? 'تحميل' : 'Export'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Stream Output Container */}
            <div className="flex-1 bg-zinc-950 rounded-xl border border-zinc-800/80 p-4 md:p-5 overflow-y-auto max-h-[620px] font-sans text-xs md:text-sm text-zinc-200 leading-relaxed space-y-3">
              {auditResult ? (
                <div className="prose prose-invert max-w-none prose-headings:text-amber-300 prose-headings:font-bold prose-a:text-emerald-400 prose-strong:text-zinc-100 whitespace-pre-wrap">
                  {auditResult}
                </div>
              ) : isAuditing ? (
                <div className="flex flex-col items-center justify-center h-64 text-center space-y-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin" />
                    <Film className="w-5 h-5 text-amber-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <p className="text-sm font-medium text-zinc-300">
                    {lang === 'ar' ? 'يقوم وكيل الذكاء الاصطناعي بتحليل النص وكشف الثغرات...' : 'Autonomous Agent Swarm is auditing your screenplay...'}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {lang === 'ar' ? 'معالجة فورية عبر نموذج Gemini 3.7 Flash' : 'Real-time multi-vector analysis via Gemini 3.7 Flash'}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center space-y-3 text-zinc-500">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                    <Sparkles className="w-6 h-6 text-amber-500/60" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-zinc-300">
                      {lang === 'ar' ? 'بانتظار بدء الفحص الاستخباري' : 'Awaiting Audit Execution'}
                    </p>
                    <p className="text-xs text-zinc-500 max-w-sm">
                      {lang === 'ar'
                        ? 'اختر السيناريو والوكيل المطلوب ثم اضغط "تشغيل فحص" لبدء توليد التقرير الأمني والفني.'
                        : 'Select an agent specialty, adjust script parameters, and click Run Audit to trigger real-time AI forensics.'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Quick Metric Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 mt-auto">
              <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-center">
                <span className="text-[10px] text-zinc-500 block">{lang === 'ar' ? 'أمان التسريب' : 'Anti-Leak Index'}</span>
                <span className="text-xs font-bold text-rose-400 font-mono">Protected</span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-center">
                <span className="text-[10px] text-zinc-500 block">{lang === 'ar' ? 'الملكية الفكرية' : 'IP Clearance'}</span>
                <span className="text-xs font-bold text-amber-400 font-mono">Audited</span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-center">
                <span className="text-[10px] text-zinc-500 block">{lang === 'ar' ? 'التناسق الدرامي' : 'Continuity'}</span>
                <span className="text-xs font-bold text-indigo-400 font-mono">Verified</span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-center">
                <span className="text-[10px] text-zinc-500 block">{lang === 'ar' ? 'توقع الإيراد' : 'Box Office'}</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">Optimized</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
