import { Document, Model, model, Schema } from "mongoose";

export interface IUser extends Document {
    id: Number,
    first_name: String,
    middle_name: String,
    last_name: String,
    gender: String,
    date_of_birth: Date,
    password: String,
    is_deleted: Boolean,
    create_date: Date,
    update_date: Date
}

const userSchema = new Schema({
    id: Number,
    first_name: String,
    middle_name: String,
    last_name: String,
    gender: String,
    date_of_birth: Date,
    password: String,
    profile_image: String,
    is_deleted: {
        type: Boolean,
        default: false
    },
    create_date: {
        type: Date,
        default: new Date()
    },
    update_date: {
        type: Date,
        default: new Date()
    }
});

const User: Model<IUser> = model('User', userSchema);

export default User;
