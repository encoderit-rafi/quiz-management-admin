import { describe, it, expect, vi } from "vitest";
import { useGetAllQuizzes } from "../-apis/use-get-all-quizzes.api";
import { api } from "@/axios";
import { QUERY_KEYS } from "@/query-keys";

vi.mock("@/axios", () => ({
  api: {
    get: vi.fn(),
  },
}));

describe("useGetAllQuizzes", () => {
  it("returns correct queryOptions", async () => {
    const params = { page: 1, search: "test" };
    const options = useGetAllQuizzes(params);
    
    expect(options.queryKey).toEqual(QUERY_KEYS.GET_ALL_QUIZZES(params));
    
    const mockData = { data: [{ id: 1, name: "Quiz 1" }], meta: { total: 1 } };
    (api.get as any).mockResolvedValue({ data: { data: mockData } });
    
    const result = await (options.queryFn as any)();
    
    expect(api.get).toHaveBeenCalledWith("/quizzes", {
      params: {
        order_by: "created_at",
        direction: "desc",
        ...params,
      },
    });
    expect(result).toEqual(mockData);
  });
});
