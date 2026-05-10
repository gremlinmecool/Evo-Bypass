import express from "express";
import cors from "cors";
import { createServer } from "http";
import { apiRouter } from "./routes";
import { env } from "./config/env";
import { mockAuth } from "./middleware/auth";
import { registerSocket } from "./services/socket";
import { createDiscordClient } from "./bot/client";

const app = express();
const server = createServer(app);

app.use(
  cors({
    origin: env.clientOrigin,
    credentials: true
  })
);
app.use(express.json());
app.use(mockAuth);
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
app.use("/api", apiRouter);

registerSocket(server);
createDiscordClient();

server.listen(env.port, () => {
  console.log(`Backend listening on http://localhost:${env.port}`);
});
