import { cva, type VariantProps } from "class-variance-authority";
import { Badge } from "../ui/badge";
import { cn } from "@/common/utils";
import { type ComponentProps, type ReactNode } from "react";

const nvmBadgeVariants = cva(
  "rounded-default border-0 font-medium text-white",
  {
    variants: {
      variant: {
        default: "bg-grey-normal",
        primary: "bg-primary-500",
        success: "bg-success",
        danger: "bg-danger",
        grey: "bg-grey-light text-grey-medium",
      },
      size: {
        sm: "h-5 px-1.5 text-[10px]",
        md: "h-6 px-2 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

type NVMBadgeProps = VariantProps<typeof nvmBadgeVariants> &
  Omit<ComponentProps<typeof Badge>, "variant"> & {
    icon?: ReactNode;
  };

const NVMBadge = ({
  variant,
  size,
  icon,
  className,
  children,
  ...props
}: NVMBadgeProps) => {
  return (
    <Badge
      {...props}
      className={cn(nvmBadgeVariants({ variant, size }), className)}
    >
      {icon}
      {children}
    </Badge>
  );
};

export default NVMBadge;
