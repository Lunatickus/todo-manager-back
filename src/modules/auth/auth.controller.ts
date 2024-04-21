import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, UserDTO } from '../users/dto';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { AppError } from 'src/common/constants/errors';
import { User } from '../users/models/user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDTO): Promise<UserDTO> {
    return this.authService.registerUser(dto);
  }

  @Post('login')
  login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() request) {
    delete request.headers.authorization;
    return { status: 'success' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('current')
  getCurrent(@Req() request): Promise<User> {
    const { authorization } = request.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer')
      throw new BadRequestException(AppError.NOT_AUTHORIZED);
    return this.authService.getCurrent(token);
  }
}
