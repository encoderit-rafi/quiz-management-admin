import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import RouteComponent from "../index";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useGetAllQuizzes, useDeleteQuiz, useGetEmbedCode } from "../-apis";
import { useActiveQuiz } from "@/store";
import * as Router from "@tanstack/react-router";

// Mock hooks
vi.mock("../-apis", () => ({
  useGetAllQuizzes: vi.fn(),
  useDeleteQuiz: vi.fn(),
  useGetEmbedCode: vi.fn(),
}));

vi.mock("@/store", () => ({
  useActiveQuiz: vi.fn(),
}));

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual("@tanstack/react-router");
  const mockSearch = { page: 1, per_page: 10, search: "" };
  const Route = {
    useSearch: vi.fn(() => mockSearch),
    fullPath: "/_app/",
  };
  return {
    ...actual,
    useNavigate: vi.fn(),
    useSearch: vi.fn(() => mockSearch),
    Link: ({ children, to }: any) => <a href={to}>{children}</a>,
    createFileRoute: () => () => Route,
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

describe("RouteComponent (Quizzes List)", () => {
  const mockNavigate = vi.fn();
  const mockSearch = { page: 1, per_page: 10, search: "" };
  const mockSetActiveQuiz = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (Router.useNavigate as any).mockReturnValue(mockNavigate);
    (Router.useSearch as any).mockReturnValue(mockSearch);
    (useActiveQuiz as any).mockReturnValue({ setActiveQuiz: mockSetActiveQuiz });
    
    (useGetAllQuizzes as any).mockReturnValue({
      queryKey: ["quizzes"],
      queryFn: vi.fn(),
    });
    
    (useDeleteQuiz as any).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    });

    (useGetEmbedCode as any).mockReturnValue({
      queryKey: ["embed"],
      queryFn: vi.fn(),
    });
  });

  it("renders loading state", () => {
    (useQuery as any).mockReturnValue({ data: undefined, isLoading: true });
    renderWithProviders(<RouteComponent />);
    expect(screen.getByTestId("app-loading")).toBeInTheDocument();
  });

  it("renders quizzes table when data is loaded", async () => {
    const mockResponse = {
      data: [
        { id: 1, name: "Quiz 1", title: "Title 1", uuid: "uuid-1" },
        { id: 2, name: "Quiz 2", title: "Title 2", uuid: "uuid-2" },
      ],
      meta: { total: 2 },
    };
    
    (useQuery as any).mockImplementation((options: any) => {
        if (options.queryKey[0] === "quizzes") {
            return { data: mockResponse, isLoading: false };
        }
        return { data: undefined, isLoading: false };
    });

    renderWithProviders(<RouteComponent />);

    expect(screen.getByText("Quiz 1")).toBeInTheDocument();
    expect(screen.getByText("Quiz 2")).toBeInTheDocument();
  });
});
