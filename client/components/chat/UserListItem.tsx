"use client";

import { User } from "./ChatContainer";

interface UserListItemProps {
  user: User;
  isSelected: boolean;
  onClick: () => void;
}

export default function UserListItem({
  user,
  isSelected,
  onClick,
}: UserListItemProps) {
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
              ? "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/30"
              : "bg-gradient-to-br from-gray-700 to-gray-600 group-hover:from-gray-600 group-hover:to-gray-500"
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
            {user.lastMessageTime}
          </span>
        </div>
        <div className='flex justify-between items-center'>
          <p
            className={`text-xs truncate max-w-[140px] ${
              isSelected
                ? "text-gray-300"
                : "text-gray-400 group-hover:text-gray-300"
            }`}>
            {user.lastMessage}
          </p>
          {user.unreadCount && user.unreadCount > 0 && (
            <span className='flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full bg-blue-500 text-[10px] font-bold text-white shadow-lg shadow-blue-500/40'>
              {user.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
