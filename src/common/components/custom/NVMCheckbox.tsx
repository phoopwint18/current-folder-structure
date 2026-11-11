import { type ReactNode, type ComponentProps } from "react";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/common/utils";

type NVMCheckboxProps = ComponentProps<typeof Checkbox> & {
  label?: ReactNode;
};

const NVMCheckbox = ({ className, label, ...props }: NVMCheckboxProps) => {
  const checkbox = (
    <Checkbox
      className={cn(
        "size-5 rounded-[5px] border-grey-pale bg-white-normal shadow-none focus-visible:ring-0 data-checked:border-transparent data-checked:bg-linear data-checked:text-white-normal",
        className,
      )}
      {...props}
    />
  );

  if (!label) {
    return checkbox;
  }

  return (
    <label className="flex items-center gap-2">
      {checkbox}
      <span className="text-body-sm text-grey-normal">{label}</span>
    </label>
  );
};

export default NVMCheckbox;
