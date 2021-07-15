import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ParametersValidation } from 'src/common/pipes/parameters-validation.pipe';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { EmployeesService } from './employees.service';
import { Employee } from './interfaces/employee.interface';

@Controller('api/companies')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {};

    @Post('/:company/employees')
    @UsePipes(ValidationPipe)
    async createEmployee(
        @Body() createEmployeeDto: CreateEmployeeDto,
        @Param('company') company: string): Promise<Employee> {
        return await this.employeesService.createEmployee(company, createEmployeeDto);
    }

    @Get('/:company/employees')
    async getAllEmployees(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
        @Param('company') company: string
    ) {
        return await this.employeesService.getAllEmployees(company, page, limit);
    }

    @Get('/:company/employees/:employee')
    async getOneEmployee(
        @Param('employee') employee: string): Promise<Employee> {
        return await this.employeesService.getEmployeeById(employee);
    }

    @Post('/:company/employees/:employee')
    @UsePipes(ValidationPipe)
    async setEmployeeCompany(
        @Param() params: string[]): Promise<void> {
        await this.employeesService.setEmployeerCompany(params);
    }

    @Put('/employees/:employee')
    @UsePipes(ValidationPipe)
    async updateEmployee(
        @Param('employee', ParametersValidation) employee: string,
        @Body() UpdateEmployeeDto: UpdateEmployeeDto): Promise<void> {
        return await this.employeesService.updateEmployee(employee, UpdateEmployeeDto);
    }

    @Delete('/employees/:employee')
    async DeleteEmployee(
        @Param('employee', ParametersValidation) employee: string): Promise<void> {
        await this.employeesService.deleteEmployee(employee);
    }
}
