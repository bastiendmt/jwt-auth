import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  console.log("SETTING COOKIe ", token);
  res.cookie("jid", token, {
    httpOnly: true,
    path: "/refresh_token",
  });
};
