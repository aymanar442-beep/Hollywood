import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, RefreshCw, Copy, Check, Trash2, Download, Settings, Sliders, AlertCircle, Shield, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatWindowProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  onRetryMessage: (id: string) => Promise<void>;
  onClearChat: () => void;
  systemInstruction: string;
  setSystemInstruction: (v: string) => void;
  temperature: number;
  setTemperature: (v: number) => void;
  isStreaming: boolean;
  userMemory: string;
  setUserMemory: (v: string) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onSendMessage,
  onRetryMessage,
  onClearChat,
  systemInstruction,
  setSystemInstruction,
  temperature,
  setTemperature,
  isStreaming,
  userMemory,
  setUserMemory,
}) => {
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    const userText = input.trim();
    setInput('');
    await onSendMessage(userText);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportChat = () => {
    const textData = messages
      .map((m) => `[${new Date(m.timestamp).toLocaleTimeString('ar')}] ${m.role === 'user' ? 'المستخدم' : 'الذكاء الاصطناعي'}:\n${m.content}\n`)
      .join('\n---\n\n');
    const blob = new Blob([textData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `private-chat-log-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col h-[680px] overflow-hidden relative">
      {/* Top Bar / Chat Header */}
      <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-sm">محادثتك الخاصة المشفرة</h3>
              <span className="flex items-center gap-1 text-[10px] font-medium bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                <Shield className="w-3 h-3" /> محلي وآمن
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Gemini 3.6 Flash • بث مباشر بدون انقطاع</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-lg text-slate-600 hover:bg-slate-200/60 transition cursor-pointer ${showSettings ? 'bg-indigo-100 text-indigo-700' : ''}`}
            title="إعدادات المحادثة"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={exportChat}
            disabled={messages.length === 0}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-200/60 disabled:opacity-40 transition cursor-pointer"
            title="تصدير السجل كملف نصي"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={onClearChat}
            disabled={messages.length === 0}
            className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 disabled:opacity-40 transition cursor-pointer"
            title="مسح السجل"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Settings Drawer Overlay */}
      {showSettings && (
        <div className="p-4 bg-indigo-50/80 border-b border-indigo-100 text-xs space-y-3 shrink-0 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="font-bold text-indigo-950 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-indigo-600" />
              تخصيص سلوك النموذج ومعايير التوليد
            </span>
            <button
              onClick={() => setShowSettings(false)}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              إغلاق ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 space-y-1">
              <label className="font-medium text-slate-700 block">تعليمات النظام (System Prompt):</label>
              <input
                type="text"
                value={systemInstruction}
                onChange={(e) => setSystemInstruction(e.target.value)}
                placeholder="أدخل توجيهات المساعد الذكي..."
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="font-medium text-slate-700 block justify-between flex">
                <span>درجة الإبداع (Temperature):</span>
                <span className="font-bold text-indigo-700">{temperature}</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>

          {/* User Memory Input */}
          <div className="space-y-1 pt-2 border-t border-indigo-100/60">
            <label className="font-semibold text-indigo-950 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              ذاكرة المساعد الشخصية (من أنا وماذا يجب أن يتذكر البوت عن تفاصيل حياتي وعملي):
            </label>
            <textarea
              value={userMemory}
              onChange={(e) => setUserMemory(e.target.value)}
              placeholder="مثال: اسمي أيمن، عمري 25 سنة، أعمل كمهندس برمجيات، وأهدافي هي بناء كذا... (كل معلومة تكتبها هنا سيتذكرها البوت تلقائياً في كل مرة تفتح فيها محادثة جديدة ولن تحتاج لتعريف نفسك مجدداً!)"
              rows={3}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
            <div className="p-4 rounded-2xl bg-indigo-50 text-indigo-600 shadow-inner">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>
            <h4 className="font-bold text-slate-800 text-base">مرحباً بك في المحادثة الخاصة الآمنة</h4>
            <p className="text-xs text-slate-500 max-w-md leading-relaxed">
              تم بناء هذه الواجهة بنظام بث SSE المباشر لمنع توقف المحادثات أو ظهور أخطاء التجمد. اكتب رسالتك واختبر سرعة الاستجابة الآن.
            </p>
            <div className="flex flex-wrap gap-2 justify-center pt-2">
              <button
                onClick={() => onSendMessage('مرحباً! كيف أضمن عدم حدوث أخطاء في المحادثات الخاصة؟')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-full text-xs text-slate-700 transition cursor-pointer"
              >
                💬 كيف أضمن عدم حدوث أخطاء؟
              </button>
              <button
                onClick={() => onSendMessage('اشرح لي باختصار كيف تعمل تقنية SSE Streaming')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-full text-xs text-slate-700 transition cursor-pointer"
              >
                ⚡ ما هي تقنية البث المباشر SSE؟
              </button>
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[88%] ${isUser ? 'mr-auto flex-row-reverse' : 'ml-auto'}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                    isUser ? 'bg-slate-800' : 'bg-indigo-600 shadow-sm shadow-indigo-200'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="space-y-1.5">
                  <div className={`flex items-center gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
                    <span className="text-[11px] font-bold text-slate-600">
                      {isUser ? 'أنت' : 'الذكاء الاصطناعي'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(msg.timestamp).toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap relative group ${
                      msg.isError
                        ? 'bg-rose-50 text-rose-900 border border-rose-200 rounded-tr-none'
                        : isUser
                        ? 'bg-slate-900 text-white rounded-tl-none'
                        : 'bg-slate-100/90 text-slate-800 rounded-tr-none border border-slate-200/60'
                    }`}
                  >
                    {msg.isError && (
                      <div className="flex items-center gap-1.5 font-bold text-rose-700 mb-1 text-xs">
                        <AlertCircle className="w-4 h-4" />
                        خطأ في الاستجابة
                      </div>
                    )}

                    {msg.content}

                    {msg.isStreaming && (
                      <span className="inline-block w-2 h-4 bg-indigo-600 animate-pulse ml-1 align-middle" />
                    )}

                    {/* Action buttons inside bubble */}
                    {!msg.isStreaming && (
                      <div className="mt-2 pt-2 border-t border-slate-200/40 flex items-center gap-2 justify-end opacity-80 group-hover:opacity-100 transition">
                        {msg.isError && (
                          <button
                            onClick={() => onRetryMessage(msg.id)}
                            className="flex items-center gap-1 text-[11px] text-rose-700 font-bold hover:underline cursor-pointer"
                          >
                            <RefreshCw className="w-3 h-3" />
                            إعادة المحاولة
                          </button>
                        )}
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className={`flex items-center gap-1 text-[11px] cursor-pointer ${
                            isUser ? 'text-slate-300 hover:text-white' : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-500" />
                              <span className="text-emerald-500 font-bold">تم النسخ</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              نسخ النص
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-3.5 border-t border-slate-100 bg-white shrink-0">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isStreaming}
            placeholder={isStreaming ? 'جاري استقبال الرد المباشر...' : 'اكتب رسالتك الخاصة هنا...'}
            className="w-full pr-4 pl-12 py-3 bg-slate-100/80 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/80 disabled:opacity-60 transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="absolute left-2 p-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg disabled:opacity-40 transition shadow-sm cursor-pointer"
          >
            {isStreaming ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4 rotate-180" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
