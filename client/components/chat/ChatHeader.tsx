"use client";

import { User } from "./ChatContainer";

interface ChatHeaderProps {
  user: User;
}

export default function ChatHeader({ user }: ChatHeaderProps) {
  return (
    <div className='flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-20'>
      <div className='flex items-center gap-4'>
        <div className='relative'>
          <div className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg'>
            {user.name.charAt(0).toUpperCase()}
          </div>
          {user.online && (
            <div className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#1a1a2e] rounded-full shadow-sm animate-pulse' />
          )}
        </div>
        <div>
          <h3 className='text-white font-semibold text-lg leading-tight'>
            {user.name}
          </h3>
          <span
            className={`text-xs ${
              user.online ? "text-green-400" : "text-gray-400"
            }`}>
            {user.online ? "Active now" : "Offline"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className='flex items-center gap-3'>
        <button className='p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all'>
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </button>
        <button className='p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all'>
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
