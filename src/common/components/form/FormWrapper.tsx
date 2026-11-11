import type { ReactNode } from "react";
import type { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import { cn } from "@/common/utils";

type FormWrapperProps<
  TFieldValues extends FieldValues,
  TTransformedValues extends FieldValues = TFieldValues,
> = {
  form: UseFormReturn<TFieldValues, unknown, TTransformedValues>;
  onSubmit: SubmitHandler<TTransformedValues>;
  children: ReactNode;
  className?: string;
  id?: string;
};

const FormWrapper = <
  TFieldValues extends FieldValues,
  TTransformedValues extends FieldValues = TFieldValues,
>({
  form,
  onSubmit,
  children,
  className,
  id = "form-wrapper",
}: FormWrapperProps<TFieldValues, TTransformedValues>) => {
  return (
    <FormProvider {...(form as unknown as UseFormReturn<FieldValues>)}>
      <form
        id={id}
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("text-sm text-secondary-400", className)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default FormWrapper;
