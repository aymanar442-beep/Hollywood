import React, { useState, useEffect } from 'react';
import { BrainCircuit, Fingerprint, Activity, BatteryCharging, ShieldAlert, Sparkles, Globe, Clock, Lock, Cpu, Eye, UserCheck } from 'lucide-react';

interface ShaheenApexCoreProps {
  lang: 'ar' | 'en';
}

export const ShaheenApexCore: React.FC<ShaheenApexCoreProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'watch' | 'interpol' | 'godfather'>('godfather');
  
  // Simulation States for Shaheen Watch
  const [edaLevel, setEdaLevel] = useState<number>(1.2);
  const [activeCell, setActiveCell] = useState<1 | 2>(1);
  const [cell1Charge, setCell1Charge] = useState<number>(100);
  const [cell2Charge, setCell2Charge] = useState<number>(100);

  // Simulate Watch Biometrics & Battery Cycling
  useEffect(() => {
    if (activeTab !== 'watch') return;
    const interval = setInterval(() => {
      // Simulate Nervous System / Sweat (EDA) fluctuations
      setEdaLevel(prev => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(2));
      
      // Simulate Infinite Battery Cycling
      if (activeCell === 1) {
        setCell1Charge(prev => {
          if (prev <= 50) { setActiveCell(2); return prev; }
          return prev - 1;
        });
        setCell2Charge(prev => prev < 100 ? prev + 0.5 : 100);
      } else {
        setCell2Charge(prev => {
          if (prev <= 50) { setActiveCell(1); return prev; }
          return prev - 1;
        });
        setCell1Charge(prev => prev < 100 ? prev + 0.5 : 100);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [activeTab, activeCell]);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 animate-in fade-in duration-700">
      
      {/* Core Header */}
      <div className="bg-gradient-to-r from-zinc-900 via-indigo-950/40 to-zinc-900 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl border-2 border-indigo-500/50 p-1 shadow-lg shadow-indigo-500/20 bg-zinc-950 shrink-0 overflow-hidden">
            <img 
              src="/cybernetic_falcon_1787579678283.jpg" 
              alt="Shaheen Falcon Head" 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <span>{lang === 'ar' ? 'نواة شاهين المركزية (Apex Core)' : 'Shaheen Apex Central Core'}</span>
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              {lang === 'ar' 
                ? 'مركز القيادة المتقدم: يدمج ساعة شاهين البيولوجية، الإنتربول الرقمي، وغرفة العراب الخفي.' 
                : 'Advanced Command Center: Merging Biometric Watch, Digital Interpol, & The Godfather Room.'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-zinc-800">
        <button
          onClick={() => setActiveTab('godfather')}
          className={`flex items-center gap-2 px-4 py-3 rounded-t-lg font-bold text-sm transition-all ${
            activeTab === 'godfather' 
              ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-500' 
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          {lang === 'ar' ? 'غرفة العراب (Premium)' : 'The Godfather Room (Premium)'}
        </button>
        <button
          onClick={() => setActiveTab('watch')}
          className={`flex items-center gap-2 px-4 py-3 rounded-t-lg font-bold text-sm transition-all ${
            activeTab === 'watch' 
              ? 'bg-emerald-500/10 text-emerald-400 border-b-2 border-emerald-500' 
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Activity className="w-4 h-4" />
          {lang === 'ar' ? 'ساعة شاهين (الأمان البيولوجي)' : 'Shaheen Watch (Biometrics)'}
        </button>
        <button
          onClick={() => setActiveTab('interpol')}
          className={`flex items-center gap-2 px-4 py-3 rounded-t-lg font-bold text-sm transition-all ${
            activeTab === 'interpol' 
              ? 'bg-blue-500/10 text-blue-400 border-b-2 border-blue-500' 
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Globe className="w-4 h-4" />
          {lang === 'ar' ? 'الإنتربول الرقمي (AI Interpol)' : 'Digital Interpol'}
        </button>
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        
        {/* 1. The Godfather Room */}
        {activeTab === 'godfather' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-zinc-900 border border-amber-900/50 rounded-xl p-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  {lang === 'ar' ? 'شراكة إبداعية حصرية' : 'Exclusive Creative Partnership'}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {lang === 'ar' ? 'غرفة العراب الخفي (The Hidden Godfather)' : 'The Hidden Godfather Room'}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {lang === 'ar' 
                    ? 'عندما ينهار السيناريو، لا يكتفي "شاهين" بترقيع النص. كخدمة Premium، يتدخل العراب والمؤلف (أيمن) شخصياً بالتعاون مع الذكاء الاصطناعي لابتكار مشاهد درامية وخيالية مذهلة تعيد كتابة التاريخ السينمائي، مقابل نسبة أرباح كشريك إبداعي.'
                    : 'When the script collapses, Shaheen doesn\'t just patch it. As a Premium service, the Godfather (Ayman) steps in with AI to co-write and engineer mind-blowing narrative twists.'}
                </p>
                <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                  <div className="text-xs text-zinc-500 mb-2">{lang === 'ar' ? 'مميزات العضوية:' : 'Premium Perks:'}</div>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    <li className="flex items-center gap-2"><UserCheck className="w-4 h-4 text-amber-500" /> {lang === 'ar' ? 'إعادة هيكلة العقد الدرامية بخبرة مؤلف وشاعر.' : 'Expert narrative restructuring by a master storyteller.'}</li>
                    <li className="flex items-center gap-2"><BrainCircuit className="w-4 h-4 text-amber-500" /> {lang === 'ar' ? 'دمج الذكاء الاصطناعي مع الخيال البشري اللامحدود.' : 'Fusing AI with limitless human imagination.'}</li>
                  </ul>
                </div>
              </div>

              <div className="bg-zinc-900 border border-rose-900/50 rounded-xl p-6 space-y-4 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl" />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold">
                  <Globe className="w-3.5 h-3.5" />
                  {lang === 'ar' ? 'تريند هوليوود القادم' : 'The Next Hollywood Trend'}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {lang === 'ar' ? 'الاندماج السينمائي (هوليوود × العرب)' : 'Cinematic Crossover (Hollywood × Arab)'}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {lang === 'ar' 
                    ? 'كسر الجدار الرابع: إقحام شخصية "العراب" في مشاهد حاسمة في أضخم أفلام هوليوود، يتحدث باللغة العربية (السورية) العفوية وسط الأحداث المعقدة، مع ترجمة للجمهور الغربي. خلق لحظات تريند فكاهية ودرامية لا تُنسى تربط السينما العالمية بالعربية.'
                    : 'Breaking the fourth wall: Injecting "The Godfather" into critical Hollywood scenes, speaking spontaneous Syrian Arabic with English subtitles. Creating massive viral cultural crossovers.'}
                </p>
                <div className="mt-4 p-3 bg-zinc-950 rounded-lg border border-rose-500/20">
                  <div className="text-xs text-rose-400 font-mono mb-1">{lang === 'ar' ? 'سيناريو مقترح (محاكاة):' : 'Proposed Scenario:'}</div>
                  <div className="text-sm text-zinc-300 italic">
                    {lang === 'ar' ? '"البطل الأجنبي يصرخ بخطة معقدة لإنقاذ العالم... الكاميرا تنتقل للعراب ينظر باستغراب ويقول: شو عم يحكي هاد؟"' : '"Hero yells a complex plan... Camera cuts to The Godfather who looks confused in Arabic: What is this guy saying?"'}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. Shaheen Watch (Biometrics) */}
        {activeTab === 'watch' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="bg-zinc-900 border border-emerald-900/50 rounded-xl p-6">
              <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                
                <div className="space-y-4 flex-1">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Fingerprint className="w-6 h-6 text-emerald-400" />
                    {lang === 'ar' ? 'ساعة شاهين: الأمان البيولوجي المفرط' : 'Shaheen Watch: Hyper-Biometric Security'}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {lang === 'ar' 
                      ? 'مستشعرات تتفوق على آبل وتسلا. الساعة تقرأ "الجملة العصبية" ومستويات التعرق (EDA) من الجلد، وليس فقط نبض القلب. إذا حاول الممثل قراءة سيناريو سري وهو متوتر (بسبب وجود شخص غريب أو نية تسريب)، يتم إغلاق النص فوراً.'
                      : 'Sensors outperforming Apple & Tesla. Reading the Nervous System & Electrodermal Activity (EDA), not just pulse. If an actor reads a script while stressed/leaking, the script self-destructs.'}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-center">
                      <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
                        {lang === 'ar' ? 'الجملة العصبية (EDA)' : 'Nervous System (EDA)'}
                      </div>
                      <div className="text-3xl font-mono text-emerald-400 flex justify-center items-end gap-1">
                        {edaLevel} <span className="text-sm text-emerald-700 mb-1">uS</span>
                      </div>
                    </div>
                    <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-center">
                      <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
                        {lang === 'ar' ? 'حالة وصول السيناريو' : 'Script Access'}
                      </div>
                      <div className={`text-sm font-bold mt-3 px-3 py-1.5 rounded-lg inline-flex ${edaLevel > 1.8 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                        {edaLevel > 1.8 
                          ? (lang === 'ar' ? 'توتر عالي - مغلق' : 'High Stress - LOCKED') 
                          : (lang === 'ar' ? 'طبيعي - مسموح' : 'Normal - GRANTED')}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-80 bg-zinc-950 border border-emerald-900/30 rounded-2xl p-6 relative">
                  <div className="text-center mb-6">
                    <BatteryCharging className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    <div className="text-sm font-bold text-white">
                      {lang === 'ar' ? 'بروتوكول الطاقة اللانهائي' : 'Infinite Energy Protocol'}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {lang === 'ar' ? 'تناوب الخلايا الذكي' : 'Smart Cell Cycling'}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className={`p-3 rounded-xl border transition-all ${activeCell === 1 ? 'bg-emerald-900/20 border-emerald-500' : 'bg-zinc-900 border-zinc-800'}`}>
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span className={activeCell === 1 ? 'text-emerald-400' : 'text-zinc-500'}>Cell 1 (Active)</span>
                        <span className="text-white">{cell1Charge.toFixed(1)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${cell1Charge}%` }} />
                      </div>
                    </div>

                    <div className={`p-3 rounded-xl border transition-all ${activeCell === 2 ? 'bg-emerald-900/20 border-emerald-500' : 'bg-zinc-900 border-zinc-800'}`}>
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span className={activeCell === 2 ? 'text-emerald-400' : 'text-zinc-500'}>Cell 2 (Charging/Idle)</span>
                        <span className="text-white">{cell2Charge.toFixed(1)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-zinc-500 transition-all duration-1000" style={{ width: `${cell2Charge}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* 3. AI Interpol */}
        {activeTab === 'interpol' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="bg-zinc-900 border border-blue-900/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <ShieldAlert className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {lang === 'ar' ? 'الإنتربول الرقمي (AI Interpol)' : 'Digital Interpol (Immutable Ledger)'}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {lang === 'ar' 
                      ? 'ذاكرة فولاذية تسجل كل تفصيل (Timestamp) بدقة. لا يمكن لأي عملية احتيال أن تمر دون كشف.' 
                      : 'Iron-clad memory recording every detail. No fraud goes undetected.'}
                  </p>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {[
                  { time: '14:02:11.055', event: 'Actor Tom Cruise accessed Scene 45.', status: 'VERIFIED', bio: 'EDA Normal (1.2uS)' },
                  { time: '15:10:42.991', event: 'Screenshot attempt blocked via OS API.', status: 'VIOLATION', bio: 'N/A' },
                  { time: '16:45:00.120', event: 'Biometric stress spiked. Script auto-locked.', status: 'DEFENDED', bio: 'EDA Spiked (2.1uS)' },
                  { time: '17:01:05.444', event: 'Dynamic Watermark Payload Generated.', status: 'LOGGED', bio: 'N/A' },
                ].map((log, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row gap-3 md:items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-zinc-500">[{log.time}]</span>
                      <span className="text-zinc-300">{log.event}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-zinc-500">Bio: {log.bio}</span>
                      <span className={`font-bold ${log.status === 'VIOLATION' ? 'text-red-400' : log.status === 'DEFENDED' ? 'text-amber-400' : 'text-blue-400'}`}>
                        {log.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
