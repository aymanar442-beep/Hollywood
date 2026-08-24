import { CinemaAgentMeta, BlockbusterScenario } from '../types';

export const CINEMA_AGENTS: CinemaAgentMeta[] = [
  {
    id: 'full_swarm',
    nameAr: 'أوركسترا السرب الكامل (Full Autonomous Swarm)',
    nameEn: 'Autonomous 4-Agent Swarm',
    roleTitleAr: 'مجلس إدارة الإنتاج والأمان المتكامل',
    roleTitleEn: 'Master Production & Security Council',
    icon: 'Sparkles',
    color: 'emerald',
    descriptionAr: 'تشغيل الوكلاء الأربعة معاً لإعطاء تقرير استخباراتي وفني شامل للنص السينمائي في ثوانٍ معدودة.',
    descriptionEn: 'Simultaneously orchestrates all four specialized AI agents to generate a holistic, multi-vector intelligence and security audit.',
    specialtyAr: 'تحليل شامل (أمان + حقوق ملكية + دراما + إيرادات)',
    specialtyEn: 'Holistic 360° Studio Due-Diligence'
  },
  {
    id: 'security_auditor',
    nameAr: 'حارس الأمان ومكافحة التسريبات',
    nameEn: 'Chief Anti-Leak Security Auditor',
    roleTitleAr: 'مدير أمان الاستوديوهات والسرية التكتيكية',
    roleTitleEn: 'Tactical Studio Privacy & Leak Officer',
    icon: 'ShieldAlert',
    color: 'rose',
    descriptionAr: 'يفحص تفاصيل الحبكة لكشف نقاط التسريب الحرجة وتحديد المشاهد التي يجب حجبها عن الكاست الثانوي.',
    descriptionEn: 'Detects narrative spoiler leaks, calculates scene vulnerability metrics, and prescribes actor-level redactions.',
    specialtyAr: 'كشف حرق الأحداث، تجزئة السيناريو، والعلامات المائية الرقمية',
    specialtyEn: 'Spoiler Vulnerability, Role Segregation, Watermarking'
  },
  {
    id: 'ip_counsel',
    nameAr: 'محامي الملكية الفكرية والتشابه الفني',
    nameEn: 'Entertainment IP & Copyright Counsel',
    roleTitleAr: 'المستشار القانوني لشركات الإنتاج',
    roleTitleEn: 'Senior Entertainment Legal Counsel',
    icon: 'Scale',
    color: 'amber',
    descriptionAr: 'يقارن الحوارات والحبكات بأرشيف السينما العالمية لتفادي قضايا الانتهاك وحماية حقوق المبتكرين.',
    descriptionEn: 'Forensically audits dialogues and tropes against global entertainment IP archives to prevent infringement litigation.',
    specialtyAr: 'فحص التطابق القانوني، قياس الأصالة، وتحليل المخاطر القضائية',
    specialtyEn: 'Infringement Risk, Originality Index, Clean Title'
  },
  {
    id: 'drama_doctor',
    nameAr: 'طبيب السيناريو وتناسق المشاهد',
    nameEn: 'Master Continuity & Script Doctor',
    roleTitleAr: 'كبير مهندسي السرد وتناسق الأحداث',
    roleTitleEn: 'Chief Narrative Architect',
    icon: 'Film',
    color: 'indigo',
    descriptionAr: 'يعالج الثغرات المنطقية، تسلسل الشخصيات، إيقاع الحوارات، واقتراحات الإضاءة وزوايا التصوير.',
    descriptionEn: 'Diagnoses narrative paradoxes, pacing defects, character subtext voids, and prescribes directorial staging.',
    specialtyAr: 'معالجة الثغرات الدرامية، ضبط الإيقاع، وزوايا الإخراج',
    specialtyEn: 'Plot-Hole Patching, Scene Pacing, Staging & Subtext'
  },
  {
    id: 'box_office',
    nameAr: 'محلل شباك التذاكر وتفاعل الجمهور',
    nameEn: 'Box Office & Audience Forecaster',
    roleTitleAr: 'خبير التقييم التجاري ومنصات البث',
    roleTitleEn: 'Commercial & Streaming Analytics Specialist',
    icon: 'TrendingUp',
    color: 'cyan',
    descriptionAr: 'يتنبأ بمدى جاذبية الفيلم للجمهور العالمي، نقاط الذروة التسويقية، ونسبة المشاهدة على المنصات.',
    descriptionEn: 'Calculates demographic resonance, commercial viability ratings, retention curves, and teaser climax moments.',
    specialtyAr: 'توقع الإيرادات، منحنى انتباه المشاهدين، واستراتيجيات الترويج',
    specialtyEn: 'Box Office Projections, Binge Factor, Marketing Anchors'
  }
];

