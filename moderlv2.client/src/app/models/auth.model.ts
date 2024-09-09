export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends AuthRequest {
  username: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  expiresIn?: number;
  user?: {
    id: string;
    email: string;
    username: string;
  }
}

export type LoginRequest = AuthRequest;
export type RegistrationResponse = AuthResponse;
export type LoginResponse = AuthResponse;
