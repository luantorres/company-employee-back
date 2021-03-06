import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { CompaniesService } from 'src/companies/companies.service';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { Employee } from './interfaces/employee.interface';
import * as mongoose from 'mongoose';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectModel('Employee') private readonly employeeModel: PaginateModel<Employee>,
        @Inject(forwardRef(() => CompaniesService))
        private companiesService: CompaniesService
    ) {}

    async createEmployee(company, createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        await this.companiesService.getCompanyById(company);
        const createdEmployee = new this.employeeModel({ ...createEmployeeDto, company });

        return await createdEmployee.save();
    }

    async getAllEmployees(company: string, page: number = 1, limit: number = 10) {
        const query = { company };
        limit = Math.min(10, limit);
        page = Math.max(1, page);

        return await this.employeeModel.paginate(
            query,
            { page, limit, populate: { path: 'company', select: 'name' }
        }).then(result => {
            const { docs, ...pagination } = result;
            return { "employees": docs, ...pagination };
        });
    }

    async getEmployeeById(employee: string): Promise<Employee> {
        const employeeFound = await this.employeeModel.findOne({ _id: employee }).populate('company', 'name').exec();

        if (!employeeFound) {
            throw new NotFoundException(`Funcionário '${employee}' não encontrado!`);
        }

        return employeeFound;
    }

    async setEmployeerCompany(params: string[]): Promise<void> {
        const company = params['company'];
        const employee = params['employee'];

        const employeeExist = await this.getEmployeeById(employee);
        if (!employeeExist) {
            throw new BadRequestException(`Funcionário não existe!`);
        }

        const companyExist = await this.companiesService.getCompanyById(company);
        if (!companyExist) {
            throw new BadRequestException(`Empresa não encontrada!`);
        }

        employeeExist.company = companyExist._id;

        await this.employeeModel.findOneAndUpdate({ _id: employee }, { $set: employeeExist })
    }

    async updateEmployee(_id: string, updateEmployee: UpdateEmployeeDto): Promise<void> {
        const employeeFound = await this.employeeModel.findOne({ _id }).exec();


        if (!employeeFound) {
            throw new NotFoundException(`Funcionário '${_id}' não encontrado!`);
        }

        await this.employeeModel.findOneAndUpdate({ _id }, updateEmployee, { new: true }).exec();
    }

    async deleteEmployee(_id: string): Promise<any> {
        const deletedEmployee = await this.employeeModel.findOne({ _id }).exec();

        if (!deletedEmployee) {
            throw new NotFoundException(`Não foi encontrado um funcionário com o _id '${_id}' para exclusão!`);
        }

        return await this.employeeModel.deleteOne({ _id }).exec();
    }
}
