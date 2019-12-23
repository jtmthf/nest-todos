import { IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateTodoDTO {
  @IsNotEmpty()
  title!: string;

  @IsBoolean()
  complete!: boolean;
}
