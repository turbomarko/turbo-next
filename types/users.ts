export interface User {
  id: number;
  email: string;
  isStaff: boolean;
}

export interface UserResponse {
  user: User;
  access: string;
  refresh: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password1: string;
  password2: string;
}

export interface ResetPasswordConfirmRequest {
  newPassword1: string;
  newPassword2: string;
  uid: string;
  token: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;
}
