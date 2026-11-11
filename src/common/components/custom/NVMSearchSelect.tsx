import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { Branch as DismissableLayerBranch } from "@radix-ui/react-dismissable-layer";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/common/utils";
import { Input } from "../ui/input";
import {
  inputVariants,
  selectItemClassName,
  selectItemSelectedClassName,
  selectMenuClassName,
} from "../form/InputVariants";

export type NVMSearchSelectOption = {
  value: string;
  label: string;
  description?: string;
};

type NVMSearchSelectProps = {
  id?: string;
  name?: string;
  value?: string;
  options: NVMSearchSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  loading?: boolean;
  emptyText?: string;
  filterLocally?: boolean;
  lockWhenSelected?: boolean;
  state?: "default" | "error";
  onBlur?: () => void;
  onChange?: (value: string) => void;
  onQueryChange?: (query: string) => void;
};

const MENU_MAX_HEIGHT = 240;

const NVMSearchSelect = ({
  id,
  value = "",
  options,
  placeholder = "Type to search",
  disabled = false,
  required = false,
  loading = false,
  emptyText,
  filterLocally = true,
  lockWhenSelected = false,
  state,
  onBlur,
  onChange,
  onQueryChange,
}: NVMSearchSelectProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const composingRef = useRef(false);
  const [menuStyle, setMenuStyle] = useState<CSSProperties | null>(null);
  const selected = options.find((option) => option.value === value);
  const displayLabel = selected?.label || selectedLabel;
  const hideSuggestions = Boolean(value && lockWhenSelected);
  const listId = id ? `${id}-listbox` : undefined;

  const filteredOptions = useMemo(() => {
    if (!filterLocally || !searching) {
      return options;
    }

    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return options;
    }

    return options.filter((option) => {
      const haystack =
        `${option.label} ${option.description ?? ""}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [filterLocally, options, query, searching]);

  const inputValue =
    searching || (hideSuggestions && query) ? query : displayLabel;

  useEffect(() => {
    if (selected?.label) {
      setSelectedLabel(selected.label);
    }

    if (!value) {
      setSelectedLabel("");
    }
  }, [selected?.label, value]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setSearching(false);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        rootRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }

      setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    function allowMenuScroll(event: WheelEvent) {
      if (menuRef.current?.contains(event.target as Node)) {
        event.stopPropagation();
      }
    }

    window.addEventListener("wheel", allowMenuScroll, { capture: true });
    return () =>
      window.removeEventListener("wheel", allowMenuScroll, { capture: true });
  }, [open]);

  useLayoutEffect(() => {
    if (!open) {
      setMenuStyle(null);
      return;
    }

    function updateMenuPosition() {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      const rect = input.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom - 12;
      const spaceAbove = rect.top - 12;
      const openAbove = spaceBelow < 160 && spaceAbove > spaceBelow;
      const maxHeight = Math.max(
        120,
        Math.min(MENU_MAX_HEIGHT, openAbove ? spaceAbove : spaceBelow),
      );

      setMenuStyle({
        position: "fixed",
        left: rect.left,
        width: rect.width,
        maxHeight,
        zIndex: 70,
        pointerEvents: "auto",
        ...(openAbove
          ? { bottom: window.innerHeight - rect.top + 4 }
          : { top: rect.bottom + 4 }),
      });
    }

    updateMenuPosition();
    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);

    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [open, filteredOptions.length]);

  useEffect(() => {
    if (!open) {
      return;
    }

    menuRef.current
      ?.querySelector<HTMLElement>(`[data-option-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open, filteredOptions.length]);

  function selectOption(option: NVMSearchSelectOption) {
    onChange?.(option.value);
    setSelectedLabel(option.label);
    setQuery("");
    setSearching(false);
    setOpen(false);
  }

  function applyQueryChange(nextQuery: string) {
    if (hideSuggestions) {
      setSelectedLabel(nextQuery);
      setOpen(false);
      onQueryChange?.(nextQuery);
      return;
    }

    setSearching(true);
    setOpen(true);
    onQueryChange?.(nextQuery);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (hideSuggestions) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) =>
        Math.min(
          current + (open ? 1 : 0),
          Math.max(filteredOptions.length - 1, 0),
        ),
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) => Math.max(current - 1, 0));
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      return;
    }

    if (event.key === "Enter" && open) {
      event.preventDefault();
      const option = filteredOptions[activeIndex];
      if (option) {
        selectOption(option);
      }
    }
  }

  const noResultsText =
    emptyText ||
    (!filterLocally && query.trim().length < 2
      ? "Type to search"
      : loading
        ? "Searching..."
        : "No results");

  const showMenu = open && !disabled && !hideSuggestions && menuStyle;

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" value={value} required={required} />
      <Input
        ref={inputRef}
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={
          showMenu && filteredOptions[activeIndex]
            ? `${id ?? "search-select"}-option-${activeIndex}`
            : undefined
        }
        autoComplete="off"
        disabled={disabled}
        placeholder={placeholder}
        value={inputValue}
        onFocus={(event) => {
          if (hideSuggestions) {
            setOpen(false);
            return;
          }

          setSearching(false);
          setQuery("");
          setOpen(true);
          const input = event.currentTarget;
          requestAnimationFrame(() => input.select());
        }}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => {
          composingRef.current = true;
        }}
        onCompositionEnd={(event) => {
          composingRef.current = false;
          applyQueryChange(event.currentTarget.value);
        }}
        onChange={(event) => {
          const nextQuery = event.target.value;
          setQuery(nextQuery);

          if (
            composingRef.current ||
            ("isComposing" in event.nativeEvent &&
              event.nativeEvent.isComposing)
          ) {
            if (!hideSuggestions) {
              setSearching(true);
              setOpen(true);
            }
            return;
          }

          applyQueryChange(nextQuery);
        }}
        className={cn(inputVariants({ state }), "pr-8")}
      />
      <button
        type="button"
        tabIndex={-1}
        disabled={disabled}
        aria-label={open ? "Close options" : "Open options"}
        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-sm p-1 text-grey-normal disabled:pointer-events-none"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => {
          if (hideSuggestions) {
            return;
          }

          setOpen((current) => !current);
          inputRef.current?.focus();
        }}
      >
        <ChevronDownIcon className="size-4" />
      </button>
      {showMenu
        ? createPortal(
            <DismissableLayerBranch
              ref={menuRef}
              id={listId}
              role="listbox"
              data-nvm-search-select-menu
              style={menuStyle}
              className={cn(selectMenuClassName, "w-auto")}
            >
              {filteredOptions.length === 0 ? (
                <div className="px-2.5 py-2 text-body-sm text-grey-normal">
                  {noResultsText}
                </div>
              ) : (
                filteredOptions.map((option, index) => {
                  const isSelected = option.value === value;
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={option.value}
                      id={`${id ?? "search-select"}-option-${index}`}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      data-option-index={index}
                      className={cn(
                        selectItemClassName,
                        "block",
                        (isSelected || isActive) && selectItemSelectedClassName,
                      )}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        selectOption(option);
                      }}
                    >
                      <span className="block text-body-sm">{option.label}</span>
                      {option.description ? (
                        <span className="block text-xs text-grey-light">
                          {option.description}
                        </span>
                      ) : null}
                    </button>
                  );
                })
              )}
            </DismissableLayerBranch>,
            document.body,
          )
        : null}
    </div>
  );
};

export default NVMSearchSelect;
