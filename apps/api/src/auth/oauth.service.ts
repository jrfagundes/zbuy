import { Injectable, UnauthorizedException } from "@nestjs/common";
import { addDays } from "date-fns";
import { OAuth2Client } from "google-auth-library";
import { PrismaService } from "../prisma/prisma.service";
import { TokenService } from "./token.service";

export interface OAuthTestProfile {
  provider: "google" | "microsoft";
  subject: string;
  email: string;
  name: string;
  requestId?: string;
}

interface VerifiedProfile {
  provider: "google" | "microsoft";
  subject: string;
  email: string;
  name: string;
  requestId?: string;
}

@Injectable()
export class OAuthService {
  private googleClient: OAuth2Client | null = null;

  constructor(
    private readonly prisma: PrismaService,
    private readonly tokens: TokenService
  ) {}

  /**
   * Verifies a Google ID token (obtained from the mobile Google Sign-In SDK)
   * against GOOGLE_CLIENT_ID, then upserts the user and creates a session.
   */
  async loginWithGoogle(idToken: string, requestId?: string) {
    const profile = await this.verifyGoogleIdToken(idToken);
    return this.upsertUserAndCreateSession({ ...profile, requestId });
  }

  private async verifyGoogleIdToken(idToken: string): Promise<Omit<VerifiedProfile, "requestId">> {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
      throw new UnauthorizedException("Google login is not configured");
    }
    if (!this.googleClient) {
      this.googleClient = new OAuth2Client(clientId);
    }

    let payload;
    try {
      const ticket = await this.googleClient.verifyIdToken({ idToken, audience: clientId });
      payload = ticket.getPayload();
    } catch {
      throw new UnauthorizedException("Invalid Google token");
    }

    if (!payload?.sub || !payload.email) {
      throw new UnauthorizedException("Google token is missing required claims");
    }
    if (payload.email_verified === false) {
      throw new UnauthorizedException("Google e-mail is not verified");
    }

    return {
      provider: "google",
      subject: payload.sub,
      email: payload.email,
      name: payload.name?.trim() || payload.email.split("@")[0]
    };
  }

  async loginWithTestProfile(profile: OAuthTestProfile) {
    return this.upsertUserAndCreateSession(profile);
  }

  private async upsertUserAndCreateSession(profile: VerifiedProfile) {
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
