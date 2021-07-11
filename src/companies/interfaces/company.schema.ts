import * as mongoose from 'mongoose';
import * as mongoosePaginate  from 'mongoose-paginate' ;

export const CompanySchema = new mongoose.Schema({
    name: { type: String, unique: true },
    phone: { type: String },
    address: {
        zipCode: { type: String },
        address: { type: String },
        complement: { type: String },
        district: { type: String },
        city: { type: String },
        state: { type: String },
        number: { type: Number },
    }
}, { timestamps: true, collection: 'companies' });

CompanySchema.plugin(mongoosePaginate);
