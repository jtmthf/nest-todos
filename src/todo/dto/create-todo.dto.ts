import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateTodoDTO {
  @IsNotEmpty()
  @ApiModelProperty()
  title!: string;

  @IsOptional()
  @IsBoolean()
  @ApiModelProperty()
  complete?: boolean;
}
