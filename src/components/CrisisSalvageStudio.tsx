import React, { useState } from 'react';
import { Flame, ShieldAlert, Sparkles, RefreshCw, DollarSign, CheckCircle2, Copy, Download, Zap, Film, AlertTriangle, ArrowRight } from 'lucide-react';

interface CrisisSalvageStudioProps {
  lang: 'ar' | 'en';
}

const PRESET_CRISES = [
  {
    titleAr: '🎬 أزمة مسلسل درامي تاريخي (تسريب نهاية المسلسل وموت القائد)',
    titleEn: 'Historical Drama Crisis (Finale & Death of Leader Leaked)',
    leakedSummary: 'تم تسريب مشهد مقتل قائد الجيش وتسميمه على يد وزيره المقرب في الحلقة 28 قبل عرض المسلسل بشهرين، وانتشر التسريب على تيك توك مما دمر عنصر المفاجأة تماماً وكاد يوقف العرض.',
    originalScript: 'المشهد 45: القاعة الكبرى - ليل. الوزير يضع السم في كأس القائد. القائد يشرب ويسقط صريعاً والوزير يعلن نفسه حاكماً للبلاد.',
    budget: '35,000,000',
  },
  {
    titleAr: '🍿 فيلم خيال علمي وهوليوود (تسريب هوية العميل المزدوج ونهاية العالم)',
    titleEn: 'Sci-Fi Blockbuster (Double Agent Reveal & Ending Spoiled)',
    leakedSummary: 'صورة من السيناريو المسرب كشفت أن الذكاء الاصطناعي المركزي هو في الحقيقة نسخة من عقل العالم البطل وأنه هو من أمر بتدمير المحطة الفضائية.',
    originalScript: 'Scene 112: The Core Chamber. Dr. Vance looks into the holo-mirror. The AI speaks with his own childhood voice: "I only executed your original repressed command."',
    budget: '95,000,000',
  },
  {
    titleAr: '🕵️‍♂️ مسلسل جريمة وغموض (تسريب هوية القاتل في الحلقة 6)',
    titleEn: 'Crime Thriller (Killer Identity Exposed in Episode 6)',
    leakedSummary: 'تسريب صوتي لممثل كشف أن المحقق نفسه هو القاتل المتسلسل ولديه انفصام في الشخصية.',
    originalScript: 'المشهد 80: المحقق يفتح خزنته السرية ويجد أدوات الجريمة وسترة الضحية الأخيرة ملطخة بالدماء.',
    budget: '18,000,000',
  },
];

