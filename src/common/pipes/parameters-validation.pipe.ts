import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

export class ParametersValidation implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (!value) {
            throw new BadRequestException(`O valor do parâmetro ${metadata.data} deve ser preenchido`);
        }

        return value;
    }
}