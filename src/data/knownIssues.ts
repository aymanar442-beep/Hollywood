import { KnownIssue } from '../types';

export const KNOWN_ISSUES: KnownIssue[] = [
  {
    id: 'missing_api_key',
    titleAr: 'مفتاح GEMINI_API_KEY غير معرف أو غير موجود',
    titleEn: 'Missing GEMINI_API_KEY Environment Variable',
    causeAr: 'عندما تحاول المحادثة الاتصال بخوادم الذكاء الاصطناعي دون وجود مفتاح API في متغيرات البيئة، يتوقف الخادم عن الاستجابة فوراً أو يُرجع خطأ 401/403.',
    causeEn: 'Attempting to call AI APIs without a configured API key causes immediate failure or authentication errors.',
    solutionAr: 'افتح إعدادات التطبيق (Settings > Secrets) وأضف المفتاح باسم GEMINI_API_KEY بشكل صحيح.',
    solutionEn: 'Open AI Studio Settings > Secrets and ensure GEMINI_API_KEY is configured.',
    iconName: 'Key',
    badge: 'critical'
  },
  {
    id: 'streaming_timeout',
    titleAr: 'انقطاع الاتصال أو غياب البث المباشر (SSE Timeout)',
    titleEn: 'Connection Timeout Without Streaming',
    causeAr: 'الإجابات الطويلة تتطلب وقتاً للتوليد. إذا لم تكن المحادثة تعتمد على البث التدفقي (Streaming Events)، فإن المتصفح ينتهي وقته (Timeout) فيظن المستخدم أن الشاشة تجمدت.',
    causeEn: 'Long AI responses without event streaming hit browser HTTP timeouts, causing the UI to freeze.',
    solutionAr: 'تم تفعيل تقنية SSE Streaming في تطبيقنا هذا لضمان وصول الكلمات فور توليدها دون أي تجمد.',
    solutionEn: 'This app implements SSE streaming so characters render immediately without freezing.',
    iconName: 'Zap',
    badge: 'network'
  },
  {
    id: 'quota_rate_limit',
    titleAr: 'تجاوز حد الطلبات المسموح به (Rate Limit / Quota Exceeded)',
    titleEn: 'Rate Limit or Quota Exceeded (HTTP 429)',
    causeAr: 'إرسال رسائل متعددة بسرعة كبيرة أو استهلاك الحصة المجانية السريعة للنموذج يؤدي إلى حظر مؤقت من Google Cloud API (رمز 429).',
    causeEn: 'Sending too many messages rapidly exceeds model throughput quotas, returning HTTP 429.',
    solutionAr: 'انتظر من 10 إلى 30 ثانية بين الرسائل، أو استخدم زر إعطاء المهلة التلقائية المتوفر في واجهتنا.',
    solutionEn: 'Wait 10-30 seconds before retrying or use the built-in auto-retry exponential backoff.',
    iconName: 'Clock',
    badge: 'quota'
  },
  {
    id: 'unhandled_frontend_error',
    titleAr: 'أخطاء المعالجة في الواجهة (Unhandled Client Exceptions)',
    titleEn: 'Unhandled Frontend State Exceptions',
    causeAr: 'إذا حدث خطأ بسيط في الاستجابة ولم تتولى الواجهة البرمجية معالجته بأمان، قد تتوقف حالة التطبيق (State) وتظهر الشاشة صامتة أو معلقة.',
    causeEn: 'If a backend error is unhandled on the frontend, React UI state locks up in a loading spinner state.',
    solutionAr: 'تمت معالجة جميع الاستثناءات مع إضافة زر "إعادة المحاولة" (Retry) التلقائي في كل رسالة.',
    solutionEn: 'All exceptions are safely caught with individual retry buttons and status indicators.',
    iconName: 'AlertTriangle',
    badge: 'common'
  },
  {
    id: 'safety_content_block',
    titleAr: 'حجب الأمان والحماية (Safety & Policy Blocks)',
    titleEn: 'Safety Filter & Content Restrictions',
    causeAr: 'إذا احتوت الرسالة على كلمات أو مواضيع تصنفها الخوارزميات كحساسة، يتم حجب التوليد صمتًا دون إكمال النص.',
    causeEn: 'Prompts triggering automated content filters result in silent truncation or block flags.',
    solutionAr: 'يعرض التطبيق الآن إشعاراً صريحاً في حال حُجبت الاستجابة لسبب يتعلق بفلاتر الأمان.',
    solutionEn: 'The app clearly notifies you if a response was blocked by Gemini safety guidelines.',
    iconName: 'ShieldAlert',
    badge: 'common'
  }
];
