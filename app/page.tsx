'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, error } = useChat({
    maxSteps: 3,
    initialMessages: [
      {
        id: 'initial-message',
        role: 'assistant',
        content: `Welcome! I'm your elder care compliance assistant. I have knowledge about continuing care contracts and regulations. You can ask me about:

Continuing Care Contracts:
- Contract requirements and regulations
- Resident rights and protections
- Facility obligations and responsibilities

Feel free to ask me anything about elder care compliance and I'll help you find the relevant information!`
      }
    ],
    onError: (error) => {
      console.error('Chat error:', error);
    },
    onFinish: (message) => {
      console.log('Chat finished:', message);
    },
  });

  if (error) {
    console.error('Error in chat:', error);
  }

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="space-y-4">
        {messages.map(m => (
          <div key={m.id} className="whitespace-pre-wrap">
            <div>
              <div className="font-bold">{m.role}</div>
              <div>
                {m.content?.length > 0 ? (
                  m.content
                ) : (
                  <span className="italic font-light">
                    {'calling tool: ' + m?.toolInvocations?.[0]?.toolName}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="fixed top-0 left-0 w-full p-4 text-center bg-red-500 text-white">
          Error: {error.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Ask me anything..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
