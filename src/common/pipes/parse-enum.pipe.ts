import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseEnumPipe implements PipeTransform {
  transform(value: any, { metatype }: ArgumentMetadata) {
    if (value === undefined || typeof metatype !== 'object') {
      return;
    }

    const enumValue = metatype[value];
    if (enumValue === undefined) {
      throw new BadRequestException(`Invalid value "${value}"`);
    }

    return enumValue;
  }
}
