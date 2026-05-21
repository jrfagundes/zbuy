"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FormEvent, useState } from "react";
import { apiBaseUrl, apiRequest, type AuthResponse } from "../lib/api";

type AuthMode = "login" | "signup" | "reset";

interface AuthFormProps {
  mode: AuthMode;
}

const copy = {
  login: {
    submit: "Entrar",
    success: "Sessão iniciada.",
    endpoint: "/auth/login"
  },
  signup: {
    submit: "Criar conta",
    success: "Conta criada.",
    endpoint: "/auth/signup"
  },
  reset: {
    submit: "Enviar instruções",
    success: "Se o e-mail existir, as instruções serão enviadas.",
    endpoint: "/auth/password-reset/request"
  }
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload =
      mode === "signup"
        ? {
            name: String(form.get("name") ?? ""),
            email: String(form.get("email") ?? ""),
            password: String(form.get("password") ?? "")
          }
        : mode === "login"
          ? {
              email: String(form.get("email") ?? ""),
              password: String(form.get("password") ?? "")
            }
          : {
              email: String(form.get("email") ?? "")
            };

    setStatus("loading");
    setMessage("");
    try {
      await apiRequest<AuthResponse | { status: "ok" }>(copy[mode].endpoint, {
        method: "POST",
        body: JSON.stringify(payload)
      });
      if (mode !== "reset") {
        router.push("/account");
        return;
      }
      setStatus("success");
      setMessage(copy[mode].success);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Não foi possível concluir a ação.");
    }
  }

  return (
    <form className="auth-form" onSubmit={submit}>
      {mode === "signup" ? (
        <label>
          Nome
          <input name="name" autoComplete="name" required />
        </label>
      ) : null}
      <label>
        E-mail
        <input name="email" type="email" autoComplete="email" required />
      </label>
      {mode !== "reset" ? (
        <label>
          Senha
          <input name="password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} required />
        </label>
      ) : null}
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Aguarde" : copy[mode].submit}
      </button>
      {message ? <p className={`form-message ${status}`}>{message}</p> : null}
      {mode === "login" ? (
        <>
          <div className="social-actions">
            <a href={`${apiBaseUrl}/auth/google`}>Continuar com Google</a>
            <a href={`${apiBaseUrl}/auth/microsoft`}>Continuar com Microsoft</a>
          </div>
          <div className="form-links">
            <Link href="/signup">Criar conta</Link>
            <Link href="/reset-password">Esqueci minha senha</Link>
          </div>
        </>
      ) : null}
      {mode === "signup" ? (
        <div className="form-links">
          <Link href="/">Já tenho conta</Link>
        </div>
      ) : null}
      {mode === "reset" ? (
        <div className="form-links">
          <Link href="/">Voltar para login</Link>
        </div>
      ) : null}
    </form>
  );
}
