import { IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class ToDoDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsBoolean()
  hasSubToDos?: boolean;

  @IsOptional()
  @IsInt()
  parentToDoId?: number;
}

export class UpdateToDoDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsBoolean()
  hasSubToDos?: boolean;

  @IsOptional()
  @IsInt()
  parentToDoId?: number;
}
