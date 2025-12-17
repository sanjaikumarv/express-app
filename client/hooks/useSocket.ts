"use client";

import { useEffect, useRef, useState } from "react";
import { socketService } from "../lib/socket.service";

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  conversationId: string;
  createdAt: Date;
}

interface UseSocketOptions {
  token?: string;
  autoConnect?: boolean;
}

export function useSocket(options: UseSocketOptions = {}) {
  const { token, autoConnect = false } = options;
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [typingUsers, setTypingUsers] = useState<Map<string, string>>(
    new Map()
  );
  const socketRef = useRef(socketService);

  useEffect(() => {
    if (autoConnect && token) {
      connect(token);
    }

    return () => {
      // Cleanup on unmount
      disconnect();
    };
  }, [autoConnect, token]);

  const connect = (authToken: string) => {
    try {
      socketRef.current.connect(authToken);
      setIsConnected(true);

      // Set up online/offline listeners
      socketRef.current.onUserOnline((userId) => {
        setOnlineUsers((prev) => new Set(prev).add(userId));
      });

      socketRef.current.onUserOffline((userId) => {
        setOnlineUsers((prev) => {
          const newSet = new Set(prev);
          newSet.delete(userId);
          return newSet;
        });
      });

      // Set up typing listeners
      socketRef.current.onUserTyping((data) => {
        setTypingUsers((prev) =>
          new Map(prev).set(data.conversationId, data.userId)
        );
      });

      socketRef.current.onUserStoppedTyping((data) => {
        setTypingUsers((prev) => {
          const newMap = new Map(prev);
          newMap.delete(data.conversationId);
          return newMap;
        });
      });
    } catch (error) {
      console.error("Failed to connect socket:", error);
      setIsConnected(false);
    }
  };

  const disconnect = () => {
    socketRef.current.disconnect();
    setIsConnected(false);
  };

  const sendMessage = (
    receiverId: string,
    message: string,
    conversationId?: string
  ) => {
    socketRef.current.sendMessage(receiverId, message, conversationId);
  };

  const joinConversation = (conversationId: string) => {
    socketRef.current.joinConversation(conversationId);
  };

  const leaveConversation = (conversationId: string) => {
    socketRef.current.leaveConversation(conversationId);
  };

  const startTyping = (conversationId: string, receiverId: string) => {
    socketRef.current.startTyping(conversationId, receiverId);
  };

  const stopTyping = (conversationId: string, receiverId: string) => {
    socketRef.current.stopTyping(conversationId, receiverId);
  };

  const onNewMessage = (callback: (message: Message) => void) => {
    socketRef.current.onNewMessage(callback);

    // Return cleanup function
    return () => {
      socketRef.current.off("newMessage", callback);
    };
  };

  const isUserOnline = (userId: string): boolean => {
    return onlineUsers.has(userId);
  };

  const isUserTyping = (conversationId: string): string | undefined => {
    return typingUsers.get(conversationId);
  };

  return {
    isConnected,
    connect,
    disconnect,
    sendMessage,
    joinConversation,
    leaveConversation,
    startTyping,
    stopTyping,
    onNewMessage,
    isUserOnline,
    isUserTyping,
    onlineUsers: Array.from(onlineUsers),
    socket: socketRef.current.getSocket(),
  };
}
