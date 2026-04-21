import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import FormQuiz from "../-components/form-quiz";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useCreateQuiz, useUpdateQuiz, useGetQuiz } from "../-apis";
import * as Router from "@tanstack/react-router";

// Mock hooks
vi.mock("../-apis", () => ({
  useCreateQuiz: vi.fn(),
  useUpdateQuiz: vi.fn(),
  useGetQuiz: vi.fn(),
}));

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual("@tanstack/react-router");
  return {
    ...actual,
    useNavigate: vi.fn(),
    useRouter: vi.fn(),
  };
});

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("@tanstack/react-query", async () => {
    const actual = await vi.importActual("@tanstack/react-query");
    return {
        ...actual,
        useQuery: vi.fn(),
    };
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const renderWithProviders = (ui: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("FormQuiz", () => {
  const mockNavigate = vi.fn();
  const mockBack = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    (Router.useNavigate as any).mockReturnValue(mockNavigate);
    (Router.useRouter as any).mockReturnValue({ history: { back: mockBack } });
    
    (useCreateQuiz as any).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    });
    
    (useUpdateQuiz as any).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    });

    (useGetQuiz as any).mockReturnValue({
      queryKey: ["quiz"],
      queryFn: vi.fn(),
    });

    (useQuery as any).mockReturnValue({ data: undefined, isLoading: false });
  });

  it("renders form correctly", () => {
    renderWithProviders(<FormQuiz form_data={{ id: "", type: "create" }} />);
    
    expect(screen.getByRole("button", { name: /common\.create/i })).toBeInTheDocument();
  });

  it("calls history back on cancel", () => {
    renderWithProviders(<FormQuiz form_data={{ id: "", type: "create" }} />);
    fireEvent.click(screen.getByRole("button", { name: /common\.cancel/i }));
    expect(mockBack).toHaveBeenCalled();
  });
});
