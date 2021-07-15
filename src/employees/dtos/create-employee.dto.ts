import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from "class-validator";
import { Roles } from "../interfaces/employee.interface";

export class CreateEmployeeDto {
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
}
