import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { env } from "../config/env";

export function registerSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: env.clientOrigin,
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    socket.emit("activity", {
      type: "boot",
      message: "Realtime channel connected"
    });
  });

  return io;
}
