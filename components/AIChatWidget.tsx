'use client';

import { useState, useRef, useEffect } from 'react';
import { AIChatMessage } from '@/types/ai';

interface AIChatWidgetProps {
  userId: string;
  isVIP: boolean;
  onUpgradeClick?: () => void;
}

export default function AIChatWidget({ userId, isVIP, onUpgradeClick }: AIChatWidgetProps) {
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remainingMessages, setRemainingMessages] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: AIChatMessage = {
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          userId,
          conversationHistory: messages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const assistantMessage: AIChatMessage = {
        role: 'assistant',
        content: data.response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setRemainingMessages(data.remainingToday);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isVIP) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center space-y-4">
          <div className="text-4xl">🤖</div>
          <h3 className="text-lg font-semibold text-gray-900">AI Chat Assistant</h3>
          <p className="text-gray-600 text-sm">
            AI Chat, futbol maçları hakkında sorularınızı cevaplayabilir, analiz yapabilir ve tahmin önerileri sunabilir.
          </p>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <div className="text-sm font-semibold text-purple-900 mb-2">🌟 VIP Özelliği</div>
            <p className="text-xs text-purple-700">
              AI Chat Assistant sadece VIP üyeler için kullanılabilir.
              Günde 100 mesaj hakkınız olacak!
            </p>
          </div>
          {onUpgradeClick && (
            <button
              onClick={onUpgradeClick}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              VIP Üye Ol
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col h-[600px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <div>
              <h3 className="font-semibold">AI Chat Assistant</h3>
              <p className="text-xs text-blue-100">Futbol tahmin uzmanınız</p>
            </div>
          </div>
          {remainingMessages !== null && (
            <div className="text-xs bg-white/20 px-2 py-1 rounded">
              Kalan: {remainingMessages}/100
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 text-sm mt-8">
            <p className="mb-4">Merhaba! 👋</p>
            <p className="mb-2">Size nasıl yardımcı olabilirim?</p>
            <div className="text-xs text-gray-400 mt-4 space-y-1">
              <p>• &quot;Bugün hangi maçlara bakmalıyım?&quot;</p>
              <p>• &quot;Real Madrid - Barcelona maçını analiz eder misin?&quot;</p>
              <p>• &quot;Hangi liglerde maç var?&quot;</p>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}

        {loading && (
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm">
              AI
            </div>
            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            ❌ {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="AI'ya soru sor..."
            disabled={loading}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || loading}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all"
          >
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ message }: { message: AIChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 ${
          isUser ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-blue-600 to-indigo-600'
        }`}
      >
        {isUser ? 'U' : 'AI'}
      </div>
      <div
        className={`rounded-lg p-3 max-w-[80%] ${
          isUser ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-gray-900' : 'bg-gray-100 text-gray-900'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
