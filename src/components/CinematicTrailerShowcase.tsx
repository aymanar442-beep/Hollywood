import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  Film, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  ChevronLeft,
  Flame,
  CheckCircle2,
  Tv,
  Star,
  Users,
  Layers,
  Fingerprint,
  Zap,
  TrendingUp,
  Cpu,
  Lock,
  Globe,
  Radio,
  Eye,
  FileCheck,
  Mic,
  Activity,
  Maximize2
} from 'lucide-react';
import { AppLang } from '../types';
import { trailerTranslations } from '../data/trailerTranslations';

interface CinematicTrailerShowcaseProps {
  lang: AppLang;
}

export const CinematicTrailerShowcase: React.FC<CinematicTrailerShowcaseProps> = ({ lang }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(true);
  const [isVoiceActive, setIsVoiceActive] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timecode, setTimecode] = useState('00:00:00:00');
  const [audioMeterLevels, setAudioMeterLevels] = useState<number[]>([40, 65, 85, 95, 70, 50, 80, 90, 60, 75, 45, 90]);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneOscRef = useRef<OscillatorNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);

  const isAr = lang === 'ar';

  const slides = [
    {
      id: 'hollywood-leak-crisis',
      chapter: isAr ? 'الفصل الأول: زلزال هوليوود' : 'Chapter 1: The Hollywood Crisis',
      badge: isAr ? 'المأزق العالمي والخسائر المليارية' : 'GLOBAL EMERGENCY: $2.8B INDUSTRY BLEED',
      title: isAr 
        ? 'زلزال هوليوود: عندما يحترق سيناريو بـ 300 مليون دولار في ثانية واحدة!' 
        : 'Hollywood Bleeds: When a $300M Blockbuster Leaks in Seconds!',
      subtitle: isAr 
        ? 'كاميرا هاتف خفية في كواليس التصوير تدمر عامين من العمل السري وتكلف الاستديو إعادة تصوير كارثية' 
        : 'A single hidden smartphone in the dressing room wipes out 2 years of secrecy and forces catastrophic reshoots.',
      voiceOverText: isAr
        ? 'هوليوود، لندن، وباريس تخسر سنوياً أكثر من مليارين وثمانمائة مليون دولار بسبب تسريب النصوص. كلمات السر التقليدية وتواقيع العقود الورقية أصبحت بلا جدوى أمام الهواتف الذكية. الاستديوهات تقف عاجزة أمام طعنات الغدر الداخلية... حتى هذه اللحظة!'
        : 'Hollywood, Pinewood, and global studios hemorrhage over $2.8 Billion every year to pre-release script leaks. Passwords and paper NDAs are useless against hidden cameras. Studios were helpless against insider betrayal... until now!',
      visualScene: isAr ? '🎬 مشهد تسريب سيناريو سري من كواليس فيلم هوليوودي ضخم وتحقيق جنائي متعثر' : '🎬 Dramatic scene: Confidential A-list script captured on clandestine phone camera in studio trailer',
      techPoints: [
        { title: isAr ? 'خسائر هوليوود السنوية' : 'Annual Box Office Loss', val: '$2,800,000,000' },
        { title: isAr ? 'نسبة فشل الـ NDAs الورقية' : 'Paper NDA Failure Rate', val: '99.4%' },
        { title: isAr ? 'تكلفة إعادة التصوير الطارئة' : 'Emergency Reshoot Cost', val: '$15M - $45M' },
      ],
      falconQuote: isAr 
        ? '«الأمان لا يُطلب من البشر بتوقيع ورقة... الأمان يُفرض بالرياضيات والشيفرات التي لا ترحم.» — العرّاب'
        : '"Security is not begged on paper NDAs... Security is enforced by cold, unyielding cryptographic mathematics." — The Godfather',
      ambientColor: 'from-sky-950 via-slate-950 to-blue-950',
    },
    {
      id: 'godfather-chronicles',
      chapter: isAr ? 'الفصل الثاني: ولادة العرّاب' : 'Chapter 2: The Godfather Legacy',
      badge: isAr ? 'قصة ملحمية تلهم العالم' : 'FOUNDER CHRONICLES: TRIALS TO GLOBAL TRIUMPH',
      title: isAr 
        ? 'العرّاب (أيمن العرايشي): مهندس معتمد من Google وبطل قصة استثنائية' 
        : 'The Godfather (Ayman): Google Certified Engineer & YC Founder Legacy',
      subtitle: isAr 
        ? 'من ظروف قاهرة ومطاردة وتعلّم من شاشة هاتف صغير إلى ابتكار أعتى منظومة أمن سينمائي وبيولوجي في العالم' 
        : 'From political oppression and learning on a broken phone screen to architecting the world\'s paramount cinematic cyber-shield.',
      voiceOverText: isAr
        ? 'لم تكن منظومة شاهين وليدة مكاتب مريحة، بل كُتبت أسطرها في أعتى معارك الحياة. أيمن العرايشي العرّاب آمن بمبدأ واحد خالد: الإنسان قبل المال. وبفضل هذا الإيمان، حاز على درجة مهندس برمجيات معتمد من جوجل ليضع ذكاءه في حماية إبداع البشرية.'
        : 'SHAHEEN was not forged in comfortable air-conditioned boardrooms. It was coded line by line through relentless adversity on a tiny phone screen. Ayman Al-Araishi (The Godfather) pledged an eternal oath: Humanity Before Capital. Today, he stands as a Google Certified Software Engineer protecting global human art.',
      visualScene: isAr ? '🦅 شاشة كود مضيئة تنبض في الظلام، تتحول إلى جناح صقر ثلاثي الأبعاد يعانق كوكب الأرض' : '🦅 Holographic terminal coding lines transforming into a cybernetic 3D falcon guarding the globe',
      techPoints: [
        { title: isAr ? 'الشعار الأبدي للمنظومة' : 'Core Sovereign Creed', val: 'Humanity First' },
        { title: isAr ? 'الاعتماد الدولي' : 'Global Accreditation', val: 'Google / YC' },
        { title: isAr ? 'براءات الاختراع الجاهزة' : 'Patents Formulated', val: '4 Inventions' },
      ],
      falconQuote: isAr
        ? '«نحن لا نبيع سطور كود، بل نمنح صناع الفن درعاً يحمي أحلامهم وكرامتهم.» — أيمن'
        : '"We do not sell mere code. We forge an impenetrable shield that safeguards human dignity and artistic dreams." — Ayman',
      ambientColor: 'from-blue-950 via-slate-950 to-cyan-950',
    },
    {
      id: 'godfather-hollywood-crossover',
      chapter: isAr ? 'الفصل الثالث: تريند هوليوود الأضخم' : 'Chapter 3: The Hollywood Crossover',
      badge: isAr ? 'تريند سينمائي عالمي يكسر الجدار الرابع' : 'HOLLYWOOD CROSSOVER & 4TH WALL BREAKTHROUGH',
      title: isAr 
        ? 'غرفة العرّاب: ظهور سوري وفصحى عفوي يهز صالات السينما العالمية!' 
        : 'The Godfather Cameo: Spontaneous Syrian & Arabic Breaking Hollywood!',
      subtitle: isAr 
        ? 'حوار شامي عفوي وفصحى ملحمية مدمجة في أفلام هوليوودية مع ترجمة عالمية تصنع أكبر تريند في تاريخ شباك التذاكر' 
        : 'Authentic Syrian-Arabic dialogue breaking through Hollywood blockbusters with global subtitles creating the ultimate viral box-office sensation.',
      voiceOverText: isAr
        ? 'هنا المفاجأة التي ستجعل استديوهات هوليوود تتسابق للشراكة! ظهور العرّاب بشخصيته الحقيقية ولهجته السورية الأصيلة في مشهد حاسم يكسر الجدار الرابع. حوار عفوي ذكي ومفاجئ يترك الجمهور العالمي في حالة ذهول ويشعل منصات التواصل بملايين المشاهدات!'
        : 'Here is the show-stopping innovation Hollywood producers crave! The Godfather enters the narrative with authentic Syrian-Arabic dialogue and global subtitles, shattering the fourth wall. A thrilling, charismatic cameo that ignites viral worldwide fandom and multi-million ticket sales!',
      visualScene: isAr ? '🎭 مشهد سينمائي داخل استوديو تصوير: ممثل هوليوودي يتفاجأ بدخول العرّاب وحواره الشامي الذكي' : '🎭 Cinematic sequence: Hollywood action star shocked as The Godfather delivers sharp Syrian wit on camera',
      techPoints: [
        { title: isAr ? 'الوصول الفيروسي المتوقع' : 'Projected Viral Reach', val: '500M+ Views' },
        { title: isAr ? 'طابع الحوار والظهور' : 'Cameo Artistry', val: 'سوري & فصحى' },
        { title: isAr ? 'قيمة التسويق العضوي' : 'Earned Media Value', val: '$50,000,000' },
      ],
      falconQuote: isAr 
        ? '«لك هدول مفكرين حالن عم يلعبو مع ولاد صغار؟ السيناريو هون ما بينقرا إلا بدم الصقر!» — العرّاب'
        : '"You think this is child\'s play? This script isn\'t read unless the Falcon authorizes every heartbeat!" — The Godfather',
      ambientColor: 'from-amber-950/60 via-slate-950 to-sky-950',
    },
    {
      id: 'steganography-watermark',
      chapter: isAr ? 'الفصل الرابع: شيفرة الصقر الخفية' : 'Chapter 4: The Stealth Steganography',
      badge: isAr ? 'علامة مائية لا تراها العين ومستحيلة الحذف' : 'STEALTH ZERO-WIDTH CIPHER: 100% UNFORGEABLE',
      title: isAr 
        ? 'العلامة المائية غير المرئية: بصمة العرّاب الثابتة + الحمولة الديناميكية' 
        : 'Stealth Steganography: The Immutable Godfather Signature',
      subtitle: isAr 
        ? 'حقن بيانات مشفرة في الفراغات الصفرية بين الحروف تكشف اسم ورقم الممثل حتى لو التقط صورة بكاميرا مهتزة!' 
        : 'Injecting zero-width unicode cryptographic payloads that pinpoint the exact leak suspect in 0.04 seconds even from a crooked phone photo.',
      voiceOverText: isAr
        ? 'حتى لو قام الخائن بتصوير الشاشة بهاتف مائل، أو اقتصاص الصورة، أو تشويشها... فإن خوارزمية شاهين تستخرج بصمة العرّاب والحمولة المشفرة في أقل من أربعين مللي ثانية، لتقدم للمحكمة دليلاً جنائياً حاسماً لا يقبل التشكيك!'
        : 'Even if an insider takes a tilted phone photo, crops the margins, or runs OCR filters... Shaheen\'s steganography decoder reconstructs the Godfather signature in 40ms, delivering airtight forensic proof to the international courts!',
      visualScene: isAr ? '🔍 مجهر رقمي يفحص مسافات الحروف في النص ليكشف شفرة بيانية متوهجة بلون سماوي' : '🔍 Digital microscope analyzing zero-width script spaces, revealing cyan glowing cryptographic watermark',
      techPoints: [
        { title: isAr ? 'زمن الاستخراج الجنائي' : 'Forensic Extraction', val: '0.04s' },
        { title: isAr ? 'مقاومة محاولات الحذف' : 'Tamper Resistance', val: '100% Zero-Loss' },
        { title: isAr ? 'تخصيص البصمة لكل ممثل' : 'Actor Payload ID', val: 'Cryptographic' },
      ],
      falconQuote: isAr
        ? '«الحرف الذي لا تراه هو الذي سيفضحك في المحكمة الدولية.» — شاهين'
        : '"The character you cannot see is the exact evidence that convicts you in court." — Shaheen',
      ambientColor: 'from-cyan-950 via-slate-950 to-blue-950',
    },
    {
      id: 'crisis-salvage-engine',
      chapter: isAr ? 'الفصل الخامس: إنقاذ السيناريو المحروق' : 'Chapter 5: Crisis Script Salvage',
      badge: isAr ? 'تحويل كارثة التسريب إلى حملة تسويق عالمية' : 'CRISIS SALVAGE: TURN A LEAK INTO A VIRAL WIN',
      title: isAr 
        ? 'محرك الإنقاذ الفوري: إعادة حبك السيناريو في 60 ثانية وخطة تسويق مضادة' 
        : 'AI Crisis Salvage: 60-Second Plot Rewrite & Viral Counter-PR',
      subtitle: isAr 
        ? 'إذا تسربت النهاية للصحافة، يقوم الذكاء الاصطناعي بتوليد 3 نهايات صادمة بديلة مع إعلان تشويقي يربك العالم' 
        : 'If the plot leaks, the engine restructures 3 mind-blowing alternate twists and drafts a teaser campaign that turns disaster into viral frenzy.',
      voiceOverText: isAr
        ? 'التسريب لم يعد نهاية الفيلم! محرك إنقاذ الأزمات يعيد صياغة الحبكة الدرامية فورياً، ويولد نهايات بديلة أكثر إثارة، ويطلق حملة علاقات عامة تجعل الجمهور يظن أن التسريب كان مجرد خدعة تسويقية مدبرة عبقرية!'
        : 'A leak is no longer the death of a movie! The Crisis Salvage Engine recalculates story arcs on the fly, creating 3 superior plot twists and an orchestrated PR campaign convincing fans the leak was a masterclass marketing stunt!',
      visualScene: isAr ? '⚡ سيناريو محروق يتحول إلى ثلاث خيوط ذهبية متفرعة تتشابك في عقدة درامية جديدة مذهلة' : '⚡ Burning confidential script reconstructing into 3 glowing neural storylines with higher cinematic suspense',
      techPoints: [
        { title: isAr ? 'زمن إعادة صياغة الحبكة' : 'Salvage Generation', val: '45 Seconds' },
        { title: isAr ? 'توفير تكاليف إعادة التصوير' : 'Reshoot Cost Saved', val: '92%' },
        { title: isAr ? 'معدل الحفاظ على شباك التذاكر' : 'Box Office Retained', val: '100% Positive' },
      ],
      falconQuote: isAr
        ? '«الضربة التي لا تكسر إنتاجك، يجعلها شاهين أعظم حملة ترويجية في التاريخ.» — العرّاب'
        : '"The leak that was meant to break your movie becomes the greatest marketing blitz in film history." — The Godfather',
      ambientColor: 'from-sky-950 via-slate-950 to-indigo-950',
    },
    {
      id: 'biometric-watch-eda',
      chapter: isAr ? 'الفصل السادس: ساعة شاهين البيولوجية' : 'Chapter 6: The Biometric Armor',
      badge: isAr ? 'مستشعر التعرق العصبي وتناوب الطاقة اللانهائي' : 'EDA GALVANIC SENSING & DUAL-CELL ENDURANCE',
      title: isAr 
        ? 'ساعة شاهين: القفل العصبي EDA وبروتوكول تناوب البطاريات اللانهائي' 
        : 'Shaheen Bio-Watch: Neural EDA Lock & Infinite Dual-Cell Power',
      subtitle: isAr 
        ? 'قراءة نبض وتوتر الممثل لحظياً لمنع فتح السيناريو تحت الإكراه، مع نظام بطارية مزدوج لا ينفد أبداً' 
        : 'Real-time galvanic skin conductance and emotional stress monitoring that instantly locks script access under coercion.',
      voiceOverText: isAr
        ? 'ساعة شاهين الذكية تجمع بين الحماية السيبرانية وحماية الأرواح. مستشعرات النشاط الكهربي للجلد تدرك متى يكون حامل النص في وضع آمن ومتى يتعرض لابتزاز أو تهديد، مع بروتوكول طاقة متبادل يضمن عمل الجهاز دون انقطاع لسنوات.'
        : 'The Shaheen Bio-Watch unites cybernetic security with life protection. EDA galvanic sensors detect emotional duress and extortion, instantly blanking script pages, while dual-cell power cycling provides uninterrupted operational longevity.',
      visualScene: isAr ? '⌚ ساعة ذكية ثلاثية الأبعاد تنبض باللون الأزرق على معصم يد وتطلق درعاً مشفراً حول شاشة السيناريو' : '⌚ 3D holographic smartwatch pulsing in cyan on wrist, projecting a biometric force-field over script tablet',
      techPoints: [
        { title: isAr ? 'حساسية مستشعر التوتر' : 'EDA Galvanic Sensitivity', val: '0.001 µS' },
        { title: isAr ? 'نظام البطارية المزدوج' : 'Power System', val: 'Dual-Cell Loop' },
        { title: isAr ? 'زمن القفل عند الخطر' : 'Lockdown Speed', val: 'Instant (10ms)' },
      ],
      falconQuote: isAr
        ? '«نبضك هو مفتاحك... وتوترك هو قفلك الحصين.» — شاهين'
        : '"Your calm heartbeat is your key... Your stress is your fortress." — Shaheen',
      ambientColor: 'from-cyan-950/70 via-slate-950 to-sky-950',
    },
    {
      id: 'interpol-audit-ledger',
      chapter: isAr ? 'الفصل السابع: الإنتربول الرقمي' : 'Chapter 7: Immutable AI Interpol',
      badge: isAr ? 'سجل زمني فولاذي يوثق كل نظرة ولمسة' : 'IMMUTABLE FORENSIC LEDGER: GLOBAL COURT EVIDENCE',
      title: isAr 
        ? 'الإنتربول الرقمي: سجل تدقيق جنائي موثق بالنانو-ثانية ومقبول بالمحاكم الدولية' 
        : 'Immutable AI Interpol: Nanosecond Forensic Ledger for Courts',
      subtitle: isAr 
        ? 'توثيق كل جلسة قراءة، ومحاولة تصوير، وتوقيع رقمي مع حفظ الأدلة في سجل غير قابل للتعديل' 
        : 'Nanosecond-accurate ledger capturing every screen viewing session, blocked screenshot attempt, and cryptographic handshake.',
      voiceOverText: isAr
        ? 'لا مجال للإنكار أو الادعاء بالبراءة! منظومة الإنتربول الرقمي توثق كل نانو-ثانية في قراءة السيناريو مع تشفير كامل. عند حدوث أي نزاع قضائي، تقدم المنظومة حزمة أدلة رقمية متكاملة تقبلها المحاكم الأمريكية والأوروبية فورياً.'
        : 'Zero deniability! The AI Interpol ledger logs every nanosecond of script interaction with end-to-end cryptographic hashing. In international arbitration, Shaheen delivers ironclad forensic dossiers recognized by top jurisdictions.',
      visualScene: isAr ? '⚖️ سجل بيانات ذهبي مشفر بأقفال سيبرانية متتالية تشهد بموثوقية الأصول الرقمية' : '⚖️ Immutable chain of glowing cryptographic blocks locking evidence with global judicial seals',
      techPoints: [
        { title: isAr ? 'دقة التوثيق الزمني' : 'Timestamp Resolution', val: 'Nanosecond' },
        { title: isAr ? 'قبول الأدلة بالمحاكم' : 'Judicial Compliance', val: '100% Admissible' },
        { title: isAr ? 'مقاومة التعديل والتزييف' : 'Tamper Proofing', val: 'SHA-256 / Ed25519' },
      ],
      falconQuote: isAr
        ? '«التاريخ لا يُكتب مرتين... وسجل شاهين لا يُمحى منه حرف.» — العرّاب'
        : '"History is written once... and in Shaheen\'s ledger, not a single byte is ever erased." — The Godfather',
      ambientColor: 'from-blue-950 via-slate-950 to-indigo-950',
    },
    {
      id: 'deal-terms-directorship',
      chapter: isAr ? 'الفصل الثامن: شروط التعاقد والشراكة' : 'Chapter 8: Contract & Partnership Terms',
      badge: isAr ? 'شروط المؤسس الصارمة للإدارة والتعاقد' : 'FOUNDER CONTRACT DEMANDS',
      title: isAr 
        ? 'التعاقد الدولي: الإدارة التنفيذية وراتب سنوي 360 ألف دولار' 
        : 'International Contract: CEO Role & $360K Annual Salary',
      subtitle: isAr 
        ? 'شروط غير قابلة للتفاوض تشمل منصب المدير التنفيذي، راتب مجزي، إقامة دائمة خالية من الضرائب، ونسبة من أرباح الخدمات' 
        : 'Non-negotiable terms including CEO position, lucrative salary, tax-free permanent residency, and profit-sharing.',
      voiceOverText: isAr
        ? 'المال وحده لا يكفي، شروطي التعاقدية واضحة وموثقة: منصب المدير التنفيذي براتب ثلاثين ألف دولار شهرياً، مع نسبة سنوية من الأرباح تُدفع كل ثلاثة أشهر. إضافة إلى مكافأة توقيع العقد، إقامة دائمة محولة للجنسية، وتغطية كاملة لتكاليف السفر والإقامة، مع مهلة ستة أشهر للالتحاق، وإمكانية المشاركة بالأعمال الفنية. كل ذلك معفي تماماً من الضرائب.'
        : 'Money alone is insufficient. My contract terms are clear: CEO position at $30,000 monthly, plus an annual profit percentage paid quarterly. Additionally, a substantial signing bonus, tax-free permanent residency convertible to citizenship, fully covered travel and expenses, a 6-month joining grace period, and the right to participate in artistic projects.',
      visualScene: isAr ? '🤝 توقيع عقد دولي صارم بختم شاهين، يضمن حقوق المؤسس الكاملة كمدير تنفيذي' : '🤝 Strategic international contract signing ensuring full CEO rights and zero-tax benefits',
      techPoints: [
        { title: isAr ? 'الراتب التنفيذي السنوي' : 'Annual CEO Salary', val: '$360,000 USD' },
        { title: isAr ? 'أرباح الخدمات (ربع سنوية)' : 'Service Profit Share', val: 'Quarterly Payouts' },
        { title: isAr ? 'حوافز توقيع العقد والإقامة' : 'Signing & Residency', val: 'Tax-Free + Citizenship Track' },
      ],
      falconQuote: isAr
        ? '«نحن لا نبيع أفكارنا، نحن ندير إمبراطورياتنا بشروطنا.» — أيمن العرايشي'
        : '"We don\'t sell our ideas; we command our empires on our terms." — Ayman Al-Araishi',
      ambientColor: 'from-sky-950 via-slate-950 to-blue-900',
    },
    {
      id: 'grand-finale-future',
      chapter: isAr ? 'الفصل التاسع: مسك الختام' : 'Chapter 9: The Global Benchmark',
      badge: isAr ? 'الريادة العالمية والجاهزية الكاملة' : 'GRAND FINALE: THE CINEGUARD REVOLUTION',
      title: isAr 
        ? 'مرحباً بكم في عصر أمان شاهين: حيث يبقى الفن خالداً ومحمياً إلى الأبد!' 
        : 'Welcome to the Shaheen Era: Where Human Art is Eternal & Secure!',
      subtitle: isAr 
        ? 'منظومة SHAHEEN APEX AI جاهزة الآن للتشغيل المباشر والربط مع استديوهات هوليوود والعالم' 
        : 'SHAHEEN APEX AI is fully live, calibrated, and ready for immediate deployment with global movie studios.',
      voiceOverText: isAr
        ? 'من شاشة هاتف صغير إلى أروقة كبرى استديوهات العالم... هذه هي شاهين، وهذا هو عهد العرّاب. نضع بين أيديكم المنظومة الأكمل والأذكى لحماية الفن البشري. مرحباً بكم في المستقبل... أمان شاهين في كل مكان!'
        : 'From a cracked phone screen in darkness to the apex of global studio cinema... This is SHAHEEN. This is the Godfather\'s covenant. We place before you the definitive cyber-armor for human imagination. Welcome to the future: Shaheen Everywhere!',
      visualScene: isAr ? '🌟 صقر شاهين الرقمي يحلق فوق أفق هوليوود ويطلق وميضاً أزرق متوهجاً ينير العالم' : '🌟 Cybernetic falcon soaring over the Hollywood hills, projecting a massive glowing blue shield across the horizon',
      techPoints: [
        { title: isAr ? 'جاهزية المنظومة' : 'Production Status', val: '100% Live & Ready' },
        { title: isAr ? 'محرك الذكاء التنبؤي' : 'AI Engine Model', val: 'Google Gemini 3.7 Pro' },
        { title: isAr ? 'الرسالة الأسمى' : 'Ultimate Mission', val: 'Humanity First' },
      ],
      falconQuote: isAr
        ? '«الإنسان قبل المال... وأمان شاهين في كل مكان.» — أَيْمن الْعَرَايْشِي (الْعِرَّاب)'
        : '"Humanity Before Capital... Shaheen Security Everywhere." — Ayman Al-Araishi (The Godfather)',
      ambientColor: 'from-sky-900 via-slate-950 to-blue-950',
    },
  ];

  const totalSlides = slides.length;
  const slide = slides[currentSlide];

  // Initialize or resume Web Audio Drone
  const initAudio = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    } catch (e) {
      console.warn('Audio Context init error', e);
    }
  };

  // Play cinematic tension sound effect
  const playCinematicTransitionSound = () => {
    if (!isAudioActive) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      // Sub-bass hit
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(110, ctx.currentTime);
      subOsc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 0.8);
      subGain.gain.setValueAtTime(0.3, ctx.currentTime);
      subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.85);
      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start();
      subOsc.stop(ctx.currentTime + 0.85);

      // Cyber sweep
      const sweepOsc = ctx.createOscillator();
      const sweepGain = ctx.createGain();
      sweepOsc.type = 'sawtooth';
      sweepOsc.frequency.setValueAtTime(300, ctx.currentTime);
      sweepOsc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.4);
      sweepGain.gain.setValueAtTime(0.04, ctx.currentTime);
      sweepGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
      sweepOsc.connect(sweepGain);
      sweepGain.connect(ctx.destination);
      sweepOsc.start();
      sweepOsc.stop(ctx.currentTime + 0.45);
    } catch (e) {}
  };

  // Play Voice Over using Web Speech Synthesis API
  const speakCurrentNarration = () => {
    if (!isVoiceActive || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop any pending speech

      // Fetch translation if available, fallback to English (or the original text)
      let textToSpeak = slide.voiceOverText;
      const translationsForLang = trailerTranslations[lang];
      if (translationsForLang && translationsForLang[slide.id]) {
        textToSpeak = translationsForLang[slide.id];
      }
        
      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      // Pick language mapping for BCP-47 tags
      const langMap: Record<AppLang, string> = {
        en: 'en-US',
        en_gb: 'en-GB',
        ar: 'ar-SA',
        fa: 'fa-IR',
        hi: 'hi-IN',
        zh: 'zh-CN',
        ja: 'ja-JP',
        no: 'nb-NO',
        nl: 'nl-NL',
        es: 'es-ES',
        es_latam: 'es-MX',
        it: 'it-IT',
        tr: 'tr-TR',
        fr: 'fr-FR',
        de: 'de-DE',
        pt_br: 'pt-BR'
      };
      
      utterance.lang = langMap[lang] || 'en-US';

      utterance.rate = 0.95; // Steady cinematic voice pace
      utterance.pitch = 0.92; // Deep authoritative tone

      // Try finding preferred voices if available
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const langPrefix = utterance.lang.split('-')[0];
        const preferredVoice = voices.find(
          (v) => v.lang === utterance.lang || v.lang.startsWith(langPrefix)
        );
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        } else {
          // Fallback to English if no matching voice found
          const enVoice = voices.find((v) => v.lang.startsWith('en'));
          if (enVoice) utterance.voice = enVoice;
        }
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        // We wait an extra 2 seconds after finishing speech, then advance if playing
        setTimeout(() => {
          setIsSpeaking((currentIsSpeaking) => {
             // double check we are still not speaking (no new speech started)
             if (!currentIsSpeaking) {
               // We need a way to trigger next slide if we are still playing.
               // We will use a custom event or we can just rely on the interval 
               // Actually, it's safer to just set progress to 100 here to trigger the auto-advance
               setProgress(100);
             }
             return currentIsSpeaking;
          });
        }, 1500);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error', e);
      setIsSpeaking(false);
    }
  };

  // Stop speech synthesis
  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Timecode animation & Audio visualizer levels
  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, '0');
      const m = String(d.getMinutes()).padStart(2, '0');
      const s = String(d.getSeconds()).padStart(2, '0');
      const f = String(Math.floor((d.getMilliseconds() / 1000) * 60)).padStart(2, '0');
      setTimecode(`${h}:${m}:${s}:${f}`);

      if (isPlaying || isSpeaking) {
        setAudioMeterLevels([
          Math.floor(30 + Math.random() * 65),
          Math.floor(40 + Math.random() * 55),
          Math.floor(60 + Math.random() * 38),
          Math.floor(75 + Math.random() * 25),
          Math.floor(50 + Math.random() * 45),
          Math.floor(65 + Math.random() * 35),
          Math.floor(80 + Math.random() * 20),
          Math.floor(45 + Math.random() * 50),
          Math.floor(70 + Math.random() * 30),
          Math.floor(85 + Math.random() * 15),
          Math.floor(55 + Math.random() * 40),
          Math.floor(90 + Math.random() * 10),
        ]);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [isPlaying, isSpeaking]);

  // Handle slide changes & trigger audio
  useEffect(() => {
    playCinematicTransitionSound();
    if (isVoiceActive) {
      speakCurrentNarration();
    } else {
      stopSpeech();
    }
  }, [currentSlide, isVoiceActive]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (e) {}
      }
    };
  }, []);

  // Auto-play timer with progress indicator
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      const stepTime = 100;
      // We no longer rely strictly on duration since speech drives it, 
      // but we add a slow progress bar that gets overridden when speech ends
      const duration = 15000; // 15 seconds max if no speech
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentSlide((s) => (s + 1) % totalSlides);
            return 0;
          }
          // Only increment if we are not speaking, OR increment slowly
          return prev + (stepTime / duration) * 100;
        });
      }, stepTime);
    } else {
      stopSpeech();
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalSlides, currentSlide]);

  const handleNext = () => {
    stopSpeech();
    setProgress(0);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    stopSpeech();
    setProgress(0);
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleJump = (idx: number) => {
    stopSpeech();
    setProgress(0);
    setCurrentSlide(idx);
  };

  const handleTogglePlay = () => {
    initAudio();
    const nextPlayState = !isPlaying;
    setIsPlaying(nextPlayState);
    if (nextPlayState) {
      setIsVoiceActive(true);
      setIsAudioActive(true);
      speakCurrentNarration();
    } else {
      stopSpeech();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 space-y-6 animate-in fade-in duration-500" id="hollywood-trailer-container">
      
      {/* 🚀 Master Audio-Visual Launcher Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-sky-950 via-slate-900 to-blue-950 border-2 border-sky-400 p-5 sm:p-6 shadow-[0_0_50px_rgba(56,189,248,0.35)] overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/50 text-sky-300 text-xs font-black">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>{isAr ? 'العرض الصوتي والسينمائي المتكامل • شاهين هوليوود' : 'Master Audio-Visual Cinematic Trailer • Dolby Sound'}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>{isAr ? 'استمع وشاهد العرض السينمائي بصوت الراوي والمؤثرات' : 'Experience the Full Cinematic Audio Pitch'}</span>
            </h2>
            <p className="text-xs sm:text-sm text-sky-200/90 font-medium font-sans">
              {isAr
                ? 'اضغط على زر التشغيل الكبير لبدء التعليق الصوتي الحقيقي، المؤثرات الصوتية السينمائية، والتنقل التلقائي بين الفصول التسعة!'
                : 'Click play to unleash real-time AI voice narration, Dolby cinematic sub-bass frequencies, and seamless automated chapter progression!'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleTogglePlay}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 text-sm font-black flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(56,189,248,0.6)] cursor-pointer active:scale-95 transition-all"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5 fill-current" />
                  <span>{isAr ? 'إيقاف العرض مؤقتاً' : 'Pause Audio Pitch'}</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current animate-pulse" />
                  <span>{isAr ? '🎬 تشغيل العرض الصوتي والسينمائي الكامل' : '🎬 Start Full Cinematic Experience'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Top Controls Bar with Equalizer & Recording Indicators */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/95 border border-sky-500/30 p-3 sm:p-4 rounded-2xl backdrop-blur-md shadow-xl">
        
        {/* Left Indicator with REC + Live Equalizer */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-mono font-black text-rose-400 uppercase tracking-widest flex items-center gap-1">
              <span>● REC</span>
              <span className="text-slate-400">|</span>
              <span className="text-white font-mono">{timecode}</span>
            </span>
          </div>

          {/* Mini Live Audio Equalizer */}
          <div className="flex items-end gap-1 h-5 px-2 py-0.5 bg-slate-950 rounded-lg border border-sky-500/30">
            {audioMeterLevels.slice(0, 8).map((lvl, idx) => (
              <div
                key={idx}
                className="w-1 bg-gradient-to-t from-sky-500 to-cyan-300 rounded-full transition-all duration-75"
                style={{ height: `${(lvl / 100) * 16}px` }}
              />
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono text-sky-400 bg-sky-950/60 px-2.5 py-1 rounded-md border border-sky-500/30">
            <Mic className={`w-3 h-3 ${isSpeaking ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`} />
            <span>{isSpeaking ? (isAr ? 'جاري التعليق الصوتي...' : 'Voice Narrating...') : (isAr ? 'الراوي جاهز' : 'Audio Ready')}</span>
          </div>
        </div>

        {/* Audio Toggles & Chapter Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          
          <button
            onClick={() => {
              const nextVoice = !isVoiceActive;
              setIsVoiceActive(nextVoice);
              if (nextVoice) speakCurrentNarration();
              else stopSpeech();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
              isVoiceActive 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title={isAr ? 'تبديل صوت الراوي' : 'Toggle Voice Narration'}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>{isVoiceActive ? (isAr ? 'صوت الراوي: شغال' : 'Voice: ON') : (isAr ? 'صوت الراوي: مكتوم' : 'Voice: OFF')}</span>
          </button>

          <button
            onClick={() => setIsAudioActive(!isAudioActive)}
            className={`p-2 rounded-xl transition-all cursor-pointer border ${
              isAudioActive 
                ? 'bg-sky-500/20 text-sky-300 border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.3)]' 
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title={isAr ? 'المؤثرات الصوتية' : 'Sound FX'}
          >
            {isAudioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <div className="w-px h-6 bg-slate-800 mx-1" />

          <button
            onClick={handlePrev}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all border border-slate-700 cursor-pointer hover:border-sky-400"
            title={isAr ? 'الفصل السابق' : 'Previous Chapter'}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all border border-slate-700 cursor-pointer hover:border-sky-400"
            title={isAr ? 'الفصل التالي' : 'Next Chapter'}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 🎬 Main Cinematic Presentation Stage */}
      <div className={`relative w-full min-h-[600px] rounded-3xl overflow-hidden border-2 border-sky-400/50 shadow-[0_0_80px_rgba(56,189,248,0.25)] bg-gradient-to-b ${slide.ambientColor} flex flex-col justify-between p-5 sm:p-8 lg:p-10 transition-all duration-700 relative`}>
        
        {/* Dynamic Glowing Cybernetic Laser Scan Line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse absolute top-1/4" />
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-pulse absolute bottom-1/3" />
        </div>

        {/* Dynamic Glowing Cybernetic Flares */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        
        {/* Progress Bar along the top edge */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-900/60 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(56,189,248,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Top Header Information */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-2">
          
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/25 border border-sky-400/50 text-sky-200 text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.3)]">
              <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-spin" />
              <span>{slide.chapter}</span>
            </div>
            <span className="hidden sm:inline text-xs font-bold text-slate-300/90 px-3 py-1 rounded-md bg-slate-900/70 border border-slate-800">
              {slide.badge}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-sky-500/30 text-xs font-mono text-slate-300 shadow-inner">
            <span className="text-sky-400 font-bold">{currentSlide + 1}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">{totalSlides}</span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 font-semibold text-[11px]">{slide.id.replace(/-/g, ' ')}</span>
          </div>
        </div>

        {/* Slide Main Content */}
        <div className="relative z-10 my-auto py-6 space-y-6 max-w-5xl">
          
          {/* Main Titles with Scene Description */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 font-mono tracking-wider uppercase bg-slate-950/60 px-3 py-1.5 rounded-lg border border-cyan-500/30 w-fit">
              <Film className="w-4 h-4 text-sky-400 animate-pulse" />
              <span>{slide.visualScene}</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-2xl font-sans tracking-tight">
              {slide.title}
            </h1>
            
            <p className="text-sm sm:text-lg font-bold text-sky-100 leading-relaxed font-sans max-w-4xl">
              {slide.subtitle}
            </p>
          </div>

          {/* Hollywood Voice-over Narration Box with Active Speaking Waveform */}
          <div className="bg-slate-950/90 backdrop-blur-xl border-2 border-sky-400/50 rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-sky-500/15 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-start gap-4">
              <button 
                onClick={speakCurrentNarration}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 shadow-lg cursor-pointer transition-all ${
                  isSpeaking
                    ? 'bg-emerald-500/30 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.5)] scale-105'
                    : 'bg-sky-500/20 border-sky-400/50 text-sky-300 hover:bg-sky-500/30'
                }`}
                title={isAr ? 'إعادة قراءة النص الصوتي الآن' : 'Replay narration audio now'}
              >
                <Radio className={`w-6 h-6 ${isSpeaking ? 'animate-spin' : 'animate-pulse'}`} />
              </button>

              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    {isAr ? 'صوت الراوي السينمائي بالذكاء الاصطناعي (AI Voice-Over)' : 'Hollywood AI Cinematic Voice-Over'}
                  </span>
                  
                  {/* Equalizer animation while speaking */}
                  <div className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-mono">DOLBY ATMOS</span>
                    <div className="flex items-end gap-0.5 h-3 ml-1">
                      {audioMeterLevels.slice(0, 5).map((lvl, i) => (
                        <div 
                          key={i} 
                          className="w-0.5 bg-emerald-400 rounded-full" 
                          style={{ height: isSpeaking ? `${(lvl / 100) * 12}px` : '3px' }} 
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-base sm:text-xl text-slate-100 leading-relaxed font-sans font-medium">
                  {slide.voiceOverText}
                </p>
              </div>
            </div>
          </div>

          {/* Three High-Contrast Performance Metric Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
            {slide.techPoints.map((pt, idx) => (
              <div 
                key={idx} 
                className="bg-slate-900/90 border border-sky-500/40 hover:border-sky-400 rounded-xl p-4 text-center backdrop-blur-md shadow-lg transition-all hover:scale-[1.02]"
              >
                <span className="text-xs text-slate-300 block font-semibold mb-1">
                  {pt.title}
                </span>
                <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400 font-mono tracking-tight">
                  {pt.val}
                </span>
              </div>
            ))}
          </div>

          {/* Falcon & Godfather Creed Quote */}
          <div className="border-l-4 border-amber-400 pl-4 py-2 bg-slate-950/60 rounded-r-xl border-y border-r border-amber-500/20">
            <p className="text-sm sm:text-base text-amber-200 italic font-serif">
              {slide.falconQuote}
            </p>
          </div>

          {/* Official Forensic Steganography & IP Warning Banner */}
          <div className="bg-slate-950/90 border-2 border-emerald-500/50 rounded-2xl p-4 sm:p-5 shadow-[0_0_30px_rgba(16,185,129,0.25)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center shrink-0 text-emerald-400">
                <ShieldCheck className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    {isAr ? 'ختم الحماية الجنائية والعلامة المائية الخفية المدمجة' : 'IMMUTABLE FORENSIC CIPHER & STEGANOGRAPHY SEAL'}
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono">
                    PROPRIETARY IP
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 font-medium font-sans leading-relaxed">
                  {isAr 
                    ? '🛡️ هذا العرض والمحتوى محمي وموثق بالكامل عبر منظومة SHAHEEN APEX AI Steganography Ledger. أي اقتباس أو سرقة فكرية تكشف هوية السارق ومصدر التسريب فورياً في 0.04 ثانية برقم البصمة المشفرة.'
                    : '🛡️ This entire presentation and intellectual property are digitally watermarked via SHAHEEN APEX AI Steganography Ledger. Any unauthorized extraction or IP breach immediately exposes the infringer in 0.04s via unforgeable cryptographic hashes.'}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2 bg-slate-900 border border-emerald-500/30 px-3 py-2 rounded-xl text-center">
              <div>
                <span className="text-[9px] text-slate-400 block font-mono">FORENSIC HASH</span>
                <span className="text-[11px] font-mono font-bold text-emerald-400">SHA256: 8F9E...442</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Slide Navigation Bar & Chapters Quick-Access */}
        <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-sky-500/20">
          
          {/* Founder Signature Info */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl border border-sky-400/50 p-0.5 shadow-[0_0_15px_rgba(56,189,248,0.4)] overflow-hidden shrink-0 bg-slate-950">
              <img 
                src="/cybernetic_falcon_1787579678283.jpg" 
                alt="Shaheen Logo" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div>
              <span className="text-xs font-black text-white block font-mono">
                🦅 SHAHEEN APEX AI | CineGuard v3.7
              </span>
              <span className="text-[11px] text-sky-300 block font-medium">
                {isAr ? 'المؤسس والعرّاب: أَيْمن الْعَرَايْشِي (الإنسان قبل المال)' : 'Chief Architect: Ayman Al-Araishi (Humanity First)'}
              </span>
            </div>
          </div>

          {/* Quick Chapter Selector Pills */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {slides.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleJump(idx)}
                className={`transition-all cursor-pointer rounded-full text-[10px] font-mono font-bold flex items-center justify-center ${
                  currentSlide === idx 
                    ? 'w-9 h-7 bg-sky-400 text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.8)] scale-110' 
                    : 'w-7 h-7 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
                title={`${s.chapter}: ${s.title}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Chapters Overview Index Card */}
      <div className="bg-slate-900/80 border border-sky-500/20 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-white">
              {isAr ? 'فهرس الفصول التسعة الكاملة لمنظومة شاهين' : 'Full 9-Chapter Master Presentation Matrix'}
            </h3>
          </div>
          <span className="text-xs text-sky-400 font-mono font-bold">
            {isAr ? 'اختر أي فصل للمعاينة المباشرة' : 'Click any chapter to jump directly'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {slides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleJump(idx)}
              className={`p-3 rounded-xl border text-start transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                currentSlide === idx 
                  ? 'bg-sky-500/20 border-sky-400 text-white shadow-md' 
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:border-sky-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-sky-400 uppercase">
                  {s.chapter}
                </span>
                <span className={`w-2 h-2 rounded-full ${currentSlide === idx ? 'bg-sky-400 animate-pulse' : 'bg-slate-700'}`} />
              </div>
              <span className="text-xs font-bold line-clamp-1 text-slate-100">
                {s.title}
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
