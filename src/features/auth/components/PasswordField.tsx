import { NVMInput } from "@/common/components";
import { cn } from "@/common/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";

type PasswordFieldProps = Omit<
  ComponentPropsWithoutRef<typeof NVMInput>,
  "type" | "suffix"
>;

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ className, disabled, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="relative">
        <NVMInput
          ref={ref}
          {...props}
          disabled={disabled}
          type={visible ? "text" : "password"}
          className={cn("pr-10", className)}
        />
        <button
          type="button"
          disabled={disabled}
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-grey-light disabled:pointer-events-none"
        >
          {visible ? (
            <EyeIcon className="size-4" />
          ) : (
            <EyeOffIcon className="size-4" />
          )}
        </button>
      </div>
    );
  },
);
