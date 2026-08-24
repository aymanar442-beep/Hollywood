import React, { useState } from 'react';
import { Download, FileText, Globe, CheckCircle2, ShieldCheck, Sparkles, Film, Award, Copy, Check } from 'lucide-react';

interface ProjectPitchDeckProps {
  lang: 'ar' | 'en';
}

export const ProjectPitchDeck: React.FC<ProjectPitchDeckProps> = ({ lang }) => {
  const [copiedLang, setCopiedLang] = useState<'ar' | 'en' | null>(null);

  const fullReportAr = `===================================================================
🦅 ملف العرض التقديمي الشامل لمنظومة SHAHEEN APEX AI - CINEGUARD
العرّاب: أيمن العرايشي | مؤسس ومدير المنظومة
المنظومة الأولى عالمياً للأمن السيبراني السينمائي وحماية الأصول بالذكاء الاصطناعي التنبؤي
===================================================================

1. ملخص تنفيذي (Executive Summary):
--------------------------------------------------
منظومة "SHAHEEN APEX AI: CineGuard" هي أول بنية تحتية ذكية متكاملة في العالم مصممة لحماية السيناريوهات السينمائية والأصول الرقمية من التسريب والقرصنة قبل وأثناء وبعد الإنتاج.
تجمع المنظومة بين:
- التشفير البيومتري والسلوكي المتطور.
- العلامة المائية غير المرئية القائمة على بصمة "العرّاب" الثابتة والحمولة الديناميكية.
- محرك إنقاذ السيناريو المحروق (Crisis Salvage Engine) لإعادة كتابة الحبكات المسربة في دقائق.
- غرفة العرّاب الخفي (The Godfather Room) للشراكة الإبداعية وإطلاق تريند الاندماج بين هوليوود والسينما العربية.

2. المشكلة الحقيقية في هوليوود وصناعة السينما (The Problem):
--------------------------------------------------
- خسائر سنوية تتجاوز 2.8 مليار دولار نتيجة تسريب السيناريوهات والأفلام قبل العرض.
- عجز أنظمة الأمان التقليدية (PDF Passwords / NDAs الورقية) عن منع التصوير السري أو كشف هوية المسرب بدقة 100%.
- اضطرار استديوهات الإنتاج إلى إعادة تصوير مكلفة وتأجيل مواعيد العرض وتدمير عنصر المفاجأة.

3. الابتكارات التقنية الحصرية في منظومة شاهين (Core Innovations):
--------------------------------------------------
أ) بصمة "العرّاب" والعلامة المائية غير المرئية (Stealth Watermarking):
دمج بصمة ثابتة مشفرة (The Godfather Base) مع حمولة بيانات رياضية تتغير لكل ممثل أو فرد في طاقم العمل، مما يجعل تحديد مصدر أي تسريب أمراً فورياً وقاطعاً.

ب) ساعة شاهين البيولوجية (Shaheen Biometric Watch & EDA Sensing):
قراءة المؤشرات العصبية والتعرق عبر الجلد (Electrodermal Activity) مع بروتوكول تناوب البطاريات اللانهائي (Dual-Cell Power Cycling) لمنع فتح النصوص في بيئات غير آمنة أو تحت التوتر.

ج) محرك إنقاذ الأزمات (Crisis Salvage AI Engine):
إذا تم تسريب حبكة معينة، يقوم المحرك بتحليل السيناريو وتوليد 3 مسارات درامية بديلة متفوقة مع خطة تسويقية لتحويل التسريب إلى حملة ترويجية مضادة.

د) الإنتربول الرقمي وسجل التتبع (Immutable AI Interpol Ledger):
سجل زمني فولاذي (Timestamped Audit Trail) يوثق كل تفاعل، لقطة شاشة ممنوعة، أو محاولة نسخ، مما يوفر إثباتات قانونية دولية لا تقبل الجدل.

4. غرفة العرّاب والاندماج السينمائي العالمي (The Godfather Crossover):
--------------------------------------------------
خدمة استشارية وإبداعية Premium تتيح للشركات المنتجة الاستعانة بالمؤسس والعرّاب (أيمن العرايشي) كشريك كتابة وتأليف، وابتكار شخصيات وتريندات استثنائية (مثل ظهور شخصية العرّاب باللغة العربية السورية العفوية مع ترجمة داخل أعمال هوليوودية ضخمة لكسر الجدار الرابع وصناعة تريندات عالمية).

5. الأثر المالي والـ ROI للمنتجين (Financial Impact):
--------------------------------------------------
- توفير ما بين 12 إلى 45 مليون دولار لكل إنتاج ضخم عبر منع التسريب.
- خفض تكاليف إعادة التصوير الطارئة بنسبة 90%.
- تسريع توقيع ومصادقة عقود الـ NDA الرقمية بنسبة 80%.

===================================================================
🦅 شركة شاهين للتقنيات والذكاء الاصطناعي • الإنسان قبل المال • أمان شاهين في كل مكان
===================================================================`;

  const fullReportEn = `===================================================================
🦅 SHAHEEN APEX AI - CINEGUARD: COMPREHENSIVE PROJECT PITCH & DOSSIER
Founder & Chief Architect: Ayman Al-Araishi (The Godfather)
World-First Predictive AI & Cybernetic Security Platform for Film & Digital Assets
===================================================================

1. Executive Summary:
--------------------------------------------------
SHAHEEN APEX AI (CineGuard) is the world's premier multi-agent ecosystem engineered to protect high-budget screenplays, creative IP, and confidential movie assets before, during, and after production.
It combines:
- Real-time behavioral & biometric script access control.
- Zero-width stealth steganography embedded with "The Godfather" signature.
- Crisis Salvage Engine: Rapid plot restructuring & PR turnaround for leaked storylines.
- The Godfather Room: High-tier creative co-writing & revolutionary Hollywood-Arab crossover trends.

2. Industry Problem & Market Gap:
--------------------------------------------------
- Over $2.8B lost annually in global box-office revenue due to early screenplay leaks and plot piracy.
- Conventional security (static PDF passwords, physical paper NDAs) fails against smartphone camera capture and insider leaks.
- Studios suffer massive emergency reshoot costs, lost suspense, and PR devastation.

3. Core Technical Inventions:
--------------------------------------------------
A) "The Godfather" Stealth Watermarking:
Blends an immutable cryptographic signature with dynamic zero-width payloads unique to every cast and crew member, providing forensic proof of leak origin.

B) Shaheen Biometric Wearable Core (EDA & Neural Stress Sync):
Monitors Electrodermal Activity (EDA) and skin-conductance markers alongside infinite dual-cell battery cycling, instantly locking confidential script pages under suspicious physiological stress.

C) AI Crisis Salvage Engine:
When a script leak occurs, the engine autonomously recalculates dramatic arcs, producing 3 high-suspense counter-narratives and a viral PR redemption roadmap within minutes.

D) Immutable AI Interpol Audit Trail:
Maintains nanosecond-accurate forensics logs of all viewing sessions, blocked screenshot attempts, and verification handshakes for ironclad legal enforcement.

4. The Godfather Room & Global Cinematic Synergy:
--------------------------------------------------
An exclusive Premium partnership tier connecting studio executives directly with Ayman Al-Araishi (The Godfather) for narrative engineering, poetic script polishing, and groundbreaking cultural crossover cameos (e.g., spontaneous Syrian-Arabic dialogue in Hollywood blockbusters with subtitles to break the fourth wall).

5. Quantifiable Studio ROI:
--------------------------------------------------
- Protects $12M to $45M in anticipated theatrical earnings per tentpole release.
- Cuts emergency script rewriting and reshoot expenses by over 90%.
- Eliminates leak investigation latency from months to milliseconds.

===================================================================
🦅 SHAHEEN APEX AI • Humanity Before Capital • Everywhere, Always Protected
===================================================================`;

  const downloadTextFile = (content: string, filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const copyToClipboard = (text: string, targetLang: 'ar' | 'en') => {
    navigator.clipboard.writeText(text);
    setCopiedLang(targetLang);
    setTimeout(() => setCopiedLang(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 animate-in fade-in duration-700">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-indigo-950/60 to-zinc-900 border border-indigo-500/40 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl border-2 border-indigo-500/50 p-1 shadow-xl shadow-indigo-500/30 bg-zinc-950 shrink-0 overflow-hidden">
              <img 
                src="/cybernetic_falcon_1787579678283.jpg" 
                alt="Shaheen Logo" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                <Award className="w-3.5 h-3.5 text-indigo-400" />
                {lang === 'ar' ? 'ملف العرض الرسمي والشامل للتحميل' : 'Official Full Dossier & Pitch Export'}
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white">
                {lang === 'ar' ? 'ملف العرض التقديمي لمنظومة شاهين' : 'SHAHEEN APEX Full Project Dossier'}
              </h1>
              <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
                {lang === 'ar'
                  ? 'وثيقة متكاملة جاهزة للتحميل والنسخ، مصممة للمستثمرين، لجان التحكيم في المسابقات العالمية، واستديوهات الإنتاج السينمائي.'
                  : 'Complete investor-grade technical brief and executive pitch ready for direct download and global platform submissions.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => downloadTextFile(fullReportAr, 'SHAHEEN_CineGuard_Pitch_Arabic.txt')}
              className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs md:text-sm flex items-center gap-2.5 transition-all shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'ar' ? 'تحميل الملف بالعربية (.txt)' : 'Download Arabic (.txt)'}</span>
            </button>
            <button
              onClick={() => downloadTextFile(fullReportEn, 'SHAHEEN_CineGuard_Pitch_English.txt')}
              className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs md:text-sm flex items-center gap-2.5 transition-all shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'ar' ? 'تحميل الملف بالإنجليزية (.txt)' : 'Download English (.txt)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Layout for AR & EN Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Arabic Dossier Card */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-sm text-emerald-400">النسخة العربية الكاملة (Arabic Dossier)</span>
              </div>
              <button
                onClick={() => copyToClipboard(fullReportAr, 'ar')}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 flex items-center gap-1.5 transition-all"
              >
                {copiedLang === 'ar' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLang === 'ar' ? 'تم النسخ!' : 'نسخ النص'}</span>
              </button>
            </div>
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 font-mono text-xs text-zinc-300 leading-relaxed max-h-96 overflow-y-auto whitespace-pre-wrap select-text">
              {fullReportAr}
            </div>
          </div>
          <button
            onClick={() => downloadTextFile(fullReportAr, 'SHAHEEN_CineGuard_Pitch_Arabic.txt')}
            className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold flex items-center justify-center gap-2 transition-all border border-zinc-700"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>حفظ ملف العرض العربي بجهازك</span>
          </button>
        </div>

        {/* English Dossier Card */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-sm text-blue-400">English Global Dossier</span>
              </div>
              <button
                onClick={() => copyToClipboard(fullReportEn, 'en')}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 flex items-center gap-1.5 transition-all"
              >
                {copiedLang === 'en' ? <Check className="w-3.5 h-3.5 text-blue-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLang === 'en' ? 'Copied!' : 'Copy Text'}</span>
              </button>
            </div>
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 font-mono text-xs text-zinc-300 leading-relaxed max-h-96 overflow-y-auto whitespace-pre-wrap select-text dir-ltr text-left">
              {fullReportEn}
            </div>
          </div>
          <button
            onClick={() => downloadTextFile(fullReportEn, 'SHAHEEN_CineGuard_Pitch_English.txt')}
            className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold flex items-center justify-center gap-2 transition-all border border-zinc-700"
          >
            <Download className="w-4 h-4 text-blue-400" />
            <span>Download English Dossier (.txt)</span>
          </button>
        </div>

      </div>

    </div>
  );
};
