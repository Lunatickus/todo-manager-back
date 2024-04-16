import { Module } from '@nestjs/common';
import { ToDosController } from './to-dos.controller';
import { ToDosService } from './to-dos.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ToDo } from './models/to-dos.model';

@Module({
  imports: [SequelizeModule.forFeature([ToDo])],
  controllers: [ToDosController],
  providers: [ToDosService],
})
export class ToDosModule {}
