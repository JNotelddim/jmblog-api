export interface CreateUserDto {
  email: string;
  password: string;
}

export interface UpdateUserDto {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
}

export interface UpdatePasswordDto {
  id: string;
  newPassword: string;
}
