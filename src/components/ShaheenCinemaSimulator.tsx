import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Layers, 
  Cpu, 
  Eye, 
  Lock, 
  Sparkles, 
  Film, 
  ShieldCheck, 
  Zap, 
  PlusCircle, 
  Flame, 
  FileText, 
  Copy, 
  Check, 
  Sliders, 
  Scale, 
  DollarSign, 
  CheckCircle2, 
  Bot, 
  Share2,
  Tv
} from 'lucide-react';

interface ShaheenCinemaSimulatorProps {
  lang: 'ar' | 'en';
}

interface PipelineStep {
  id: number;
  phaseAr: string;
  phaseEn: string;
  agent: string;
  actionAr: string;
  actionEn: string;
  durationMs: number;
  highlightIcon: string;
  logOutputAr: string;
  logOutputEn: string;
  status: 'pending' | 'running' | 'completed';
}

export const ShaheenCinemaSimulator: React.FC<ShaheenCinemaSimulatorProps> = ({ lang }) => {
  // Simulator State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [selectedGeminiTier, setSelectedGeminiTier] = useState<'flash' | 'pro' | 'ultra'>('pro');
  const [selectedFutureModule, setSelectedFutureModule] = useState<string>('multimodal_video');
  const [copiedContract, setCopiedContract] = useState<boolean>(false);
  const [copiedPitch, setCopiedPitch] = useState<boolean>(false);

  // Future Custom Innovation Ideas State
  const [customFutureFeature, setCustomFutureFeature] = useState<string>('');
  const [futureIdeas, setFutureIdeas] = useState<Array<{ id: string; title: string; desc: string; date: string }>>([
    {
      id: '1',
      title: lang === 'ar' ? 'فحص ومطابقة الفيديو والمشاهد المصورة (Multimodal Dailies Video)' : 'Multimodal Video Frame & Dailies Visual Audit',
      desc: lang === 'ar' ? 'تحليل لقطات الكاميرا اليومية (Dailies) بالذكاء الاصطناعي لمقارنتها بالسيناريو وتفادي أخطاء الإضاءة والملابس.' : 'AI visual comparison between filmed dailies footage and script action lines to eliminate costly lighting/costume continuity errors.',
      date: '2026-Q3'
    },
    {
      id: '2',
      title: lang === 'ar' ? 'البصمة الصوتية وتطابق الدوبلاج (Audio Stem & Voiceprint Forensics)' : 'Audio Stem & Voiceprint Forensic Anti-Cloning',
      desc: lang === 'ar' ? 'حماية أصوات الممثلين من التزييف وتدقيق نبرة الحوار عبر أحدث نماذج الصوت المتقدمة.' : 'Actor vocal timbre verification and deepfake clone detection across ADR and audio stems.',
      date: '2026-Q4'
    }
  ]);

  const pipelineSteps: PipelineStep[] = [
    {
      id: 1,
      phaseAr: '١. تفكيك وهندسة النص (Ingestion & Script Vectorization)',
      phaseEn: '1. Ingestion & Script Vectorization',
      agent: 'خوارزمية شاهين للرصد الطبوغرافي (Shaheen Topo-Vector)',
      actionAr: 'تفكيك سيناريو الفيلم إلى مقاطع زمنية وشبكة علاقات بين الشخصيات.',
      actionEn: 'Deconstructs screenplay into temporal nodes and character dependency graphs.',
      durationMs: 2500,
      highlightIcon: 'Eye',
      logOutputAr: '[شاهين-رصد]: تم استيعاب 124 مشهداً وتوليد 480 عقدة علاقات درامية وزمنية.',
      logOutputEn: '[Shaheen-Topo]: 124 scenes ingested, 480 dramatic/temporal nodes generated.',
      status: 'pending'
    },
    {
      id: 2,
      phaseAr: '٢. تشغيل استخبارات أمان التسريبات (Anti-Leak Audit)',
      phaseEn: '2. Multi-Vector Anti-Leak Audit',
      agent: 'حارس الأمان ومكافحة التسريبات (Gemini 3.7 Pro + Shaheen)',
      actionAr: 'كشف نقاط حرق النهايات، وتقسيم النص لإخفاء أسرار الحبكة عن الممثلين الثانويين.',
      actionEn: 'Identifies spoiler climax twists and segments cast-specific dialogue scope.',
      durationMs: 3000,
      highlightIcon: 'Lock',
      logOutputAr: '[حارس-الأمان]: تم عزل كشف هوية الجاسوس في المشهد 44 وعزل نسخته للنجوم الرئيسيين فقط.',
      logOutputEn: '[Security-Auditor]: Isolated Scene 44 twist reveal. Classified for Tier-1 lead cast only.',
      status: 'pending'
    },
    {
      id: 3,
      phaseAr: '٣. فحص الملكية الفكرية والتشابه الفني (IP Forensics)',
      phaseEn: '3. Entertainment IP & Copyright Audit',
      agent: 'محامي الملكية الفكرية (IP Forensics Agent)',
      actionAr: 'مقارنة السيناريو بأرشيف السينما وقواعد بيانات هوليوود لتفادي قضايا الانتحال.',
      actionEn: 'Cross-examines dialogues and scene tropes across global film databases.',
      durationMs: 3000,
      highlightIcon: 'Scale',
      logOutputAr: '[محامي-الملكية]: مؤشر الأصالة 94.2% - لا توجد نزاعات قانونية مع أي أعمال سابقة.',
      logOutputEn: '[IP-Counsel]: Originality Index 94.2% - Zero trademark infringement hazards found.',
      status: 'pending'
    },
    {
      id: 4,
      phaseAr: '٤. حقن العلامات المائية الإخفائية (Steganographic Watermarking)',
      phaseEn: '4. Invisible Zero-Width Watermarking',
      agent: 'خوارزمية شاهين للتشفير اللامرئي (Shaheen Stego-Encoder)',
      actionAr: 'تشفير بصمة رقمية سرية لاسم كل ممثل داخل حروف النص دون أن يراها أحد بالعين المجردة.',
      actionEn: 'Embeds actor-specific zero-width cryptographic payload directly into script typography.',
      durationMs: 2500,
      highlightIcon: 'Sparkles',
      logOutputAr: '[شاهين-تشفير]: تم حقن علامة مائية لـ (النجم: توم كروز / نسخة رقم #748) بنجاح.',
      logOutputEn: '[Shaheen-Stego]: Injected tamper-proof payload for (Cast: Tom Cruise / Copy #748).',
      status: 'pending'
    },
    {
      id: 5,
      phaseAr: '٥. المصادقة التنفيذية والإخراج (Executive Studio Verdict)',
      phaseEn: '5. Executive Studio Verdict & Greenlight',
      agent: 'أوركسترا سرب شاهين + المدير التنفيذي أيمن (Managing Director)',
      actionAr: 'إصدار التقرير الاستخباري الشامل وتفويض جاهزية الفيلم للإنتاج.',
      actionEn: 'Generates comprehensive studio due-diligence package and production clearance.',
      durationMs: 2000,
      highlightIcon: 'CheckCircle2',
      logOutputAr: '[القرار التنفيذي]: السيناريو محمي 100%، وتوفير تقديري 14.85 مليون دولار للاستوديو.',
      logOutputEn: '[Verdict]: 100% Protected, $14.85M net production risk avoided for the studio.',
      status: 'pending'
    }
  ];

  // Playback timer simulation
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (currentStepIndex < pipelineSteps.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setIsPlaying(false); // Finished loop
        }
      }, (pipelineSteps[currentStepIndex].durationMs / playbackSpeed));
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, playbackSpeed]);

  const handleTogglePlay = () => {
    if (currentStepIndex >= pipelineSteps.length - 1 && !isPlaying) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleAddFutureIdea = () => {
    if (!customFutureFeature.trim()) return;
    setFutureIdeas([
      ...futureIdeas,
      {
        id: String(Date.now()),
        title: customFutureFeature,
        desc: lang === 'ar' ? 'ميزة مستقبلية مقترحة لتوسيع قدرات منظومة عين الشاهين.' : 'Future innovation module proposed for Shaheen Apex roadmap.',
        date: '2027-Vision'
      }
    ]);
    setCustomFutureFeature('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6" id="shaheen-cinema-simulator">
      
      {/* Top Banner: Shaheen Identity & Dual Gemini Pro Engine */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-950/80 via-zinc-900 to-zinc-950 border border-amber-500/40 p-5 md:p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-10 -top-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'ar' ? 'منظومة عين الشاهين السينمائية™ (Shaheen Eye Apex)' : 'Shaheen Eye Cinema Apex™ (Enterprise Pro Suite)'}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {lang === 'ar' ? 'محاكي العمل التفاعلي + خوارزميات شاهين + نموذج Gemini Pro' : 'Interactive Visual Flow, Shaheen Algorithms & Gemini Pro Architecture'}
            </h1>
            <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
              {lang === 'ar'
                ? 'فيديو ومحاكي تصويري حي لطريقة عمل المنظومة خطوة بخطوة، مع دمج خوارزميات عين الشاهين المتطورة، الترقية لقدرات Gemini 3.7 Pro الأقوى، وبنود الشراكة بينك وبين Google وشركات هوليوود.'
                : 'Cinematic visual pipeline showing how Shaheen algorithms & Gemini 3.7 Pro orchestrate script defense, accompanied by institutional partnership governance and future innovation modules.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Gemini 3.7 Pro + Flash</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Visual Flow / Video Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Interactive Stage Video/Flow Window (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl bg-zinc-900/95 border border-zinc-800 p-5 space-y-4 shadow-xl">
            
            {/* Screen Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Tv className="w-4 h-4 text-amber-400" />
                <h2 className="font-bold text-sm text-white font-mono">
                  {lang === 'ar' ? '🎥 مسرح المحاكاة التصويري لعين الشاهين (Visual Flow Simulator)' : '🎥 Shaheen Cinematic Pipeline Simulator'}
                </h2>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center gap-2">
                <button
                  id="btn-toggle-play-sim"
                  onClick={handleTogglePlay}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isPlaying 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                      : 'bg-amber-500 text-zinc-950 hover:bg-amber-400'
                  }`}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{isPlaying ? (lang === 'ar' ? 'إيقاف مؤقت' : 'Pause') : (lang === 'ar' ? 'تشغيل المحاكي' : 'Play Flow')}</span>
                </button>

                <button
                  id="btn-reset-sim"
                  onClick={handleReset}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all text-xs"
                  title={lang === 'ar' ? 'إعادة من البداية' : 'Reset'}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <select
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                  className="bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-zinc-300 font-mono"
                >
                  <option value="1">1.0x Speed</option>
                  <option value="1.5">1.5x Speed</option>
                  <option value="2">2.0x Speed</option>
                </select>
              </div>
            </div>

            {/* Simulated Cinema Screen Display */}
            <div className="relative aspect-video rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden flex flex-col justify-between p-4 md:p-6">
              
              {/* Top HUD */}
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>SHAHEEN-EYE-SIM // TIER-1 PROTOCOL</span>
                </div>
                <div className="text-zinc-400">
                  <span>STEP {currentStepIndex + 1} OF {pipelineSteps.length}</span>
                </div>
              </div>

              {/* Center Holographic Stage */}
              <div className="flex flex-col items-center justify-center text-center space-y-3 py-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-xl shadow-amber-500/10 transform transition-all scale-110">
                  <Eye className="w-8 h-8 text-amber-400 animate-pulse" />
                </div>

                <div className="space-y-1 max-w-lg">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400/80">
                    {pipelineSteps[currentStepIndex].agent}
                  </span>
                  <h3 className="text-lg md:text-xl font-extrabold text-white">
                    {lang === 'ar' ? pipelineSteps[currentStepIndex].phaseAr : pipelineSteps[currentStepIndex].phaseEn}
                  </h3>
                  <p className="text-xs text-zinc-300">
                    {lang === 'ar' ? pipelineSteps[currentStepIndex].actionAr : pipelineSteps[currentStepIndex].actionEn}
                  </p>
                </div>
              </div>

              {/* Bottom Telemetry Log */}
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-2.5 font-mono text-[11px] text-emerald-400 flex items-center justify-between">
                <span>{lang === 'ar' ? pipelineSteps[currentStepIndex].logOutputAr : pipelineSteps[currentStepIndex].logOutputEn}</span>
                <span className="text-zinc-500 text-[10px] hidden sm:inline">SHAHEEN_KERNEL_v3.7</span>
              </div>

            </div>

            {/* Stepper Timeline Navigation */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-zinc-400 block">
                {lang === 'ar' ? 'مراحل خط الإنتاج السينمائي لعين الشاهين:' : 'Shaheen Pipeline Execution Timeline:'}
              </span>
              <div className="grid grid-cols-5 gap-1.5">
                {pipelineSteps.map((step, idx) => {
                  const isCurrent = idx === currentStepIndex;
                  const isPassed = idx < currentStepIndex;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStepIndex(idx)}
                      className={`p-2 rounded-lg text-left transition-all border ${
                        isCurrent
                          ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-sm'
                          : isPassed
                          ? 'bg-zinc-950 border-emerald-500/40 text-emerald-400'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                        <span>P-0{step.id}</span>
                        {isPassed ? <Check className="w-3 h-3 text-emerald-400" /> : isCurrent ? <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" /> : null}
                      </div>
                      <span className="text-[10px] font-medium block truncate mt-1">
                        {lang === 'ar' ? step.phaseAr.split('(')[0] : step.phaseEn.split('(')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Shaheen Core Algorithms Breakdown */}
          <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Zap className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-sm text-white">
                {lang === 'ar' ? '🦅 خوارزميات شاهين المدمجة لجعل المشروع الأقوى عالمياً' : '🦅 Core Shaheen Proprietary Algorithms'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-amber-500/20 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400">١. خوارزمية الرصد الطبوغرافي (Shaheen-Topo)</span>
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  {lang === 'ar'
                    ? 'تقوم برصد كل كلمة وجملة حوار ورسم خارطة العلاقات الدرامية للكشف المبكر عن أي معلومة حساسة قبل تسريبها.'
                    : 'Constructs multi-dimensional screenplay topology to identify sensitive narrative nodes.'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950 border border-rose-500/20 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-400">٢. خوارزمية التشفير الخفي (Shaheen-Stego)</span>
                  <Lock className="w-3.5 h-3.5 text-rose-400" />
                </div>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  {lang === 'ar'
                    ? 'حقن علامات مائية مشفرة غير مرئية (Zero-Width) تصمد أمام النسخ واللصق وتكشف هوية الممثل المسرب فوراً.'
                    : 'Zero-width cryptographic steganography that survives OCR, copying, and text reformatting.'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950 border border-cyan-500/20 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-400">٣. سرب الأوركسترا المتوازي (Shaheen-Swarm)</span>
                  <Bot className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  {lang === 'ar'
                    ? 'تنسيق تفاعلي بين 4 وكلاء ذكاء اصطناعي (أمان، قانون، دراما، شباك تذاكر) في تدفق متزامن واحد.'
                    : 'Concurrent multi-agent orchestration merging legal, drama, security, and financial forensics.'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950 border border-emerald-500/20 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400">٤. نواة Gemini 3.7 Pro للتعليل العميق</span>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  {lang === 'ar'
                    ? 'استخدام أحدث نماذج Gemini Pro لقراءة السيناريوهات الضخمة (حتى 2 مليون رمز Token) وفهم الحبكات المعقدة.'
                    : 'Leveraging Gemini 3.7 Pro massive 2M token context window for full feature film reasoning.'}
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Right: Business Contract Structure + Future Innovation Lab + IP Protection (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Card 1: Business Contract Terms (Ayman x Google x Hollywood) */}
          <div className="rounded-2xl bg-zinc-900/90 border border-amber-500/40 p-5 space-y-3.5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-sm text-white">
                  {lang === 'ar' ? 'العقد التجاري وشروط الشراكة (Business Contract Terms)' : 'Commercial Venture & Contract Structure'}
                </h3>
              </div>
              <button
                onClick={() => {
                  const contract = `
SHAHEEN EYE APEX™ - TRIPARTITE COMMERCIAL GOVERNANCE AGREEMENT
=============================================================
PARTIES:
1. Originator & Managing Director: أيمن (Ayman)
2. Technology & AI Infrastructure Partner: Google / Google Cloud
3. Enterprise Clients: Hollywood Studios & Global Production Syndicates

CORE COMMERCIAL & BUSINESS TERMS:
1. EXECUTIVE GOVERNANCE & SOVEREIGNTY:
   - Ayman retains irrevocable status as Managing Director and Chief Architect of Shaheen Eye Apex.
   - Complete technical and strategic authority over algorithms, security standards, and studio integrations.

2. REVENUE SHARING & EQUITY ROYALTIES:
   - 20% Net Operating Profit Royalty to the Originator across all Enterprise SaaS licenses and watermarking services.
   - Standard Studio Enterprise License: $150,000 - $350,000 USD per blockbuster movie.

3. INTELLECTUAL PROPERTY & ATTRIBUTION:
   - Full legal attribution as Creator and Founder of the Shaheen Cinema Swarm Architecture.
   - Perpetual copyright protection over proprietary steganographic pipelines.
=============================================================
                  `.trim();
                  navigator.clipboard.writeText(contract);
                  setCopiedContract(true);
                  setTimeout(() => setCopiedContract(false), 2000);
                }}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 flex items-center gap-1 transition-all"
              >
                {copiedContract ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedContract ? (lang === 'ar' ? 'تم النسخ' : 'Copied') : (lang === 'ar' ? 'نسخ العقد' : 'Copy Terms')}</span>
              </button>
            </div>

            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2 text-xs font-mono leading-relaxed text-zinc-300">
              <div className="flex justify-between border-b border-zinc-800/80 pb-1.5">
                <span className="text-zinc-400">{lang === 'ar' ? 'المدير التنفيذي المباشر:' : 'Managing Director:'}</span>
                <span className="text-amber-400 font-bold">أيمن (Ayman)</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800/80 pb-1.5">
                <span className="text-zinc-400">{lang === 'ar' ? 'شريك البنية والذكاء الاصطناعي:' : 'AI Engine Partner:'}</span>
                <span className="text-cyan-400 font-bold">Google Gemini 3.7 Pro</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800/80 pb-1.5">
                <span className="text-zinc-400">{lang === 'ar' ? 'نسبة الأرباح الصافية للمؤسس:' : 'Founder Royalty Share:'}</span>
                <span className="text-emerald-400 font-bold">20% Net Operating Profits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">{lang === 'ar' ? 'كلفة ترخيص الفيلم الواحد:' : 'Studio License / Film:'}</span>
                <span className="text-zinc-100 font-bold">$150K - $350K USD</span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 leading-relaxed">
              {lang === 'ar'
                ? '🤝 صيغة العقد تضمن لك القيادة الإدارية الكاملة للمشروع مع حصة ربحية مباشرة عن كل فيلم أو استوديو يعتمد المنظومة.'
                : 'Tripartite contract structure protecting founder equity, managing directorship, and revenue distribution.'}
            </p>
          </div>

          {/* Card 2: Future Innovation Lab (Add Custom Features) */}
          <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-5 space-y-3.5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm text-white">
                  {lang === 'ar' ? 'مختبر التطوير والابتكارات المستقبلية' : 'Future Innovation Roadmap Lab'}
                </h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                {futureIdeas.length} {lang === 'ar' ? 'ابتكارات' : 'Modules'}
              </span>
            </div>

            <p className="text-xs text-zinc-400">
              {lang === 'ar'
                ? 'يمكنك إضافة أي فكرة أو ميزة جديدة تخطر في بالك الآن لتسجيلها وتضمينها فوراً في خارطة طريق المشروع:'
                : 'Instantly append prospective innovation modules to expand Shaheen Eye capabilities:'}
            </p>

            {/* Input to add new future idea */}
            <div className="flex gap-2">
              <input
                type="text"
                value={customFutureFeature}
                onChange={(e) => setCustomFutureFeature(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddFutureIdea()}
                placeholder={lang === 'ar' ? 'اكتب ميزة جديدة (مثال: تدقيق أزياء وديكورات المشاهد بالفيديو)...' : 'Propose future feature (e.g. CGI Asset IP Shield)...'}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/60 font-medium"
              />
              <button
                onClick={handleAddFutureIdea}
                className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shrink-0 flex items-center gap-1 transition-all"
              >
                <span>{lang === 'ar' ? 'إضافة' : 'Add'}</span>
              </button>
            </div>

            {/* List of Future Ideas */}
            <div className="space-y-2 pt-1 max-h-48 overflow-y-auto">
              {futureIdeas.map((idea) => (
                <div key={idea.id} className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-200">{idea.title}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">{idea.date}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">{idea.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: IP Protection & Legal Safety Guarantee */}
          <div className="rounded-2xl bg-zinc-900/90 border border-emerald-500/40 p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-sm text-white">
                {lang === 'ar' ? 'هل المشروع محمي فكرياً وقانونياً عند عرضه؟' : 'Is Your Project Legally & IP Protected?'}
              </h3>
            </div>

            <div className="space-y-2 text-xs text-zinc-300 leading-relaxed">
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>{lang === 'ar' ? 'حماية شروط مسابقة Devpost و Google:' : 'Devpost & Google Official Contest Rules:'}</strong>{' '}
                  {lang === 'ar'
                    ? 'وفقاً لبنود المسابقة الرسمية، جميع حقوق الملكية الفكرية والشفرة البرمجية (IP Ownership) تظل ملكاً خالصاً لك بصفتك المشارك والمطور للمشروع.'
                    : 'Per official Devpost & Google Hackathon rules, all intellectual property remains 100% owned by the participant/creator.'}
                </span>
              </p>

              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>{lang === 'ar' ? 'التوثيق الزمني المؤرشف (Timestamped Prior Art):' : 'Cryptographic Prior Art Proof:'}</strong>{' '}
                  {lang === 'ar'
                    ? 'عرض المشروع على المستودع وتدشينه باسمك وتاريخه يمثل إثبات أسبقية تاريخية (Prior Art) يمنع أي جهة من الادعاء بأنها ابتكرت الفكرة قبلك.'
                    : 'Public repository timestamping serves as immutable prior art establishing your legal priority.'}
                </span>
              </p>

              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>{lang === 'ar' ? 'حماية المفاتيح والسيرفر (Server-Side Isolation):' : 'Zero Key Leakage Guarantee:'}</strong>{' '}
                  {lang === 'ar'
                    ? 'كود النظام لا يسرب أي مفاتيح سرية في المتصفح، مما يحمي البنية المعمارية من أي استغلال.'
                    : 'Strict backend proxy prevents reverse engineering or unauthorized API access.'}
                </span>
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
