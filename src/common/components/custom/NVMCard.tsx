import { cva, type VariantProps } from "class-variance-authority";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/common/utils";
import { type CSSProperties, type ComponentProps, type ReactNode } from "react";

const nvmCardVariants = cva("rounded-default ring-0", {
  variants: {
    variant: {
      default:
        "bg-white-normal text-grey-medium shadow-[0_4px_40px_0_rgba(0,0,0,0.05)] drop-shadow-[4px_4px_50px_0px_#0000000D] ring-0",
      outlined: "border-2 border-primary-50",
      dashed:
        "border-[0.4px] border-dashed border-primary-300 bg-primary-50 rounded-[15px]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type NVMCardProps = VariantProps<typeof nvmCardVariants> &
  Omit<ComponentProps<typeof Card>, "title"> & {
    background?: string;
    border?: string;
    title?: ReactNode;
  };

const NVMCard = ({
  variant,
  background,
  border,
  title,
  className,
  style,
  children,
  ...props
}: NVMCardProps) => {
  const dynamicStyle: CSSProperties = {
    ...style,
    ...(background ? { backgroundColor: background } : {}),
    ...(border ? { borderColor: border } : {}),
  };

  return (
    <Card
      {...props}
      style={dynamicStyle}
      className={cn(nvmCardVariants({ variant }), className)}
    >
      {title ? (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      ) : null}
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default NVMCard;
