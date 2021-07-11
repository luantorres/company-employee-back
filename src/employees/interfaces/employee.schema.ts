import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

export const EmployeeSchema = new mongoose.Schema({
    name: { type: String },
    salary: { type: Number },
    roles: { type: String },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
}, { timestamps: true, collection: 'employees' })

EmployeeSchema.plugin(mongoosePaginate);
