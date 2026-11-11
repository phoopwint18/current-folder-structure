import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/common/utils";
import { type ReactNode } from "react";

const nvmButtonVariants = cva(
  "rounded-[10px] border border-transparent font-normal! shadow-none focus-visible:ring-0 disabled:!bg-grey-pale disabled:text-grey-light disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-100 disabled:border-transparent",
  {
    variants: {
      variant: {
        primary: "bg-primary-500 text-white-normal hover:bg-primary-600",
        outline:
          "border-primary-300 bg-transparent text-primary-300 hover:bg-primary-25",
        transparent: "bg-primary-50 text-primary-500 hover:bg-primary-100",
        cancel: "bg-white-light text-grey-normal hover:bg-grey-pale",
        success: "bg-success text-white-normal hover:bg-success/70",
        pending: "bg-caution text-white-normal hover:bg-caution/70",
        link: "bg-transparent underline text-primary-500 hover:no-underline hover:bg-transparent",
        danger: "bg-danger text-white-normal hover:bg-danger/70",
        linear: "bg-linear text-white hover:bg-linear/70",
      },
      size: {
        xs: "h-7 px-2 text-xs",
        sm: "h-8 px-3 text-sm",
        md: "h-9 px-4 text-sm",
        lg: "h-10 px-5 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type NVMButtonProps = VariantProps<typeof nvmButtonVariants> &
  Omit<React.ComponentProps<typeof Button>, "variant"> & {
    loading?: boolean;
    icon?: ReactNode;
  };

const NVMButton = ({
  variant,
  size,
  icon,
  loading,
  className,
  type = "button",
  ...props
}: NVMButtonProps) => {
  return (
    <Button
      {...props}
      type={type}
      disabled={loading || props.disabled}
      className={cn(
        nvmButtonVariants({ variant, size }),
        loading && "pointer-events-none",
        className,
      )}
    >
      {loading && <Loader2Icon className="animate-spin" />}
      {!loading && (
        <>
          {icon && (
            <span className={props.children ? "mr-0.5" : ""}>{icon}</span>
          )}
          {props.children}
        </>
      )}
    </Button>
  );
};

export default NVMButton;
