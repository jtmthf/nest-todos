import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mock, verify, reset, instance, deepEqual } from 'ts-mockito';
import { TodoFilter } from './todo-filter.enum';

describe('TodoService', () => {
  let service: TodoService;
  const repository = mock(Repository) as Repository<Todo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useValue: instance(repository),
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    reset(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not use any filters when none specified', async () => {
    await service.getTodos();

    verify(repository.find()).once();
  });

  it('should not use any filters when all specified', async () => {
    await service.getTodos(TodoFilter.All);

    verify(repository.find()).once();
  });

  it('should filter by active', async () => {
    await service.getTodos(TodoFilter.Active);

    verify(repository.find(deepEqual({ complete: false }))).once();
  });

  it('should filter by complete', async () => {
    await service.getTodos(TodoFilter.Completed);

    verify(repository.find(deepEqual({ complete: true }))).once();
  });
});
