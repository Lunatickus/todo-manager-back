import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
  DataType,
} from 'sequelize-typescript';
import { IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';
import { User } from '../../users/models/user.model';

@Table
export class ToDo extends Model<ToDo> {
  @ForeignKey(() => User)
  user: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @IsString()
  title: string;

  @Column(DataType.TEXT)
  @IsOptional()
  @IsString()
  description?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  @IsBoolean()
  completed: boolean;

  @ForeignKey(() => ToDo)
  @Column
  @IsOptional()
  @IsInt()
  parentToDoId?: number;

  @BelongsTo(() => ToDo, 'parentToDoId')
  parentToDo: ToDo;

  @HasMany(() => ToDo, 'parentToDoId')
  subToDos: ToDo[];
}
