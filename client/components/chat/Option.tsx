"use client";

import { useState, useEffect } from "react";
import UserListItem from "./UserListItem";
import { User } from "./ChatContainer";
import { useAuth } from "@/lib/context/AuthContext";
import { GET_CONVERSATIONS, GET_USERS } from "@/lib/endpoints";
import { fetcher } from "@/lib/hooks";
import useSWR from "swr";
import Conversactions from "./Conversactions";
interface UserSidebarProps {
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
  joinSocket: (data: { userId?: string; conversation?: string }) => void;
}

export interface Conversation {
  _id: string;
  participants: User[];
}

const options = {
  CHAT: "chat",
  USER: "user",
};
export default function Option({
  selectedUser,
  onSelectUser,
  joinSocket,
}: UserSidebarProps) {
  const { user: currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(options.CHAT);
  const { data: users = [] } = useSWR(GET_USERS, fetcher<User[]>());
  const { data: conversations = [] } = useSWR(
    GET_CONVERSATIONS,
    fetcher<Conversation[]>()
  );

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className='w-80 md:w-96 flex flex-col border-r border-white/10 bg-white/5 backdrop-blur-md'>
      {/* Header */}
      <div className='p-5 border-b border-white/10'>
        <h2 className='text-xl font-bold text-white mb-4 bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text '>
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
      <div className='px-5 py-3'>
        <div className='flex items-center p-1 bg-black/40 rounded-xl border border-white/5'>
          <button
            onClick={() => setSelectedOption(options.CHAT)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold text-white  shadow-md transition-all ${
              selectedOption === options.CHAT
                ? "bg-linear-to-r from-indigo-500 to-purple-600"
                : ""
            }`}>
            Chat
          </button>
          <button
            onClick={() => setSelectedOption(options.USER)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all ${
              selectedOption === options.USER
                ? "bg-linear-to-r from-indigo-500 to-purple-600"
                : ""
            }`}>
            Users
          </button>
        </div>
      </div>
      <div className='flex-1 overflow-y-auto custom-scrollbar'>
        {selectedOption === options.CHAT && (
          <div className='space-y-1 mx-4'>
            {conversations.map((conversation) => (
              <Conversactions
                key={conversation._id}
                conversation={conversation}
                isSelected={
                  selectedUser?._id === conversation.participants?.[0]._id
                }
                onClick={() => {
                  joinSocket({
                    conversation: conversation._id,
                  });
                  onSelectUser(conversation.participants?.[0]);
                }}
              />
            ))}
          </div>
        )}
        {selectedOption === options.USER && (
          <div className='space-y-1 mx-4'>
            {filteredUsers.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                isSelected={selectedUser?._id === user._id}
                onClick={() => {
                  joinSocket({
                    userId: user._id,
                  });
                }}
              />
            ))}
          </div>
        )}
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
