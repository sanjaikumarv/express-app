"use client";

import { useState, KeyboardEvent } from "react";

interface ChatInputProps {
  onSendMessage: ({ message }: { message: string }) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    console.log("reder");
    if (message.trim()) {
      await onSendMessage({ message });
      setMessage("");
    }
  };

  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await handleSend();
    }
  };

  return (
    <div className='p-4 border-t border-white/10 bg-black/20 backdrop-blur-lg'>
      <div className='flex items-center gap-3 max-w-4xl mx-auto'>
        {/* Attachment Button */}
        <button className='p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all'>
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'
            />
          </svg>
        </button>

        {/* Input Field */}
        <div className='flex-1 relative'>
          <input
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='Type a message...'
            className='w-full px-5 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 outline-none focus:bg-white/10 focus:border-blue-500/50 transition-all font-medium'
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className={`p-3 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center ${
            message.trim()
              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-indigo-500/30"
              : "bg-white/5 text-gray-500 cursor-not-allowed"
          }`}>
          <svg
            className='w-5 h-5 translate-x-0.5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2.5}
              d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
