import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ParametersValidation } from 'src/common/pipes/parameters-validation.pipe';
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
        @Param('company', ParametersValidation) company: string): Promise<Company> {
        return await this.companiesService.getCompanyById(company);
    }

    @Put('/:company')
    @UsePipes(ValidationPipe)
    async updateCompany(
        @Param('company', ParametersValidation) company: string,
        @Body() updateCompanyDto: UpdateCompanyDto): Promise<void> {
        return await this.companiesService.updateCompany(company, updateCompanyDto);
    }

    @Delete('/:company')
    async DeleteCompany(
        @Param('company', ParametersValidation) company: string): Promise<void> {
        await this.companiesService.deleteCompany(company);
    }
}
