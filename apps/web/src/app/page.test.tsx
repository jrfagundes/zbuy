import "@testing-library/jest-dom/vitest";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import AccountPage from "./account/page";
import LoginPage from "./page";
import ResetPasswordPage from "./reset-password/page";
import SignUpPage from "./signup/page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() })
}));

describe("authentication screens", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders login with native, Google, and Microsoft options", () => {
    render(<LoginPage />);

    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Continuar com Google" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Continuar com Microsoft" })).toBeInTheDocument();
  });

  it("renders sign up fields", () => {
    render(<SignUpPage />);

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Criar conta" })).toBeInTheDocument();
  });

  it("renders reset password request form", () => {
    render(<ResetPasswordPage />);

    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Enviar instruções" })).toBeInTheDocument();
  });

  it("shows account unavailable state when the API cannot load /me", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ message: "Unauthorized" })
      })
    );

    render(<AccountPage />);

    expect(await screen.findByText("Conta indisponível")).toBeInTheDocument();
  });
});
