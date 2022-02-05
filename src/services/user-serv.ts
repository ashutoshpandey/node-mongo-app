import User from '../models/user';
import { UserDB } from '../db/user-db';

import { JwtUtil } from '../utils/jwt-util';
import { DateUtil } from '../utils/date-util';
import { EncryptionUtil } from '../utils/encryption-util';

export class UserService {
    private userDB: UserDB;

    private jwtUtil: JwtUtil;
    private dateUtil: DateUtil;
    private encryptionUtil: EncryptionUtil;

    constructor() {
        this.userDB = new UserDB();

        this.jwtUtil = new JwtUtil();
        this.dateUtil = new DateUtil();
        this.encryptionUtil = new EncryptionUtil();
    }

    async find(params: any, headers: any = null) {
        return User.find(params.id);
    }

    async findByUsername(params: any, headers: any = null) {
        return User.find({ username: params.username });
    }

    async store(params: any, headers: any = null) {
        let user = new User(params);
        return await user.save();
    }

    async update(id: number, params: any, headers: any = null) {

    }

    async filter(params: any, headers: any = null) {

    }

    async remove(id: number, headers: any = null) {

    }
}