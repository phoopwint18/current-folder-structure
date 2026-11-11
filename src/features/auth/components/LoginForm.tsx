import loginWelcome from "@/assets/login-bg.png";
import nvmLogo from "@/assets/logo.svg";
import {
  DefaultLoader,
  FormField,
  FormWrapper,
  NVMButton,
  NVMInput,
  nvmToast,
} from "@/common/components";
import { getErrorMessage } from "@/core/api";
import { PATHS } from "@/core/routes/path";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { PasswordField } from "./PasswordField";

type LoginFormValues = {
  username: string;
  password: string;
};

export function LoginForm() {
  const navigate = useNavigate();
  const { isAuthenticated, isReady, login, isLoggingIn } = useUser();
  const form = useForm<LoginFormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  if (!isReady) {
    return <DefaultLoader center="screen" />;
  }

  if (isAuthenticated) {
    return <Navigate to={PATHS.home} replace />;
  }

  async function handleSubmit(values: LoginFormValues) {
    form.clearErrors("root");

    try {
      await login({
        username: values.username.trim(),
        password: values.password,
      });
      navigate(PATHS.home, { replace: true });
    } catch (submitError) {
      const message = getErrorMessage(submitError);
      form.setError("root", { message });
      nvmToast.reject(message);
    }
  }

  return (
    <>
      <div className="flex bg-white fixed left-0 right-0 items-center justify-center py-2 shadow-xs">
        <img src={nvmLogo} alt="" className="h-6 w-auto" />
      </div>
      <div className="flex min-h-svh flex-col bg-background px-6 py-8">
        <div className="flex flex-1 flex-col items-center justify-center">
          <FormWrapper
            id="login-form"
            form={form}
            onSubmit={handleSubmit}
            className="flex w-full max-w-sm flex-col items-center gap-6"
          >
            <div className="flex flex-col items-center gap-1">
              <div className="bg-linear rounded-full p-0.5 overflow-hidden">
                <img
                  src={loginWelcome}
                  alt=""
                  className="w-25 h-25 object-contain"
                />
              </div>

              <h1 className="text-center text-h4 text-grey-normal">
                Welcome Back, <span className="text-primary">Ninja</span>
              </h1>
            </div>

            <div className="grid w-full gap-5">
              <FormField
                name="username"
                label="Phone Number"
                isRequired
                FieldComponent={NVMInput}
                componentProps={{
                  autoComplete: "username",
                  placeholder: "Enter Phone Number",
                }}
              />
              <FormField
                name="password"
                label="Password"
                isRequired
                FieldComponent={PasswordField}
                componentProps={{
                  autoComplete: "current-password",
                  placeholder: "Enter Password",
                }}
              />
              <NVMButton type="submit" className="w-full" loading={isLoggingIn}>
                Login
              </NVMButton>
            </div>
          </FormWrapper>
        </div>

        <p className="flex items-center justify-center gap-2 text-xs">
          <span>powered by :</span>
          <img src={nvmLogo} alt="" className="h-4 w-auto" />
        </p>
      </div>
    </>
  );
}
