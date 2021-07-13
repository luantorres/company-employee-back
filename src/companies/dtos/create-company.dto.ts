import { Type } from "class-transformer";
import { IsInt, IsMobilePhone, IsNotEmpty, IsNumberString, IsPositive, IsString, Length, Matches, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";

export class Address {
    @IsString()
    @IsNotEmpty()
    @Matches('[0-9]{5}-[0-9]{3}')
    zipCode: string;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    number: number;
}

export class CreateCompanyDto {
    @IsString()
    @MaxLength(200)
    @IsNotEmpty()
    readonly name: string;

    @IsMobilePhone('pt-BR')
    phone: string;

    @Type(() => Address)
    @ValidateNested()
    address: Address;
}