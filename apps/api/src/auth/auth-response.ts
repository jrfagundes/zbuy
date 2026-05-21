export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export function toAuthResponse(user: AuthUser) {
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
}
