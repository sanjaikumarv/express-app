"use client";

import { useState, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { User } from "./ChatContainer";
import { GET_MESSAGES, SEND_MESSAGE } from "@/lib/endpoints";
import useSWR from "swr";
import { fetcher, mutator } from "@/lib/hooks";
import useSWRMutation from "swr/mutation";
import { useAuth } from "@/lib/context/AuthContext";

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

interface ChatWindowProps {
  selectedUser: User | null;
}

export default function ChatWindow({ selectedUser }: ChatWindowProps) {
  console.log("selectedUser", selectedUser);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user: currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);

  useSWR(GET_MESSAGES, fetcher<Message[]>(), {
    onSuccess(data) {
      setMessages(data);
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const { trigger } = useSWRMutation(
    SEND_MESSAGE + `/${selectedUser?._id}`,
    mutator<{ message: string }, Message>("POST"),
    {
      onSuccess: ({ data }) => {
        setMessages((prev) => [...prev, data]);
      },
    }
  );

  if (!selectedUser) {
    return (
      <div className='flex-1 flex items-center justify-center bg-transparent'>
        <div className='text-center p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl max-w-sm mx-4'>
          <div className='w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.3)]'>
            <svg
              className='w-10 h-10 text-blue-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
              />
            </svg>
          </div>
          <h2 className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-3'>
            Select a Conversation
          </h2>
          <p className='text-gray-400 leading-relaxed'>
            Choose a contact from the sidebar to start messaging and connecting.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex-1 flex flex-col h-full relative'>
      <ChatHeader user={selectedUser} />

      <div className='flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar'>
        {messages.map((message) => (
          <MessageBubble
            key={message._id}
            message={message}
            isOwnMessage={message.senderId === currentUser?._id}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={trigger} />
    </div>
  );
}
