import React, { useState } from 'react';
import { Lock, KeyRound, ShieldCheck, Eye, Copy, Check, AlertCircle, Sparkles, UserCheck, RefreshCw, Search } from 'lucide-react';
import { WatermarkResult } from '../types';

interface WatermarkStudioProps {
  lang: 'ar' | 'en';
}

export const WatermarkStudio: React.FC<WatermarkStudioProps> = ({ lang }) => {
  const [actorName, setActorName] = useState<string>('Tom Cruise / Ethan Hunt (Principal Lead)');
  const [copyId, setCopyId] = useState<string>('CAST-SEC-9941');
  const [sourceText, setSourceText] = useState<string>(
    `KALE: The biometric locks are encoded with your DNA, Director Vane.\nVANE: In twelve seconds, the purge activates. Thank you for your service.`
  );

  const [watermarkedData, setWatermarkedData] = useState<WatermarkResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Verification / Leak Detector state
  const [investigateText, setInvestigateText] = useState<string>('');
  const [decodedLeakInfo, setDecodedLeakInfo] = useState<any>(null);
  const [decodeError, setDecodeError] = useState<string | null>(null);

  const handleGenerateWatermark = async () => {
    if (!sourceText.trim()) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/cinema/watermark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: sourceText,
          actorName,
          copyId,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setWatermarkedData({
          watermarkId: data.watermarkId,
          watermarkedText: data.watermarkedText,
          visibleBadge: data.visibleBadge,
          actor: actorName,
          copyId,
          timestamp: new Date().toLocaleTimeString(),
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyWatermarked = () => {
    if (!watermarkedData) return;
    navigator.clipboard.writeText(watermarkedData.watermarkedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Client-side Zero-Width Leak Decoder
  const handleDecodeLeak = () => {
    setDecodeError(null);
    setDecodedLeakInfo(null);

    if (!investigateText.trim()) {
      setDecodeError(lang === 'ar' ? 'يرجى لصق النص المشتبه بتسريبه أولاً' : 'Please paste suspected leaked text.');
      return;
    }

    // Extract zero-width characters: \u200B (0) and \u200C (1)
    let binary = '';
    for (let i = 0; i < investigateText.length; i++) {
      const code = investigateText.charCodeAt(i);
      if (code === 0x200b) {
        binary += '0';
      } else if (code === 0x200c) {
        binary += '1';
      }
    }

    if (binary.length < 8) {
      setDecodeError(
        lang === 'ar'
          ? 'لم يتم العثور على أي علامة مائية غير مرئية في هذا النص. قد يكون النص غير مشفر أو تم تعديله بالكامل.'
          : 'No hidden steganographic watermark detected in this text.'
      );
      return;
    }

    try {
      let decodedStr = '';
      for (let i = 0; i < binary.length; i += 8) {
        const byte = binary.slice(i, i + 8);
        if (byte.length === 8) {
          decodedStr += String.fromCharCode(parseInt(byte, 2));
        }
      }

      const parsed = JSON.parse(decodedStr);
      setDecodedLeakInfo(parsed);
    } catch (err) {
      setDecodeError(
        lang === 'ar'
          ? 'تم اكتشاف بقايا علامة مائية ولكنها تالفة جزئياً أو غير مكتملة.'
          : 'Corrupted or partial watermark detected.'
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6" id="watermark-studio">
      
      {/* Banner */}
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 md:p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl border border-rose-500/30 p-1 shadow-lg shadow-rose-500/20 bg-zinc-950 shrink-0 overflow-hidden">
              <img 
                src="/cybernetic_falcon_1787579678283.jpg" 
                alt="Shaheen Logo" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'تقنية التشفير الإخفائي للسيناريوهات (Steganography)' : 'Invisible Script Steganography Engine'}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {lang === 'ar' ? 'حماية السيناريو وتتبع التسريبات بالأحرف غير المرئية' : 'Zero-Width Script Watermarking & Leak Forensic Tracer'}
              </h1>
              <p className="text-sm text-zinc-400 max-w-2xl">
                {lang === 'ar'
                  ? 'حقن علامات مائية مشفرة غير مرئية إطلاقاً داخل نصوص الممثلين. في حال تم تصوير أو تسريب أي صفحة، يستطيع الاستوديو كشف هوية المسرب وتوقيت الاستلام فوراً!'
                  : 'Injects invisible zero-width Unicode steganography into screenplay pages for individual cast members. If leaked, the studio can trace the leak back to the exact recipient and timestamp.'}
              </p>
            </div>
          </div>

          <div className="p-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-center shrink-0">
            <span className="text-[11px] text-zinc-500 block uppercase font-mono">{lang === 'ar' ? 'البصمة الثابتة' : 'Static Signature'}</span>
            <span className="text-xs font-bold text-amber-400 font-mono flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" />
              {lang === 'ar' ? 'العراب (The Godfather)' : 'The Godfather'}
            </span>
            <span className="text-[10px] text-zinc-600 block mt-1">{lang === 'ar' ? '+ حمولة متغيرة (Dynamic)' : '+ Dynamic Payload'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Step 1: Generate Watermark (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
              <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h2 className="font-bold text-sm text-white">
                {lang === 'ar' ? 'تخصيص وتشفير نسخة الممثل / الطاقم' : 'Generate Watermarked Cast Copy'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-rose-400" />
                  <span>{lang === 'ar' ? 'اسم الممثل / المستلم:' : 'Cast / Recipient Name:'}</span>
                </label>
                <input
                  type="text"
                  value={actorName}
                  onChange={(e) => setActorName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500/60 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'ar' ? 'رقم النسخة التكتيكي:' : 'Tactical Copy ID:'}</span>
                </label>
                <input
                  type="text"
                  value={copyId}
                  onChange={(e) => setCopyId(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500/60 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                {lang === 'ar' ? 'نص الحوار أو المشهد المراد تشفيره:' : 'Script Dialogue to Encrypt:'}
              </label>
              <textarea
                rows={5}
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs md:text-sm font-mono text-zinc-200 focus:outline-none focus:border-rose-500/60"
              />
            </div>

            <button
              onClick={handleGenerateWatermark}
              disabled={isGenerating}
              className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs md:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-600/20 cursor-pointer"
            >
              {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
              <span>{lang === 'ar' ? 'توليد النسخة المائية غير المرئية' : 'Inject Invisible Steganography'}</span>
            </button>

            {/* Generated Result Box */}
            {watermarkedData && (
              <div className="rounded-xl bg-zinc-950 border border-rose-500/40 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'تم حقن العلامة المائية بنجاح' : 'Invisible Watermark Injected'}</span>
                  </div>
                  <button
                    onClick={handleCopyWatermarked}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 flex items-center gap-1 transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? (lang === 'ar' ? 'تم النسخ' : 'Copied') : (lang === 'ar' ? 'نسخ للممثل' : 'Copy Script')}</span>
                  </button>
                </div>

                <div className="p-3 bg-zinc-900/90 rounded-lg text-xs font-mono text-zinc-300 border border-zinc-800">
                  <p className="text-[11px] text-rose-400 mb-1 font-bold">{watermarkedData.visibleBadge}</p>
                  <p>{watermarkedData.watermarkedText}</p>
                </div>

                <p className="text-[11px] text-zinc-500">
                  {lang === 'ar'
                    ? 'النص أعلاه يبدو طبيعياً 100% للعين المجردة، لكنه يحتوي على شيفرة غير مرئية مشفرة بـ Zero-Width Spaces تحمل اسم الممثل وتاريخ التسليم.'
                    : 'The script appears 100% identical to normal text, but carries hidden zero-width Unicode characters containing recipient metadata.'}
                </p>
              </div>
            )}

          </div>
        </div>

        {/* Step 2: Leak Investigation & Decoder (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h2 className="font-bold text-sm text-white">
                {lang === 'ar' ? 'كاشف التسريبات والتحقيق الجنائي' : 'Forensic Leak Investigator'}
              </h2>
            </div>

            <p className="text-xs text-zinc-400">
              {lang === 'ar'
                ? 'إذا تم تسريب أي نص على تويتر أو ريديت، الصق النص المسرب هنا وسيقوم النظام فوراً بفك الشيفرة وكشف هوية المسرب ورقم نسخته!'
                : 'If any dialogue or script snippet is leaked online, paste it here to forensically extract the recipient fingerprint.'}
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                {lang === 'ar' ? 'الصق النص المسرب للفحص:' : 'Paste Leaked Script Snippet:'}
              </label>
              <textarea
                rows={5}
                value={investigateText}
                onChange={(e) => setInvestigateText(e.target.value)}
                placeholder={lang === 'ar' ? 'الصق النص الذي نسخته من الخطوة 1 أو من أي موقع مسرب...' : 'Paste text here to decode hidden watermark...'}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs md:text-sm font-mono text-zinc-200 focus:outline-none focus:border-amber-500/60"
              />
            </div>

            <button
              onClick={handleDecodeLeak}
              className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-2.5 px-4 rounded-xl text-xs md:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>{lang === 'ar' ? 'كشف وفك شيفرة النص المسرب' : 'Run Forensic Steganography Scan'}</span>
            </button>

            {/* Decoded Info Result */}
            {decodedLeakInfo && (
              <div className="rounded-xl bg-amber-950/30 border border-amber-500/50 p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'ar' ? 'تم التعرف على صاحب النسخة المسربة!' : 'LEAK TRACED TO REGISTERED ACTOR!'}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                    <span className="text-[10px] text-zinc-500 block">{lang === 'ar' ? 'المستلم المسجل' : 'Registered Actor'}</span>
                    <span className="font-bold text-white text-xs">{decodedLeakInfo.actor}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                    <span className="text-[10px] text-zinc-500 block">{lang === 'ar' ? 'رقم النسخة' : 'Copy ID'}</span>
                    <span className="font-bold text-amber-300 text-xs font-mono">{decodedLeakInfo.id}</span>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400 font-mono">
                  <span>{lang === 'ar' ? 'توقيت الإصدار: ' : 'Timestamp: '}</span>
                  <span className="text-zinc-200">{decodedLeakInfo.time}</span>
                </div>
              </div>
            )}

            {decodeError && (
              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                <span>{decodeError}</span>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
