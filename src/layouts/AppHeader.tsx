import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDownIcon, LogOutIcon, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import { getDisplayName, getInitials } from "@/common/utils";
import { PATHS } from "@/core/routes/path";
import { useUser } from "@/features/auth";
import NVMLogo from "@/assets/logo.svg";

function getPageLabel(pathname: string) {
  if (pathname.startsWith(PATHS.profile)) return "Profile";
  if (pathname.startsWith(PATHS.ui_kit)) return "UI Kit";
  return "Home";
}

export function AppHeader() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const pageLabel = getPageLabel(pathname);
  const displayName = getDisplayName(user) || "User";
  const avatarUrl = user?.profileUrl;

  return (
    <header className="z-20 flex shrink-0 items-center gap-18 border-b bg-white-normal px-6 py-4">
      <img src={NVMLogo} alt="" className="md:w-40 w-25 ml-4 sm:ml-0" />
      <div className="flex justify-between flex-1">
        <div className="flex min-w-0 items-center gap-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-body-sm"
          >
            <span className="text-grey-light">Pages</span>
            <span className="text-grey-light">/</span>
            <span className="text-primary-500">{pageLabel}</span>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-default px-1.5 py-1 outline-none hover:bg-white-light focus-visible:ring-0">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt=""
                  className="size-8 rounded-full object-cover bg-primary-50"
                />
              ) : (
                <span className="flex size-8 items-center justify-center rounded-full bg-primary-50 text-caption font-medium text-primary-500">
                  {getInitials(displayName)}
                </span>
              )}
              <span className="hidden max-w-40 truncate text-body-sm text-grey-normal sm:inline">
                {displayName}
              </span>
              <div className="flex items-center justify-center bg-primary-50 px-1 py-0.5 rounded-default">
                <ChevronDownIcon className="size-4 text-primary-500" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-40 rounded-default"
            >
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={() => navigate(PATHS.profile)}
              >
                <div className="bg-primary-50 rounded-full p-1.5 mr-2">
                  <UserIcon className="size-4 text-primary" />
                </div>
                <span className="font-medium">View Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={() => void logout()}
              >
                <div className="bg-primary-50 rounded-full p-1.5 mr-2">
                  <LogOutIcon className="size-4 text-primary" />
                </div>
                <span className="text-danger font-medium">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
