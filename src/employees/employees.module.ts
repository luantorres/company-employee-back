import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesController } from './employees.controller';
import { EmployeeSchema } from './interfaces/employee.schema';
import { EmployeesService } from './employees.service';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Employee', schema: EmployeeSchema }]),
    forwardRef(() => CompaniesModule)
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService]
})
export class EmployeesModule {}
