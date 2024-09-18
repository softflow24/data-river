import { LoaderFunction, json } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";
import setCookie, { Cookie } from "set-cookie-parser";
import { AppSidebar } from "~/components/app-sidebar";
import { SidebarLayout, SidebarTrigger } from "~/components/ui/sidebar";
import Editor from "@data-river/editor";
import ClientOnly from "~/components/client-only";

// Define the type for the loader's return data
interface LoaderData {
  sidebarState: boolean;
}

// Loader function to get cookies from the request
export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader: string | null = request.headers.get("Cookie");
  const cookies: Cookie[] = setCookie.parse(cookieHeader || "");

  // Find and parse the 'sidebar:state' cookie, default to false if not found
  const sidebarState =
    cookies.find((cookie) => cookie.name === "sidebar:state")?.value ===
      "true" || false;

  return json<LoaderData>({ sidebarState });
};

export default function Page() {
  // Get the loader data with the sidebar state
  const { sidebarState } = useLoaderData<LoaderData>();

  return (
    <SidebarLayout defaultOpen={sidebarState}>
      <AppSidebar />
      <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out h-screen overflow-hidden">
        <div className="h-full rounded-md p-2">
          {/* <SidebarTrigger /> */}
          <ClientOnly>
            <Editor />
          </ClientOnly>
        </div>
      </main>
    </SidebarLayout>
  );
}
