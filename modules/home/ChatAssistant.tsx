
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

const ChatAssistant: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { role: 'ai', content: "Hello! I'm Sarah from VBB Support. How can I assist you with our Verified Business Managers today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingContent, loading]);

  const handleOpenChat = () => {
    if (!chatOpen) {
      setIsConnecting(true);
      setChatOpen(true);
      setTimeout(() => setIsConnecting(false), 1500); // Simulated connection delay
    } else {
      setChatOpen(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading || isConnecting) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setLoading(true);
    setStreamingContent('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: "You are 'Sarah', an elite customer support agent for VBB Store (Verified BM Buy). You specialize in helping users find the right Facebook Business Manager (BM 1, 3, 5, 10), WhatsApp APIs, and Reinstated Accounts. You are professional, reassuring, and always guide users to finish their orders on WhatsApp for security. Keep responses concise and formatted for a chat bubble."
        }
      });

      const responseStream = await chat.sendMessageStream({ message: userMsg });
      let fullText = '';
      
      for await (const chunk of responseStream) {
        const textChunk = chunk.text;
        fullText += textChunk;
        setStreamingContent(fullText);
      }

      setMessages(prev => [...prev, { role: 'ai', content: fullText }]);
      setStreamingContent('');
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "Our live system is experiencing high volume. Please tap the WhatsApp icon to speak directly with an agent!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-5">
      {chatOpen && (
        <div className="w-[360px] md:w-[420px] h-[600px] bg-white rounded-[2.5rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.2)] border border-slate-100 flex flex-col overflow-hidden animate-fadeInUp">
          {/* Professional Header */}
          <div className="bg-slate-900 px-8 py-6 text-white relative">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <i className="fas fa-headset text-xl"></i>
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-slate-900 rounded-full"></span>
              </div>
              <div>
                <p className="text-white font-black text-sm tracking-tight">Sarah • Live Support</p>
                <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">VBB Specialist</p>
              </div>
            </div>
            <button 
              onClick={() => setChatOpen(false)} 
              className="absolute top-6 right-6 w-10 h-10 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center text-slate-400 hover:text-white"
            >
              <i className="fas fa-times text-sm"></i>
            </button>
          </div>
          
          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/40 custom-scrollbar" ref={scrollRef}>
            {isConnecting ? (
              <div className="h-full flex flex-col items-center justify-center space-y-4 text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest animate-pulse">Establishing Secure Link...</p>
              </div>
            ) : (
              <>
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeInUp`} style={{ animationDelay: `${i * 50}ms` }}>
                    <div className={`max-w-[85%] p-5 rounded-[2rem] text-[13px] font-medium leading-relaxed ${
                      m.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-100' 
                      : 'bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-sm'
                    }`}>
                      {m.content}
                    </div>
                  </div>
                ))}
                
                {streamingContent && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] p-5 rounded-[2rem] text-[13px] font-medium leading-relaxed bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-sm border-l-4 border-l-blue-500">
                      {streamingContent}
                    </div>
                  </div>
                )}

                {loading && !streamingContent && (
                  <div className="flex gap-2 ml-2">
                    <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-6 bg-white border-t border-slate-50">
            <div className="relative flex items-center gap-3">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={isConnecting ? "Waiting for connection..." : "Type your message..."}
                disabled={loading || isConnecting}
                className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:text-slate-300"
              />
              <button 
                onClick={handleSendMessage}
                disabled={loading || isConnecting || !input.trim()}
                className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-700 transition-all disabled:opacity-30 disabled:grayscale shadow-xl shadow-blue-100 active:scale-95 group"
              >
                <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-paper-plane'} text-lg group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`}></i>
              </button>
            </div>
            <p className="mt-4 text-center text-[10px] text-slate-300 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <i className="fas fa-shield-alt text-emerald-400"></i> End-to-end Encrypted
            </p>
          </div>
        </div>
      )}
      
      <div className="flex gap-4">
        {/* Secondary Action - WhatsApp */}
        <a 
          href="https://wa.me/8801302669333" 
          className="w-16 h-16 bg-white text-emerald-500 border border-slate-100 rounded-3xl flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group relative"
        >
           <i className="fab fa-whatsapp text-3xl"></i>
           <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none shadow-xl">
             WhatsApp Specialist
           </div>
        </a>

        {/* Main Chat Toggle */}
        <button 
          onClick={handleOpenChat}
          className={`w-16 h-16 ${chatOpen ? 'bg-slate-900' : 'bg-blue-600'} text-white rounded-3xl flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 group relative`}
        >
          {chatOpen ? (
            <i className="fas fa-times text-2xl"></i>
          ) : (
            <>
              <i className="fas fa-comment-dots text-2xl"></i>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 border-4 border-gray-50 rounded-full animate-bounce"></span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
