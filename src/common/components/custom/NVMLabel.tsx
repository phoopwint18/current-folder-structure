import { type ComponentProps } from "react";
import { Label } from "../ui/label";
import { cn } from "@/common/utils";

const NVMLabel = ({ className, ...props }: ComponentProps<typeof Label>) => {
  return (
    <Label
      className={cn("text-body-sm font-normal text-grey-normal", className)}
      {...props}
    />
  );
};

export default NVMLabel;
