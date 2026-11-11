import { useState } from "react";
import { CalendarIcon, ClockIcon, XIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn, formatDate, formatQueryDate, parseDate } from "@/common/utils";
import { inputVariants } from "../form/InputVariants";

type NVMDatePickerMode = "date" | "time" | "dateTime";

type NVMDatePickerProps = {
  id?: string;
  name?: string;
  value?: string;
  mode?: NVMDatePickerMode;
  placeholder?: string;
  disabled?: boolean;
  min?: string;
  max?: string;
  className?: string;
  state?: "default" | "error";
  onBlur?: () => void;
  onChange?: (value: string) => void;
};

function parseLocalDate(value?: string) {
  return parseDate(value);
}

function parseTimeValue(value?: string) {
  const match = /^(\d{2}):(\d{2})/.exec(value?.trim() ?? "");

  if (!match) {
    return undefined;
  }

  const date = new Date();
  date.setHours(Number(match[1]), Number(match[2]), 0, 0);
  return date;
}

function parsePickerValue(value: string | undefined, mode: NVMDatePickerMode) {
  if (mode === "time") {
    return parseTimeValue(value);
  }

  return parseLocalDate(value);
}

function toLocalDateString(date: Date) {
  return formatQueryDate(date);
}

function toTimeString(date: Date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function toDateTimeString(date: Date) {
  return `${toLocalDateString(date)}T${toTimeString(date)}`;
}

function formatPickerLabel(date: Date, mode: NVMDatePickerMode) {
  if (mode === "time") {
    return formatDate(date, "time");
  }

  if (mode === "dateTime") {
    return formatDate(date, "dateTime");
  }

  return formatDate(date);
}

function defaultPlaceholder(mode: NVMDatePickerMode) {
  if (mode === "time") {
    return "Pick a time";
  }

  if (mode === "dateTime") {
    return "Pick a date and time";
  }

  return "Pick a date";
}

const NVMDatePicker = ({
  id,
  value,
  mode = "date",
  placeholder,
  disabled,
  min,
  max,
  className,
  state,
  onBlur,
  onChange,
}: NVMDatePickerProps) => {
  const [open, setOpen] = useState(false);
  const selected = parsePickerValue(value, mode);
  const minDate = mode === "time" ? undefined : parseLocalDate(min);
  const maxDate = mode === "time" ? undefined : parseLocalDate(max);
  const PickerIcon = mode === "time" ? ClockIcon : CalendarIcon;
  const label = placeholder || defaultPlaceholder(mode);

  function selectDate(date: Date | undefined) {
    if (mode === "date") {
      onChange?.(date ? toLocalDateString(date) : "");
      if (date) {
        setOpen(false);
      }
      return;
    }

    if (!date) {
      onChange?.("");
      return;
    }

    const next = new Date(date);
    next.setHours(selected?.getHours() ?? 0, selected?.getMinutes() ?? 0, 0, 0);
    onChange?.(toDateTimeString(next));
  }

  function selectTime(time: string) {
    if (!time) {
      onChange?.("");
      return;
    }

    if (mode === "time") {
      onChange?.(time.slice(0, 5));
      return;
    }

    const base = selected ?? new Date();
    const [hours, minutes] = time.split(":").map(Number);
    const next = new Date(base);
    next.setHours(hours, minutes, 0, 0);
    onChange?.(toDateTimeString(next));
  }

  return (
    <div className="relative">
      <PickerIcon className="pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 text-primary-500" />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id={id}
            type="button"
            disabled={disabled}
            data-empty={!selected}
            aria-invalid={state === "error"}
            className={cn(
              inputVariants({ state }),
              "flex justify-start py-1.75 pr-8 pl-9 text-left font-normal data-[empty=true]:text-grey-light",
              state === "error"
                ? "border-[0.5px] border-destructive"
                : "border-[0.5px] border-grey-pale",
              selected && "text-grey-normal",
              className,
            )}
            onBlur={onBlur}
          >
            {selected ? formatPickerLabel(selected, mode) : label}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {mode === "time" ? null : (
            <Calendar
              mode="single"
              selected={selected}
              onSelect={selectDate}
              disabled={
                minDate || maxDate
                  ? [
                      ...(minDate ? [{ before: minDate }] : []),
                      ...(maxDate ? [{ after: maxDate }] : []),
                    ]
                  : undefined
              }
            />
          )}
          {mode === "date" ? null : (
            <div className={cn("p-3", mode === "dateTime" && "border-t border-grey-pale")}>
              <label className="mb-1.5 block text-xs text-grey-light" htmlFor={id ? `${id}-time` : undefined}>
                Time
              </label>
              <input
                id={id ? `${id}-time` : undefined}
                type="time"
                step={60}
                disabled={mode === "dateTime" && !selected}
                min={mode === "time" ? min : undefined}
                max={mode === "time" ? max : undefined}
                value={selected ? toTimeString(selected) : ""}
                className={cn(inputVariants(), "border-[0.5px] border-grey-pale")}
                onChange={(event) => selectTime(event.target.value)}
              />
            </div>
          )}
        </PopoverContent>
      </Popover>
      {selected ? (
        <button
          type="button"
          className="absolute top-1/2 right-3 -translate-y-1/2 text-grey-light"
          onClick={() => onChange?.("")}
        >
          <XIcon className="size-4" />
        </button>
      ) : null}
    </div>
  );
};

export default NVMDatePicker;
