import React from "react";
import { AuthForm } from "../../components/AuthForm";
import { AuthLayout } from "../../components/AuthLayout";

export default function ResetPasswordPage() {
  return (
    <AuthLayout title="Redefinir senha" subtitle="Informe o e-mail da conta para iniciar a recuperação de acesso.">
      <AuthForm mode="reset" />
    </AuthLayout>
  );
}
