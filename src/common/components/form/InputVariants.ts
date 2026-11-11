import { cva, type VariantProps } from "class-variance-authority";

export const selectMenuClassName =
  "z-50 max-h-100 w-full overflow-auto rounded-[10px] border bg-white-normal py-1 shadow-md";

export const selectItemClassName =
  "w-full px-2.5 py-1.5 text-left text-body-sm text-grey-medium hover:bg-primary-50";

export const selectItemSelectedClassName = "bg-primary-25 text-linear";

export const inputVariants = cva(
  "h-9 w-full rounded-[10px] border bg-white-light px-4.5 py-2.5 text-body-sm text-grey-normal shadow-none outline-none transition-colors placeholder:text-grey-light focus-visible:border focus-visible:border-grey-pale focus-visible:ring-0 not-placeholder-shown:not-focus-visible:border-grey-pale disabled:cursor-not-allowed disabled:border-transparent disabled:bg-white-disabled disabled:opacity-100 aria-invalid:ring-0! aria-invalid:border-destructive!",
  {
    variants: {
      state: {
        default: "",
        error:
          "border-[0.5px] border-destructive bg-white-light not-placeholder-shown:border not-placeholder-shown:border-primary-50 not-placeholder-shown:bg-white-bg",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export type InputVariantsProps = VariantProps<typeof inputVariants>;
