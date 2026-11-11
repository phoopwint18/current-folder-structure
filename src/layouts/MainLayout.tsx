import { DefaultLoader } from "@/common/components";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/common/components/ui/tooltip";
import { SIDE_NAVS } from "@/constants";
import { PATHS } from "@/core/routes/path";
import { useUser } from "@/features/auth";
import { Suspense } from "react";
import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import NVMLogo from "@/assets/logo.svg";

export function MainLayout() {
  const { isAuthenticated, isReady } = useUser();
  const { pathname } = useLocation();

  if (!isReady) {
    return <DefaultLoader center="screen" />;
  }

  if (!isAuthenticated) {
    return <Navigate to={PATHS.login} replace />;
  }

  function isNavActive(path: string) {
    if (path === PATHS.home) {
      return pathname === PATHS.home;
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  }

  return (
    <div className="flex h-svh flex-col overflow-hidden bg-background">
      <AppHeader />

      <div className="grid min-h-0 flex-1 grid-cols-[100px_1fr] lg:grid-cols-[250px_1fr]">
        <aside className="flex shrink-0 flex-col gap-4 overflow-y-auto border-b bg-white p-6 md:h-full md:border-r md:border-b-0">
          <TooltipProvider>
            <nav className="flex flex-col gap-3">
              {SIDE_NAVS.map((nav) => (
                <NavLink
                  key={nav.id}
                  to={nav.path}
                  end={nav.path === PATHS.home}
                  className={() =>
                    `flex items-center gap-3 py-2 transition-colors duration-100 justify-center lg:justify-start lg:px-3.5 ${isNavActive(nav.path) ? "bg-linear text-white rounded-default" : "bg-transparent text-secondary-400"}`
                  }
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="inline-flex">
                        <nav.icon
                          size={18}
                          aria-hidden="true"
                          className={`${isNavActive(nav.path) ? "text-white" : "text-primary"}`}
                        />
                      </div>
                    </TooltipTrigger>
                    <span className="hidden font-medium lg:inline">
                      {nav.name}
                    </span>
                    <TooltipContent
                      className="lg:hidden"
                      side="right"
                      sideOffset={8}
                    >
                      <span className="inline font-medium">{nav.name}</span>
                    </TooltipContent>
                  </Tooltip>
                </NavLink>
              ))}
            </nav>
          </TooltipProvider>
          <p className="items-center fixed bottom-5 justify-center gap-2 text-xs -translate-x-1/2 left-31 hidden lg:flex">
            <span>powered by :</span>
            <img src={NVMLogo} alt="" className="h-4 w-auto" />
          </p>
        </aside>
        <main className="flex min-h-0 flex-col overflow-y-auto p-6 mb-3">
          <Suspense fallback={<DefaultLoader center="page" />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
