'use client';
import { useChat } from '@/hooks/useChat';
import { MessageBubble } from '@/components/MessageBubble';
import { ChatInput } from '@/components/ChatInput';
import { ChatHistory } from '@/components/ChatHistory';
import { Bot, Sparkles } from 'lucide-react';

export default function Home() {
  const { sessions, currentSession, currentSessionId, setCurrentSessionId, createNewChat, sendMessage, isLoading, error, deleteSession } = useChat();

  return (
    <div className="flex h-screen bg-white">
      <ChatHistory 
        sessions={sessions} 
        activeId={currentSessionId} 
        onSelect={setCurrentSessionId} 
        onNewChat={createNewChat} 
        onDelete={deleteSession}
      />

      <main className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-14 border-b flex items-center px-6 justify-between">
          <div className="flex items-center gap-2">
            <Bot size={18} className="text-blue-600" />
            <h1 className="text-sm font-bold">{currentSession?.title || 'AI Chat'}</h1>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:px-20 space-y-6">
          {!currentSession || currentSession.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <Sparkles size={40} className="text-blue-100" />
              <h2 className="text-2xl font-bold">How can I help you?</h2>
              <p className="text-gray-400 text-sm">Start a new conversation to get things moving.</p>
              {!currentSession && (
                <button onClick={createNewChat} className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                  Create First Chat
                </button>
              )}
            </div>
          ) : (
            currentSession.messages.map((m) => <MessageBubble key={m.id} message={m} />)
          )}
          {isLoading && <div className="text-blue-600 animate-pulse text-xs">Generating response...</div>}
        </div>

        <div className="p-6 max-w-4xl mx-auto w-full">
          <ChatInput onSend={sendMessage} disabled={isLoading || !currentSessionId} />
        </div>
      </main>
    </div>
  );
}