export interface UserModel {
  userId: string;
  username: string;
  enabled: boolean;
}

export interface User extends UserModel, UserCredentials {}

export interface UserCredentials {
  username: string;
  password: string;
}
