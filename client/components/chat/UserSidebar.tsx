"use client";

import { useState, useEffect } from "react";
import UserListItem from "./UserListItem";
import { User } from "./ChatContainer";
import { useAuth } from "@/lib/context/AuthContext";
import apiClient from "@/lib/apiClient";
import { GET_USERS } from "@/lib/endpoints";
import { fetcher } from "@/lib/hooks";
import useSWR from "swr";
interface UserSidebarProps {
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}

export default function UserSidebar({
  selectedUser,
  onSelectUser,
}: UserSidebarProps) {
  const { user: currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: users = [] } = useSWR(GET_USERS, fetcher<User[]>());

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='w-80 md:w-96 flex flex-col border-r border-white/10 bg-white/5 backdrop-blur-md'>
      {/* Header */}
      <div className='p-5 border-b border-white/10'>
        <h2 className='text-xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
          Messages
        </h2>

        {/* Search Bar */}
        <div className='relative'>
          <input
            type='text'
            placeholder='Search conversations...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full pl-10 pr-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-blue-500/50 focus:bg-black/30 transition-all'
          />
          <svg
            className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500'
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
        </div>
      </div>

      {/* User List */}
      <div className='flex-1 overflow-y-auto custom-scrollbar'>
        <div className='p-3 space-y-1'>
          {filteredUsers.map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              isSelected={selectedUser?._id === user._id}
              onClick={() => onSelectUser(user)}
            />
          ))}
        </div>
      </div>

      {/* Current User Profile (Bottom) */}
      <div className='p-4 bg-black/20 border-t border-white/10 backdrop-blur-md'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg'>
            {currentUser?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className='text-sm font-semibold text-white'>
              {currentUser?.name}
            </h3>
            <span className='text-xs text-green-400 flex items-center gap-1'>
              <span className='w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse' />
              Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
