import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ParametersValidation } from 'src/common/pipes/parameters-validation.pipe';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
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
    async setEmployeeCompany(
        @Param() params: string[]): Promise<void> {
        await this.employeesService.setEmployeerCompany(params);
    }

    @Put('/:employee')
    @UsePipes(ValidationPipe)
    async updateEmployee(
        @Param('employee', ParametersValidation) employee: string,
        @Body() UpdateEmployeeDto: UpdateEmployeeDto): Promise<void> {
        return await this.employeesService.updateEmployee(employee, UpdateEmployeeDto);
    }

    @Delete('/:employee')
    async DeleteEmployee(
        @Param('employee', ParametersValidation) employee: string): Promise<void> {
        await this.employeesService.deleteEmployee(employee);
    }
}
