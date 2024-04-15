import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto';
import { AppError } from 'src/common/constants/errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const userExist = await this.findUserByEmail(dto.email);
    if (userExist) {
      throw new BadRequestException(AppError.USER_EXIST);
    }
    dto.password = await this.hashPassword(dto.password);
    await this.userRepository.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });
    return dto;
  }
}
