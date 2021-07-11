import { Document } from 'mongoose';
import { Employee } from 'src/employees/interfaces/employee.interface';

export interface Company extends Document {
    readonly name: string;
    phone: string;
    address: Address;
    employees: Array<Employee>;
}

export interface Address {
    zipCode: string;
    number: number;
}