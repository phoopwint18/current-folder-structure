import React, { type ReactNode } from "react";
import { inputVariants, type InputVariantsProps } from "../form/InputVariants";
import { Input } from "../ui/input";
import { cn } from "@/common/utils";

type NVMInputNumberProps = InputVariantsProps &
  Omit<React.ComponentPropsWithoutRef<typeof Input>, "children"> & {
    prefix?: ReactNode;
    validator?: "phoneNumber" | "amount" | "numberOnly";
  };

const numberRegex = /[^0-9]/g;

export const NVMInputNumber = React.forwardRef<
  HTMLInputElement,
  NVMInputNumberProps
>(({ className, state, prefix, validator = "numberOnly", ...props }, ref) => {
  const {
    type,
    inputMode,
    pattern,
    autoComplete,
    onChange: onChangeProp,
    ...restProps
  } = props;

  const resolvedType = type ?? (validator === "phoneNumber" ? "tel" : "text");
  const resolvedInputMode =
    inputMode ?? (validator === "phoneNumber" ? "tel" : "numeric");
  const resolvedPattern = pattern ?? "[0-9]*";
  const resolvedAutoComplete =
    autoComplete ?? (validator === "phoneNumber" ? "tel" : "off");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validator) {
      if (validator === "phoneNumber") {
        e.target.value = e.target.value.replace(numberRegex, "");
        onChangeProp?.(e);
      }
      if (validator === "numberOnly") {
        e.target.value = e.target.value.replace(numberRegex, "");
        onChangeProp?.(e);
      }
      if (validator === "amount") {
        let result = e.target.value.replace(numberRegex, "");
        if (result.startsWith("0")) {
          result = result.replace(/^0+/, "");
        }
        e.target.value = result;
        onChangeProp?.(e);
      }
    } else {
      onChangeProp?.(e);
    }
  };

  return (
    <div className="relative">
      {prefix && <span className="absolute left-3 top-2.5">{prefix}</span>}
      <Input
        ref={ref}
        className={cn(inputVariants({ state }), prefix && "pl-8", className)}
        type={resolvedType}
        inputMode={resolvedInputMode}
        pattern={resolvedPattern}
        autoComplete={resolvedAutoComplete}
        {...restProps}
        aria-invalid={state === "error" || restProps["aria-invalid"]}
        onChange={onChange}
      />
    </div>
  );
});
