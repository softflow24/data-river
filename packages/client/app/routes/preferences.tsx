import { ActionFunctionArgs, json } from "@remix-run/node";
import { localeCookie, themeCookie } from "~/cookies.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const locale = formData.get("locale");
  const theme = formData.get("theme");
  const headers = new Headers();

  if (typeof locale === "string") {
    headers.append("Set-Cookie", await localeCookie.serialize(locale));
  }

  if (typeof theme === "string") {
    headers.append("Set-Cookie", await themeCookie.serialize(theme));
  }

  return json(
    { ok: true },
    {
      headers,
    },
  );
}
