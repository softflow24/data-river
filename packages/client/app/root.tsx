import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type {
  LinksFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { ReactNode, useEffect, useState } from "react";
import { json } from "@remix-run/node";
import { getSession } from "~/utils/session.server";
import "reflect-metadata";

import "@data-river/shared/global.css";
import "@data-river/shared/tailwind.css";
import { localeCookie, themeCookie } from "~/cookies.server";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { settingsSlice, Theme } from "./store/settings/settings.slice";
import { useTheme } from "~/hooks/useTheme";

export const meta: MetaFunction = () => {
  return [{ title: "Data-river" }];
};

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
    href: "/assets/images/favicon.svg",
    type: "image/svg+xml",
  },
  {
    rel: "icon",
    href: "/assets/images/favicon.png",
    type: "image/png",
  },
  {
    rel: "shortcut icon",
    href: "/assets/images/favicon.png",
    type: "image/png",
  },
];

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const locale = formData.get("locale");
  const theme = formData.get("theme");
  const headers = new Headers();

  if (typeof locale === "string") {
    const cookieStr = await localeCookie.serialize(locale);
    headers.append("Set-Cookie", cookieStr);
  }

  if (typeof theme === "string") {
    const cookieStr = await themeCookie.serialize(theme);
    headers.append("Set-Cookie", cookieStr);
  }

  return json(
    { ok: true },
    {
      headers,
    },
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);

  // Get stored preferences
  const locale =
    (await localeCookie.parse(request.headers.get("Cookie"))) || "en-US";
  const theme = await themeCookie.parse(request.headers.get("Cookie"));

  return json({
    isAuthenticated: session.has("access_token"),
    userId: session.get("user_id") as string,
    locale,
    theme,
  });
}

function Document({
  children,
  locale = "en-US",
  theme = "system",
}: {
  children: ReactNode;
  locale?: string;
  theme?: Theme;
}) {
  const resolvedTheme = useTheme(theme as Theme);

  useEffect(() => {
    // Initialize Redux store with settings from the server
    store.dispatch(
      settingsSlice.actions.initializeSettings({
        theme: theme as Theme,
        locale,
      }),
    );
  }, [theme, locale]);

  return (
    <html
      lang={locale}
      className={resolvedTheme === "dark" ? "dark" : undefined}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Provider store={store}>{children}</Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { locale, theme } = useLoaderData<typeof loader>();
  return (
    <Provider store={store}>
      <Document locale={locale} theme={theme}>
        <Outlet context={{ locale, theme }} />
      </Document>
    </Provider>
  );
}

// Modified ErrorBoundary to not depend on loader data
export function ErrorBoundary() {
  return (
    <Document>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Something went wrong!</h1>
        <p className="text-muted-foreground">Please try again later.</p>
      </div>
    </Document>
  );
}
