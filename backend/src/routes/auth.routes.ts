import { Router } from "express";

export const authRouter = Router();

authRouter.post("/login", (_req, res) => {
  res.json({
    token: "mock-jwt-token",
    user: {
      id: "user_01",
      email: "operator@zen.local",
      role: "admin"
    }
  });
});

authRouter.post("/register", (_req, res) => {
  res.status(201).json({ message: "Account created" });
});
