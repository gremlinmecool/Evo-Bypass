import { NextFunction, Request, Response } from "express";

export function mockAuth(req: Request, _res: Response, next: NextFunction) {
  req.user = {
    id: "user_01",
    email: "operator@zen.local",
    role: "admin"
  };
  next();
}
