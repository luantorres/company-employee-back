import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesModule } from 'src/employees/employees.module';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CompanySchema } from './interfaces/company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
    HttpModule.register({
      timeout: 5000,
    }),
    forwardRef(() => EmployeesModule)
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService]
})
export class CompaniesModule {}
