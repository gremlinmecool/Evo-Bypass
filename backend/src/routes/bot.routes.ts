import { Router } from "express";
import { env } from "../config/env";

export const botRouter = Router();

function buildInviteUrl() {
  if (!env.discordClientId) {
    return "";
  }

  const scope = encodeURIComponent("bot applications.commands");
  return `https://discord.com/oauth2/authorize?client_id=${env.discordClientId}&permissions=${env.discordPermissions}&scope=${scope}`;
}

botRouter.get("/commands", (_req, res) => {
  res.json({
    items: [
      "/verify",
      "/premium",
      "/ticket",
      "/mod-log",
      "/sync-roles"
    ]
  });
});

botRouter.get("/invite", (_req, res) => {
  res.json({
    clientId: env.discordClientId,
    inviteUrl: buildInviteUrl()
  });
});
