import type { ReactNode } from "react";
import {
  Controller,
  useFormContext,
  type ControllerProps,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";

type FormFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string | ReactNode;
  FieldComponent: React.ElementType;
  componentProps?: Record<string, unknown>;
  labelColor?: string;
  isRequired?: boolean;
  showError?: boolean;
  rules?: ControllerProps<T>["rules"];
};

export const RequiredAsterisk = () => <span className="text-red-500">*</span>;

// function requiredMessage(label?: string | ReactNode) {
//   return typeof label === "string" && label
//     ? `${label} is required`
//     : "This field is required";
// }

const FormField = <T extends FieldValues>({
  name,
  label,
  FieldComponent,
  componentProps,
  labelColor = "text-grey-normal",
  isRequired = false,
  showError = true,
  rules,
}: FormFieldProps<T>) => {
  const { control } = useFormContext<T>();
  const fieldId = String(componentProps?.id ?? name);

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        // ...(isRequired ? { required: requiredMessage(label) } : {}),
        ...(isRequired ? { required: "required" } : {}),
        ...rules,
      }}
      render={({ field, fieldState }) => {
        const isInvalid = showError && fieldState.invalid;

        return (
          <Field data-invalid={isInvalid} className="gap-1.5">
            {label ? (
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor={fieldId} className={`${labelColor} gap-1`}>
                  {isRequired ? <RequiredAsterisk /> : null}
                  {label}
                </FieldLabel>
                {isInvalid ? (
                  <FieldError errors={[fieldState.error]} className="text-xs" />
                ) : null}
              </div>
            ) : null}
            <FieldComponent
              {...field}
              {...componentProps}
              id={fieldId}
              state={isInvalid ? "error" : componentProps?.state}
            />
            {isInvalid && !label ? (
              <FieldError errors={[fieldState.error]} />
            ) : null}
          </Field>
        );
      }}
    />
  );
};

export default FormField;
