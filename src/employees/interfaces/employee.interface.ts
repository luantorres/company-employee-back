import { Document } from 'mongoose';
import { Company } from 'src/companies/interfaces/company.interface';

export interface Employee extends Document {
    name: string;
    salary: number;
    role: Roles,
    company: Company
}

export enum Roles {
    FrontEnd = 'Front-End',
    BackEnd = 'Back-End',
    Design = 'Design',
}