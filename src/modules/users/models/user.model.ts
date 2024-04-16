import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { ToDo } from '../../to-dos/models/to-dos.model';

@Table
export class User extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => ToDo, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  toDos: ToDo[];
}
