'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

const TextFormatter = ({ text }: { text: string }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, error } = useChat({
    maxSteps: 3,
    initialMessages: [
      {
        id: '1',
        content: "Hello! I'm your elder care compliance assistant. I can help you understand California's elder care regulations, specifically:\n\n1. Title 22 Residential Care Facilities for the Elderly Regulations\n2. Continuing Care Contract Statutes (Health and Safety Code, Section 1770 et seq.)\n\nHow can I assist you today?",
        role: 'assistant',
      },
    ],
    onError: (error) => {
      console.error('Chat error:', error);
    },
    onFinish: (message) => {
      console.log('Chat finished:', message);
    },
  });

  // Auto-scroll to bottom when new messages arrive
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messages]);

  if (error) {
    console.error('Error in chat:', error);
  }

  return (
    <div className="flex flex-col h-[100dvh] w-full max-w-2xl mx-auto bg-white">
      {/* Header */}
      <div className="flex-none px-4 py-3 border-b bg-white">
        <h1 className="text-lg font-semibold">Elder Care Compliance Knowledge Base</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-6">
          {messages.map(m => (
            <div key={m.id}>
              {!m.content && (
                <div className="text-sm text-gray-500 text-center mb-2">
                  Searching knowledge base...
                </div>
              )}
              {m.content && (
                <div className={`flex ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                  <div 
                    className={`whitespace-pre-wrap max-w-[85%] rounded-lg px-4 py-2 ${
                      m.role === 'assistant' 
                        ? 'bg-gray-100' 
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    <TextFormatter text={m.content} />
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="flex-none p-4 bg-white border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            placeholder="Ask me anything..."
            onChange={handleInputChange}
          />
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </div>

      {/* Error toast */}
      {error && (
        <div className="fixed top-0 left-0 right-0 p-4 bg-red-500 text-white text-center">
          Error: {error.message}
        </div>
      )}
    </div>
  );
}
