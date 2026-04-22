import { describe, it, expect, vi } from "vitest";
import { getAuthProfile } from "../-api/auth-profile";
import { api } from "@/axios";
import { QUERY_KEYS } from "@/query-keys";

vi.mock("@/axios", () => ({
  api: {
    get: vi.fn(),
  },
}));

describe("getAuthProfile", () => {
  it("returns correct queryOptions", async () => {
    const options = getAuthProfile();
    expect(options.queryKey).toEqual(QUERY_KEYS.GET_AUTH_PROFILE);
    
    const mockData = { id: 1, name: "Test User" };
    (api.get as any).mockResolvedValue({ data: { data: mockData } });
    
    const result = await (options.queryFn as any)();
    expect(api.get).toHaveBeenCalledWith("/auth/profile");
    expect(result).toEqual(mockData);
  });
});
