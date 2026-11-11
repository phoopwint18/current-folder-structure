import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import NVMButton from "./NVMButton";

type NVMPaginationProps = {
  page: number;
  totalPages: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
};

const WINDOW = 5;

export function pageFromSearch(params: URLSearchParams) {
  const value = Number(params.get("page"));
  return Number.isInteger(value) && value > 0 ? value : 0;
}

export function writePageParam(params: URLSearchParams, page: number) {
  if (page > 0) {
    params.set("page", String(page));
    return;
  }

  params.delete("page");
}

function visiblePages(page: number, totalPages: number) {
  const current = page + 1;
  let start = Math.max(1, current - Math.floor(WINDOW / 2));
  let end = Math.min(totalPages, start + WINDOW - 1);
  start = Math.max(1, end - WINDOW + 1);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export function NVMPagination({
  page,
  totalPages,
  disabled = false,
  onPageChange,
}: NVMPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = visiblePages(page, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-end gap-2"
    >
      <NVMButton
        variant="outline"
        size="sm"
        disabled={disabled || page <= 0}
        icon={<ChevronLeftIcon className="size-4" />}
        onClick={() => onPageChange(page - 1)}
      />
      {pages.map((item) => (
        <NVMButton
          key={item}
          variant={item === page + 1 ? "primary" : "outline"}
          size="sm"
          className="min-w-8 px-2"
          disabled={disabled}
          onClick={() => onPageChange(item - 1)}
        >
          {item}
        </NVMButton>
      ))}
      <NVMButton
        variant="outline"
        size="sm"
        icon={<ChevronRightIcon className="size-4" />}
        disabled={disabled || page + 1 >= totalPages}
        onClick={() => onPageChange(page + 1)}
      />
    </nav>
  );
}
