import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { FormLogin } from "../login/-components/form-login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLogin } from "../login/-apis";

// Mock the useLogin hook
vi.mock("../login/-apis", () => ({
  useLogin: vi.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProviders = (ui: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("FormLogin", () => {
  const mockMutate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useLogin as any).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
  });

  it("renders login form correctly", () => {
    renderWithProviders(<FormLogin />);

    expect(screen.getByLabelText(/auth\.email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/auth\.password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /auth\.login/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors for invalid input", async () => {
    renderWithProviders(<FormLogin />);

    const submitButton = screen.getByRole("button", { name: /auth\.login/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Please enter a valid email address/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Password must be at least 6 characters long/i)
      ).toBeInTheDocument();
    });
  });

  it("calls login mutation with valid data", async () => {
    renderWithProviders(<FormLogin />);

    fireEvent.change(screen.getByLabelText(/auth\.email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/auth\.password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /auth\.login/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  it("disables submit button when isPending is true", () => {
    (useLogin as any).mockReturnValue({
      mutate: mockMutate,
      isPending: true,
    });

    renderWithProviders(<FormLogin />);
    const submitButton = screen.getByRole("button", { name: /Loading\.\.\./i });
    
    expect(submitButton).toBeDisabled();
  });
});
