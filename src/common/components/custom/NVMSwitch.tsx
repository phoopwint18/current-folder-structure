import { type ComponentProps } from "react";
import { Switch } from "../ui/switch";
import { cn } from "@/common/utils";

const NVMSwitch = ({ className, ...props }: ComponentProps<typeof Switch>) => {
  return (
    <Switch
      className={cn(
        "h-6 w-11 rounded-[50px] border-0 shadow-none focus-visible:ring-0 data-unchecked:bg-grey-pale data-checked:bg-green-linear-switch [&_[data-slot=switch-thumb]]:size-5 [&_[data-slot=switch-thumb]]:bg-white-normal data-checked:[&_[data-slot=switch-thumb]]:translate-x-[22px]",
        className,
      )}
      {...props}
    />
  );
};

export default NVMSwitch;
