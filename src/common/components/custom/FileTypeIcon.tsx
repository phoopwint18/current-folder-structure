import {
  FileIcon,
  FileImageIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
} from "lucide-react";
import { cn } from "@/common/utils";

type FileKind = "pdf" | "excel" | "image" | "file";

const kindStyles: Record<FileKind, string> = {
  pdf: "bg-danger-pale text-danger",
  excel: "bg-success-pale text-success",
  image: "bg-primary-50 text-primary-500",
  file: "bg-white-light text-grey-normal",
};

const kindIcons = {
  pdf: FileTextIcon,
  excel: FileSpreadsheetIcon,
  image: FileImageIcon,
  file: FileIcon,
};

export function getFileKind(fileType?: string, fileName?: string): FileKind {
  const value = `${fileType ?? ""} ${fileName ?? ""}`.toLowerCase();

  if (value.includes("pdf")) {
    return "pdf";
  }

  if (/(xlsx|xls|csv|excel|spreadsheet|sheet)/.test(value)) {
    return "excel";
  }

  if (/(png|jpe?g|gif|webp|svg|bmp|image|img)/.test(value)) {
    return "image";
  }

  return "file";
}

export function FileTypeIcon({
  fileType,
  fileName,
  className,
}: {
  fileType?: string;
  fileName?: string;
  className?: string;
}) {
  const kind = getFileKind(fileType, fileName);
  const Icon = kindIcons[kind];

  return (
    <span
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-lg",
        kindStyles[kind],
        className,
      )}
      aria-hidden
    >
      <Icon className="size-4" />
    </span>
  );
}
