import { useState } from 'react';

export const ChatInput = ({ onSend, disabled }: { onSend: (val: string) => void, disabled: boolean }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your prompt..."
        className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={disabled}
      />
      <button 
        type="submit" 
        disabled={disabled || !input.trim()}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {disabled ? 'Thinking...' : 'Send'}
      </button>
    </form>
  );
};