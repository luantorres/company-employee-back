import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumberString, IsPositive, IsString, Length, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";

export class Address {
    @IsNumberString()
    @Length(8, 8)
    @IsNotEmpty()
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

    @MinLength(10)
    @MaxLength(11)
    @IsNotEmpty()
    phone: string;

    @Type(() => Address)
    @ValidateNested()
    address: Address;
}