export const CrisisSalvageStudio: React.FC<CrisisSalvageStudioProps> = ({ lang }) => {
  const [leakedContext, setLeakedContext] = useState<string>(PRESET_CRISES[0].leakedSummary);
  const [originalScript, setOriginalScript] = useState<string>(PRESET_CRISES[0].originalScript);
  const [productionBudget, setProductionBudget] = useState<string>(PRESET_CRISES[0].budget);
  const [streamingOutput, setStreamingOutput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleApplyPreset = (preset: typeof PRESET_CRISES[0]) => {
    setLeakedContext(preset.leakedSummary);
    setOriginalScript(preset.originalScript);
    setProductionBudget(preset.budget);
  };

  const handleStartSalvage = async () => {
    if (!leakedContext.trim()) return;

    setIsProcessing(true);
    setStreamingOutput('');

    try {
      const response = await fetch('/api/cinema/crisis-salvage/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leakedContext,
          originalScript,
          productionBudget,
          language: lang,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json();
        setStreamingOutput(`❌ خطأ: ${errJson.error || 'فشل الاتصال بمحرك إنقاذ السيناريو'}`);
        setIsProcessing(false);
        return;
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Response body stream reader unavailable');
      }

      let accumulated = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim();
            if (!dataStr) continue;

            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                accumulated += parsed.text;
                setStreamingOutput(accumulated);
              }
              if (parsed.error) {
                accumulated += `\n\n⚠️ ${parsed.error}: ${parsed.details || ''}`;
                setStreamingOutput(accumulated);
              }
            } catch (e) {
              // Ignore partial JSON chunks
            }
          }
        }
      }
    } catch (err: any) {
      setStreamingOutput(`❌ حدث خطأ غير متوقع: ${err.message || err}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (!streamingOutput) return;
    navigator.clipboard.writeText(streamingOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadDossier = () => {
    if (!streamingOutput) return;
    const blob = new Blob([streamingOutput], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CineGuard-Crisis-Salvage-Report-${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8" id="crisis-salvage-container">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-red-950/70 via-zinc-900 to-amber-950/60 border border-red-500/30 rounded-2xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl border border-red-500/40 p-1 shadow-lg shadow-red-500/20 bg-zinc-950 shrink-0 overflow-hidden">
              <img 
                src="/cybernetic_falcon_1787579678283.jpg" 
                alt="Shaheen Falcon Logo" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-mono">
                <Flame className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                <span>{lang === 'ar' ? 'براءة اختراع حصرية: خوارزمية قلب الحبكة الدرامية بعد التسريب' : 'Proprietary Patent: Post-Leak Crisis Plot-Flip Engine'}</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                {lang === 'ar' ? 'محرك إنقاذ السيناريو المحروق (Crisis Salvage & Plot Flip)' : 'Leaked Script Crisis Salvage & Plot Flip Engine'}
              </h1>
              <p className="text-zinc-300 text-sm max-w-3xl leading-relaxed">
                {lang === 'ar'
                  ? 'الحل الثوري لأكبر كارثة في عالم الإنتاج التلفزيوني والسينمائي: عندما يتسرب النص أو تحترق النهاية للجمهور، يقوم محرك الذكاء الاصطناعي في دقائق بإعادة هيكلة القصة وتحويل التسريب إلى "طعم أو خدعة متقنة داخل القصة"، مما ينقذ ميزانية العمل ويضاعف حماس المشاهدين!'
                  : 'The ultimate counter-measure for production disasters: When scripts or spoilers leak online, CineGuard instantly reconstructs the plot, turning the leak into an in-universe red herring decoy to save millions in scrapped budget.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 bg-zinc-950/80 p-4 rounded-xl border border-red-900/40 min-w-[240px]">
            <div className="text-xs text-zinc-400">{lang === 'ar' ? 'متوسط الخسارة التي يتم إنقاذها' : 'Average Saved Budget'}</div>
            <div className="text-2xl font-black font-mono text-emerald-400">$15,000,000+</div>
            <div className="text-[11px] text-zinc-500">{lang === 'ar' ? 'بدل إلغاء العمل أو تقليصه لوثائقي' : 'Prevents project cancellation'}</div>
          </div>
        </div>
      </div>

      {/* Preset Crisis Scenarios */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            {lang === 'ar' ? '⚡ سيناريوهات وأزمات واقعية جاهزة للتجربة الفورية:' : '⚡ Instant Real-World Leak Crisis Presets:'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PRESET_CRISES.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(p)}
              className="text-left p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-red-500/50 hover:bg-zinc-800/80 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-bold text-zinc-200 group-hover:text-red-400 transition-colors flex items-center gap-1.5 mb-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  <span>{lang === 'ar' ? p.titleAr : p.titleEn}</span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {p.leakedSummary}
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                <span>الميزانية: ${p.budget}</span>
                <span className="text-red-400 flex items-center gap-1">
                  {lang === 'ar' ? 'تجربة الآن' : 'Apply'} <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Grid: Inputs & Live Salvage Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Crisis Formulation (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
              <ShieldAlert className="w-4 h-4" />
              <span>{lang === 'ar' ? '١. تفاصيل ما تم تسريبه للجمهور' : '1. Leaked Spoilers Details'}</span>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1.5 font-medium">
                {lang === 'ar' ? 'ما هي المفاجأة أو المشهد الذي احترق وتسرب على الإنترنت؟' : 'What scene or twist was leaked online?'}
              </label>
              <textarea
                value={leakedContext}
                onChange={(e) => setLeakedContext(e.target.value)}
                rows={4}
                placeholder={lang === 'ar' ? 'اكتب ما عرفه الجمهور وما تسرب بالتفصيل...' : 'Describe what was leaked to the public...'}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/40"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1.5 font-medium">
                {lang === 'ar' ? '٢. النص الأصلي أو سياق المشهد قبل التسريب' : '2. Original Script / Scene Context'}
              </label>
              <textarea
                value={originalScript}
                onChange={(e) => setOriginalScript(e.target.value)}
                rows={4}
                placeholder={lang === 'ar' ? 'ضع نص المشهد الأصلي هنا...' : 'Paste original scene excerpt here...'}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-red-500/60 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1.5 font-medium">
                {lang === 'ar' ? '٣. الميزانية المهددة بالخسارة ($ USD)' : '3. Production Budget at Risk ($ USD)'}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-zinc-500 font-mono">$</span>
                <input
                  type="text"
                  value={productionBudget}
                  onChange={(e) => setProductionBudget(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 pl-8 pr-3 text-sm text-zinc-100 font-mono focus:outline-none focus:border-red-500/60"
                />
              </div>
            </div>

            <button
              onClick={handleStartSalvage}
              disabled={isProcessing || !leakedContext.trim()}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                isProcessing
                  ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white shadow-red-500/20'
              }`}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{lang === 'ar' ? 'جاري إعادة صياغة القصة وقلب الحبكة...' : 'Executing Crisis Salvage Swarm...'}</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>{lang === 'ar' ? 'بدء إنقاذ السيناريو وقلب الحبكة فوراً' : 'Execute Emergency Crisis Salvage'}</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Explanatory Value Card */}
          <div className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-4 text-xs text-zinc-400 space-y-2">
            <div className="font-bold text-zinc-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'ar' ? 'كيف تمنع هذه التقنية تحويل العمل إلى وثائقي مخفّض؟' : 'Why this prevents budget write-offs'}</span>
            </div>
            <p className="leading-relaxed">
              {lang === 'ar'
                ? 'بدل إلغاء المسلسل أو إنفاق 20 مليون دولار لإعادة تصوير نصف العمل، يقوم المحرك باستغلال المشاهد التي تم تصويرها فعلياً، وإضافة مشهدين قصيرين فقط يقلبان الطاولة على الجمهور ويجعلان التسريب يبدو كخطة خادعة رسمها الأبطال!'
                : 'Instead of scrapping the footage or going over budget, the engine reuses already shot scenes and adds minimal targeted reshoots to flip the narrative entirely.'}
            </p>
          </div>

        </div>

        {/* Right Column: AI Live Salvage Output Dossier (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl flex-1 flex flex-col overflow-hidden">
            
            {/* Dossier Header & Controls */}
            <div className="p-4 border-b border-zinc-800 bg-zinc-950/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="font-bold text-sm text-zinc-200 font-mono">
                  {lang === 'ar' ? 'ملف خطة الإنقاذ وإعادة هيكلة السيناريو' : 'Executive Crisis Salvage Dossier'}
                </span>
              </div>

              {streamingOutput && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs flex items-center gap-1.5 transition-all"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? (lang === 'ar' ? 'تم النسخ!' : 'Copied') : (lang === 'ar' ? 'نسخ الخطة' : 'Copy')}</span>
                  </button>

                  <button
                    onClick={handleDownloadDossier}
                    className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs flex items-center gap-1.5 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'تحميل كتقرير' : 'Export MD'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Dossier Content Area */}
            <div className="p-6 flex-1 overflow-y-auto max-h-[650px] font-sans text-sm text-zinc-200 leading-relaxed space-y-4">
              {streamingOutput ? (
                <div className="whitespace-pre-wrap font-sans text-zinc-200 leading-relaxed text-sm bg-zinc-950/60 p-4 rounded-lg border border-zinc-800/80">
                  {streamingOutput}
                </div>
              ) : (
                <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-center p-8 text-zinc-500 space-y-3">
                  <Film className="w-12 h-12 text-zinc-700 stroke-[1.5]" />
                  <div className="text-zinc-400 font-medium">
                    {lang === 'ar' ? 'بانتظار إدخال بيانات التسريب لبدء الإنقاذ' : 'Awaiting leak details to formulate plot flip'}
                  </div>
                  <p className="text-xs text-zinc-600 max-w-md">
                    {lang === 'ar'
                      ? 'اختر أحد السيناريوهات الجاهزة من الأعلى أو اكتب تسريبك الخاص واضغط "بدء إنقاذ السيناريو" لترى السحر السينمائي.'
                      : 'Select a preset scenario above or write custom leaked notes to run the AI crisis recovery swarm.'}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
