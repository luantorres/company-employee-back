import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumberString, IsPositive, Length, MaxLength, MinLength, ValidateNested } from "class-validator";

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

export class UpdateCompanyDto {
    @MinLength(10)
    @MaxLength(11)
    @IsNotEmpty()
    phone: string;

    @Type(() => Address)
    @ValidateNested()
    address: Address;
}