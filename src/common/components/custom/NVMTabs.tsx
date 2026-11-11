import { type ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/common/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const nvmTabsListVariants = cva(
  "group/tabs-list flex p-[6px] items-center gap-[10px]",
  {
    variants: {
      variant: {
        default: "bg-white-light text-grey-light",
        line: "rounded-none bg-transparent p-0 text-grey-light",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type NVMTabsListProps = ComponentProps<typeof TabsList> &
  VariantProps<typeof nvmTabsListVariants>;

const NVMTabs = ({ className, ...props }: ComponentProps<typeof Tabs>) => {
  return <Tabs className={cn(className)} {...props} />;
};

const NVMTabsList = ({
  className,
  variant = "default",
  ...props
}: NVMTabsListProps) => {
  return (
    <TabsList
      data-variant={variant}
      className={cn(nvmTabsListVariants({ variant }), className)}
      {...props}
    />
  );
};

const NVMTabsTrigger = ({
  className,
  ...props
}: ComponentProps<typeof TabsTrigger>) => {
  return (
    <TabsTrigger
      className={cn(
        "text-body-sm font-normal text-grey-medium hover:text-primary-500",
        "data-[state=active]:bg-linear data-[state=active]:text-white",
        // "data-[state=active]:rounded-lg data-[state=active]:px-8 data-[state=active]:py-2",
        "group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:bg-transparent",
        "group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none",
        "relative after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-primary-500 after:opacity-0 after:content-['']",
        "group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
        className,
      )}
      {...props}
    />
  );
};

const NVMTabsContent = ({
  className,
  ...props
}: ComponentProps<typeof TabsContent>) => {
  return <TabsContent className={cn(className)} {...props} />;
};

export { NVMTabs, NVMTabsList, NVMTabsTrigger, NVMTabsContent };
export default NVMTabs;
