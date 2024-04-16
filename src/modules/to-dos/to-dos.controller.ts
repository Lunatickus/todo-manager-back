import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
  @Get('parents')
  getAllToDos(@Req() request): Promise<ToDoDto[]> {
    const { id } = request.user;
    return this.toDosService.getAllToDos(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/subToDos')
  getSubToDos(@Param('id') toDoId: string, @Req() request): Promise<ToDoDto[]> {
    const { id } = request.user;
    return this.toDosService.getSubToDos(id, toDoId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/completed')
  updateToDoCompleted(
    @Param('id') toDoId: string,
    @Body() toDoDTO: UpdateToDoDto,
    @Req() request,
  ): Promise<UpdateToDoDto> {
    const { id } = request.user;
    return this.toDosService.updateToDoCompleted(id, toDoId, toDoDTO);
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
