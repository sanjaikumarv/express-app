"use client";

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

export default function MessageBubble({
  message,
  isOwnMessage,
}: MessageBubbleProps) {
  return (
    <div
      className={`flex w-full ${
        isOwnMessage ? "justify-end" : "justify-start"
      }`}>
      <div
        className={`relative max-w-[70%] px-5 py-3 rounded-2xl backdrop-blur-md shadow-md transition-all ${
          isOwnMessage
            ? "bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-br-sm"
            : "bg-white/10 text-gray-200 border border-white/5 rounded-bl-sm"
        }`}>
        <p className='text-[15px] leading-relaxed break-words'>
          {message.message}
        </p>

        <div
          className={`flex items-center gap-1.5 mt-1.5 ${
            isOwnMessage
              ? "justify-end text-blue-100"
              : "justify-start text-gray-400"
          }`}>
          <span className='text-[10px] opacity-80'>{message.timestamp}</span>
          {isOwnMessage && (
            <span className='text-[10px]'>
              {message.status === "read" && "✓✓"}
              {message.status === "delivered" && "✓✓"}
              {message.status === "sent" && "✓"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
