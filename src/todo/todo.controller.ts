import { Controller, Get, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoFilter } from './todo-filter.enum';
import { ParseEnumPipe } from 'src/common/pipes/parse-enum.pipe';
import { ApiUseTags, ApiImplicitQuery } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

@ApiUseTags('todos')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiImplicitQuery({
    name: 'filter',
    enum: Object.values(TodoFilter),
    required: false,
  })
  getTodos(
    @Query('filter', ParseEnumPipe) @IsEnum(TodoFilter) filter?: TodoFilter,
  ) {
    return this.todoService.getTodos(filter);
  }
}
