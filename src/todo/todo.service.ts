import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { TodoFilter } from './todo-filter.enum';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  getTodos(filter?: TodoFilter): Promise<Todo[]> {
    switch (filter) {
      case TodoFilter.Active:
        return this.todoRepository.find({ complete: false });
      case TodoFilter.Completed:
        return this.todoRepository.find({ complete: true });
      default:
        return this.todoRepository.find();
    }
  }

  createTodo(dto: CreateTodoDTO): Promise<Todo> {
    const todo = this.todoRepository.create(dto);

    return this.todoRepository.save(todo);
  }

  async updateTodo(id: number, dto: UpdateTodoDTO): Promise<Todo> {
    const { affected } = await this.todoRepository.update(id, dto);

    if (affected === 0) {
      throw new NotFoundException(`Todo with id "${id}" does not exist`);
    }

    return this.todoRepository.create({ id, ...dto });
  }

  async deleteTodo(id: number): Promise<void> {
    const { affected } = await this.todoRepository.delete(id);

    if (affected === 0) {
      throw new NotFoundException(`Todo with id "${id}" does not exist`);
    }
  }

  async deleteTodos(ids: number[]): Promise<void> {
    await this.todoRepository.delete(ids);
  }
}
