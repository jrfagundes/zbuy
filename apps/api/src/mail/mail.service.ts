import { Injectable, Logger, ServiceUnavailableException } from "@nestjs/common";
import nodemailer, { Transporter } from "nodemailer";

// Link público do APK (GitHub Release). Sobrescrevível por env APK_DOWNLOAD_URL.
// No futuro será o link da Play Store.
const DEFAULT_APK_URL = "https://github.com/jrfagundes/zbuy/releases/download/v1.0.0/zbuy.apk";

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: Transporter | null = null;

  /** Cria (uma vez) o transporter SMTP. Retorna null se não configurado. */
  private getTransporter(): Transporter | null {
    if (this.transporter) return this.transporter;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!user || !pass) {
      this.logger.warn("SMTP não configurado (SMTP_USER/SMTP_PASS) — envio de e-mail desativado");
      return null;
    }
    const port = Number(process.env.SMTP_PORT ?? 587);
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.resend.com",
      port,
      secure: port === 465, // 465 = SSL direto; 587 = STARTTLS (padrão dos provedores)
      auth: { user, pass }
    });
    return this.transporter;
  }

  private get from(): string {
    return process.env.MAIL_FROM ?? `ZBuy <${process.env.SMTP_USER ?? "no-reply@zbuy.app"}>`;
  }

  private get apkUrl(): string {
    return process.env.APK_DOWNLOAD_URL ?? DEFAULT_APK_URL;
  }

  /**
   * Convida alguém que ainda não tem conta no ZBuy: e-mail com o link para
   * baixar o app e se cadastrar. Lança ServiceUnavailable se o envio falhar,
   * para o chamador poder avisar o usuário.
   */
  async sendListInvite(toEmail: string, inviterName: string, listName: string): Promise<void> {
    const transporter = this.getTransporter();
    if (!transporter) {
      throw new ServiceUnavailableException("Envio de e-mail não está configurado no servidor");
    }

    const apk = this.apkUrl;
    const subject = `${inviterName} convidou você para o ZBuy 🛒`;
    const text = [
      `${inviterName} quer compartilhar a lista de compras "${listName}" com você no ZBuy.`,
      "",
      "O ZBuy é um app para organizar listas de compras e compartilhar com a família.",
      "",
      `1. Baixe o app: ${apk}`,
      `2. Crie sua conta usando este e-mail (${toEmail}).`,
      `3. Peça para ${inviterName} compartilhar a lista novamente — agora vai funcionar!`,
      "",
      "Até já! 👋",
      "Equipe ZBuy"
    ].join("\n");

    const html = `
      <div style="font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #1f2937;">
        <h2 style="color: #2563eb; margin-bottom: 4px;">Você foi convidado para o ZBuy 🛒</h2>
        <p><strong>${inviterName}</strong> quer compartilhar a lista de compras
        <strong>"${listName}"</strong> com você.</p>
        <p>O ZBuy organiza suas listas de compras e permite compartilhá-las com a família,
        acompanhando a compra em tempo real.</p>
        <p style="text-align: center; margin: 28px 0;">
          <a href="${apk}" style="background: #2563eb; color: #fff; text-decoration: none;
             padding: 14px 28px; border-radius: 10px; font-weight: 600; display: inline-block;">
            Baixar o ZBuy
          </a>
        </p>
        <ol style="line-height: 1.6;">
          <li>Baixe e instale o app pelo botão acima.</li>
          <li>Crie sua conta usando este e-mail (<strong>${toEmail}</strong>).</li>
          <li>Peça para ${inviterName} compartilhar a lista novamente.</li>
        </ol>
        <p style="color: #6b7280; font-size: 13px; margin-top: 24px;">
          Se o botão não funcionar, copie e cole este link no navegador:<br />
          <a href="${apk}">${apk}</a>
        </p>
      </div>
    `;

    try {
      await transporter.sendMail({ from: this.from, to: toEmail, subject, text, html });
      this.logger.log(`Convite enviado para ${toEmail}`);
    } catch (err) {
      this.logger.error(`Falha ao enviar convite para ${toEmail}: ${String(err)}`);
      throw new ServiceUnavailableException("Não foi possível enviar o convite por e-mail");
    }
  }
}
