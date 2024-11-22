export interface UserModel {
  userId: string;
  username: string;
  enabled: boolean;
  role: UserRole;
}

export type UserRole = "PATIENT" | "DOCTOR" | "ADMIN";

export interface User extends UserModel, UserCredentials {}

export interface UserCredentials {
  username: string;
  password: string;
}
