import { IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class UserDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  token: string;
}

export class UpdateUserDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;
}
