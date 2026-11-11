import type { ReactNode } from "react";

export function SectionHeading({
  icon,
  title,
  count,
  limit,
}: {
  icon: ReactNode;
  title: string;
  count?: number;
  limit?: number;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-primary">
        <div className="rounded-[18px] bg-primary-50 px-2 py-1">{icon}</div>
        <p className="font-medium text-linear">{title}</p>
      </div>
      {count != null && limit != null ? (
        <span className="rounded-full bg-primary-50 px-2 py-1 text-xs font-medium text-primary-500">
          {count} / {limit}
        </span>
      ) : null}
    </div>
  );
}
