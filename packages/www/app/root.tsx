import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { ReactNode, useEffect } from "react";
import { Toaster } from "~/components/ui/toaster";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "icon",
    href: "assets/images/favicon.svg",
    type: "image/svg+xml",
  },
  {
    rel: "icon",
    href: "assets/images/favicon.png",
    type: "image/png",
  },
  {
    rel: "shortcut icon",
    href: "assets/images/favicon.png",
    type: "image/png",
  },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className="h-full dark"
      style={{ backgroundColor: "#001220" }}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {children}
        <ScrollRestoration />
        <Scripts />
        <Toaster />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
