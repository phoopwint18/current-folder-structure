import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, ClockIcon, LoaderCircleIcon, XIcon } from "lucide-react";
import { type ComponentProps, type ReactNode } from "react";
import { toast, Toaster } from "sonner";
import { cn } from "@/common/utils";

const nvmToastVariants = cva(
  "flex w-full max-w-full items-center gap-[10px] overflow-hidden rounded-[15px] px-[16px] py-[10px] border-[1.5px] shadow-[2px_2px_30px_0_rgba(0,0,0,0.08)] text-sm transition-all duration-200",
  {
    variants: {
      variant: {
        success: "bg-success-pale border-[#D8FBDF] text-success-strong",
        pending: "bg-caution-pale border-[#F6ECC5] text-secondary-300",
        reject: "bg-danger-pale border-[#F6C5C5] text-danger-strong",
        preparing: "bg-primary-50 border-[#F6DCC5] text-primary-300",
      },
    },
    defaultVariants: { variant: "success" },
  },
);

const nvmToastIconWrapperVariants = cva(
  "flex size-5 shrink-0 items-center justify-center rounded-full",
  {
    variants: {
      variant: {
        success: "bg-success",
        pending: "bg-caution",
        reject: "bg-danger",
        preparing: "bg-primary-300",
      },
    },
    defaultVariants: { variant: "success" },
  },
);

type ToastVariant = NonNullable<
  VariantProps<typeof nvmToastVariants>["variant"]
>;

export interface NVMToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  id?: string | number;
  toasterId?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const TOAST_ICONS: Record<ToastVariant, ReactNode> = {
  success: <CheckIcon className="size-3 text-white" strokeWidth={3} />,
  pending: <ClockIcon className="size-3 text-white" strokeWidth={2.5} />,
  reject: <XIcon className="size-3 text-white" strokeWidth={3} />,
  preparing: (
    <LoaderCircleIcon className="size-3 text-white" strokeWidth={2.5} />
  ),
};

const NVMToastIcon = ({ variant }: { variant: ToastVariant }) => (
  <span className={cn(nvmToastIconWrapperVariants({ variant }))}>
    {TOAST_ICONS[variant]}
  </span>
);

const NVMToastContent = ({
  title,
  description,
  variant = "success",
  action,
  onDismiss,
}: {
  title: string;
  description?: string;
  variant?: ToastVariant;
  action?: { label: string; onClick: () => void };
  onDismiss?: () => void;
}) => (
  <div className={cn(nvmToastVariants({ variant }))}>
    <NVMToastIcon variant={variant} />

    <div className="min-w-0 flex-1">
      <p className="text-small leading-tight font-medium break-words whitespace-normal">
        {title}
      </p>
      {description && (
        <p className="text-small text-secondary-200 mt-0.5 leading-snug break-words whitespace-normal opacity-80">
          {description}
        </p>
      )}
    </div>

    {action && (
      <button
        type="button"
        onClick={() => {
          action.onClick();
          onDismiss?.();
        }}
        className="shrink-0 text-xs font-medium whitespace-nowrap underline opacity-70 transition-opacity hover:opacity-100"
      >
        {action.label}
      </button>
    )}

    <button
      type="button"
      onClick={onDismiss}
      className="shrink-0 opacity-50 transition-opacity hover:opacity-100"
      aria-label="Dismiss"
    >
      <XIcon className="size-4" />
    </button>
  </div>
);

export const nvmToast = ({
  title,
  description,
  variant = "success",
  duration = 4000,
  id,
  toasterId,
  action,
}: NVMToastOptions) => {
  const toastId = id ?? `nvm-${crypto.randomUUID()}`;

  toast.custom(
    () => (
      <NVMToastContent
        title={title}
        description={description}
        variant={variant}
        action={action}
        onDismiss={() => toast.dismiss(toastId)}
      />
    ),
    { duration, id: toastId, toasterId },
  );

  return toastId;
};

nvmToast.success = (
  title: string,
  opts?: Omit<NVMToastOptions, "title" | "variant">,
) => nvmToast({ ...opts, title, variant: "success" });
nvmToast.pending = (
  title: string,
  opts?: Omit<NVMToastOptions, "title" | "variant">,
) => nvmToast({ ...opts, title, variant: "pending" });
nvmToast.reject = (
  title: string,
  opts?: Omit<NVMToastOptions, "title" | "variant">,
) => nvmToast({ ...opts, title, variant: "reject" });
nvmToast.preparing = (
  title: string,
  opts?: Omit<NVMToastOptions, "title" | "variant">,
) => nvmToast({ ...opts, title, variant: "preparing" });
nvmToast.dismiss = toast.dismiss;

export default nvmToast;

export const NVMToaster = ({
  position = "top-center",
  className,
  ...props
}: ComponentProps<typeof Toaster>) => (
  <Toaster
    position={position}
    className={cn("w-full max-w-sm", className)}
    toastOptions={{
      unstyled: true,
      classNames: { toast: "w-full max-w-full overflow-hidden" },
    }}
    {...props}
  />
);
