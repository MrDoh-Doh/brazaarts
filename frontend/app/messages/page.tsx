'use client';

import { ChatUI } from '@/components/messaging/ChatUI';

export default function MessagesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-black text-white">Messages</h1>
      <p className="mt-3 text-slate-300">Stay in sync with creators and clients.</p>
      <div className="mt-8">
        <ChatUI />
      </div>
    </div>
  );
}
