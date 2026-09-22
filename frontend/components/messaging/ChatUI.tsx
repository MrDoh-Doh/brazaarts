'use client';

import { useState } from 'react';

export function ChatUI() {
  const [messages, setMessages] = useState([
    { id: '1', sender: 'MuseMaker', content: 'Absolutely! What style are you thinking?' },
    { id: '2', sender: 'You', content: 'I want a neon, futuristic vibe for a hero banner.' },
  ]);
  const [draft, setDraft] = useState('');

  const sendMessage = () => {
    if (!draft.trim()) return;
    setMessages((current) => [...current, { id: String(Date.now()), sender: 'You', content: draft.trim() }]);
    setDraft('');
  };

  return (
    <div className="rounded-3xl border border-violet-500/20 bg-slate-900/80 p-6">
      <h3 className="text-xl font-bold text-white">Conversation</h3>
      <div className="mt-4 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className={message.sender === 'You' ? 'ml-auto max-w-[75%]' : 'max-w-[75%]'}>
            <div className={message.sender === 'You' ? 'rounded-2xl bg-violet-500/25 px-3 py-2 text-white' : 'rounded-2xl bg-slate-800 px-3 py-2 text-slate-200'}>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{message.sender}</p>
              <p className="mt-1">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Type a message…"
          className="flex-1 rounded-xl border border-violet-400/30 bg-slate-950 px-4 py-3 text-white"
        />
        <button onClick={sendMessage} className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 px-4 py-3 font-semibold text-slate-950">
          Send
        </button>
      </div>
    </div>
  );
}
