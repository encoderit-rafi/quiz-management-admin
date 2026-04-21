import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FormForgotPassword from "../forgot-password/-components/form-forgot-password";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock the useForgotPassword hook
const mockMutate = vi.fn();
vi.mock("../forgot-password/-apis", () => ({
  useForgotPassword: () => ({
    mutate: mockMutate,
    isPending: false,
  }),
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

describe("FormForgotPassword", () => {
  it("renders forgot password form correctly", () => {
    renderWithProviders(<FormForgotPassword />);

    expect(screen.getByPlaceholderText(/m@example\.com/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /submit/i })
    ).toBeInTheDocument();
  });

  it("shows validation error for invalid email", async () => {
    renderWithProviders(<FormForgotPassword />);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Please enter a valid email address/i)
      ).toBeInTheDocument();
    });
  });

  it("calls forgotPassword mutation with valid data", async () => {
    renderWithProviders(<FormForgotPassword />);

    fireEvent.change(screen.getByPlaceholderText(/m@example\.com/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        email: "test@example.com",
        redirect_url: expect.any(String),
      });
    });
  });
});
