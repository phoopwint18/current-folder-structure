import { getErrorMessage } from "@/core/api";
import { nvmToast } from "../components";

export async function copyText(
  value: string | null | undefined,
  label: string,
) {
  const text = value?.trim();
  if (!text) {
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    nvmToast.success(`${label} copied`);
  } catch (error) {
    nvmToast.reject(getErrorMessage(error));
  }
}
