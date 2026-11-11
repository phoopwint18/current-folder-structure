import { cn } from "@/common/utils";

type NVMDividerProps = {
  className?: string;
};

const NVMDivider = ({ className }: NVMDividerProps) => {
  return (
    <div
      role="separator"
      className={cn("border-t border-dashed border-gray-200", className)}
    />
  );
};

export default NVMDivider;
