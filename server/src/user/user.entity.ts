import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Todo } from '../todo/todo.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @OneToMany(() => Todo, todo => todo.user)
  todos: Todo[];
}
