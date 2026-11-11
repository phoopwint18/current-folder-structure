import type { ReactNode } from "react";
import { cn } from "../utils";

export function LabelValueDisplay({
  label,
  value,
  valueClassName,
  trailing,
  align = "start",
  layout = "row",
}: {
  label: string;
  value: string | null | undefined | ReactNode;
  valueClassName?: string;
  trailing?: ReactNode;
  align?: "start" | "center";
  layout?: "row" | "column";
}) {
  const isColumn = layout === "column";

  return (
    <div
      className={cn(
        "flex",
        isColumn ? "flex-col gap-1" : "flex-row justify-between gap-4",
        align === "center" ? "items-center" : "items-start",
      )}
    >
      <span className="shrink-0 text-sm text-grey-light">{label}</span>
      <span
        className={cn(
          "flex items-center gap-1 text-sm wrap-break-word font-medium",
          isColumn ? "justify-start text-left" : "justify-end text-right",
          valueClassName,
        )}
      >
        {value ? value : trailing ? null : "—"}
        {trailing}
      </span>
    </div>
  );
}
