import { HttpService } from '@nestjs/axios';
import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { Company } from './interfaces/company.interface';
import { AxiosResponse } from 'axios';
import { UpdateCompanyDto } from './dtos/update-company.dto';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class CompaniesService {

    constructor(
        @InjectModel('Company') private readonly companyModel: PaginateModel<Company>,
        @Inject(forwardRef(() => EmployeesService))
        private employeesService: EmployeesService,
        private readonly httpService: HttpService
    ) {}

    VIACEPURL = 'https://viacep.com.br/ws/';

    async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
        const { name } = createCompanyDto;

        const companyFound = await this.companyModel.findOne({ name }).exec();
        if (companyFound) {
            throw new BadRequestException(`Empresa '${name}' já cadastrada!`);
        }

        const viaCepAddress = await this.getViaCepAddres(createCompanyDto.address.zipCode);
        if (!viaCepAddress.data || viaCepAddress.data.erro) {
            throw new BadRequestException(`Endereço inválido!`);
        }

        const { cep: zipCode, logradouro: address, complemento: complement, bairro: district, localidade: city, uf: state } = viaCepAddress.data;
        createCompanyDto.address['zipCode'] = zipCode;
        createCompanyDto.address['address'] = address;
        createCompanyDto.address['complement'] = complement;
        createCompanyDto.address['district'] = district;
        createCompanyDto.address['city'] = city;
        createCompanyDto.address['state'] = state;

        const createdCompany = new this.companyModel(createCompanyDto);
        return await createdCompany.save();
    }

    async getViaCepAddres(zipCode: string): Promise<AxiosResponse<any>> {
        return await firstValueFrom(this.httpService.get(`${this.VIACEPURL}${zipCode}/json`));
    }

    async getAllCompanies(page: number = 1, limit: number = 10) {
        const query = {};

        return await this.companyModel.paginate(
            query,
            { page, limit }
        ).then(result => {
            const { docs, ...pagination } = result;
            return { "companies": docs, ...pagination };
        });
    }

    async getCompanyById(company: string): Promise<Company> {
        const companyFound = await this.companyModel.findOne({ _id: company }).populate('employees', 'name').exec();

        if (!companyFound) {
            throw new NotFoundException(`Empresa '${company}' não encontrada!`);
        }

        return companyFound;
    }

    async updateCompany(company: string, updateCompanyDto: UpdateCompanyDto): Promise<void> {
        const companyFound = await this.companyModel.findOne({ company }).exec();

        if (!companyFound) {
            throw new NotFoundException(`Empresa '${company}' não encontrada!`);
        }

        await this.companyModel.findOneAndUpdate({ company }, { $set: updateCompanyDto }).exec();
    }

    async setCompanyEmployeer(params: string[]): Promise<void> {
        const company = params['company'];
        const employeeId = params['employeeId'];

        const companyFound = await this.getCompanyById(company);
        const employeeInCompany = await this.companyModel.findOne({ _id: company }).where('employees').in(employeeId).exec();

        if (!companyFound) {
            throw new BadRequestException(`Empresa não encontrada!`);
        }

        if (employeeInCompany) {
            throw new BadRequestException(`Funcionário já está cadastrado nesta empresa`);
        }

        companyFound.employees.push(employeeId);
        await this.companyModel.findOneAndUpdate({ _id: company }, { $set: companyFound });
    }
}
