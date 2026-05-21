import type { Response } from "express";

export function getSessionCookieName() {
  return process.env.SESSION_COOKIE_NAME ?? "zbuy_session";
}

export function setSessionCookie(res: Response, sessionToken: string) {
  res.cookie(getSessionCookieName(), sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/"
  });
}

export function clearSessionCookie(res: Response) {
  res.clearCookie(getSessionCookieName(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/"
  });
}
