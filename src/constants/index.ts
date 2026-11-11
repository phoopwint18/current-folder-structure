import { PATHS } from "@/core/routes/path";
import { House, LayoutGrid, type LucideIcon } from "lucide-react";

export const PAGE_SIZE = 20;

export type SideNavItem = {
  id: string;
  name: string;
  path: string;
  icon: LucideIcon;
};

export const SIDE_NAVS: SideNavItem[] = [
  {
    id: "home",
    name: "Home",
    path: PATHS.home,
    icon: House,
  },
  {
    id: "ui-kit",
    name: "UI Kit",
    path: PATHS.ui_kit,
    icon: LayoutGrid,
  },
];
