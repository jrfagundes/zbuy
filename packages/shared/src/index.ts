export type AuthProvider = "native" | "google" | "microsoft";

export interface CurrentUserDto {
  id: string;
  name: string;
  email: string;
}

export interface AuthenticatedUserResponse {
  user: CurrentUserDto;
}

export interface ApiErrorResponse {
  message: string;
  requestId?: string;
}
