import type { User } from "@/common/types";

export function getDisplayName(user: User | null | undefined) {
  return (
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.fullName ||
    ""
  );
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
