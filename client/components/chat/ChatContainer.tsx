"use client";

import { useEffect, useState } from "react";
import Option from "./Option";
import ChatWindow from "./ChatWindow";
import Background from "../common/Background";
import { useAuth } from "@/lib/context/AuthContext";
import { io } from "socket.io-client";
import tokenStorage from "@/lib/token-storage";
import Conversactions from "./Conversactions";
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
const options = {
  CHAT: "chat",
  USER: "user",
};

export default function ChatContainer() {
  const [selectedUser, setSelectedUser] = useState<User>({} as User);
  const [selectedOption, setSelectedOption] = useState<string>(options.CHAT);
  const [socket, setSocket] = useState<any | null>(null);
  const [loggedInUsers, setLoggedInUsers] = useState<string[]>([]);
  const { loggedIn } = useAuth();

  const connectSocket = () => {
    if (loggedIn) {
      const socket = io("http://localhost:1000", {
        auth: {
          accessToken: tokenStorage.getToken(),
        },
        withCredentials: true,
      });
      socket.on("connect_error", (err) => {
        console.log(err);
      });
      socket.on("connect", () => {
        console.log("Connected to socket");
      });
      socket.on("disconnect", () => {
        console.log("Disconnected from socket");
      });
      socket.on("user-joined", (userSocketMap: string[]) => {
        setLoggedInUsers(userSocketMap);
      });
      socket.on("error", (err) => {
        console.log(err);
      });
      setSocket(socket);
      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  };
  const joinSocket = (data: { userId?: string; conversation?: string }) => {
    socket.emit("join", data);
  };

  useEffect(() => {
    connectSocket();
  }, [selectedUser]);

  return (
    <div className='relative flex h-screen w-full overflow-hidden bg-[#0f0f23] text-gray-100 font-sans'>
      {/* Animated Background Orbs */}
      <Background />
      {/* Main Glass Container */}
      <div className='relative z-10 flex w-full h-full backdrop-blur-3xl bg-white/5'>
        <Option
          joinSocket={joinSocket}
          selectedUser={selectedUser}
          onSelectUser={setSelectedUser}
        />

        <ChatWindow socket={socket} selectedUserId={selectedUser?._id} />
      </div>
    </div>
  );
}
