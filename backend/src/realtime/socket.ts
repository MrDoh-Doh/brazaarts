import { Server as SocketIOServer } from 'socket.io';
import type { Server as HttpServer } from 'node:http';
import { env } from '../config/env';

export function createSocketServer(server: HttpServer) {
  const io = new SocketIOServer(server, {
    cors: {
      origin: env.CORS_ORIGIN,
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    socket.on('join:conversation', (conversationId: string) => {
      socket.join(conversationId);
    });

    socket.on('typing:start', (conversationId: string) => {
      socket.to(conversationId).emit('typing:start', { conversationId, userId: socket.id });
    });

    socket.on('typing:stop', (conversationId: string) => {
      socket.to(conversationId).emit('typing:stop', { conversationId, userId: socket.id });
    });

    socket.on('message:create', (payload: { conversationId: string; content: string; senderId: string }) => {
      io.to(payload.conversationId).emit('message:create', payload);
    });

    socket.on('message:read', (payload: { conversationId: string; userId: string }) => {
      io.to(payload.conversationId).emit('message:read', payload);
    });
  });

  return io;
}
