import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/common/utils";
import { type ElementType, type ComponentPropsWithoutRef } from "react";

const nvmTypographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4",
      h5: "text-h5",
      body: "text-body",
      bodySm: "text-body-sm",
      caption: "text-caption",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

const defaultElement = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  body: "p",
  bodySm: "p",
  caption: "span",
} as const;

type NVMTypographyProps = VariantProps<typeof nvmTypographyVariants> &
  ComponentPropsWithoutRef<"p"> & {
    as?: ElementType;
  };

const NVMTypography = ({
  variant = "body",
  as,
  className,
  ...props
}: NVMTypographyProps) => {
  const Comp = as ?? defaultElement[variant ?? "body"];

  return (
    <Comp
      className={cn(nvmTypographyVariants({ variant }), className)}
      {...props}
    />
  );
};

export default NVMTypography;
