import { Outlet, useLocation, useNavigate } from "@remix-run/react";
import { Toaster } from "@data-river/shared/ui/components/ui/sonner";
import { useEffect } from "react";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { createClient } from "~/utils/supabase.server";
import { motion, AnimatePresence } from "framer-motion";
import { WelcomeSidebar } from "~/components/welcome/sidebar";
import { MobileNav } from "~/components/welcome/mobile-nav";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { supabase } = await createClient(request);

  let {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return null;
};

export default function WelcomeLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/welcome") {
      navigate("/welcome/username");
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen">
      {/* Mobile Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden px-4">
        <div className="container flex h-14 items-center">
          <MobileNav />
          <div className="flex-1 flex justify-center">
            <h1 className="text-lg font-semibold">Welcome Setup</h1>
          </div>
          <div className="w-9" /> {/* Spacer for centering */}
        </div>
      </header>

      <div className="container py-8 px-4 mx-auto">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0 border-r">
            <div className="sticky top-8">
              <WelcomeSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0 px-4 lg:px-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
