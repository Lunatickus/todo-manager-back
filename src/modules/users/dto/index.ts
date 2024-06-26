import { IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}

class RegisterUserDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;
}

export class UserDTO {
  user: RegisterUserDTO;

  @IsString()
  token: string;
}

export class UpdateUserDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;
}
