import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ToDosService } from './to-dos.service';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ToDoDto, UpdateToDoDto } from './dto';

@Controller('to-dos')
export class ToDosController {
  constructor(private readonly toDosService: ToDosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createToDo(@Body() toDoDTO: ToDoDto, @Req() request): Promise<ToDoDto> {
    const user = request.user;
    return this.toDosService.createToDo(user, toDoDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getToDos(@Query('id') toDoId: string, @Req() request): Promise<ToDoDto[]> {
    const { id } = request.user;
    if (!toDoId) {
      toDoId = null;
    }
    return this.toDosService.getToDos(id, toDoId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateToDo(
    @Param('id') toDoId: string,
    @Body() toDoDTO: UpdateToDoDto,
    @Req() request,
  ): Promise<UpdateToDoDto> {
    const { id } = request.user;
    return this.toDosService.updateToDo(id, toDoId, toDoDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteToDo(
    @Param('id') toDoId: string,
    @Req() request,
  ): Promise<boolean> {
    const { id } = request.user;
    return this.toDosService.deleteToDo(id, toDoId);
  }
}
