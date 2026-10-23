import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade — ZBuy",
  description:
    "Como o aplicativo ZBuy trata seus dados. Na versão local, suas informações ficam apenas no seu aparelho.",
};

// ponytail: página estática com estilos inline — não depende do design system.
const UPDATED_AT = "23 de outubro de 2026";
const CONTACT_EMAIL = "seu-email@exemplo.com"; // TODO: troque pelo e-mail de contato real antes de publicar.

export default function PrivacyPolicyPage() {
  return (
    <main
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "48px 20px 80px",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        lineHeight: 1.65,
        color: "#1f2430",
      }}
    >
      <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.5 }}>
        Política de Privacidade — ZBuy
      </h1>
      <p style={{ color: "#6b7280", marginTop: 4 }}>
        Última atualização: {UPDATED_AT}
      </p>

      <p style={{ marginTop: 24 }}>
        Esta Política de Privacidade descreve como o aplicativo <strong>ZBuy</strong>{" "}
        (&quot;aplicativo&quot;, &quot;nós&quot;) trata as informações de quem usa o app.
        O ZBuy foi feito para ajudar você a organizar suas compras: criar listas,
        cadastrar produtos e controlar seus gastos no mercado.
      </p>

      <Section title="1. Resumo rápido">
        <ul style={listStyle}>
          <li>
            O ZBuy funciona em <strong>modo local</strong>: suas listas, produtos e
            dados ficam salvos <strong>apenas no seu aparelho</strong>.
          </li>
          <li>
            Não temos servidor próprio recebendo esses dados e <strong>não vendemos
            nem compartilhamos</strong> suas informações com terceiros.
          </li>
          <li>
            O único dado pessoal usado é o seu <strong>nome e e-mail da conta Google</strong>,
            caso você escolha entrar com o Google — e mesmo esse dado fica salvo só no aparelho.
          </li>
        </ul>
      </Section>

      <Section title="2. Dados que coletamos">
        <p>
          <strong>Login com Google (opcional).</strong> Se você tocar em
          &quot;Entrar com Google&quot;, o app recebe do Google o seu{" "}
          <strong>nome</strong> e <strong>endereço de e-mail</strong>, usados apenas
          para identificar você dentro do app. Você também pode usar o app sem conta
          (&quot;Entrar sem conta&quot;), e nesse caso nenhum dado pessoal é coletado.
        </p>
        <p>
          <strong>Dados de uso do app.</strong> As listas de compras, produtos e
          valores que você cadastra são criados por você e guardados localmente no
          aparelho (armazenamento do próprio dispositivo). Esses dados não são
          enviados para nós.
        </p>
      </Section>

      <Section title="3. Como usamos os dados">
        <p>
          As informações são usadas exclusivamente para o funcionamento do app:
          exibir seu nome/e-mail, salvar e mostrar suas listas e produtos, e manter
          você conectado entre as aberturas do aplicativo. Não usamos seus dados para
          publicidade nem criamos perfis sobre você.
        </p>
      </Section>

      <Section title="4. Armazenamento e segurança">
        <p>
          Os dados ficam no armazenamento local do seu aparelho. Como não trafegam
          para servidores nossos, eles permanecem sob seu controle. Recomendamos
          manter o sistema do aparelho atualizado e protegido por bloqueio de tela.
        </p>
      </Section>

      <Section title="5. Login com Google">
        <p>
          O login é processado pelos serviços do Google. O tratamento das suas
          credenciais e da sua conta Google segue a Política de Privacidade do
          Google. O ZBuy recebe do Google apenas o nome e o e-mail do perfil e não
          tem acesso à sua senha.
        </p>
      </Section>

      <Section title="6. Compartilhamento com terceiros">
        <p>
          Não compartilhamos, vendemos ou alugamos seus dados pessoais. Os únicos
          terceiros envolvidos são os serviços do Google usados para o login, quando
          você opta por ele.
        </p>
      </Section>

      <Section title="7. Seus direitos e exclusão dos dados">
        <p>
          Como os dados ficam no seu aparelho, você pode removê-los a qualquer momento:
        </p>
        <ul style={listStyle}>
          <li>
            Use <strong>&quot;Sair da conta&quot;</strong> no app para desconectar e
            limpar a sessão local.
          </li>
          <li>
            <strong>Desinstalar o aplicativo</strong> apaga todos os dados locais
            (listas, produtos e dados de login).
          </li>
        </ul>
      </Section>

      <Section title="8. Crianças">
        <p>
          O ZBuy não é direcionado a menores de 13 anos e não coleta intencionalmente
          dados dessas crianças.
        </p>
      </Section>

      <Section title="9. Alterações nesta política">
        <p>
          Podemos atualizar esta Política de Privacidade periodicamente. Quando isso
          acontecer, atualizaremos a data de &quot;Última atualização&quot; no topo
          desta página.
        </p>
      </Section>

      <Section title="10. Contato">
        <p>
          Dúvidas sobre esta política ou sobre seus dados? Fale com a gente:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "#2563eb" }}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 28 }}>
      <h2 style={{ fontSize: 19, fontWeight: 700, marginBottom: 8 }}>{title}</h2>
      {children}
    </section>
  );
}

const listStyle: React.CSSProperties = {
  margin: "8px 0",
  paddingLeft: 22,
  display: "flex",
  flexDirection: "column",
  gap: 6,
};
