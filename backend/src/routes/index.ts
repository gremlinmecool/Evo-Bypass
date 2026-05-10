import { Router } from "express";
import { analyticsRouter } from "./analytics.routes";
import { authRouter } from "./auth.routes";
import { botRouter } from "./bot.routes";
import { linksRouter } from "./links.routes";
import { statusRouter } from "./status.routes";
import { bypassRouter } from "./bypass";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/analytics", analyticsRouter);
apiRouter.use("/links", linksRouter);
apiRouter.use("/bot", botRouter);
apiRouter.use("/status", statusRouter);
apiRouter.use("/bypass", bypassRouter);
