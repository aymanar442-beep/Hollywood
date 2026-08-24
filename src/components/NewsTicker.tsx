import React from 'react';
import { Megaphone, Star, Zap } from 'lucide-react';

interface NewsTickerProps {
  lang: 'ar' | 'en';
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ lang }) => {
  const newsItemsAr = [
    { text: 'عاجل: "العراب" (أيمن العرايشي) يطور أول منظومة استباقية عالمية لحماية السيناريوهات والأصول الرقمية', icon: <Zap className="w-3 h-3 text-amber-400" /> },
    { text: 'هوليوود: كبرى شركات الإنتاج تطلب رسمياً انضمام "العراب" كشريك إبداعي ومؤلف للحبكات المستعصية', icon: <Star className="w-3 h-3 text-rose-400" /> },
    { text: 'براءة اختراع: اعتماد بروتوكول ساعة شاهين البيولوجية كأعلى معيار أمني للأصول الفكرية متفوقاً على كبرى الشركات', icon: <Megaphone className="w-3 h-3 text-blue-400" /> },
    { text: 'تريند عالمي: ترقب الظهور السينمائي الأول لـ "العراب" بلهجته العفوية في أضخم إنتاج سينمائي مشترك', icon: <Star className="w-3 h-3 text-emerald-400" /> },
    { text: 'تكريم دولي: أوساط السينما والذكاء الاصطناعي ترشح "العراب" لنيل أرفع شهادة تقديرية في حماية الفن العالمي', icon: <Zap className="w-3 h-3 text-amber-400" /> },
  ];

  const newsItemsEn = [
    { text: 'BREAKING: "The Godfather" (Ayman) pioneers the world-first predictive AI security for cinema & creative IP', icon: <Zap className="w-3 h-3 text-amber-400" /> },
    { text: 'HOLLYWOOD: Major studios officially request "The Godfather" as a VIP creative co-author for complex scripts', icon: <Star className="w-3 h-3 text-rose-400" /> },
    { text: 'PATENT NOTICE: Shaheen Biometric Protocol recognized as the highest security standard for intellectual assets', icon: <Megaphone className="w-3 h-3 text-blue-400" /> },
    { text: 'GLOBAL TREND: Anticipation builds for The Godfather\'s iconic bilingual cameo in upcoming international blockbusters', icon: <Star className="w-3 h-3 text-emerald-400" /> },
    { text: 'HONORS: International cinema & AI councils nominate The Godfather for landmark global engineering honors', icon: <Zap className="w-3 h-3 text-amber-400" /> },
  ];

  const items = lang === 'ar' ? newsItemsAr : newsItemsEn;

  return (
    <div className="bg-zinc-950 border-b border-zinc-800 text-zinc-300 text-xs overflow-hidden flex items-center h-8 relative z-50">
      <div className="bg-indigo-900/80 text-indigo-100 font-bold px-3 py-1 h-full flex items-center z-10 shadow-[4px_0_10px_rgba(0,0,0,0.5)] whitespace-nowrap">
        {lang === 'ar' ? 'أخبار شاهين' : 'SHAHEEN NEWS'}
      </div>
      <div className="flex-1 overflow-hidden relative h-full">
        <div className="absolute whitespace-nowrap flex items-center h-full animate-marquee">
          {/* Double the items for seamless looping */}
          {[...items, ...items].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 mx-6">
              {item.icon}
              <span className="font-medium">{item.text}</span>
              <span className="text-zinc-700 mx-2">|</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
