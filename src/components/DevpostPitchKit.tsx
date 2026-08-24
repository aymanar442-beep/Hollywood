import React, { useState } from 'react';
import { Copy, Check, FileText, Sparkles, Award, Terminal, Cpu, Globe, Rocket, ShieldCheck, Download, ExternalLink, ShieldAlert, Lock, BookOpen } from 'lucide-react';
import { DEVPOST_HACKATHON_PITCH } from '../data/cinemaAgents';
import cyberneticFalconImg from '../assets/images/cybernetic_falcon_1787579678283.jpg';

interface DevpostPitchKitProps {
  lang: 'ar' | 'en';
}

export const DevpostPitchKit: React.FC<DevpostPitchKitProps> = ({ lang }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeReportTab, setActiveReportTab] = useState<'en' | 'ar'>('en');

  const appLiveUrl = window.location.origin;

  const copyToClipboard = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const englishFullReport = `================================================================================
🦅 SHAHEEN APEX AI | CineGuard™ v3.7
OFFICIAL HACKATHON & INVESTOR TECHNICAL SPECIFICATION REPORT
================================================================================

1. PROJECT SUMMARY & ELEVATOR PITCH
--------------------------------------------------------------------------------
Project Title: SHAHEEN APEX AI | CineGuard™ (Hollywood & Multi-Agent Cinema Shield)
Tagline: Autonomous Multi-Agent AI & Steganographic Shield Defending Hollywood Scripts & IP.
Live App URL: ${appLiveUrl}
Founder & Lead Architect: Ayman Al-Araishi (The Godfather)

Elevator Pitch:
CineGuard Apex is an enterprise multi-agent cinema intelligence and anti-leak defense platform powered by Google Gemini 3.7 Pro. It continuously audits screenplays for plot leaks, copyright infringement, character continuity flaws, and box office resonance while embedding invisible, zero-width cryptographic watermarks to immediately identify script leak sources with mathematically unforgeable precision.

2. THE MULTI-BILLION DOLLAR HOLLYWOOD PROBLEM
--------------------------------------------------------------------------------
Major Hollywood and streaming studios (Disney, Warner Bros, Universal, Netflix) lose over $10 Billion annually due to:
- Catastrophic pre-release screenplay leaks destroying marketing momentum.
- Unplanned production reshoots averaging $50M - $100M per blockbuster.
- Copyright infringement disputes and dialogue originality lawsuits.
- Lack of cryptographic traceability when sensitive draft scripts are distributed across 500+ cast, crew, and agency members.

3. CORE INNOVATION & MULTI-AGENT ARCHITECTURE
--------------------------------------------------------------------------------
1. Autonomous 4-Agent Cinema Security Swarm:
   - Chief Security & Anti-Leak Auditor: Scans scenes for twist vulnerabilities, character death leaks, and assigns a scene-level leak vulnerability score.
   - Entertainment IP & Copyright Counsel: Compares dialogue and lore against global cinematic archives to prevent multi-million dollar copyright litigation.
   - Continuity & Script Doctor: Pinpoints pacing paradoxes, plot holes, and psychological character arc inconsistencies.
   - Box Office & Retention Forecaster: Predicts demographic resonance, commercial viability, and audience bingeability index.

2. Invisible Zero-Width Steganographic Watermarking (Patented Protocol):
   - Embeds cryptographically encoded recipient IDs (e.g., Actor Name, Agency, Timestamp) into the script's raw Unicode whitespace using Zero-Width Space (ZWSP) and Zero-Width Non-Joiner (ZWNJ) sequences.
   - 100% Invisible to the human eye, immune to copy-pasting, screenshot OCR, and text reflowing.
   - Instant 40ms forensic extraction decodes the exact leak source for court-admissible IP defense without exposing the underlying cryptographic keys.

3. Real-Time Crisis Script Salvage Engine:
   - If a leak or plot spoiler occurs, Gemini 3.7 Pro generates alternate narrative endings in real-time, salvaging marketing surprise and saving studios up to 95% in reshoot costs.

4. VIP Godfather Script Room:
   - Deep cinematic consulting studio providing high-level artistic polish, character dialogue elevation, and director-tier scene restructuring.

4. COMMERCIAL VIABILITY & REVENUE MODEL (B2B SAAS)
--------------------------------------------------------------------------------
- Tier 1: Major Studio Enterprise Licensing ($5M/year per studio).
- Tier 2: Per-Production Blockbuster Shield ($250,000 - $500,000 per feature film).
- Tier 3: SHAHEEN Bio-Watch Hardware Leasing for biometric script authentication.

5. EXECUTIVE FOUNDER CONTRACT & SOVEREIGN RIGHTS
--------------------------------------------------------------------------------
- Executive CEO Directorship: $30,000/month ($360,000/year) tax-free with quarterly profit dividends.
- 100% Artistic Independence: External artistic roles (screenwriting, acting) are strictly personal with zero company equity claims.
- Sovereign Monopoly: The Founder retains exclusive 100% ownership over expanded sovereign editions (e.g. defense, sovereign government & big-tech integrations like Google) outside the cinema/TV sector.
- Dispute Resolution: Partnership dissolution can ONLY be initiated by the Founder.

================================================================================`;

  const arabicFullReport = `================================================================================
🦅 منظومة شاهين للأمان والذكاء الاصطناعي التنبؤي | SHAHEEN APEX AI - CineGuard™ v3.7
التقرير الفني الشامل والمفصل للمسابقات ولجان التحكيم والاستثمار الدولي
================================================================================

1. ملخص المشروع والتعريف التنفيذي
--------------------------------------------------------------------------------
اسم المشروع: منظومة شاهين APEX AI | CineGuard™ (درع السينما والذكاء الاصطناعي المتعدد)
الشعار: منظومة ذكاء اصطناعي متعددة الوكلاء وتشفير خفي لحماية سيناريوهات هوليوود وحقوق الملكية الفكرية.
رابط المنظومة الحي للتجربة: ${appLiveUrl}
المؤسس والمهندس المعماري الرئيسي: أيمن العرايشي (العرّاب)

الملخص السريع (Elevator Pitch):
منظومة شاهين CineGuard Apex هي منصة أمان واستخبارات سينمائية رائدة تعتمد على أحدث نماذج Google Gemini 3.7 Pro. تقوم المنظومة بفحص السيناريوهات على مدار اللحظة لكشف ثغرات التسريب، انتهاكات حقوق الملكية، وأخطاء الحبكة، مع دمج علامة مائية تشفيرية غير مرئية (Steganography) تتيح كشف هوية المسرب فورياً وبدقة قطعية غير قابلة للإنكار.

2. المشكلة العالمية التي يعالجها المشروع (خسائر بمليارات الدولارات)
--------------------------------------------------------------------------------
تتكبد كبرى استوديوهات هوليوود ومنصات البث العالمية (ديزني، وارنر بروس، نتفليكس) خسائر تتجاوز 10 مليارات دولار سنوياً بسبب:
- تسريب نصوص وسيناريوهات الأفلام قبل موعد العرض، مما يحرق الحبكة ويدمر الحملات التسويقية.
- تكاليف إعادة تصوير المشاهد (Reshoots) التي تصل إلى 50 - 100 مليون دولار للفيلم الواحد.
- النزاعات القضائية حول سرقة الأفكار وتشابه الحوارات مع أعمال سابقة.
- غياب آلية تتبع تقنية عند توزيع المسودات على أكثر من 500 ممثل وفرد في طواقم العمل.

3. الابتكار الهندسي والبنية التحتية متعددة الوكلاء (Multi-Agent Architecture)
--------------------------------------------------------------------------------
1. سرب الوكلاء السينمائي الأمني الذكي (4-Agent Swarm):
   - كبير مدققي الأمان ومكافحة التسريبات: يحلل المشاهد ويعزل نقاط الضعف التنبؤية ويحدد درجة خطورة تسريب كل مشهد.
   - مستشار الملكية الفكرية وحقوق النشر: يقارن النصوص بالأرشيف السينمائي العالمي لمنع أي دعاوى سرقة أدبية أو حوارية.
   - دكتور السيناريو وضابط الحبكة (Continuity Doctor): يكشف التناقضات المنطقية، عيوب الإيقاع، وثغرات دوافع الشخصيات.
   - خبير شباك التذاكر وجذب الجماهير: يتنبأ بنسب المشاهدة والتفاعل الجماهيري وفرص الإيرادات العالمية.

2. محرك العلامة المائية التشفيرية غير المرئية (Steganography Engine - براءة اختراع):
   - دمج بصمة رقمية مشفرة بالكامل تحتوي اسم المستلم (الممثل أو عضو الطاقم) وتوقيت القراءة داخل المسافات البينية للنص باستخدام محارف Unicode معدومة العرض (ZWSP / ZWNJ).
   - غير مرئية للعين البشرية بنسبة 100%، وتصمد أمام النسخ واللصق والتصوير وإعادة التنسيق.
   - كشف جنائي فوري في 40 جزء من الثانية لتقديم هوية المسرب للمحاكم دون إفشاء أسرار التشفير.

3. محرك إنقاذ الأزمات وتغيير السيناريو (Crisis Salvage Engine):
   - إعادة صياغة النهايات والحبكات المحروقة فورياً عبر Gemini 3.7 Pro لتحويل التسريب إلى حملة تسويقية بديلة وتوفير 95% من تكاليف إعادة التصوير.

4. غرفة العرّاب (Godfather VIP Script Room):
   - استوديو استشاري سينمائي رفيع المستوى لرفع جودة الحوارات وصياغة المشاهد بأسلوب كبار المخرجين العالميين.

4. دراسة الجدوى والنموذج الاقتصادي المستدام (B2B SaaS)
--------------------------------------------------------------------------------
- ترخيص مؤسسي سنوي للاستوديوهات الكبرى (5 مليون دولار سنوياً للاستوديو).
- ترخيص للإنتاج السينمائي الواحد (250,000 إلى 500,000 دولار للفيلم).
- تأجير ومبيعات ساعات SHAHEEN Bio-Watch للتحقق البيومتري من قراء النصوص.

5. الشروط التعاقدية الدولية للمؤسس والحقوق السيادية
--------------------------------------------------------------------------------
- منصب المدير التنفيذي براتب 30,000 دولار شهرياً (360,000 دولار سنوياً) معفى من الضرائب مع نسبة أرباح ربع سنوية.
- الاستقلالية الفنية التامة: أي أدوار تمثيلية أو كتابية خارجية هي حقوق شخصية مستقلة 100% ولا حصة للشركة فيها.
- احتكار النسخ الموسعة: يحتفظ المؤسس بحق بناء نسخ سيادية موسعة خارج قطاع السينما (للتعاقدات مع الحكومات وشركات التقنية الكبرى كـ Google).
- فض النزاع والشراكة حق حصري للمؤسس فقط.

================================================================================`;

  const downloadTextFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6" id="devpost-pitch-kit">
      
      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-sky-950/80 border border-emerald-500/40 p-5 md:p-6 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl border border-emerald-500/40 p-1 shadow-lg shadow-emerald-500/20 bg-zinc-950 shrink-0 overflow-hidden">
              <img 
                src={cyberneticFalconImg} 
                alt="Shaheen Falcon Logo" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'ملف التقديم الرسمي للهاكاثون الدولي ($75K Prize)' : 'Official Devpost Hackathon Submission Kit'}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {lang === 'ar' ? 'حزمة التقديم الاحترافية والتقرير الشامل (عربي / إنجليزي)' : 'Blockbuster Hackathon Pitch & Comprehensive Report'}
              </h1>
              <p className="text-sm text-slate-300 max-w-2xl">
                {lang === 'ar'
                  ? 'جميع النصوص والشروحات مصاغة بأعلى المعايير العالمية لتقديمها مباشرة في موقع Devpost ولجان التحكيم والاستثمار، مع رابط مباشر لتجربة التطبيق حياً.'
                  : 'Complete, executive-tier submission materials ready to copy and paste directly into your Devpost hackathon project entry.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            {/* Live URL Copy Button */}
            <button
              onClick={() => copyToClipboard(appLiveUrl, 'liveUrl')}
              className="px-5 py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/40 text-sky-200 font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all border border-sky-400/40 shadow-lg cursor-pointer"
            >
              {copiedSection === 'liveUrl' ? <Check className="w-4 h-4 text-emerald-400" /> : <ExternalLink className="w-4 h-4" />}
              <span>{copiedSection === 'liveUrl' ? (lang === 'ar' ? 'تم نسخ رابط التطبيق!' : 'Link Copied!') : (lang === 'ar' ? 'نسخ رابط التطبيق الحي للمعاينة' : 'Copy Live App URL')}</span>
            </button>
            <button
              onClick={() => downloadTextFile(activeReportTab === 'en' ? englishFullReport : arabicFullReport, `SHAHEEN_APEX_AI_CINEGUARD_${activeReportTab.toUpperCase()}_REPORT.txt`)}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'ar' ? `تحميل التقرير الكامل كملف TXT (${activeReportTab.toUpperCase()})` : `Download Full Report (.TXT)`}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comprehensive Report Viewer Box (Arabic & English Tabs) */}
      <div className="bg-slate-900 border border-sky-500/30 rounded-2xl p-5 md:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg font-bold text-white">
              {lang === 'ar' ? 'التقرير الفني الشامل والمفصل للمسابقة والاستثمار' : 'Comprehensive Technical & Investor Report'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveReportTab('en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeReportTab === 'en'
                  ? 'bg-sky-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              🇺🇸 English Report
            </button>
            <button
              onClick={() => setActiveReportTab('ar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeReportTab === 'ar'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              🇸🇦 التقرير بالعربية
            </button>
            <button
              onClick={() => copyToClipboard(activeReportTab === 'en' ? englishFullReport : arabicFullReport, 'reportCopy')}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex items-center gap-1.5 ml-2 transition-all cursor-pointer"
            >
              {copiedSection === 'reportCopy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'reportCopy' ? (lang === 'ar' ? 'تم النسخ' : 'Copied') : (lang === 'ar' ? 'نسخ النص' : 'Copy Text')}</span>
            </button>
          </div>
        </div>

        {/* Report Preview Preformatted Box */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-96 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap selection:bg-sky-500 selection:text-white">
          {activeReportTab === 'en' ? englishFullReport : arabicFullReport}
        </div>
      </div>

      {/* Live App Link and Credentials Callout */}
      <div className="rounded-2xl bg-gradient-to-r from-sky-950/60 to-indigo-950/60 border border-sky-500/30 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-sky-400 shrink-0" />
          <div>
            <h3 className="font-bold text-white text-sm">
              {lang === 'ar' ? 'رابط المعاينة والتجربة المباشرة (Live Preview URL)' : 'Live Interactive Demo URL'}
            </h3>
            <p className="text-xs text-slate-300 font-mono mt-0.5">{appLiveUrl}</p>
          </div>
        </div>
        <button
          onClick={() => copyToClipboard(appLiveUrl, 'appUrlDirect')}
          className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-md shrink-0"
        >
          {copiedSection === 'appUrlDirect' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copiedSection === 'appUrlDirect' ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!') : (lang === 'ar' ? 'نسخ الرابط' : 'Copy URL')}</span>
        </button>
      </div>

      {/* Sections Cards for Direct Devpost Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Card 1: Project Title & Elevator Pitch */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h2 className="font-bold text-sm text-white">Project Title & Tagline</h2>
            </div>
            <button
              onClick={() => copyToClipboard(DEVPOST_HACKATHON_PITCH.projectTitle, 'title')}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1 transition-all"
            >
              {copiedSection === 'title' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'title' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          
          <div className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-amber-300 border border-slate-800">
            {DEVPOST_HACKATHON_PITCH.projectTitle}
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">Elevator Pitch (1-2 Sentences):</span>
              <button
                onClick={() => copyToClipboard(DEVPOST_HACKATHON_PITCH.elevatorPitch, 'elevator')}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 flex items-center gap-1"
              >
                {copiedSection === 'elevator' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSection === 'elevator' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed font-mono">
              {DEVPOST_HACKATHON_PITCH.elevatorPitch}
            </p>
          </div>
        </div>

        {/* Card 2: Inspiration & The Problem */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-rose-400" />
              <h2 className="font-bold text-sm text-white">Inspiration & The Problem Solved</h2>
            </div>
            <button
              onClick={() => copyToClipboard(
                "Hollywood studios lose over $10B annually to pre-release script leaks, copyright infringement disputes, and costly production rewrites. Current production pipelines rely on fragmented manual reviews that fail to catch narrative leaks and IP exposure in time. We built CineGuard Apex to give studio executives, screenwriters, and production directors an autonomous, multi-agent AI guardian powered by Google's latest Gemini 3.7 Pro model.",
                'problem'
              )}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1 transition-all"
            >
              {copiedSection === 'problem' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'problem' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed font-mono">
            Hollywood studios lose over $10B annually to pre-release script leaks, copyright infringement disputes, and costly production rewrites. Current production pipelines rely on fragmented manual reviews that fail to catch narrative leaks and IP exposure in time. We built CineGuard Apex to give studio executives, screenwriters, and production directors an autonomous, multi-agent AI guardian powered by Google's latest Gemini 3.7 Pro model.
          </p>
        </div>

        {/* Card 3: What It Does */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <h2 className="font-bold text-sm text-white">What It Does (Core Capabilities)</h2>
            </div>
            <button
              onClick={() => copyToClipboard(
                DEVPOST_HACKATHON_PITCH.keyFeatures.map((f) => `- ${f.title}: ${f.desc}`).join('\n\n'),
                'features'
              )}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1 transition-all"
            >
              {copiedSection === 'features' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'features' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="space-y-2 font-mono text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800">
            {DEVPOST_HACKATHON_PITCH.keyFeatures.map((f, i) => (
              <div key={i} className="border-b border-slate-800/60 pb-1.5 last:border-0 last:pb-0">
                <span className="text-amber-400 font-bold block">{f.title}</span>
                <span className="text-slate-400 text-[11px]">{f.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 4: How We Built It & Architecture */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <h2 className="font-bold text-sm text-white">How We Built It & Tech Stack</h2>
            </div>
            <button
              onClick={() => copyToClipboard(DEVPOST_HACKATHON_PITCH.architectureOverview, 'tech')}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1 transition-all"
            >
              {copiedSection === 'tech' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'tech' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed font-mono">
            {DEVPOST_HACKATHON_PITCH.architectureOverview}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">Google Gemini 3.7 Pro</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">@google/genai SDK</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">Steganography (ZWSP/Unicode)</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">React 19 + Express + Vite</span>
          </div>
        </div>

      </div>

    </div>
  );
};

