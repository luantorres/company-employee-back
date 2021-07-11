import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from "class-validator";
import { Roles } from "../interfaces/employee.interface";

export class UpdateEmployeeDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    name: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    salary: number;

    @IsEnum(Roles)
    @IsNotEmpty()
    role: Roles;

    @IsMongoId()
    @IsNotEmpty()
    company: any;
}
