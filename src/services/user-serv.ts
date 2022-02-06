import User from '../models/user';

import { AppError } from '../app-error';
import constants from '../utils/constants';
import { JwtUtil } from '../utils/jwt-util';
import { DateUtil } from '../utils/date-util';
import { EncryptionUtil } from '../utils/encryption-util';

export class UserService {
    private jwtUtil: JwtUtil;
    private dateUtil: DateUtil;
    private encryptionUtil: EncryptionUtil;

    constructor() {
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

    async create(params: any, headers: any = null) {
        let user = new User(params);
        return await user.save();
    }

    async update(id: any, params: any, headers: any = null) {
        params.update_date = Date.now();

        let user: any = User.findByIdAndUpdate(id, params, { new: true });

        delete user.password;
        delete user.is_deleted;

        return user;
    }

    async getUsers(params: any, headers: any) {
        let pageNumber: number = 0;
        let pageSize: number = constants.DEFAULT_PAGE_SIZE;

        if (params.pageNumber) {
            pageNumber = params.pageNumber;
        }

        if (params.pageSize) {
            pageSize = params.pageSize;
        }

        return User.find({}, { password: 0, is_deleted: 0 }).skip(pageSize * (pageNumber - 1)).limit(pageSize);
    }

    async filter(params: any, headers: any = null) {
        return User.find({});
    }

    async remove(id: any, headers: any = null) {

    }

    async updateProfileImage(id: any, req: any, headers: any) {
        req.body.update_date = Date.now();

        let params = {
            update_date: req.body.update_date,
            profile_image: req.body.image_name
        };

        let user: any = User.findByIdAndUpdate(id, params, { new: true });

        if (user) {
            delete user.password;
            delete user.is_deleted;

            return user;
        } else {
            return Promise.reject(new AppError('Invalid user id', 404));
        }
    }
}