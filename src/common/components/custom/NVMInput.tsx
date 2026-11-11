import {
  type ReactNode,
  type ComponentPropsWithoutRef,
  forwardRef,
} from "react";
import { Input } from "../ui/input";
import { cn } from "@/common/utils";
import { inputVariants, type InputVariantsProps } from "../form/InputVariants";

type NVMInputProps = InputVariantsProps &
  Omit<ComponentPropsWithoutRef<typeof Input>, "children"> & {
    suffix?: ReactNode;
  };

const NVMInput = forwardRef<HTMLInputElement, NVMInputProps>(
  ({ state, suffix, className, ...props }, ref) => {
    return (
      <div className="relative">
        <Input
          ref={ref}
          {...props}
          className={cn(inputVariants({ state }), suffix && "pr-8", className)}
          aria-invalid={state === "error" || props["aria-invalid"]}
        />
        {suffix ? (
          <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
            {suffix}
          </span>
        ) : null}
      </div>
    );
  },
);

export default NVMInput;
