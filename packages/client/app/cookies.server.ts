import { createCookie } from "@remix-run/node";

export const localeCookie = createCookie("locale", {
  maxAge: 31536000, // one year
});

export const themeCookie = createCookie("theme", {
  maxAge: 31536000, // one year
});
