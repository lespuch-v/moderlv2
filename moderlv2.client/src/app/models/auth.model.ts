export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export type LoginRequest = AuthRequest;
export type RegisterRequest = AuthRequest;

export type LoginResponse = AuthResponse;
export type RegisterResponse = AuthResponse;
