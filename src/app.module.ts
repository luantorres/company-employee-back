import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesModule } from './companies/companies.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    CompaniesModule,
    EmployeesModule,
    MongooseModule.forRoot(
      'mongodb+srv://mongocompany:MongoDb2021!@cluster0.rloch.mongodb.net/companytestdb?retryWrites=true&w=majority',
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
