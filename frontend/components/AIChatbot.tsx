import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import { getChatResponse } from '../services/gemini';

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hello! I'm TechShield AI. How can I help you with your IT needs today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setIsLoading(true);

    try {
      const botResponse = await getChatResponse(userMsg);
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "I'm having trouble connecting to my brain. Please try again or call us!", 
        isBot: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 md:w-96 h-[500px] glass-card rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-cyan-500/30 animate-in fade-in zoom-in duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-cyan-900/50 to-emerald-900/50 flex justify-between items-center border-b border-cyan-500/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">TechShield AI</h3>
                <span className="text-[10px] text-cyan-400 block -mt-1">Always Online</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded transition-colors text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/20">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.isBot 
                    ? 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700' 
                    : 'bg-cyan-600 text-white rounded-tr-none shadow-lg shadow-cyan-900/20'
                }`}>
                  {/* Markdown Wrapper */}
                  <div className="prose prose-invert prose-sm max-w-none break-words">
                    <ReactMarkdown 
                      components={{
                        p: ({children}) => <p className="mb-0 last:mb-0 leading-relaxed">{children}</p>,
                        ul: ({children}) => <ul className="list-disc ml-4 my-2">{children}</ul>,
                        ol: ({children}) => <ol className="list-decimal ml-4 my-2">{children}</ol>,
                        li: ({children}) => <li className="mb-1">{children}</li>,
                        strong: ({children}) => <strong className="font-bold text-cyan-300">{children}</strong>
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-500" />
                  <span className="text-xs text-slate-400">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-cyan-500/20 bg-slate-900/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about our services..."
                className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 disabled:hover:bg-cyan-600 text-white rounded-lg transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-tr from-cyan-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all animate-bounce hover:animate-none"
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </button>
      )}
    </div>
  );
};

export default AIChatbot;