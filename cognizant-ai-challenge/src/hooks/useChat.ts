import { useState, useEffect, useCallback } from "react";
import { ChatSession, Message } from "@/types";

export const useChat = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("cognizant_sessions");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSessions(parsed);
      if (parsed.length > 0) setCurrentSessionId(parsed[0].id);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cognizant_sessions", JSON.stringify(sessions));
  }, [sessions]);

  const createNewChat = useCallback(() => {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: [],
      createdAt: Date.now(),
    };
    setSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
  }, []);

  const deleteSession = useCallback(
    (id: string) => {
      setSessions((prev) => prev.filter((s) => s.id !== id));

      // If the deleted chat was the active one, switch to the next available or null
      if (currentSessionId === id) {
        setCurrentSessionId(sessions.find((s) => s.id !== id)?.id || null);
      }
    },
    [currentSessionId, sessions],
  );

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || !currentSessionId) return;

      setError(null);
      setIsLoading(true);

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content,
        timestamp: Date.now(),
      };

      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === currentSessionId) {
            const isFirstMsg = s.messages.length === 0;
            return {
              ...s,
              title: isFirstMsg ? content.slice(0, 30) : s.title,
              messages: [...s.messages, userMsg],
            };
          }
          return s;
        }),
      );

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          body: JSON.stringify({ prompt: content }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        const aiMsg: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.text,
          timestamp: Date.now(),
        };

        setSessions((prev) =>
          prev.map((s) =>
            s.id === currentSessionId
              ? { ...s, messages: [...s.messages, aiMsg] }
              : s,
          ),
        );
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [currentSessionId],
  );

  const currentSession = sessions.find((s) => s.id === currentSessionId);

  return {
    sessions,
    currentSession,
    currentSessionId,
    setCurrentSessionId,
    createNewChat,
    sendMessage,
    isLoading,
    error,
    deleteSession,
  };
};
