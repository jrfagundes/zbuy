type UserRecord = {
  id: string;
  name: string;
  email: string;
};

type AuthIdentityRecord = {
  id: string;
  userId: string;
  provider: "native" | "google" | "microsoft";
  providerSubjectId: string | null;
  providerEmail: string;
  passwordHash: string | null;
  user?: UserRecord;
};

type SessionRecord = {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
  user?: UserRecord;
};

type PasswordResetTokenRecord = {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  consumedAt: Date | null;
  user?: UserRecord;
};

export function createPrismaFake() {
  const users = new Map<string, UserRecord>();
  const usersByEmail = new Map<string, UserRecord>();
  const identitiesByProviderEmail = new Map<string, AuthIdentityRecord>();
  const identitiesByProviderSubject = new Map<string, AuthIdentityRecord>();
  const sessionsByTokenHash = new Map<string, SessionRecord>();
  const resetTokensByTokenHash = new Map<string, PasswordResetTokenRecord>();
  const auditEvents: Array<{ userId?: string | null; eventType: string; metadata?: unknown }> = [];
  let sequence = 0;

  function identityKey(provider: string, providerEmail: string) {
    return `${provider}:${providerEmail}`;
  }

  function subjectKey(provider: string, providerSubjectId: string | null | undefined) {
    return `${provider}:${providerSubjectId ?? ""}`;
  }

  function storeIdentity(identity: AuthIdentityRecord) {
    identitiesByProviderEmail.set(identityKey(identity.provider, identity.providerEmail), identity);
    if (identity.providerSubjectId) {
      identitiesByProviderSubject.set(subjectKey(identity.provider, identity.providerSubjectId), identity);
    }
  }

  return {
    user: {
      findUnique: jest.fn(({ where }: { where: { email?: string; id?: string } }) => {
        if (where.email) return usersByEmail.get(where.email) ?? null;
        if (where.id) return users.get(where.id) ?? null;
        return null;
      }),
      create: jest.fn(({ data }) => {
        const user = {
          id: `user-${++sequence}`,
          name: data.name,
          email: data.email
        };
        users.set(user.id, user);
        usersByEmail.set(user.email, user);

        if (data.identities?.create) {
          const identity = {
            id: `identity-${++sequence}`,
            userId: user.id,
            provider: data.identities.create.provider,
            providerSubjectId: data.identities.create.providerSubjectId ?? null,
            providerEmail: data.identities.create.providerEmail,
            passwordHash: data.identities.create.passwordHash ?? null
          };
          storeIdentity(identity);
        }

        if (data.sessions?.create) {
          const session = {
            id: `session-${++sequence}`,
            userId: user.id,
            tokenHash: data.sessions.create.tokenHash,
            expiresAt: data.sessions.create.expiresAt,
            revokedAt: null
          };
          sessionsByTokenHash.set(session.tokenHash, session);
        }

        if (data.auditEvents?.create) {
          auditEvents.push({ userId: user.id, eventType: data.auditEvents.create.eventType });
        }

        return user;
      }),
      update: jest.fn(({ where, data }) => {
        const user = users.get(where.id);
        if (!user) throw new Error("User not found");
        if (data.name) user.name = data.name;
        if (data.email) {
          usersByEmail.delete(user.email);
          user.email = data.email;
          usersByEmail.set(user.email, user);
        }
        return user;
      })
    },
    authIdentity: {
      findUnique: jest.fn(({ where, include }) => {
        const identity =
          where.provider_providerEmail
            ? identitiesByProviderEmail.get(
                identityKey(where.provider_providerEmail.provider, where.provider_providerEmail.providerEmail)
              )
            : identitiesByProviderSubject.get(
                subjectKey(where.provider_providerSubjectId.provider, where.provider_providerSubjectId.providerSubjectId)
              );
        if (!identity) return null;
        return include?.user ? { ...identity, user: users.get(identity.userId) } : identity;
      }),
      update: jest.fn(({ where, data }) => {
        const identity = identitiesByProviderEmail.get(
          identityKey(where.provider_providerEmail.provider, where.provider_providerEmail.providerEmail)
        );
        if (!identity) throw new Error("Identity not found");
        if (data.passwordHash !== undefined) identity.passwordHash = data.passwordHash;
        return identity;
      }),
      create: jest.fn(({ data }) => {
        const identity = {
          id: `identity-${++sequence}`,
          userId: data.userId,
          provider: data.provider,
          providerSubjectId: data.providerSubjectId ?? null,
          providerEmail: data.providerEmail,
          passwordHash: data.passwordHash ?? null
        };
        storeIdentity(identity);
        return identity;
      })
    },
    session: {
      create: jest.fn(({ data }) => {
        const session = {
          id: `session-${++sequence}`,
          userId: data.userId,
          tokenHash: data.tokenHash,
          expiresAt: data.expiresAt,
          revokedAt: null
        };
        sessionsByTokenHash.set(session.tokenHash, session);
        return session;
      }),
      findUnique: jest.fn(({ where, include }) => {
        const session = sessionsByTokenHash.get(where.tokenHash);
        if (!session) return null;
        return include?.user ? { ...session, user: users.get(session.userId) } : session;
      }),
      updateMany: jest.fn(({ where, data }) => {
        let count = 0;
        for (const session of sessionsByTokenHash.values()) {
          if (where.tokenHash && session.tokenHash !== where.tokenHash) continue;
          if (where.userId && session.userId !== where.userId) continue;
          if (where.revokedAt === null && session.revokedAt !== null) continue;
          session.revokedAt = data.revokedAt;
          count += 1;
        }
        return { count };
      })
    },
    passwordResetToken: {
      create: jest.fn(({ data }) => {
        const token = {
          id: `reset-${++sequence}`,
          userId: data.userId,
          tokenHash: data.tokenHash,
          expiresAt: data.expiresAt,
          consumedAt: null
        };
        resetTokensByTokenHash.set(token.tokenHash, token);
        return token;
      }),
      findUnique: jest.fn(({ where, include }) => {
        const token = resetTokensByTokenHash.get(where.tokenHash);
        if (!token) return null;
        return include?.user ? { ...token, user: users.get(token.userId) } : token;
      }),
      update: jest.fn(({ where, data }) => {
        const token = resetTokensByTokenHash.get(where.tokenHash);
        if (!token) throw new Error("Reset token not found");
        token.consumedAt = data.consumedAt;
        return token;
      })
    },
    auditEvent: {
      create: jest.fn(({ data }) => {
        auditEvents.push(data);
        return { id: `audit-${++sequence}`, ...data };
      })
    },
    isReady: jest.fn().mockResolvedValue(true),
    __auditEvents: auditEvents
  };
}
