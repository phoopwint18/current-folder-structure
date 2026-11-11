import { type ComponentProps, forwardRef } from "react";
import { cn } from "@/common/utils";
import { Textarea } from "../ui/textarea";
import { inputVariants, type InputVariantsProps } from "../form/InputVariants";

type NVMTextareaProps = InputVariantsProps &
  ComponentProps<typeof Textarea> & {
    rows?: number;
  };

const NVMTextarea = forwardRef<HTMLTextAreaElement, NVMTextareaProps>(
  ({ className, state, rows, ...props }, ref) => {
    return (
      <Textarea
        ref={ref}
        rows={rows || 4}
        className={cn(inputVariants({ state }), className)}
        aria-invalid={state === "error" || props["aria-invalid"]}
        {...props}
      />
    );
  },
);

NVMTextarea.displayName = "NVMTextarea";

export default NVMTextarea;
