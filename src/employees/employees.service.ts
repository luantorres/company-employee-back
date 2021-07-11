import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { CompaniesService } from 'src/companies/companies.service';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { Employee } from './interfaces/employee.interface';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectModel('Employee') private readonly employeeModel: PaginateModel<Employee>,
        @Inject(forwardRef(() => CompaniesService))
        private companiesService: CompaniesService
    ) {}

    async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        const createdEmployee = new this.employeeModel(createEmployeeDto);
        await this.companiesService.getCompanyById(createEmployeeDto.company);

        return await createdEmployee.save();
    }

    async getAllEmployees(page: number = 1, limit: number = 10) {
        const query = {};

        return await this.employeeModel.paginate(
            query,
            { page, limit, populate: { path: 'company', select: 'name phone address' }
        }).then(result => {
            const { docs, ...pagination } = result;
            return { "employees": docs, ...pagination };
        });
    }

    async getEmployeeById(employee: string): Promise<Employee> {
        const employeeFound = await this.employeeModel.findOne({ _id: employee }).populate('company', 'name phone address').exec();

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
}
