import React from 'react';
import { DollarSign, TrendingUp, ShieldAlert, BarChart3, Briefcase, FileSignature, Landmark, Percent, Crown, Network, EyeOff } from 'lucide-react';

interface EconomicFeasibilityProps {
  lang: 'ar' | 'en';
}

export const EconomicFeasibility: React.FC<EconomicFeasibilityProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 animate-in fade-in duration-700">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-sky-950 border border-emerald-500/40 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-bold border border-emerald-500/30">
            <TrendingUp className="w-4 h-4" />
            {isAr ? 'الجدوى الاقتصادية ونموذج الربحية' : 'Economic Feasibility & Revenue Model'}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white">
            {isAr ? 'تحويل الخسائر المليارية إلى أرباح استراتيجية' : 'Converting Billion-Dollar Losses to Strategic Profits'}
          </h1>
          <p className="text-slate-300 max-w-3xl text-lg">
            {isAr 
              ? 'كيف تحول منظومة SHAHEEN APEX AI خسائر هوليوود التي تتجاوز 2.8 مليار دولار سنوياً إلى منصة ربحية مستدامة، وتقضي على تكاليف إعادة التصوير الطارئة.'
              : 'How the SHAHEEN APEX AI ecosystem converts Hollywood\'s $2.8B annual leak losses into a sustainable revenue platform, eliminating emergency reshoot costs.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Industry Problem & Savings */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <ShieldAlert className="w-8 h-8 text-rose-500" />
            <h2 className="text-xl font-bold text-white">
              {isAr ? 'حجم المشكلة وقيمة التوفير' : 'Market Problem & Savings Value'}
            </h2>
          </div>
          
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-rose-500" />
              <div>
                <p className="text-white font-bold">{isAr ? 'خسائر هوليوود الحالية:' : 'Current Hollywood Losses:'}</p>
                <p className="text-slate-400 text-sm mt-1">{isAr ? 'تتجاوز 2.8 مليار دولار سنوياً بسبب تسريب السيناريوهات وضعف أدوات الأمان.' : 'Exceeds $2.8B annually due to script leaks and weak security tools.'}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-amber-500" />
              <div>
                <p className="text-white font-bold">{isAr ? 'تكاليف إعادة التصوير (Reshoots):' : 'Emergency Reshoot Costs:'}</p>
                <p className="text-slate-400 text-sm mt-1">{isAr ? 'تكلف الاستديوهات بين 10-25 مليون دولار للفيلم الواحد لتغيير الحبكة بعد تسريبها.' : 'Costs studios $10M-$25M per tentpole film to change the plot after a leak.'}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-emerald-500" />
              <div>
                <p className="text-white font-bold">{isAr ? 'قيمة التوفير عبر شاهين (ROI):' : 'Shaheen ROI & Savings:'}</p>
                <p className="text-slate-400 text-sm mt-1">{isAr ? 'توفير بنسبة 95% من هذه التكاليف. محرك إنقاذ الأزمات يغير النهاية برمجياً أو يحولها لحملة تسويقية بدلاً من إعادة التصوير.' : '95% reduction in these costs. The Crisis Salvage Engine programmatically rewrites endings or flips leaks into marketing campaigns instead of reshooting.'}</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Revenue Model */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <BarChart3 className="w-8 h-8 text-emerald-500" />
            <h2 className="text-xl font-bold text-white">
              {isAr ? 'نموذج الإيرادات وأرباح الشركة' : 'Revenue Model & Company Profits'}
            </h2>
          </div>
          
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="shrink-0 w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">1</span>
              <div>
                <p className="text-white font-bold">{isAr ? 'الترخيص المؤسسي (Enterprise B2B):' : 'Enterprise B2B Licensing:'}</p>
                <p className="text-slate-400 text-sm mt-1">{isAr ? 'اشتراك سنوي للاستديوهات الكبرى (Disney, Warner Bros) يبدأ من 5 مليون دولار للوصول إلى محرك الذكاء وبنية التشفير.' : 'Annual subscription for major studios (e.g. Disney, WB) starting at $5M for access to the AI engine and crypto infrastructure.'}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">2</span>
              <div>
                <p className="text-white font-bold">{isAr ? 'ترخيص الإنتاج الواحد (Per-Production):' : 'Per-Production Licensing:'}</p>
                <p className="text-slate-400 text-sm mt-1">{isAr ? 'تأجير البنية التحتية لكل فيلم أو مسلسل ضخم بتكلفة 250,000 دولار إلى 500,000 دولار للإنتاج.' : 'Infrastructure rental per blockbuster film/series at $250K - $500K per production.'}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">3</span>
              <div>
                <p className="text-white font-bold">{isAr ? 'مبيعات الهاردوير (الساعات الذكية):' : 'Hardware Sales (Bio-Watches):'}</p>
                <p className="text-slate-400 text-sm mt-1">{isAr ? 'تأجير أو بيع ساعات SHAHEEN Bio-Watch للممثلين وطواقم العمل لضمان الأمان البيومتري أثناء قراءة النصوص.' : 'Leasing/selling SHAHEEN Bio-Watches to cast and crew to guarantee biometric security during script reading.'}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Founder Contract Terms */}
      <div className="bg-gradient-to-r from-sky-950/50 to-indigo-950/50 border border-sky-500/30 rounded-2xl p-6 sm:p-8 space-y-8 mt-8">
        <div className="flex items-center gap-4 border-b border-sky-500/30 pb-4">
          <FileSignature className="w-10 h-10 text-sky-400" />
          <div>
            <h2 className="text-2xl font-black text-white">
              {isAr ? 'الشروط التعاقدية الدولية للمؤسس التنفيذي' : 'International Executive Founder Contract'}
            </h2>
            <p className="text-sky-300 text-sm mt-1">
              {isAr ? 'البنود الإلزامية لتأسيس الشراكة الاستراتيجية' : 'Mandatory terms for establishing the strategic partnership'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<div className="bg-slate-900/80 border border-slate-700 p-5 rounded-xl space-y-3">
            <Crown className="w-6 h-6 text-amber-400" />
            <h3 className="text-white font-bold">{isAr ? 'احتكار النسخ وحق فض النزاع' : 'IP Monopoly & Dispute Resolution'}</h3>
            <p className="text-slate-300 text-sm">{isAr ? 'جميع الإصدارات المستقبلية للمنظومة مملوكة للشركة مدى الحياة، إلا إذا حصل خلل يستدعي فض النزاع. فض النزاع والشراكة يتم من قبلي (المؤسس) حصراً وليس من قبل الشركة.' : 'All future project iterations are company-owned for life, unless a breach triggers a dispute. Partnership dissolution can ONLY be initiated by the Founder, never by the company.'}</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-700 p-5 rounded-xl space-y-3">
            <Network className="w-6 h-6 text-indigo-400" />
            <h3 className="text-white font-bold">{isAr ? 'ملكية النسخة السيادية الموسعة' : 'Sovereign Expanded Edition'}</h3>
            <p className="text-slate-300 text-sm">{isAr ? 'يحتفظ المؤسس بحق تطوير نسخة مشابهة وموسعة خارج قطاع (السينما والإذاعة والتلفزيون). هذه النسخة محتكرة للمؤسس (مثلاً للتعاون السيادي مع جهات كـ Google أو الحكومات) ولا حصة للشركة الحالية فيها.' : 'The Founder retains exclusive rights to build an expanded edition outside the (Cinema/TV/Radio) sector. This sovereign edition (e.g. for Google or Government contracts) is 100% founder-owned with zero company equity.'}</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-700 p-5 rounded-xl space-y-3">
            <Briefcase className="w-6 h-6 text-emerald-400" />
            <h3 className="text-white font-bold">{isAr ? 'الإدارة والراتب' : 'Directorship & Salary'}</h3>
            <p className="text-slate-300 text-sm">{isAr ? 'منصب المدير التنفيذي براتب 30,000 دولار شهرياً (360,000 دولار سنوياً)، خالية من الضرائب.' : 'CEO position with a monthly salary of $30,000 ($360,000 annually), tax-free.'}</p>
          </div>
          
<div className="bg-slate-900/80 border border-slate-700 p-5 rounded-xl space-y-3">
            <Crown className="w-6 h-6 text-amber-400" />
            <h3 className="text-white font-bold">{isAr ? 'احتكار النسخ وحق فض النزاع' : 'IP Monopoly & Dispute Resolution'}</h3>
            <p className="text-slate-300 text-sm">{isAr ? 'جميع الإصدارات المستقبلية للمنظومة مملوكة للشركة مدى الحياة، إلا إذا حصل خلل يستدعي فض النزاع. فض النزاع والشراكة يتم من قبلي (المؤسس) حصراً وليس من قبل الشركة.' : 'All future project iterations are company-owned for life, unless a breach triggers a dispute. Partnership dissolution can ONLY be initiated by the Founder, never by the company.'}</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-700 p-5 rounded-xl space-y-3">
            <Network className="w-6 h-6 text-indigo-400" />
            <h3 className="text-white font-bold">{isAr ? 'ملكية النسخة السيادية الموسعة' : 'Sovereign Expanded Edition'}</h3>
            <p className="text-slate-300 text-sm">{isAr ? 'يحتفظ المؤسس بحق تطوير نسخة مشابهة وموسعة خارج قطاع (السينما والإذاعة والتلفزيون). هذه النسخة محتكرة للمؤسس (مثلاً للتعاون السيادي مع جهات كـ Google أو الحكومات) ولا حصة للشركة الحالية فيها.' : 'The Founder retains exclusive rights to build an expanded edition outside the (Cinema/TV/Radio) sector. This sovereign edition (e.g. for Google or Government contracts) is 100% founder-owned with zero company equity.'}</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-700 p-5 rounded-xl space-y-3">
            <Percent className="w-6 h-6 text-sky-400" />
            <h3 className="text-white font-bold">{isAr ? 'نسبة الأرباح' : 'Profit Sharing'}</h3>
            <p className="text-slate-300 text-sm">{isAr ? 'نسبة مئوية سنوية من صافي أرباح الشركة وجميع الطلبات، تقسم وتُدفع على 4 دفعات (كل 3 شهور).' : 'Annual percentage of net profits and all services, divided and paid quarterly (every 3 months).'}</p>
          </div>

<div className="bg-slate-900/80 border border-slate-700 p-5 rounded-xl space-y-3">
            <Crown className="w-6 h-6 text-amber-400" />
            <h3 className="text-white font-bold">{isAr ? 'احتكار النسخ وحق فض النزاع' : 'IP Monopoly & Dispute Resolution'}</h3>
            <p className="text-slate-300 text-sm">{isAr ? 'جميع الإصدارات المستقبلية للمنظومة مملوكة للشركة مدى الحياة، إلا إذا حصل خلل يستدعي فض النزاع. فض النزاع والشراكة يتم من قبلي (المؤسس) حصراً وليس من قبل الشركة.' : 'All future project iterations are company-owned for life, unless a breach triggers a dispute. Partnership dissolution can ONLY be initiated by the Founder, never by the company.'}</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-700 p-5 rounded-xl space-y-3">
            <Network className="w-6 h-6 text-indigo-400" />
            <h3 className="text-white font-bold">{isAr ? 'ملكية النسخة السيادية الموسعة' : 'Sovereign Expanded Edition'}</h3>
            <p className="text-slate-300 text-sm">{isAr ? 'يحتفظ المؤسس بحق تطوير نسخة مشابهة وموسعة خارج قطاع (السينما والإذاعة والتلفزيون). هذه النسخة محتكرة للمؤسس (مثلاً للتعاون السيادي مع جهات كـ Google أو الحكومات) ولا حصة للشركة الحالية فيها.' : 'The Founder retains exclusive rights to build an expanded edition outside the (Cinema/TV/Radio) sector. This sovereign edition (e.g. for Google or Government contracts) is 100% founder-owned with zero company equity.'}</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-700 p-5 rounded-xl space-y-3">
            <DollarSign className="w-6 h-6 text-amber-400" />
            <h3 className="text-white font-bold">{isAr ? 'مكافأة التوقيع' : 'Signing Bonus'}</h3>
            <p className="text-slate-300 text-sm">{isAr ? 'مبلغ محترم كحلوان توقيع العقد، لتهيئة الأوراق الرسمية والتجهيز للسفر قبل المباشرة بالعمل.' : 'A substantial signing bonus to prepare official documents and arrange travel before commencing work.'}</p>
          </div>

<div className="bg-slate-900/80 border border-slate-700 p-5 rounded-xl space-y-3">
            <Crown className="w-6 h-6 text-amber-400" />
            <h3 className="text-white font-bold">{isAr ? 'احتكار النسخ وحق فض النزاع' : 'IP Monopoly & Dispute Resolution'}</h3>
            <p className="text-slate-300 text-sm">{isAr ? 'جميع الإصدارات المستقبلية للمنظومة مملوكة للشركة مدى الحياة، إلا إذا حصل خلل يستدعي فض النزاع. فض النزاع والشراكة يتم من قبلي (المؤسس) حصراً وليس من قبل الشركة.' : 'All future project iterations are company-owned for life, unless a breach triggers a dispute. Partnership dissolution can ONLY be initiated by the Founder, never by the company.'}</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-700 p-5 rounded-xl space-y-3">
            <Network className="w-6 h-6 text-indigo-400" />
            <h3 className="text-white font-bold">{isAr ? 'ملكية النسخة السيادية الموسعة' : 'Sovereign Expanded Edition'}</h3>
            <p className="text-slate-300 text-sm">{isAr ? 'يحتفظ المؤسس بحق تطوير نسخة مشابهة وموسعة خارج قطاع (السينما والإذاعة والتلفزيون). هذه النسخة محتكرة للمؤسس (مثلاً للتعاون السيادي مع جهات كـ Google أو الحكومات) ولا حصة للشركة الحالية فيها.' : 'The Founder retains exclusive rights to build an expanded edition outside the (Cinema/TV/Radio) sector. This sovereign edition (e.g. for Google or Government contracts) is 100% founder-owned with zero company equity.'}</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-700 p-5 rounded-xl space-y-3">
            <Landmark className="w-6 h-6 text-purple-400" />
            <h3 className="text-white font-bold">{isAr ? 'الإقامة والجنسية' : 'Residency & Citizenship'}</h3>
            <p className="text-slate-300 text-sm">{isAr ? 'إقامة دائمة في مكان العمل قابلة للتحويل لاحقاً إلى جنسية، مع كافة الأوراق وحرية التنقل العالمي.' : 'Permanent residency in the jurisdiction of work, convertible to citizenship, with global travel facilitation.'}</p>
          </div>

<div className="bg-slate-900/80 border border-slate-700 p-5 rounded-xl space-y-3">
            <Crown className="w-6 h-6 text-amber-400" />
            <h3 className="text-white font-bold">{isAr ? 'احتكار النسخ وحق فض النزاع' : 'IP Monopoly & Dispute Resolution'}</h3>
            <p className="text-slate-300 text-sm">{isAr ? 'جميع الإصدارات المستقبلية للمنظومة مملوكة للشركة مدى الحياة، إلا إذا حصل خلل يستدعي فض النزاع. فض النزاع والشراكة يتم من قبلي (المؤسس) حصراً وليس من قبل الشركة.' : 'All future project iterations are company-owned for life, unless a breach triggers a dispute. Partnership dissolution can ONLY be initiated by the Founder, never by the company.'}</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-700 p-5 rounded-xl space-y-3">
            <Network className="w-6 h-6 text-indigo-400" />
            <h3 className="text-white font-bold">{isAr ? 'ملكية النسخة السيادية الموسعة' : 'Sovereign Expanded Edition'}</h3>
            <p className="text-slate-300 text-sm">{isAr ? 'يحتفظ المؤسس بحق تطوير نسخة مشابهة وموسعة خارج قطاع (السينما والإذاعة والتلفزيون). هذه النسخة محتكرة للمؤسس (مثلاً للتعاون السيادي مع جهات كـ Google أو الحكومات) ولا حصة للشركة الحالية فيها.' : 'The Founder retains exclusive rights to build an expanded edition outside the (Cinema/TV/Radio) sector. This sovereign edition (e.g. for Google or Government contracts) is 100% founder-owned with zero company equity.'}</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-700 p-5 rounded-xl space-y-3">
            <TrendingUp className="w-6 h-6 text-rose-400" />
            <h3 className="text-white font-bold">{isAr ? 'تغطية النفقات الإجمالية' : 'Total Expense Coverage'}</h3>
            <p className="text-slate-300 text-sm">{isAr ? 'السفر، الإقامة، والفواتير بالكامل مدفوعة من الشركة، وجميع الدخول معفاة تماماً من الضرائب.' : 'Travel, accommodation, and all bills are fully covered by the company, completely tax-free.'}</p>
          </div>

<div className="bg-slate-900/80 border border-slate-700 p-5 rounded-xl space-y-3">
            <Crown className="w-6 h-6 text-amber-400" />
            <h3 className="text-white font-bold">{isAr ? 'احتكار النسخ وحق فض النزاع' : 'IP Monopoly & Dispute Resolution'}</h3>
            <p className="text-slate-300 text-sm">{isAr ? 'جميع الإصدارات المستقبلية للمنظومة مملوكة للشركة مدى الحياة، إلا إذا حصل خلل يستدعي فض النزاع. فض النزاع والشراكة يتم من قبلي (المؤسس) حصراً وليس من قبل الشركة.' : 'All future project iterations are company-owned for life, unless a breach triggers a dispute. Partnership dissolution can ONLY be initiated by the Founder, never by the company.'}</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-700 p-5 rounded-xl space-y-3">
            <Network className="w-6 h-6 text-indigo-400" />
            <h3 className="text-white font-bold">{isAr ? 'ملكية النسخة السيادية الموسعة' : 'Sovereign Expanded Edition'}</h3>
            <p className="text-slate-300 text-sm">{isAr ? 'يحتفظ المؤسس بحق تطوير نسخة مشابهة وموسعة خارج قطاع (السينما والإذاعة والتلفزيون). هذه النسخة محتكرة للمؤسس (مثلاً للتعاون السيادي مع جهات كـ Google أو الحكومات) ولا حصة للشركة الحالية فيها.' : 'The Founder retains exclusive rights to build an expanded edition outside the (Cinema/TV/Radio) sector. This sovereign edition (e.g. for Google or Government contracts) is 100% founder-owned with zero company equity.'}</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-700 p-5 rounded-xl space-y-3">
            <ShieldAlert className="w-6 h-6 text-teal-400" />
            <h3 className="text-white font-bold">{isAr ? 'المرونة الفنية' : 'Artistic Flexibility'}</h3>
            <p className="text-slate-300 text-sm">{isAr ? 'أي أدوار خارجية (كتابة أو تمثيل) مستقلة تماماً ولا حصة للشركة فيها. مهلة 6 شهور قبل الالتحاق، وحرية التفرغ للأعمال الفنية..' : 'Any external roles (acting, writing) are entirely independent with zero company equity. 6-month joining grace period, and full freedom to participate in artistic projects..'}</p>
          </div>
        </div>
      </div>

    </div>
  );
};
