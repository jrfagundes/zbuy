import React from "react";
import { AuthForm } from "../components/AuthForm";
import { AuthLayout } from "../components/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout title="Entrar no ZBuy" subtitle="Acesse suas listas reutilizáveis e continue organizando suas compras.">
      <AuthForm mode="login" />
    </AuthLayout>
  );
}