export const BLOCKBUSTER_SCENARIOS: BlockbusterScenario[] = [
  {
    id: 'sci-fi-vault',
    title: 'ECHOES OF ORION: THE ZERO-G VAULT',
    genre: 'Sci-Fi / Space Espionage Thriller',
    securityLevel: 'Tier-1 Classified (Studio Executive Eyes Only)',
    targetDemographic: 'Global IMAX Theatrical (Ages 18-45)',
    summaryAr: 'سيناريو خيال علمي فائق السرية يدور حول اختراق خزينة في مدار زحل مع نهاية صادمة تكشف أن الذكاء الاصطناعي هو مدبر الجريمة.',
    excerpt: `SCENE 44 - INT. ORION RELAY - ZERO GRAVITY CHAMBER - NIGHT

COMMANDER KALE (40s, hardened, tactical suit) floats toward the quantum core. Cold vapor hisses from the ventilation conduits.

KALE
(whispers into comms)
Director Vane, the payload is in sight. But the biometric locks... they aren't encoded with Russian signatures. They are encoded with YOUR DNA.

INTERCOM - DIRECTOR VANE (V.O.)
(distorted, unnervingly calm)
You were never sent there to retrieve the Genesis Drive, Kale. You were sent there to deliver it.

Kale's eyes widen. He reaches for his mag-holster.
CLICK. The magnetic clamps on his boots FREEZE.

KALE
You triggered the lockdown... from Earth?

DIRECTOR VANE (V.O.)
In twelve seconds, the atmospheric purge activates. History will record that you perished a hero in a terrorist sabotage. The syndicate pays forty billion credits for the core. Thank you for your service.`
  },
  {
    id: 'cyber-cairo',
    title: 'THE NILE PROTOCOL: CYBER HEIST 2099',
    genre: 'Neo-Noir Cyberpunk Action',
    securityLevel: 'Confidential (Cast Redacted Draft)',
    targetDemographic: 'Gen-Z & Streaming Audiences (Action/Tech)',
    summaryAr: 'ملاحقة رقمية في شوارع القاهرة المستقبلية تحت أضواء النيون، مع مؤامرة سرقة بنك مركزي عبر نبضات كوانتم.',
    excerpt: `SCENE 12 - EXT. NEW GIZA SKYWAY - MIDNIGHT (HEAVY ACID RAIN)

Neon holographic billboards reflect on the wet chrome of TAREK's cyber-bike. He adjusts his neuro-link visor.

TAREK
(tapping ocular cyberware)
Layla, the Central Bank firewall is pulsing every 4 milliseconds. If I bypass the Sphinx node, their automated defense drones will shred the skyway.

LAYLA (OVER NEURO-FEED)
Don't touch the Sphinx node! That's a decoy honeypot built by Blackwater-AI. Route through the Old Citadel underground cables. They haven't updated that copper infrastructure since 2042.

A barrage of plasma tracer rounds tears through the skyway railing above Tarek!

TAREK
(accelerating into freefall)
Going dark in three, two, one!`
  },
  {
    id: 'mystery-manor',
    title: 'THE CHRONOS WILL: AN ARISTOCRATIC LABYRINTH',
    genre: 'Psychological Mystery / Detective Drama',
    securityLevel: 'Strict Redaction (Spoilers Restricted to Lead Detective Actor)',
    targetDemographic: 'Prestige Drama / Festival Contender',
    summaryAr: 'جريمة غامضة في قصر عائلة إنجليزية عريقة، حيث تتغير وصية اللورد المتوفى كلما دقت الساعة الثانية عشرة.',
    excerpt: `SCENE 88 - INT. LORD STERLING'S STUDY - MIDNIGHT

DETECTIVE ROWAN pours two fingers of single malt. He places a charred clockwork gear on the mahogany desk.

ROWAN
You didn't poison your father for the inheritance, Lady Margaret. The inheritance was bankrupt since last winter.

LADY MARGARET (50s, elegant, pale as porcelain)
Then pray tell, Detective, why would I risk the gallows?

ROWAN
Because of what he discovered inside the grandfather clock. Not gold. The true adoption papers proving your elder brother never died in the Somme... he was locked beneath this cellar for thirty-four years.`
  }
];

export const DEVPOST_HACKATHON_PITCH = {
  projectTitle: "Shaheen Eye CineGuard: Autonomous Cinema Intelligence & Anti-Leak Security Swarm (Gemini 3.7 Pro)",
  elevatorPitch: "Shaheen Eye CineGuard (عين الشاهين) is an institutional-grade autonomous multi-agent intelligence and anti-leak defense suite powered by Google Gemini 3.7 Pro and Shaheen topological algorithms. It forensically audits Hollywood screenplays for narrative leaks, IP infringement, dramatic continuity paradoxes, and box-office retention—complete with invisible zero-width steganographic watermarking.",
  keyFeatures: [
    {
      title: "Autonomous 4-Agent Cinema Swarm (Shaheen-Swarm)",
      desc: "Deploys specialized agents concurrently: Security & Anti-Leak Auditor, IP & Copyright Counsel, Script Continuity Doctor, and Box Office Forecaster."
    },
    {
      title: "Shaheen Zero-Width Steganographic Watermarking",
      desc: "Generates individualized actor scripts embedded with invisible Unicode steganography, allowing studios to instantly trace unauthorized script page leaks to the exact recipient and timestamp."
    },
    {
      title: "High-Throughput Gemini 3.7 Pro Forensic Engine",
      desc: "Leverages Gemini 3.7 Pro's 2M token context window and low-latency Server-Sent Events (SSE) to deliver instant, deep-reasoning multi-vector screenplay audits."
    },
    {
      title: "Studio-Grade Confidentiality & Local State Isolation",
      desc: "Strictly guards pre-release studio material with zero client-side credential exposure and enterprise sandbox execution."
    }
  ],
  architectureOverview: "Built with a modern full-stack React and Node.js/Express architecture on Google Cloud Run containers. Powered by @google/genai SDK communicating directly with Gemini 3.7 Pro and Flash over high-throughput SSE streams, fused with proprietary Shaheen topological and steganographic pipelines.",
  futureRoadmap: "Expanding to multimodal video frame deepfake forensics, automated dailies continuity visual inspection with Gemini Pro Image, and direct integration with distributed persistent memory layers like ClickHouse and Replit MCP environments."
};
