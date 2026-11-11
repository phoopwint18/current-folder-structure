import { useEffect, useRef, useState } from "react";
import { CalendarIcon, XIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn, formatDate } from "@/common/utils";
import { inputVariants } from "../form/InputVariants";

type NVMRangePickerProps = {
  id?: string;
  name?: string;
  value?: DateRange;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  state?: "default" | "error";
  onBlur?: () => void;
  onChange?: (value: DateRange | undefined) => void;
};

function isValidDate(value?: Date): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isCompleteRange(range?: DateRange) {
  const from = range?.from;
  const to = range?.to;

  return isValidDate(from) && isValidDate(to) && !sameDay(from, to);
}

function orderedRange(start: Date, end: Date): DateRange {
  return start.getTime() <= end.getTime()
    ? { from: start, to: end }
    : { from: end, to: start };
}

function dateFromNode(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return undefined;
  }

  const day = target.closest<HTMLElement>("[data-day-time]");

  if (!day || day.matches(":disabled")) {
    return undefined;
  }

  const time = Number(day.dataset.dayTime);

  if (!Number.isFinite(time)) {
    return undefined;
  }

  return new Date(time);
}

function formatRangeLabel(value?: DateRange) {
  const from = value?.from;
  const to = value?.to;

  if (!isValidDate(from)) {
    return "";
  }

  if (!isValidDate(to) || sameDay(from, to)) {
    return formatDate(from);
  }

  return `${formatDate(from)} - ${formatDate(to)}`;
}

const NVMRangePicker = ({
  id,
  value,
  placeholder = "Pick a date",
  disabled,
  className,
  state,
  onBlur,
  onChange,
}: NVMRangePickerProps) => {
  const [open, setOpen] = useState(false);
  const label = formatRangeLabel(value);
  const onChangeRef = useRef(onChange);
  const suppressSelectRef = useRef(false);
  const dragRef = useRef({
    active: false,
    moved: false,
    anchor: undefined as Date | undefined,
    range: undefined as DateRange | undefined,
  });

  onChangeRef.current = onChange;

  useEffect(() => {
    function updateRange(date: Date) {
      const anchor = dragRef.current.anchor;

      if (!anchor) {
        return;
      }

      if (sameDay(anchor, date)) {
        if (!dragRef.current.moved) {
          return;
        }

        const range = { from: anchor, to: undefined };
        dragRef.current.range = range;
        onChangeRef.current?.(range);
        return;
      }

      dragRef.current.moved = true;
      const range = orderedRange(anchor, date);
      dragRef.current.range = range;
      onChangeRef.current?.(range);
    }

    function handlePointerMove(event: PointerEvent) {
      if (!dragRef.current.active) {
        return;
      }

      const date = dateFromNode(
        document.elementFromPoint(event.clientX, event.clientY),
      );

      if (date) {
        updateRange(date);
      }
    }

    function handlePointerUp() {
      if (!dragRef.current.active) {
        return;
      }

      const moved = dragRef.current.moved;
      const range = dragRef.current.range;
      dragRef.current.active = false;
      dragRef.current.moved = false;
      dragRef.current.anchor = undefined;
      dragRef.current.range = undefined;

      if (!moved) {
        return;
      }

      suppressSelectRef.current = true;

      if (isCompleteRange(range)) {
        setOpen(false);
      }
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, []);

  return (
    <div className="relative">
      <CalendarIcon className="pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 text-primary-500" />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id={id}
            type="button"
            disabled={disabled}
            data-empty={!label}
            aria-invalid={state === "error"}
            className={cn(
              inputVariants({ state }),
              "flex justify-start pr-8 pl-9 text-left font-normal data-[empty=true]:text-grey-light items-center",
              state === "error"
                ? "border-[0.5px] border-destructive"
                : "border-[0.5px] border-grey-pale",
              label && "text-grey-normal",
              className,
            )}
            onBlur={onBlur}
          >
            {label || placeholder}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto touch-none p-0"
          align="start"
          onPointerDown={(event) => {
            if (event.button !== 0) {
              return;
            }

            const date = dateFromNode(event.target);

            if (!date) {
              return;
            }

            suppressSelectRef.current = false;
            dragRef.current.active = true;
            dragRef.current.moved = false;
            dragRef.current.anchor = date;
            dragRef.current.range = undefined;
          }}
        >
          <Calendar
            mode="range"
            defaultMonth={isValidDate(value?.from) ? value?.from : undefined}
            selected={value}
            onSelect={(range) => {
              if (suppressSelectRef.current) {
                suppressSelectRef.current = false;
                return;
              }

              onChange?.(range);

              if (isCompleteRange(range)) {
                setOpen(false);
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      {label ? (
        <button
          type="button"
          className="absolute top-1/2 right-3 -translate-y-1/2 text-grey-light"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onChange?.({ from: undefined, to: undefined });
          }}
        >
          <XIcon className="size-4" />
        </button>
      ) : null}
    </div>
  );
};

export default NVMRangePicker;
