import { type ReactNode, type ComponentProps } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { cn } from "@/common/utils";

const NVMRadioGroup = ({
  className,
  ...props
}: ComponentProps<typeof RadioGroup>) => {
  return <RadioGroup className={cn("gap-3", className)} {...props} />;
};

type NVMRadioProps = ComponentProps<typeof RadioGroupItem> & {
  label?: ReactNode;
};

const NVMRadio = ({ className, label, ...props }: NVMRadioProps) => {
  const radio = (
    <RadioGroupItem
      className={cn(
        "size-5 border border-primary-500 bg-white-normal shadow-none focus-visible:ring-0 data-checked:border-transparent data-checked:bg-linear",
        className,
      )}
      {...props}
    />
  );

  if (!label) {
    return radio;
  }

  return (
    <label className="flex items-center gap-2">
      {radio}
      <span className="text-body-sm text-grey-normal">{label}</span>
    </label>
  );
};

export { NVMRadioGroup, NVMRadio };
export default NVMRadio;
