import mongoose from "mongoose";

export interface EachUserConverterDocument extends mongoose.Document {
    eth_address: string;
    algo_address: string;
    amount: Number;
    pending : boolean;
  }

//defining model scheme
const userSchema = new mongoose.Schema({
    eth_address: {type : String, required: true, unique: true},
    algo_address:{ type: String, required: true, unique: true},
    amount: {type: String, required: true, },
    pending : Boolean
})

const user = mongoose.model<EachUserConverterDocument>('user', userSchema)

export default user

