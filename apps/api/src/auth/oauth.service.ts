import { Injectable } from "@nestjs/common";
import { addDays } from "date-fns";
import { PrismaService } from "../prisma/prisma.service";
import { TokenService } from "./token.service";

export interface OAuthTestProfile {
  provider: "google" | "microsoft";
  subject: string;
  email: string;
  name: string;
  requestId?: string;
}

@Injectable()
export class OAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokens: TokenService
  ) {}

  async loginWithTestProfile(profile: OAuthTestProfile) {
    const providerEmail = this.normalizeEmail(profile.email);
    const existingIdentity = await this.prisma.authIdentity.findUnique({
      where: {
        provider_providerSubjectId: {
          provider: profile.provider,
          providerSubjectId: profile.subject
        }
      },
      include: { user: true }
    });

    let user = existingIdentity?.user ?? null;

    if (!user) {
      user = await this.prisma.user.findUnique({ where: { email: providerEmail } });
      if (user) {
        await this.prisma.authIdentity.create({
          data: {
            userId: user.id,
            provider: profile.provider,
            providerSubjectId: profile.subject,
            providerEmail
          }
        });
      } else {
        user = await this.prisma.user.create({
          data: {
            name: profile.name.trim(),
            email: providerEmail,
            identities: {
              create: {
                provider: profile.provider,
                providerSubjectId: profile.subject,
                providerEmail
              }
            }
          }
        });
      }
    }

    const sessionToken = this.tokens.createOpaqueToken();
    await this.prisma.session.create({
      data: {
        userId: user.id,
        tokenHash: this.tokens.hashToken(sessionToken),
        expiresAt: addDays(new Date(), 30)
      }
    });
    await this.prisma.auditEvent.create({
      data: {
        userId: user.id,
        eventType: "oauth_login_succeeded",
        requestId: profile.requestId,
        metadata: { provider: profile.provider }
      }
    });

    return { user, sessionToken };
  }

  private normalizeEmail(email: string) {
    return email.trim().toLowerCase();
  }
}
