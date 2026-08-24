export type AppLang = 
  | 'en' 
  | 'en_gb'
  | 'ar' 
  | 'fa'
  | 'hi'
  | 'zh'
  | 'ja'
  | 'no'
  | 'nl'
  | 'es'
  | 'es_latam'
  | 'it'
  | 'tr'
  | 'fr'
  | 'de'
  | 'pt_br';

export type AgentRole = 'full_swarm' | 'security_auditor' | 'ip_counsel' | 'drama_doctor' | 'box_office';

export type DialectMode = 'syrian_colloquial' | 'classical_arabic' | 'direct_author_takeover';

export interface GodfatherSceneTakeover {
  id: string;
  title: string;
  dialect: DialectMode;
  context: string;
  originalSceneEnglish: string;
  godfatherArabicDialogue: string;
  hollywoodSubtitlesEnglish: string;
  cinematicDirection: string;
  dramaticImpact: string;
}

export interface CinemaAgentMeta {
  id: AgentRole;
  nameAr: string;
  nameEn: string;
  roleTitleAr: string;
  roleTitleEn: string;
  icon: string;
  color: string;
  descriptionAr: string;
  descriptionEn: string;
  specialtyAr: string;
  specialtyEn: string;
}

export interface BlockbusterScenario {
  id: string;
  title: string;
  genre: string;
  securityLevel: string;
  targetDemographic: string;
  excerpt: string;
  summaryAr: string;
}

export interface WatermarkResult {
  watermarkId: string;
  watermarkedText: string;
  visibleBadge: string;
  actor: string;
  copyId: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  isError?: boolean;
  errorType?: string;
  isStreaming?: boolean;
}

export interface DiagnosticResult {
  success: boolean;
  hasApiKey: boolean;
  latencyMs?: number;
  errorType?: string;
  message: string;
  advice?: string;
  rawError?: string;
}

export interface KnownIssue {
  id: string;
  titleAr: string;
  titleEn: string;
  causeAr: string;
  causeEn: string;
  solutionAr: string;
  solutionEn: string;
  iconName: string;
  badge: 'common' | 'critical' | 'network' | 'quota';
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: number;
  messages: ChatMessage[];
  systemInstruction?: string;
  temperature?: number;
}

