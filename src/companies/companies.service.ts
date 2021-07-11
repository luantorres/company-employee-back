import { HttpService } from '@nestjs/axios';
import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { Address, Company } from './interfaces/company.interface';
import { AxiosResponse } from 'axios';
import { UpdateCompanyDto } from './dtos/update-company.dto';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class CompaniesService {

    constructor(
        @InjectModel('Company') private readonly companyModel: PaginateModel<Company>,
        private readonly httpService: HttpService
    ) {}

    VIACEPURL = 'https://viacep.com.br/ws/';

    async createCompany(createCompany: CreateCompanyDto): Promise<Company> {
        const { name } = createCompany;

        const companyFound = await this.companyModel.findOne({ name }).exec();
        if (companyFound) {
            throw new BadRequestException(`Empresa '${name}' já cadastrada!`);
        }

        const viaCepAddress = await this.getViaCepAddres(createCompany.address.zipCode);
        if (!viaCepAddress.data || viaCepAddress.data.erro) {
            throw new BadRequestException(`Endereço inválido!`);
        }

        this.parseAddress(createCompany.address, viaCepAddress.data);

        const createdCompany = new this.companyModel(createCompany);
        return await createdCompany.save();
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

    async getCompanyById(_id: string): Promise<Company> {
        const companyFound = await this.companyModel.findOne({ _id }).populate('employees', 'name').exec();

        if (!companyFound) {
            throw new NotFoundException(`Empresa '${_id}' não encontrada!`);
        }

        return companyFound;
    }

    async updateCompany(_id: string, updateCompany: UpdateCompanyDto): Promise<void> {
        const companyFound = await this.companyModel.findOne({ _id }).exec();

        if (!companyFound) {
            throw new NotFoundException(`Empresa '${_id}' não encontrada!`);
        }

        if (updateCompany.address.zipCode) {
            const viaCepAddress = await this.getViaCepAddres(updateCompany.address.zipCode);
            if (!viaCepAddress.data || viaCepAddress.data.erro) {
                throw new BadRequestException(`Endereço inválido!`);
            }

            this.parseAddress(updateCompany.address, viaCepAddress.data);
        }

        await this.companyModel.findOneAndUpdate({ _id }, { $set: updateCompany }).exec();
    }

    async deleteCompany(_id: string): Promise<any> {
        const companyFound = await this.companyModel.findOne({ _id }).exec();

        if (!companyFound) {
            throw new NotFoundException(`Não foi encontrado uma empresa com o _id '${_id}' para exclusão!`);
        }

        return await this.companyModel.deleteOne({ _id }).exec();
    }

    async getViaCepAddres(zipCode: string): Promise<AxiosResponse<any>> {
        return await firstValueFrom(this.httpService.get(`${this.VIACEPURL}${zipCode}/json`));
    }

    parseAddress(companyAddress: Address, cepAddress) {
        const { cep: zipCode, logradouro: address, complemento: complement, bairro: district, localidade: city, uf: state } = cepAddress;

        companyAddress['zipCode'] = zipCode;
        companyAddress['address'] = address;
        companyAddress['complement'] = complement;
        companyAddress['district'] = district;
        companyAddress['city'] = city;
        companyAddress['state'] = state;

        return companyAddress;
    }
}
