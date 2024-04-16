import { IsString } from 'class-validator';

class UserResponse {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class AuthUserResponse {
  user: UserResponse;

  @IsString()
  token: string;
}
