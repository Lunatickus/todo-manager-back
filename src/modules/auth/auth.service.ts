import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDTO, UserDTO } from '../users/dto';
import { AppError } from 'src/common/constants/errors';
import { UserLoginDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';
import { User } from '../users/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(dto: CreateUserDTO): Promise<UserDTO> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email);
      if (existUser) throw new BadRequestException(AppError.USER_EXIST);

      await this.userService.createUser(dto);
      const user = await this.userService.publicUser(dto.email);
      const token = await this.tokenService.generateJwtToken(user);
      return { user, token };
    } catch (error) {
      throw new Error(error);
    }
  }

  async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email);
      if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
      const validatePassword = await bcrypt.compare(
        dto.password,
        existUser.password,
      );
      if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
      const user = await this.userService.publicUser(dto.email);
      const token = await this.tokenService.generateJwtToken(user);
      return { user, token };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCurrent(token: string): Promise<User> {
    try {
      const email = await this.tokenService.verifyToken(token);
      return await this.userService.publicUser(email);
    } catch (error) {
      throw new Error(error);
    }
  }
}
