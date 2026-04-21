import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FormResetPassword from "../reset-password/-components/form-reset-password";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock the useResetPassword hook
const mockMutate = vi.fn();
vi.mock("../reset-password/-apis/use-reset-password.api", () => ({
  useResetPassword: () => ({
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

describe("FormResetPassword", () => {
  it("renders reset password form correctly", () => {
    renderWithProviders(<FormResetPassword email="test@example.com" token="abc" />);

    expect(screen.getByLabelText(/NewPassword/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Reset Password/i })
    ).toBeInTheDocument();
  });

  it("shows validation error if passwords do not match", async () => {
    renderWithProviders(<FormResetPassword email="test@example.com" token="abc" />);

    fireEvent.change(screen.getByLabelText(/NewPassword/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "password456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Reset Password/i }));

    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });
  });

  it("calls resetPassword mutation with valid data", async () => {
    renderWithProviders(<FormResetPassword email="test@example.com" token="abc" />);

    fireEvent.change(screen.getByLabelText(/NewPassword/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Reset Password/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        email: "test@example.com",
        token: "abc",
        password: "password123",
        password_confirmation: "password123",
      });
    });
  });
});
