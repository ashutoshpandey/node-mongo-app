import { Document, Model, model, Schema } from "mongoose";

export interface IUser extends Document {
    id: Number,
    name: {
        type: {
            first_name: String,
            middle_name: String,
            last_name: String
        }
    },
    gender: String,
    date_of_birth: Date,
    is_deleted: Boolean
}

const userSchema = new Schema({
    id: Number,
    name: {
        type: {
            first_name: String,
            middle_name: String,
            last_name: String
        }
    },
    gender: String,
    date_of_birth: Date,
    is_deleted: {
        type: Boolean,
        default: false
    },
});

const User: Model<IUser> = model('User', userSchema);

export default User;
