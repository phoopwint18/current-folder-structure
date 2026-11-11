import type { User } from "@/common/types";
import { apiClient } from "./client";
import { API_ENDPOINTS } from "./endpoints";

export type LoginPayload = {
  username: string;
  password: string;
};

function unwrapUser(response: unknown): User | null {
  if (!response || typeof response !== "object") {
    return null;
  }

  const body = response as User;
  const isUser =
    body.fullName != null ||
    body.employeeNumber != null ||
    body.profileUrl != null ||
    body.email != null;

  if (isUser) {
    return body;
  }

  return null;
}

export async function loginRequest(payload: LoginPayload) {
  return apiClient.post(API_ENDPOINTS.AUTH.login, payload, {
    headers: {
      accountType: "EMPLOYEE",
    },
  });
}

export async function getCurrentUser() {
  const response = await apiClient.get<User>(API_ENDPOINTS.AUTH.me);
  return unwrapUser(response);
}

export async function logoutRequest() {
  await apiClient.post(API_ENDPOINTS.AUTH.logout);
}
