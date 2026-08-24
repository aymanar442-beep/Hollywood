import React, { useState } from 'react';
import { 
  Sparkles, 
  Film, 
  MessageSquare, 
  Flame, 
  Copy, 
  Check, 
  Send, 
  RefreshCw, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Sliders, 
  PenTool, 
  Star, 
  Globe, 
  ShieldCheck, 
  ChevronRight,
  Tv,
  Award
} from 'lucide-react';
import { AppLang, DialectMode, GodfatherSceneTakeover } from '../types';

interface GodfatherScriptStudioProps {
  lang: AppLang;
}

export const GodfatherScriptStudio: React.FC<GodfatherScriptStudioProps> = ({ lang }) => {
  const [selectedDialect, setSelectedDialect] = useState<DialectMode>('syrian_colloquial');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [customScenes, setCustomScenes] = useState<GodfatherSceneTakeover[]>([]);

  const defaultScenes: GodfatherSceneTakeover[] = [
    {
      id: 'scene-syrian-heist',
      title: 'مشهد الاختراق السيبراني في هوليوود (Hollywood Cyber Heist)',
      dialect: 'syrian_colloquial',
      context: 'غرفة التحكم في استديو لوس أنجلوس، المحقق الأمريكي يوشك على فقدان السيطرة بعد تسريب الشيفرة الرئيسية.',
      originalSceneEnglish: 'AGENT MILLER: "We are losing the encryption grid! Who the hell authorized this breach?!"',
      godfatherArabicDialogue: 'العرّاب (يدخل بهدوء ممسكاً فنجان قهوة): "لك روق يا حبيب القلب... شو مفكر شاهين نايم؟ كبسة زر وحدة بتخليهم يفتلوا حوالين حالهن ستين دورة! اتركهن يفكرو حالهن هكرو، هاد طعم لحتى نكشف مين وراهن."',
      hollywoodSubtitlesEnglish: '[SUBTITLE]: "Relax, my friend... You think SHAHEEN sleeps? One single command and they’ll be spinning in circles. Let them celebrate; it is an in-universe honeypot."',
      cinematicDirection: 'الكاميرا تتحرك بزاوية مائلة (Dutch Angle)، العرّاب يقف بثقة مطلقة، الشاشات الزرقاء المتوهجة تعكس خريطة التدخل الاستباقي.',
      dramaticImpact: 'كسر التوتر الأمريكي بلمسة دمشقية عفوية ساحرة تقلب موازين المشهد وتصنع تريند سينمائي جبار.'
    },
    {
      id: 'scene-classical-epic',
      title: 'الملحمة التاريخية وحرب العقول (Epic Historical Saga)',
      dialect: 'classical_arabic',
      context: 'مجلس قيادة ملحمي تاريخي قبل معركة مصيرية، القادة في حيرة من أمرهم والعدو يحيط بالقلعة.',
      originalSceneEnglish: 'GENERAL: "The fortress walls are compromised! What wisdom do you bring from the East?!"',
      godfatherArabicDialogue: 'العرّاب (بصوت جهوري فخم): "وَيْحَكُمْ! أتظنون أن حصون الشاهين تُقهر بقرقعة السيوف؟ إنما الحرب خدعة، والرياح التي تظنونها عاصفة عليهم إنما سُخِّرت بأمرنا لتطفئ مشاعلهم في الظلمات!"',
      hollywoodSubtitlesEnglish: '[SUBTITLE]: "Fools! Think you the Bastion of Shaheen yields to clashing steel? War is cunning strategy; the very tempest you dread is our engineered veil to extinguish their torches!"',
      cinematicDirection: 'إضاءة درامية عالية التباين (Chiaroscuro)، نظرة حادة تخترق الشاشة، وصدى صوتي فخم يهز صالة السينما.',
      dramaticImpact: 'لغة عربية فصحى بالغة الجزالة والقوة، تعيد هيبة السينما التاريخية وتمنح المشهد وزناً أسطورياً.'
    },
    {
      id: 'scene-direct-author-takeover',
      title: 'إكمال السيناريو وسد الثغرة المستعصية (Plot-Hole Salvage)',
      dialect: 'direct_author_takeover',
      context: 'مأزق في سيناريو خيال علمي 2026: البطل محاصر في كبسولة الفضاء بعد تعطل محرك الدفع.',
      originalSceneEnglish: 'ASTRONAUT: "Propulsion failure! We have only 90 seconds of oxygen remaining!"',
      godfatherArabicDialogue: 'تدخل قلم العرّاب (تأليف مباشر): "لا تجعل البطل يصلح المحرك كما تفعل كل أفلام هوليوود المبتذلة! بل افتح بروتوكول تدوير الطاقة البيولوجي من ساعة شاهين ليعكس قطبية بطارية النانو، فتتحول جاذبية الكوكب إلى قوة دفع عكسية تنقذ الطاقم وتكشف كوكب مجهول!"',
      hollywoodSubtitlesEnglish: '[DIRECTOR SCRIPT NOTE]: "Do not use the cliché tool repair! Trigger Shaheen Bio-Watch reverse polarity, weaponizing gravitational slingshot to catapult them into the unexplored sector."',
      cinematicDirection: 'مونتاج سريع مع إيقاع تصاعدي للموسيقى، كشف الشاشة التفاعلية لبروتوكول الطاقة اللانهائي.',
      dramaticImpact: 'إنقاذ ميزانية التصوير وتحويل مأزق الحبكة إلى أعظم لحظة ذروة درامية (Climax) في الفيلم.'
    }
  ];

  const handleGenerateCustomTakeover = () => {
    if (!customPrompt.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      let arabicText = '';
      let subEnglish = '';
      let dirText = '';

      if (selectedDialect === 'syrian_colloquial') {
        arabicText = `العرّاب: "لك طول بالك يا غالي، النص هاد بدو نفَس دمشقي عتيق! ${customPrompt} ... منرجع منكتبها بحيث الجمهور يوقف على رجليه بالسينما ويصفق!"`;
        subEnglish = `[SUBTITLE]: "Take it easy my friend, this script needs true authentic grit! ${customPrompt} ... We rewrite it so the whole theater stands and roars with applause!"`;
        dirText = 'حضور كاريزمي هادئ، نظرة مباشرة لعدسة الكاميرا (كسر الجدار الرابع)، وتأثير صوتي متوهج للشاهين.';
      } else if (selectedDialect === 'classical_arabic') {
        arabicText = `العرّاب: "مهلاً أيها السادة! ${customPrompt} ... ألا ترون أن هذا المشهد كُتب بمداد الفروسية؟ سنصيغه بما يليق بعظمة التاريخ وعزة الشاهين!"`;
        subEnglish = `[SUBTITLE]: "Halt, gentlemen! ${customPrompt} ... Behold the prose of chivalry. We forge it to match historical grandeur and the falcon's unwavering majesty!"`;
        dirText = 'تأثير إضاءة سينمائية عميقة ووقفة شموخ، مع موسيقى أوركسترالية ملحمية بالدفوف والوتريات.';
      } else {
        arabicText = `قلم العرّاب (إكمال النص المباشر): "استكمال المشهد: [${customPrompt}] -> يتدخل العرّاب لإلغاء النهاية المتوقعة، ويصنع التفافاً درامياً مزدوجاً (Double Plot Twist) يربط المنظومة بأعماق الأحداث."`;
        subEnglish = `[SCREENPLAY EXTENSION]: "Scene Completed: [${customPrompt}] -> The Godfather overturns the predictable ending, injecting a double plot twist tied into Shaheen core security."`;
        dirText = 'تدوين إرشادات الإخراج على ورقة السيناريو الرسمية بنظام Final Draft المعتمد في هوليوود.';
      }

      const newScene: GodfatherSceneTakeover = {
        id: `custom-${Date.now()}`,
        title: `مشهد مخصص: ${customPrompt.slice(0, 30)}...`,
        dialect: selectedDialect,
        context: 'تدخل حصري بقلم العرّاب (أيمن العرايشي) لاستكمال وتفخيم المشهد السينمائي.',
        originalSceneEnglish: `ORIGINAL INPUT: "${customPrompt}"`,
        godfatherArabicDialogue: arabicText,
        hollywoodSubtitlesEnglish: subEnglish,
        cinematicDirection: dirText,
        dramaticImpact: 'توليد حصري بذكاء شاهين التنبؤي ورؤية العرّاب المعتمدة عالمياً.'
      };

      setCustomScenes([newScene, ...customScenes]);
      setIsGenerating(false);
      setCustomPrompt('');
    }, 800);
  };

  const copyScene = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const allScenes = [...customScenes, ...defaultScenes];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 animate-in fade-in duration-500">
      
      {/* Hero Header - Glowing Blue 3D Identity */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-sky-950/90 border-2 border-amber-500/40 p-6 md:p-8 shadow-[0_0_50px_rgba(245,158,11,0.25)] overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 md:gap-5">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 border-amber-400/60 p-1 shadow-[0_0_30px_rgba(245,158,11,0.4)] bg-slate-950 shrink-0 overflow-hidden">
              <img 
                src="/cybernetic_falcon_1787579678283.jpg" 
                alt="Shaheen Falcon Logo" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black mb-2 shadow-inner">
                <Star className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>{lang === 'ar' ? 'خدمة بريميوم حصرية • تريند العصر للسنوات القادمة (Next-Gen Global Trend)' : 'Exclusive Premium VIP Module • Hollywood Trend of the Next Decade'}</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight flex items-center gap-2">
                <span>{lang === 'ar' ? 'غرفة العرّاب: تأليف سيناريو وظهور سينمائي ريادي' : 'The Godfather Screenplay Studio & Cameo Co-Author'}</span>
              </h1>
              <p className="text-sm text-amber-100/90 max-w-3xl mt-1.5 leading-relaxed font-sans">
                {lang === 'ar'
                  ? 'بوابة ريادية تفتح آفاق هوليوود للعالم العربي! خدمة تريند إضافية فائقة التميز تدمج اللهجة السورية العفوية لكسر الجدار الرابع، أو العربية الفصحى التاريخية للملاحم، أو التدخل المباشر بقلم العرّاب لإنقاذ النصوص وحل أعقد الحبكات.'
                  : 'A pioneering Hollywood crossover breaking ground for Arab creators globally! A high-demand premium service blending spontaneous Syrian cameos, majestic classical Arabic, and direct script plot-hole salvation.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0 bg-slate-950/90 border border-amber-500/40 p-3 rounded-2xl shadow-xl">
            <div className="text-center px-3 py-1">
              <span className="text-[10px] text-amber-400 block font-semibold uppercase">Global Trend Status</span>
              <span className="text-sm font-black text-white font-mono">Next Decade Viral</span>
            </div>
            <div className="w-px bg-amber-500/30 self-stretch" />
            <div className="text-center px-3 py-1">
              <span className="text-[10px] text-sky-400 block font-semibold uppercase">Cultural Gateway</span>
              <span className="text-sm font-black text-emerald-400 font-mono">Arab Cinema Pioneer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dialect Selector & Interactive Co-Authoring Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Dialect Selection Tabs */}
        <div className="bg-slate-900/90 border border-sky-500/30 rounded-2xl p-5 shadow-xl space-y-4">
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-400" />
            <span>{lang === 'ar' ? 'اختر نمط التدخل واللهجة' : 'Select Takeover Mode & Dialect'}</span>
          </h2>

          <div className="space-y-2.5">
            {/* Syrian Option */}
            <button
              onClick={() => setSelectedDialect('syrian_colloquial')}
              className={`w-full text-start p-3.5 rounded-xl border transition-all cursor-pointer ${
                selectedDialect === 'syrian_colloquial'
                  ? 'bg-sky-500/20 border-sky-400 text-white shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-sky-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-sky-300 flex items-center gap-2">
                  <span>🇸🇾</span>
                  <span>{lang === 'ar' ? 'اللهجة السورية الشامية العفوية' : 'Spontaneous Syrian-Arabic Cameo'}</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/30 text-sky-200 font-mono">VIP Trend</span>
              </div>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                {lang === 'ar' ? 'حوارات طبيعية عفوية تكسر الجدار الرابع بهوليوود مع ترجمة إنجليزية فورية واحترافية.' : 'Spontaneous charisma breaking the 4th wall in modern blockbusters with English subtitles.'}
              </p>
            </button>

            {/* Classical Arabic Option */}
            <button
              onClick={() => setSelectedDialect('classical_arabic')}
              className={`w-full text-start p-3.5 rounded-xl border transition-all cursor-pointer ${
                selectedDialect === 'classical_arabic'
                  ? 'bg-sky-500/20 border-sky-400 text-white shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-sky-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-sky-300 flex items-center gap-2">
                  <span>📜</span>
                  <span>{lang === 'ar' ? 'العربية الفصحى الملحمية والتاريخية' : 'Epic Classical Historical Arabic'}</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-200 font-mono">Grand Cinema</span>
              </div>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                {lang === 'ar' ? 'فصاحة وجزالة بالغة للأفلام التاريخية والفروسية والصراعات الملحمية الكبرى.' : 'Majestic classical dialogue for historical sagas, period dramas, and knight epics.'}
              </p>
            </button>

            {/* Direct Script Completion Option */}
            <button
              onClick={() => setSelectedDialect('direct_author_takeover')}
              className={`w-full text-start p-3.5 rounded-xl border transition-all cursor-pointer ${
                selectedDialect === 'direct_author_takeover'
                  ? 'bg-sky-500/20 border-sky-400 text-white shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-sky-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-sky-300 flex items-center gap-2">
                  <span>✍️</span>
                  <span>{lang === 'ar' ? 'إكمال النص وسد الثغرات بقلم العرّاب' : 'Direct Script Completion & Co-Author'}</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 font-mono">Plot Master</span>
              </div>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                {lang === 'ar' ? 'حل المآزق الدرامية المستعصية، وصناعة نهايات والتفافات بديلة لا تخطر على بال.' : 'Overturn cliché plot holes and co-author breathtaking plot-twists directly.'}
              </p>
            </button>
          </div>
        </div>

        {/* Live Scene Input & AI Script Forge */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-sky-500/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-base font-black text-white flex items-center gap-2 mb-2">
              <PenTool className="w-4 h-4 text-sky-400" />
              <span>{lang === 'ar' ? 'اكتب الموقف أو المشهد الذي تريد من العرّاب إكماله' : 'Input Incomplete Scene or Dramatic Conflict'}</span>
            </h2>
            <p className="text-xs text-slate-400 mb-3">
              {lang === 'ar' 
                ? 'اكتب جملة أو وصف المشهد أو المأزق، واضغط زر التوليد لتشاهد كيف يحولها العرّاب لتحفة سينمائية!' 
                : 'Enter a script excerpt, character dilemma, or plot twist. The Godfather AI engine will forge the completed scene instantly.'}
            </p>

            <textarea
              rows={4}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder={
                selectedDialect === 'syrian_colloquial'
                  ? (lang === 'ar' ? 'مثال: البطل الأمريكي محاصر في ناطحة سحاب ويريد تفجير المبنى، فماذا يقول له العرّاب؟' : 'e.g. The American hero is trapped in a skyscraper and wants to blow it up. How does The Godfather intervene?')
                  : selectedDialect === 'classical_arabic'
                  ? (lang === 'ar' ? 'مثال: قائد الجيش يرى جيش الروم ويخاف من الهزيمة، فماذا يقول له العرّاب ليزرع فيه الثقة والشجاعة؟' : 'e.g. The general fears the enemy armada. What words of valor does The Godfather proclaim?')
                  : (lang === 'ar' ? 'مثال: كيف ننقذ حبكة الفيلم إذا اكتشف الجمهور هوية الشرير في منتصف القصة؟' : 'e.g. How to salvage the plot if the audience discovers the villain in the first act?')
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-sky-400 placeholder:text-slate-600 transition-all font-sans"
            />
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span>{lang === 'ar' ? 'توليد سيناريو معتمد مع التوجيه الإخراجي' : 'Standard Screenplay & Subtitle Format'}</span>
            </div>

            <button
              onClick={handleGenerateCustomTakeover}
              disabled={isGenerating || !customPrompt.trim()}
              className="px-5 py-2.5 bg-gradient-to-r from-sky-600 via-cyan-600 to-sky-600 hover:from-sky-500 hover:to-cyan-500 disabled:opacity-50 text-white rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(2,132,199,0.4)] cursor-pointer"
            >
              {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              <span>{isGenerating ? (lang === 'ar' ? 'جاري الصياغة...' : 'Forging Scene...') : (lang === 'ar' ? 'توليد مشهد العرّاب الآن' : 'Forge Godfather Scene')}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Generated & Pre-Loaded Scenes Gallery */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Film className="w-5 h-5 text-sky-400" />
            <span>{lang === 'ar' ? 'مشاهد ونصوص العرّاب السينمائية الجاهزة' : 'Godfather Cinematic Scene Library'}</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            {allScenes.length} {lang === 'ar' ? 'مشاهد متاحة' : 'Scenes Active'}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {allScenes.map((scene) => (
            <div 
              key={scene.id}
              className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-sky-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all hover:border-sky-400"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {scene.dialect === 'syrian_colloquial' ? '🇸🇾' : scene.dialect === 'classical_arabic' ? '📜' : '✍️'}
                  </span>
                  <div>
                    <h3 className="text-base font-black text-white">{scene.title}</h3>
                    <p className="text-xs text-sky-300/80">{scene.context}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30">
                    {scene.dialect === 'syrian_colloquial' ? (lang === 'ar' ? 'شامي أصيل' : 'Syrian Cameo') : scene.dialect === 'classical_arabic' ? (lang === 'ar' ? 'فصحى ملحمية' : 'Classical Epic') : (lang === 'ar' ? 'إكمال نص' : 'Script Salvage')}
                  </span>

                  <button
                    onClick={() => copyScene(`${scene.title}\n\n${scene.originalSceneEnglish}\n\n${scene.godfatherArabicDialogue}\n\n${scene.hollywoodSubtitlesEnglish}\n\n[DIRECTOR NOTES]: ${scene.cinematicDirection}`, scene.id)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-sky-600 text-slate-300 hover:text-white transition-all cursor-pointer"
                    title={lang === 'ar' ? 'نسخ المشهد كاملاً' : 'Copy Full Scene'}
                  >
                    {copiedId === scene.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Script Blocks */}
              <div className="space-y-4">
                
                {/* Original Hollywood Line */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 text-xs font-mono text-slate-400">
                  <span className="text-slate-500 block text-[10px] uppercase mb-1">Original Hollywood Script Track</span>
                  <p className="text-slate-300">{scene.originalSceneEnglish}</p>
                </div>

                {/* Godfather Arabic Line */}
                <div className="bg-sky-950/40 border border-sky-500/40 rounded-xl p-4 relative shadow-inner">
                  <span className="text-sky-400 block text-[10px] font-black uppercase mb-1">
                    {lang === 'ar' ? '🦅 حوار العرّاب (The Godfather Dialogue)' : '🦅 The Godfather Dialogue Track'}
                  </span>
                  <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                    {scene.godfatherArabicDialogue}
                  </p>
                </div>

                {/* Hollywood English Subtitle */}
                <div className="bg-slate-950 border border-sky-500/20 rounded-xl p-3.5 text-xs text-sky-200 font-sans">
                  <span className="text-sky-400 block text-[10px] font-bold uppercase mb-1">Hollywood Subtitle Dual-Track</span>
                  <p className="italic font-medium">{scene.hollywoodSubtitlesEnglish}</p>
                </div>

                {/* Cinematic Direction & Impact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
                    <span className="text-slate-400 font-bold block mb-1">🎬 {lang === 'ar' ? 'التوجيه الإخراجي والكاميرا' : 'Cinematic Camera Direction'}:</span>
                    <span className="text-slate-300">{scene.cinematicDirection}</span>
                  </div>
                  <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
                    <span className="text-emerald-400 font-bold block mb-1">💥 {lang === 'ar' ? 'الأثر الدرامي وشباك التذاكر' : 'Dramatic & Box-Office Impact'}:</span>
                    <span className="text-slate-300">{scene.dramaticImpact}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
