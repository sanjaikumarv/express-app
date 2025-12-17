"use client";

import { User } from "./ChatContainer";
import { Conversation } from "./Option";

interface UserListItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}

export default function Conversations({
  conversation,
  isSelected,
  onClick,
}: UserListItemProps) {
  const user = conversation.participants[0];
  return (
    <div
      onClick={onClick}
      className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
        isSelected
          ? "bg-white/10 border border-white/5 shadow-lg backdrop-blur-sm"
          : "hover:bg-white/5 border border-transparent hover:border-white/5"
      }`}>
      <div className='relative'>
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg transition-transform duration-300 group-hover:scale-105 ${
            isSelected
              ? "bg-linear-to-br from-blue-500 to-indigo-600 shadow-blue-500/30"
              : "bg-linear-to-br from-gray-700 to-gray-600 group-hover:from-gray-600 group-hover:to-gray-500"
          } shadow-md`}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        {user.online && (
          <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#1a1a2e] rounded-full shadow-sm' />
        )}
      </div>

      <div className='flex-1 min-w-0'>
        <div className='flex justify-between items-baseline mb-1'>
          <h4
            className={`text-sm font-semibold truncate transition-colors ${
              isSelected ? "text-white" : "text-gray-200 group-hover:text-white"
            }`}>
            {user.name}
          </h4>
          <span className='text-xs text-gray-500 group-hover:text-gray-400'>
            {conversation.participants[0].lastMessageTime}
          </span>
        </div>
        <div className='flex justify-between items-center'>
          {conversation.participants[0].unreadCount &&
            conversation.participants[0].unreadCount > 0 && (
              <span className='flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-blue-500 text-[10px] font-bold text-white shadow-lg shadow-blue-500/40'>
                {conversation.participants[0].unreadCount}
              </span>
            )}
        </div>
      </div>
    </div>
  );
}
