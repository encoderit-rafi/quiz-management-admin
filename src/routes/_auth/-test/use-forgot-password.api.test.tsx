import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useForgotPassword } from "../forgot-password/-apis/use-forgot-password.api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { api } from "@/axios";
import { toast } from "sonner";

// Mock dependencies
vi.mock("@/axios", () => ({
  api: {
    post: vi.fn(),
  },
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
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

describe("useForgotPassword", () => {
  it("successfully calls forgot password API", async () => {
    (api.post as any).mockResolvedValue({});

    const { result } = renderHook(() => useForgotPassword(), { wrapper });

    result.current.mutate({ email: "test@example.com", redirect_url: "url" });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(api.post).toHaveBeenCalledWith("/password/forgot", {
      email: "test@example.com",
      redirect_url: "url",
    });
    expect(toast.success).toHaveBeenCalledWith("Check Your Email Please!");
  });
});
