import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/common/utils";
import {
  inputVariants,
  selectItemClassName,
  selectItemSelectedClassName,
  selectMenuClassName,
  type InputVariantsProps,
} from "../form/InputVariants";

export type NVMSelectOption = {
  value: string;
  label: string;
};

type NVMSelectProps = InputVariantsProps & {
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  options: NVMSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  onBlur?: () => void;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
};

const NVMSelect = ({
  id,
  name,
  value,
  defaultValue,
  options,
  placeholder = "Select",
  disabled,
  required,
  state,
  className,
  onBlur,
  onChange,
  onValueChange,
}: NVMSelectProps) => {
  const selectedLabel = options.find((option) => option.value === value)?.label;

  function handleValueChange(nextValue: string) {
    onValueChange?.(nextValue);
    onChange?.(nextValue);
  }

  return (
    <div className="relative">
      <Select
        value={value || undefined}
        defaultValue={defaultValue}
        disabled={disabled}
        onValueChange={handleValueChange}
      >
        <SelectTrigger
          id={id}
          onBlur={onBlur}
          aria-invalid={state === "error"}
          className={cn(
            inputVariants({ state }),
            "flex w-full items-center justify-between gap-1.5 text-left data-[size=default]:h-9 data-placeholder:border-transparent data-placeholder:text-grey-light [&_svg]:text-grey-normal",
            className,
          )}
        >
          <SelectValue placeholder={placeholder}>{selectedLabel}</SelectValue>
        </SelectTrigger>
        <SelectContent
          position="popper"
          align="start"
          className={cn(selectMenuClassName, "ring-0")}
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className={cn(
                selectItemClassName,
                "rounded-none focus:bg-primary-50 focus:text-grey-medium data-[state=checked]:bg-primary-25 data-[state=checked]:text-linear",
                value === option.value && selectItemSelectedClassName,
              )}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {required ? (
        <input
          tabIndex={-1}
          name={name}
          value={value ?? ""}
          required
          disabled={disabled}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
          onChange={() => undefined}
          onFocus={(event) => {
            event.target.blur();
            document.getElementById(id ?? "")?.focus();
          }}
        />
      ) : null}
    </div>
  );
};

export default NVMSelect;
