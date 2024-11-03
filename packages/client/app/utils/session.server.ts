import { createCookieSessionStorage } from "@remix-run/node";

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET must be set");
}

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export const getSession = (request: Request | string) => {
  if (typeof request !== "string" && !(request instanceof Request)) {
    return sessionStorage.getSession();
  }

  if (typeof request === "string") {
    return sessionStorage.getSession(request);
  }
  return sessionStorage.getSession(request.headers.get("Cookie"));
};

export const { commitSession, destroySession } = sessionStorage;
