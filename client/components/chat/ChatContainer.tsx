"use client";

import { useState } from "react";
import UserSidebar from "./UserSidebar";
import ChatWindow from "./ChatWindow";
import Background from "../common/Background";

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  online?: boolean;
}

export default function ChatContainer() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className='relative flex h-screen w-full overflow-hidden bg-[#0f0f23] text-gray-100 font-sans'>
      {/* Animated Background Orbs */}
      <Background />
      {/* Main Glass Container */}
      <div className='relative z-10 flex w-full h-full backdrop-blur-3xl bg-white/5'>
        <UserSidebar
          selectedUser={selectedUser}
          onSelectUser={setSelectedUser}
        />
        <ChatWindow selectedUser={selectedUser} />
      </div>
    </div>
  );
}
