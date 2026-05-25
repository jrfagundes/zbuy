import React from "react";
import { AuthForm } from "../../components/AuthForm";
import { AuthLayout } from "../../components/AuthLayout";

export default function SignUpPage() {
  return (
    <AuthLayout title="Criar conta" subtitle="Use e-mail e senha quando Google ou Microsoft não forem uma opção.">
      <AuthForm mode="signup" />
    </AuthLayout>
  );
}
