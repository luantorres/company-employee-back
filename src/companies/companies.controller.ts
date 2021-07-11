import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';
import { Company } from './interfaces/company.interface';

@Controller('api/companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {};

    @Post()
    @UsePipes(ValidationPipe)
    async createCompany(
        @Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
        return await this.companiesService.createCompany(createCompanyDto);
    }

    @Get()
    async getAllCompanies() {
        return await this.companiesService.getAllCompanies();
    }

    @Get('/:company')
    async getOneCompany(
        @Param('company') company: string): Promise<Company> {
        return await this.companiesService.getCompanyById(company);
    }

    @Put()
    @UsePipes(ValidationPipe)
    async updateCompany(
        @Param('/:company') company: string,
        @Body() updateCompanyDto: UpdateCompanyDto): Promise<void> {
        return await this.companiesService.updateCompany(company, updateCompanyDto);
    }

    @Post('/:company/employees/:employeeId')
    @UsePipes(ValidationPipe)
    async setCompanyEmployeer(
        @Param() params: string[]): Promise<void> {
        await this.companiesService.setCompanyEmployeer(params);
    }
}
