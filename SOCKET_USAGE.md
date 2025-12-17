# Socket.IO Real-time Messaging - Usage Guide

## Overview

This implementation provides real-time messaging capabilities using Socket.IO for your Express application. It includes JWT authentication, typing indicators, and online/offline status tracking.

## Server Configuration

### Environment Variables

Add the following to your server's `.env` file:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_here
```

### Starting the Server

```bash
cd server
npm run dev
```

The server will start on the configured port with Socket.IO initialized.

## Client Configuration

### Environment Variables

Create a `.env.local` file in the client directory:

```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
```

### Starting the Client

```bash
cd client
npm run dev
```

## Usage Examples

### 1. Basic Chat Component Integration

```tsx
import ChatComponent from "@/components/ChatComponent";

export default function ChatPage() {
  const authToken = "your_jwt_token"; // Get from your auth system
  const currentUserId = "user123";
  const receiverId = "user456";
  const conversationId = "conv789"; // Optional

  return (
    <ChatComponent
      authToken={authToken}
      currentUserId={currentUserId}
      receiverId={receiverId}
      conversationId={conversationId}
    />
  );
}
```

### 2. Using the Socket Hook Directly

```tsx
"use client";

import { useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";

export default function CustomChat() {
  const { isConnected, connect, sendMessage, onNewMessage, isUserOnline } =
    useSocket();

  useEffect(() => {
    // Connect with JWT token
    const token = localStorage.getItem("authToken");
    if (token) {
      connect(token);
    }

    // Listen for new messages
    const cleanup = onNewMessage((message) => {
      console.log("New message:", message);
    });

    return cleanup;
  }, []);

  const handleSend = () => {
    sendMessage("receiverId", "Hello!", "conversationId");
  };

  return (
    <div>
      <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>
      <button onClick={handleSend}>Send Message</button>
    </div>
  );
}
```

### 3. Using the Socket Service Directly

```tsx
import { socketService } from "@/lib/socket.service";

// Connect
const token = "your_jwt_token";
socketService.connect(token);

// Send message
socketService.sendMessage("receiverId", "Hello World!", "conversationId");

// Join conversation
socketService.joinConversation("conversationId");

// Listen for messages
socketService.onNewMessage((message) => {
  console.log("Received:", message);
});

// Disconnect
socketService.disconnect();
```

## API Reference

### Socket Events

#### Client to Server Events

- `sendMessage`: Send a message to another user
  ```ts
  { receiverId: string, message: string, conversationId?: string }
  ```
- `joinConversation`: Join a conversation room
  ```ts
  conversationId: string;
  ```
- `leaveConversation`: Leave a conversation room
  ```ts
  conversationId: string;
  ```
- `typing`: Indicate user is typing
  ```ts
  { conversationId: string, receiverId: string }
  ```
- `stopTyping`: Indicate user stopped typing
  ```ts
  { conversationId: string, receiverId: string }
  ```

#### Server to Client Events

- `newMessage`: Receive a new message
  ```ts
  { _id: string, senderId: string, receiverId: string, message: string, conversationId: string, createdAt: Date }
  ```
- `userOnline`: User came online
  ```ts
  userId: string;
  ```
- `userOffline`: User went offline
  ```ts
  userId: string;
  ```
- `userTyping`: User is typing
  ```ts
  { userId: string, conversationId: string }
  ```
- `userStoppedTyping`: User stopped typing
  ```ts
  { userId: string, conversationId: string }
  ```
- `error`: Error message from server
  ```ts
  message: string;
  ```

## REST API Integration

The existing REST API endpoints continue to work:

### Send Message (REST)

```
POST /home/message/:id
Headers: Cookie with authToken
Body: { message: string }
```

### Get Messages (REST)

```
GET /home/message/:id
Headers: Cookie with authToken
```

Both REST and Socket.IO methods will trigger real-time updates to connected clients.

## Authentication

Socket.IO connections are authenticated using JWT tokens. The token can be provided in two ways:

1. **Auth object** (recommended):

   ```ts
   socketService.connect(token);
   ```

2. **Authorization header**:
   ```ts
   io.connect(url, {
     headers: { authorization: `Bearer ${token}` },
   });
   ```

## Troubleshooting

### Connection Issues

- Ensure the server is running and accessible
- Check that the `NEXT_PUBLIC_SOCKET_URL` environment variable is set correctly
- Verify the JWT token is valid and not expired
- Check browser console for error messages

### Messages Not Received

- Ensure you've joined the conversation room using `joinConversation()`
- Verify both users are connected to the socket
- Check that the conversation ID is correct

### CORS Issues

- Update the CORS configuration in `socket.config.ts` to match your client URL:
  ```ts
  cors: {
      origin: "http://localhost:3001", // Your client URL
      methods: ["GET", "POST"],
      credentials: true,
  }
  ```

## Security Considerations

1. **Always use HTTPS in production** for secure WebSocket connections (WSS)
2. **Validate JWT tokens** on every socket connection
3. **Verify user permissions** before allowing access to conversations
4. **Rate limit** socket events to prevent abuse
5. **Sanitize message content** before storing or broadcasting

## Performance Tips

1. **Join only active conversations** to reduce unnecessary event subscriptions
2. **Leave conversations** when navigating away to free up resources
3. **Implement pagination** for message history
4. **Use connection pooling** for database queries
5. **Consider Redis** for scaling across multiple server instances
