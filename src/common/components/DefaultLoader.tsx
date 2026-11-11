import { Loader2Icon } from "lucide-react";
import { cn } from "@/common/utils";

type DefaultLoaderProps = {
  className?: string;
  /** `content` stays compact. `page` fills the layout content area. `screen` fills the viewport. */
  center?: "content" | "page" | "screen";
};

const DefaultLoader = ({
  className,
  center = "content",
}: DefaultLoaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center",
        center === "content" && "min-h-40",
        center === "page" && "min-h-[40vh] flex-1",
        center === "screen" && "min-h-svh",
        className,
      )}
    >
      <Loader2Icon className="size-8 animate-spin text-primary-500" />
    </div>
  );
};

export default DefaultLoader;
