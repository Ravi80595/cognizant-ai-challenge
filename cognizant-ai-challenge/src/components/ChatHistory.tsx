import { ChatSession } from '@/types';
import { Plus, MessageSquare, Trash2 } from 'lucide-react';

interface Props {
  sessions: ChatSession[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onDelete: (id: string) => void;
}

export const ChatHistory = ({ sessions, activeId, onSelect, onNewChat, onDelete }: Props) => {
  return (
    <aside className="w-72 bg-[#050505] text-white h-screen hidden md:flex flex-col p-3 border-r border-white/10">
      <button 
        onClick={onNewChat}
        className="flex items-center gap-2 w-full p-3 border border-white/20 rounded-lg hover:bg-white/10 transition-all mb-6 font-medium text-sm"
      >
        <Plus size={16} /> New Chat
      </button>

      <div className="flex-1 overflow-y-auto space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold px-2 mb-2">Recent Chats</p>
        
        {sessions.map((s) => (
          <div
            key={s.id}
            className={`flex items-center gap-3 w-full p-2 rounded-lg text-sm transition-all group cursor-pointer ${
              activeId === s.id ? 'bg-white/15' : 'hover:bg-white/5'
            }`}
            onClick={() => onSelect(s.id)}
          >
            <MessageSquare size={14} className={activeId === s.id ? 'text-blue-400' : 'text-gray-500'} />
            
            <span className="truncate flex-1 text-left">{s.title}</span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(s.id);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-all"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        
        {sessions.length === 0 && (
          <p className="text-gray-600 text-[11px] px-2 italic">No history available</p>
        )}
      </div>
    </aside>
  );
};