import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useDeleteQuiz } from "../-apis/use-delete-quiz.api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { api } from "@/axios";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/query-keys";

vi.mock("@/axios", () => ({
  api: {
    delete: vi.fn(),
  },
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

describe("useDeleteQuiz", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("successfully deletes quiz", async () => {
    (api.delete as any).mockResolvedValue({});
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useDeleteQuiz(), { wrapper });

    result.current.mutate({ id: 1 });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(api.delete).toHaveBeenCalledWith("/quizzes/1");
    expect(toast.success).toHaveBeenCalledWith("Quiz deleted successfully!");
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: QUERY_KEYS.GET_ALL_QUIZZES(),
    });
  });

  it("handles error during deletion", async () => {
    const error = { response: { data: { message: "Error" } } };
    (api.delete as any).mockRejectedValue(error);

    const { result } = renderHook(() => useDeleteQuiz(), { wrapper });

    result.current.mutate({ id: 1 });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(toast.error).toHaveBeenCalled();
  });
});
