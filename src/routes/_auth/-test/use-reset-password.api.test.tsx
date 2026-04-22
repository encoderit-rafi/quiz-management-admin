import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useResetPassword } from "../reset-password/-apis/use-reset-password.api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { api } from "@/axios";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

// Mock dependencies
vi.mock("@/axios", () => ({
  api: {
    post: vi.fn(),
  },
}));

vi.mock("@tanstack/react-router", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useResetPassword", () => {
  it("successfully resets password", async () => {
    (api.post as any).mockResolvedValue({});
    const mockNavigate = vi.fn();
    (useNavigate as any).mockReturnValue(mockNavigate);

    const { result } = renderHook(() => useResetPassword(), { wrapper });

    const body = {
      email: "test@example.com",
      token: "abc",
      password: "newpassword",
      password_confirmation: "newpassword",
    };

    result.current.mutate(body);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(api.post).toHaveBeenCalledWith("/password/reset", body);
    expect(toast.success).toHaveBeenCalledWith("Your password has been reset.");
    expect(mockNavigate).toHaveBeenCalled();
  });
});
