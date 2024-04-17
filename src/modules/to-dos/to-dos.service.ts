import { InjectModel } from '@nestjs/sequelize';
import { ToDo } from './models/to-dos.model';
import { Injectable } from '@nestjs/common';
import { ToDoDto, UpdateToDoDto } from './dto';

@Injectable()
export class ToDosService {
  constructor(
    @InjectModel(ToDo) private readonly toDoRepository: typeof ToDo,
  ) {}

  async createToDo(user, dto: ToDoDto): Promise<ToDoDto> {
    try {
      const toDo = {
        user: user.id,
        title: dto.title,
        description: dto.description,
        completed: dto.completed,
        parentToDoId: dto.parentToDoId,
      };
      await this.toDoRepository.create(toDo);
      return toDo;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getToDos(id: number, toDoId: string): Promise<ToDoDto[]> {
    try {
      return this.toDoRepository.findAll({
        where: { user: id, parentToDoId: toDoId },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateToDo(
    userId: number,
    toDoId: string,
    dto: UpdateToDoDto,
  ): Promise<UpdateToDoDto> {
    try {
      if (dto.completed !== null) {
        await this.toDoRepository.update(dto, {
          where: { parentToDoId: toDoId },
        });
      }
      // const resp = await Promise.all([
      //   this.toDoRepository.update(dto, {
      //     where: { id: toDoId, user: userId },
      //   }),
      //   this.toDoRepository.findOne({
      //     where: { id: toDoId, user: userId },
      //   }),
      // ]);
      await this.toDoRepository.update(dto, {
        where: { id: toDoId, user: userId },
      });
      return this.toDoRepository.findOne({
        where: { id: toDoId, user: userId },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteToDo(userId: number, toDoId: string): Promise<boolean> {
    try {
      await this.toDoRepository.destroy({ where: { parentToDoId: toDoId } });
      await this.toDoRepository.destroy({
        where: { id: toDoId, user: userId },
      });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
