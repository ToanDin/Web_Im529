import React from 'react';
import { Mail, Trash2 } from 'lucide-react';

export default function ManageInbox({
  inboxMessages,
  inboxLoading,
  inboxError,
  handleDeleteMessage
}) {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-white">Customer Inbox</h1>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Read and manage message submissions from customers</p>
      </div>

      {inboxLoading ? (
        <div className="text-center py-12 text-gray-500 text-sm uppercase tracking-widest font-semibold animate-pulse">
          Querying database inbox messages...
        </div>
      ) : inboxError ? (
        <div className="p-4 bg-red-950/40 border border-red-500/30 rounded text-sm text-red-400">
          {inboxError}
        </div>
      ) : inboxMessages.length === 0 ? (
        <div className="text-center border border-white/5 border-dashed rounded-lg p-16 space-y-3">
          <Mail size={40} className="text-gray-600 mx-auto" />
          <p className="text-sm text-gray-400 font-light">Your customer inbox is empty. All inquiries have been processed.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inboxMessages.map((msg) => (
            <div
              key={msg.id}
              className="bg-brand-charcoal/40 border border-white/5 p-6 rounded-lg space-y-4 relative hover:border-brand-purple/20 transition-all duration-300 group shadow-lg"
            >
              <button
                onClick={() => handleDeleteMessage(msg.id)}
                className="absolute top-6 right-6 p-2 bg-brand-dark hover:bg-red-950/20 text-gray-500 hover:text-red-400 border border-white/5 hover:border-red-500/20 rounded transition-all duration-200 cursor-pointer"
                title="Archive and Delete message"
              >
                <Trash2 size={14} />
              </button>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-white/5 pb-3 pr-8">
                <div>
                  <span className="text-[10px] text-brand-purple-light uppercase tracking-widest font-bold block mb-1">
                    {msg.subject}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white">{msg.name}</h4>
                  <a href={`mailto:${msg.email}`} className="text-xs text-gray-400 hover:text-brand-purple-light transition-colors font-medium">
                    {msg.email}
                  </a>
                </div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-light">
                  {new Date(msg.createdAt).toLocaleString(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </span>
              </div>

              <p className="text-sm text-gray-300 font-light leading-relaxed whitespace-pre-line pl-1 border-l-2 border-brand-purple/40">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
