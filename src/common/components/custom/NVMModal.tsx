import { type ReactNode } from "react";
import rejectQuestionIcon from "@/assets/reject-question.svg";
import successIcon from "@/assets/success.svg";
import questionIcon from "@/assets/question.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { cn } from "@/common/utils";
import { getErrorMessage } from "@/core/api";
import NVMButton from "./NVMButton";
import nvmToast from "./NVMToast";

type ModalVariant = "default" | "form" | "alert";
type AlertTone = "default" | "danger" | "success";

type NVMModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant?: ModalVariant;
  title: string;
  description?: string;
  children?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  footerStart?: ReactNode;
  onConfirm?: () => boolean | void | Promise<boolean | void>;
  onCancel?: () => void;
  loading?: boolean;
  tone?: AlertTone;
  icon?: ReactNode;
  className?: string;
  closeOnConfirm?: boolean;
  hideFooter?: boolean;
  hideCancel?: boolean;
  formId?: string;
};

const alertIcons = {
  default: questionIcon,
  danger: rejectQuestionIcon,
  success: successIcon,
};

const alertIconBackground = {
  default: "bg-caution-pale",
  danger: "bg-primary-50",
  success: "bg-success-pale",
};

const NVMModal = ({
  open,
  onOpenChange,
  variant = "default",
  title,
  description,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  footerStart,
  onConfirm,
  onCancel,
  loading = false,
  tone = "default",
  icon,
  className,
  closeOnConfirm = true,
  hideFooter = false,
  hideCancel = false,
  formId,
}: NVMModalProps) => {
  const isAlert = variant === "alert";
  const AlertIcon = alertIcons[tone];

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      onCancel?.();
    }
    onOpenChange(nextOpen);
  }

  async function handleConfirm() {
    try {
      const result = await onConfirm?.();
      if (result === false) {
        return;
      }
      if (closeOnConfirm) {
        onOpenChange(false);
      }
    } catch (error) {
      nvmToast.reject(getErrorMessage(error));
    }
  }

  function handleCancel() {
    onCancel?.();
    onOpenChange(false);
  }

  const body = (
    <>
      <DialogHeader
        className={cn("shrink-0", isAlert && "items-center text-center")}
      >
        {isAlert ? (
          <div
            className={cn(
              "flex items-center justify-center rounded-full p-2",
              alertIconBackground[tone],
            )}
          >
            {icon ?? <img src={AlertIcon} alt="" className="size-18" />}
          </div>
        ) : null}
        <DialogTitle className="leading-6 font-bold">{title}</DialogTitle>
        {description ? (
          <DialogDescription>{description}</DialogDescription>
        ) : null}
      </DialogHeader>
      {children ? (
        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin">
          <div className="grid gap-4">{children}</div>
        </div>
      ) : null}
      {hideFooter ? null : (
        <DialogFooter
          className={cn(
            "shrink-0 bg-transparent border-t-0 pt-0 mx-0 px-2.5",
            footerStart &&
              "flex-col sm:flex-row sm:items-center sm:justify-between",
            isAlert && "w-full flex-row sm:flex-row",
          )}
        >
          {footerStart}
          <div
            className={cn(
              footerStart
                ? "flex flex-col-reverse gap-2 sm:flex-row"
                : "flex justify-center gap-2",
              isAlert && "w-full flex-row",
            )}
          >
            {hideCancel ? null : (
              <NVMButton
                variant="cancel"
                onClick={handleCancel}
                disabled={loading}
                className={isAlert ? "flex-1" : "w-fit"}
              >
                {cancelText}
              </NVMButton>
            )}
            <NVMButton
              type={formId ? "submit" : "button"}
              form={formId}
              variant={tone === "danger" ? "danger" : "success"}
              className={isAlert ? "flex-1" : "w-fit"}
              loading={loading}
              onClick={formId ? undefined : () => void handleConfirm()}
            >
              {confirmText}
            </NVMButton>
          </div>
        </DialogFooter>
      )}
    </>
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "flex max-h-[85vh] flex-col overflow-hidden",
          isAlert ? "sm:max-w-sm" : "sm:max-w-lg",
          className,
        )}
        showCloseButton={!isAlert}
      >
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden">
          {body}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NVMModal;
