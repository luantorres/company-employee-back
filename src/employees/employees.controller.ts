import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { EmployeesService } from './employees.service';
import { Employee } from './interfaces/employee.interface';

@Controller('api/employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {};

    @Post()
    @UsePipes(ValidationPipe)
    async createEmployee(
        @Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        return await this.employeesService.createEmployee(createEmployeeDto);
    }

    @Get()
    async getAllEmployees() {
        return await this.employeesService.getAllEmployees();
    }

    @Get('/:employee')
    async getOneEmployee(
        @Param('employee') employee: string): Promise<Employee> {
        return await this.employeesService.getEmployeeById(employee);
    }

    @Post('/:employee/companies/:company')
    @UsePipes(ValidationPipe)
    async setEmployeerCompany(
        @Param() params: string[]): Promise<void> {
        await this.employeesService.setEmployeerCompany(params);
    }
}
