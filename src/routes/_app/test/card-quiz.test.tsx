import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CardQuiz from "../-components/card-quiz";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useGetQuiz } from "../-apis";

// Mock hooks
vi.mock("../-apis", () => ({
  useGetQuiz: vi.fn(),
}));

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

describe("CardQuiz", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useGetQuiz as any).mockReturnValue({
      queryKey: ["quiz"],
      queryFn: vi.fn(),
    });
  });

  it("renders loading state", () => {
    (useQuery as any).mockReturnValue({ data: undefined, isLoading: true });
    renderWithProviders(<CardQuiz form_data={{ id: "1", type: "view" }} />);
    expect(screen.getByTestId("app-loading")).toBeInTheDocument();
  });

  it("renders error state when no quiz found", () => {
    (useQuery as any).mockReturnValue({ data: undefined, isLoading: false });
    renderWithProviders(<CardQuiz form_data={{ id: "1", type: "view" }} />);
    expect(screen.getByText("common.noDataFound")).toBeInTheDocument();
  });

  it("renders quiz details when data is loaded", () => {
    const mockQuiz = {
      id: 1,
      name: "Test Quiz",
      title: "Test Title",
      description: "<p>Test Description</p>",
      questions: [{ question_text: "Question 1" }],
    };
    (useQuery as any).mockReturnValue({ data: mockQuiz, isLoading: false });

    renderWithProviders(<CardQuiz form_data={{ id: "1", type: "view" }} />);

    expect(screen.getByText("Test Quiz")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Question 1")).toBeInTheDocument();
  });
});
