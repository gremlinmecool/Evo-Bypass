import { Router } from "express";
import { dashboardOverview, recentActivity } from "../lib/sample-data";

export const analyticsRouter = Router();

analyticsRouter.get("/overview", (_req, res) => {
  res.json({
    ...dashboardOverview,
    chart: [48, 72, 58, 84, 64, 93, 76, 90]
  });
});

analyticsRouter.get("/activity", (_req, res) => {
  res.json({ items: recentActivity });
});
