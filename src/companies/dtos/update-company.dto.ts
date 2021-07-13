import { Type } from "class-transformer";
import { IsInt, IsMobilePhone, IsNotEmpty, IsNumber, IsNumberString, IsPositive, IsString, Length, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";

export class Address {
    @IsString()
    @Matches('[0-9]{5}-[0-9]{3}')
    @IsNotEmpty()
    zipCode: string;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    number: number;
}

export class UpdateCompanyDto {
    @IsMobilePhone('pt-BR')
    phone: string;

    @Type(() => Address)
    @ValidateNested()
    address: Address;
}