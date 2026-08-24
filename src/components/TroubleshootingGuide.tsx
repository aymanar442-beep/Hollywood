import React, { useState } from 'react';
import { KNOWN_ISSUES } from '../data/knownIssues';
import { Key, Zap, Clock, AlertTriangle, ShieldAlert, ChevronDown, ChevronUp, HelpCircle, CheckCircle2 } from 'lucide-react';

export const TroubleshootingGuide: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('missing_api_key');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Key': return <Key className="w-5 h-5 text-amber-600" />;
      case 'Zap': return <Zap className="w-5 h-5 text-blue-600" />;
      case 'Clock': return <Clock className="w-5 h-5 text-purple-600" />;
      case 'AlertTriangle': return <AlertTriangle className="w-5 h-5 text-rose-600" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-emerald-600" />;
      default: return <HelpCircle className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase">
          <HelpCircle className="w-4 h-4" />
          الدليل الفني الشامل
        </div>
        <h3 className="text-lg font-bold text-slate-900">أبرز 5 أسباب لظهور الأخطاء أو توقف المحادثات الخاصة وكيفية حلها</h3>
        <p className="text-xs text-slate-500">
          انقر على أي سبب للتعرف التفصيلي على المنطق البرمجي والحلول الجذرية المطبقة في هذا التطبيق:
        </p>
      </div>

      <div className="space-y-3">
        {KNOWN_ISSUES.map((issue) => {
          const isExpanded = expandedId === issue.id;
          return (
            <div
              key={issue.id}
              className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                isExpanded ? 'border-indigo-200 bg-indigo-50/20 shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : issue.id)}
                className="w-full p-4 flex items-center justify-between text-right cursor-pointer gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-100/80 shrink-0">
                    {getIcon(issue.iconName)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{issue.titleAr}</h4>
                    <p className="text-xs text-slate-400 dir-ltr text-left font-mono">{issue.titleEn}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    issue.badge === 'critical' ? 'bg-rose-100 text-rose-700' :
                    issue.badge === 'network' ? 'bg-blue-100 text-blue-700' :
                    issue.badge === 'quota' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {issue.badge}
                  </span>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-1 space-y-4 border-t border-slate-100/80 text-xs">
                  <div className="space-y-1.5">
                    <span className="font-bold text-slate-700 block">سبب المشكلة الشائع:</span>
                    <p className="text-slate-600 leading-relaxed bg-white p-3 rounded-lg border border-slate-100">{issue.causeAr}</p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      الحل الهندسي المطبق في هذا التطبيق:
                    </span>
                    <p className="text-slate-700 leading-relaxed bg-emerald-50/60 p-3 rounded-lg border border-emerald-100">{issue.solutionAr}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
