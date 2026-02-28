import { Message } from '@/types';

export const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] p-3 rounded-lg ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}>
        <p className="text-sm font-semibold mb-1">{isUser ? 'You' : 'AI Assistant'}</p>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};