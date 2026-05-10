import { Router } from "express";

export const linksRouter = Router();

linksRouter.get("/", (_req, res) => {
  res.json({
    items: [
      { id: "lnk_1", slug: "premium-drop", clicks: 12402, status: "active" },
      { id: "lnk_2", slug: "vip-invite", clicks: 6421, status: "active" }
    ]
  });
});
