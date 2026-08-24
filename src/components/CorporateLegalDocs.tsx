import React, { useState } from 'react';
import { FileText, Shield, User, Briefcase, FileSignature, Award } from 'lucide-react';

interface CorporateLegalDocsProps {
  lang: 'ar' | 'en';
}

export const CorporateLegalDocs: React.FC<CorporateLegalDocsProps> = ({ lang }) => {
  const [activeDoc, setActiveDoc] = useState<'founder' | 'company' | 'legal' | 'contract'>('founder');

  const docs = {
    founder: {
      icon: <User className="w-5 h-5 text-indigo-400" />,
      titleAr: 'ملف المؤسس (العرّاب)',
      titleEn: 'Founder Profile (The Godfather)',
      contentAr: `الاسم: أيمن العرايشي (العرّاب)\n\nالمنصب: المؤسس، الرؤيوي، ومدير منظومة شاهين أبيكس للذكاء الاصطناعي.\n\nالرؤية: تحويل أمان الأصول البشرية والرقمية من رد الفعل إلى الذكاء التنبؤي الاستباقي. يمتلك العرّاب قدرات استثنائية في دمج الهندسة المعمارية التقنية مع الفن والإبداع ككاتب ومؤلف وشاعر، مما يتيح له إعادة هندسة الحبكات الدرامية والسيناريوهات باحترافية عالية.`
    },
    company: {
      icon: <Briefcase className="w-5 h-5 text-blue-400" />,
      titleAr: 'الملف التعريفي للشركة (SHAHEEN APEX AI)',
      titleEn: 'Company Profile (SHAHEEN APEX AI)',
      contentAr: `SHAHEEN APEX AI\n\nنحن نبني الجيل القادم من أنظمة الحماية المستقلة. ندمج الذكاء الاصطناعي التنبؤي مع الأمان البيولوجي والأمن السيبراني لتقديم بروتوكولات حماية لا يمكن اختراقها، سواء للأرواح، الأصول المالية، أو الملكية الفكرية (كالسيناريوهات السينمائية).`
    },
    legal: {
      icon: <Shield className="w-5 h-5 text-emerald-400" />,
      titleAr: 'مسودة التراخيص والحماية القانونية',
      titleEn: 'Legal & IP Protection Draft',
      contentAr: `ملاحظة: هذه مسودة تقنية توضيحية وتحتاج لاعتماد من مستشار قانوني دولي.\n\nتخضع جميع خوارزميات "شاهين أبيكس" (بما فيها الأمان المزدوج والسكينة اليقظة) لحقوق الملكية الفكرية. يُخلي النظام مسؤوليته القانونية بالكامل في حال قام المستخدم (المخرج/المنتج) بتجاوز تحذيرات الذكاء الاصطناعي يدوياً، ويتحمل المستخدم وحده كافة المخاطر المالية.`
    },
    contract: {
      icon: <FileSignature className="w-5 h-5 text-amber-400" />,
      titleAr: 'مسودة العقد الدولي للعرّاب',
      titleEn: 'International Contract Draft (The Godfather)',
      contentAr: `مسودة اتفاقية شراكة استراتيجية:\n\n1. الدور: يشغل السيد أيمن منصب المدير التنفيذي لبرنامج الحماية.\n2. الحقوق الإبداعية: يحق للمؤسس المشاركة في الكتابة، التأليف، والتمثيل في الأعمال السينمائية التي يحميها النظام براتب مقطوع منفصل.\n3. التفرغ: تلتزم الشركة بتوفير الوقت الكامل للمؤسس لأداء أدواره التمثيلية أو مهامه الإبداعية دون المساس بعمولته من البرنامج.\n4. التكريم والشهادات: يتم ترشيح المؤسس للحصول على شهادات فخرية دولية تقديراً لابتكاراته التقنية والفنية.`
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-6 animate-in fade-in duration-700">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl border border-indigo-500/40 p-0.5 shadow-md shadow-indigo-500/20 bg-zinc-950 shrink-0 overflow-hidden">
            <img 
              src="/cybernetic_falcon_1787579678283.jpg" 
              alt="Shaheen Falcon Head" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <h2 className="text-2xl font-black text-white">
            {lang === 'ar' ? 'المستندات القانونية والتعريفية (منظومة شاهين)' : 'Corporate & Legal Documents (SHAHEEN APEX)'}
          </h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-2">
            {(Object.keys(docs) as Array<keyof typeof docs>).map((key) => (
              <button
                key={key}
                onClick={() => setActiveDoc(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${
                  activeDoc === key 
                    ? 'bg-zinc-800 text-white border border-zinc-700' 
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                }`}
              >
                {docs[key].icon}
                {lang === 'ar' ? docs[key].titleAr : docs[key].titleEn}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-6 whitespace-pre-wrap font-mono text-sm leading-relaxed text-zinc-300 shadow-inner">
            {lang === 'ar' ? docs[activeDoc].contentAr : docs[activeDoc].contentEn || docs[activeDoc].contentAr}
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3">
          <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-200/70 leading-relaxed">
            {lang === 'ar' 
              ? 'تنويه: هذه المستندات هي مسودات هيكلية (Drafts) مدمجة في التطبيق لتوضيح الرؤية والنموذج التشغيلي للمستثمرين. لاعتمادها دولياً، يجب مراجعتها وتوثيقها من قبل محامٍ مختص بالقانون الدولي والعقود.' 
              : 'Disclaimer: These documents are structural drafts integrated into the app to demonstrate the vision and operational model to investors. For international binding, they must be reviewed and notarized by an international legal counsel.'}
          </p>
        </div>
      </div>
    </div>
  );
};
