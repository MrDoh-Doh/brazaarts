import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { io, type Socket } from 'socket.io-client';

const SocketContext = createContext<{ socket: Socket | null }>({ socket: null });

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const nextSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? 'http://localhost:4000', {
      transports: ['websocket'],
      autoConnect: true,
    });

    setSocket(nextSocket);
    return () => nextSocket.close();
  }, []);

  return useMemo(() => ({ socket }), [socket]);
}

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { socket } = useSocket();
  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
}

export function useSocketContext() {
  const context = useContext(SocketContext);
  return context;
}
