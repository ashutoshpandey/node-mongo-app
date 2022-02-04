import { User } from '../models/user';
import { UserDB } from '../db/user-db';

import { DateUtil } from '../utils/date-util';
import { EncryptionUtil } from '../utils/encryption-util';

export class UserService {
    private userDB: UserDB;

    private dateUtil: DateUtil;
    private encryptionUtil: EncryptionUtil;

    constructor() {
        this.userDB = new UserDB();

        this.dateUtil = new DateUtil();
        this.encryptionUtil = new EncryptionUtil();
    }

    async find(params: any, headers: any = null) {

    }

    async store(params: any, headers: any = null) {

    }

    async update(id: number, params: any, headers: any = null) {

    }

    async filter(params: any, headers: any = null) {

    }

    async remove(id: number, headers: any = null) {

    }
}