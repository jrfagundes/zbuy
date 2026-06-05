import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { addDays, addMinutes } from "date-fns";
import { CatalogService } from "../catalog/catalog.service";
import { PrismaService } from "../prisma/prisma.service";
import { PasswordService } from "./password.service";
import { TokenService } from "./token.service";

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
  requestId?: string;
}

export interface LoginInput {
  email: string;
  password: string;
  requestId?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwords: PasswordService,
    private readonly tokens: TokenService,
    private readonly catalog: CatalogService
  ) {}

  async signUp(input: SignUpInput) {
    const email = this.normalizeEmail(input.email);
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ConflictException("E-mail already registered");
    }

    const passwordHash = await this.passwords.hash(input.password);
    const sessionToken = this.tokens.createOpaqueToken();
    const tokenHash = this.tokens.hashToken(sessionToken);

    const user = await this.prisma.user.create({
      data: {
        name: input.name.trim(),
        email,
        identities: {
          create: {
            provider: "native",
            providerEmail: email,
            passwordHash
          }
        },
        sessions: {
          create: {
            tokenHash,
            expiresAt: addDays(new Date(), 30)
          }
        },
        auditEvents: {
          create: {
            eventType: "account_created",
            requestId: input.requestId
          }
        }
      }
    });

    // Seed the new account with the known-products catalog.
    await this.catalog.provisionForUser(user.id);

    return { user, sessionToken };
  }

  async login(input: LoginInput) {
    const email = this.normalizeEmail(input.email);
    const identity = await this.prisma.authIdentity.findUnique({
      where: { provider_providerEmail: { provider: "native", providerEmail: email } },
      include: { user: true }
    });

    if (!identity?.passwordHash) {
      await this.prisma.auditEvent.create({
        data: {
          eventType: "login_failed",
          requestId: input.requestId,
          metadata: { email }
        }
      });
      throw new UnauthorizedException("Invalid credentials");
    }

    const valid = await this.passwords.verify(identity.passwordHash, input.password);
    if (!valid) {
      await this.prisma.auditEvent.create({
        data: { userId: identity.userId, eventType: "login_failed", requestId: input.requestId }
      });
      throw new UnauthorizedException("Invalid credentials");
    }

    const sessionToken = this.tokens.createOpaqueToken();
    await this.prisma.session.create({
      data: {
        userId: identity.userId,
        tokenHash: this.tokens.hashToken(sessionToken),
        expiresAt: addDays(new Date(), 30)
      }
    });
    await this.prisma.auditEvent.create({
      data: { userId: identity.userId, eventType: "login_succeeded", requestId: input.requestId }
    });

    return { user: identity.user, sessionToken };
  }

  async findUserBySession(token: string) {
    const session = await this.prisma.session.findUnique({
      where: { tokenHash: this.tokens.hashToken(token) },
      include: { user: true }
    });

    if (!session || session.revokedAt || session.expiresAt <= new Date()) {
      return null;
    }

    return session.user;
  }

  async logout(token: string, requestId?: string) {
    const tokenHash = this.tokens.hashToken(token);
    const session = await this.prisma.session.findUnique({
      where: { tokenHash },
      include: { user: true }
    });

    await this.prisma.session.updateMany({
      where: { tokenHash, revokedAt: null },
      data: { revokedAt: new Date() }
    });

    if (session) {
      await this.prisma.auditEvent.create({
        data: { userId: session.userId, eventType: "logout", requestId }
      });
    }
  }

  async requestPasswordReset(emailInput: string, requestId?: string) {
    const email = this.normalizeEmail(emailInput);
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { status: "ok" };
    }

    const resetToken = this.tokens.createOpaqueToken();
    await this.prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash: this.tokens.hashToken(resetToken),
        expiresAt: addMinutes(new Date(), 30)
      }
    });
    await this.prisma.auditEvent.create({
      data: { userId: user.id, eventType: "password_reset_requested", requestId }
    });

    return this.shouldExposeDevToken() ? { status: "ok", devResetToken: resetToken } : { status: "ok" };
  }

  async confirmPasswordReset(token: string, newPassword: string, requestId?: string) {
    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: { tokenHash: this.tokens.hashToken(token) },
      include: { user: true }
    });

    if (!resetToken || resetToken.consumedAt || resetToken.expiresAt <= new Date()) {
      throw new BadRequestException("Invalid or expired reset token");
    }

    const passwordHash = await this.passwords.hash(newPassword);
    await this.prisma.authIdentity.update({
      where: {
        provider_providerEmail: {
          provider: "native",
          providerEmail: resetToken.user.email
        }
      },
      data: { passwordHash }
    });
    await this.prisma.passwordResetToken.update({
      where: { tokenHash: resetToken.tokenHash },
      data: { consumedAt: new Date() }
    });
    await this.prisma.session.updateMany({
      where: { userId: resetToken.userId, revokedAt: null },
      data: { revokedAt: new Date() }
    });
    await this.prisma.auditEvent.create({
      data: { userId: resetToken.userId, eventType: "password_reset_completed", requestId }
    });

    return { status: "ok" };
  }

  private normalizeEmail(email: string) {
    return email.trim().toLowerCase();
  }

  private shouldExposeDevToken() {
    return process.env.NODE_ENV !== "production";
  }
}
