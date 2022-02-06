import { Router } from 'express';
import * as express from 'express';

import BaseController from './base-ctrl';
import { UserService } from '../services/user-serv';

import constants from '../utils/constants';
import uploader from '../utils/upload-util';
import { ResponseUtil } from '../utils/response-util';

export class UserController implements BaseController {
    private userService: UserService;
    private responseUtil: ResponseUtil;

    public router: Router = express.Router();

    constructor() {
        this.userService = new UserService();
        this.responseUtil = new ResponseUtil();

        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(
            constants.API_VERSION_V1 + constants.API.USERS + '/:pageNumber/:pageSize',
            (req: express.Request, res: express.Response) => {
                this.getUsers(req, res)
            });

        this.router.post(
            constants.API_VERSION_V1 + constants.API.USERS,
            (req: express.Request, res: express.Response) => {
                this.createUser(req, res)
            });

        this.router.put(
            constants.API_VERSION_V1 + constants.API.USERS + '/update-profile-image/:id',
            uploader.single('profile_image'),
            (req: express.Request, res: express.Response) => {
                this.updateProfileImage(req, res)
            });

        this.router.put(
            constants.API_VERSION_V1 + constants.API.USERS + '/:id',
            (req: express.Request, res: express.Response) => {
                this.updateUser(req, res)
            });
    }

    async createUser(req: express.Request, res: express.Response) {
        try {
            let result = await this.userService.create(req.body, req.headers);
            this.responseUtil.sendResponse(res, true, result, 'Record created', 201);
        }
        catch (err) {
            this.responseUtil.sendResponse(res, false, err, 'Some error occured', 500);
        }
    }

    async updateUser(req: express.Request, res: express.Response) {
        try {
            let result = await this.userService.update(req.params.id, req.body, req.headers);
            this.responseUtil.sendResponse(res, true, result, 'Record updated', 201);
        }
        catch (err) {
            this.responseUtil.sendResponse(res, false, err, 'Some error occured', 500);
        }
    }

    async getUsers(req: express.Request, res: express.Response) {
        try {
            let result = await this.userService.getUsers(req.params, req.headers);
            this.responseUtil.sendResponse(res, true, result, 'Data found', 200);
        }
        catch (err) {
            this.responseUtil.sendResponse(res, false, err, 'Some error occured', 500);
        }
    }

    async updateProfileImage(req: express.Request, res: express.Response) {
        try {
            let result = await this.userService.updateProfileImage(req.params.id, req, req.headers);
            this.responseUtil.sendResponse(res, true, result, 'Profile updated', 201);
        }
        catch (err) {
            this.responseUtil.sendResponse(res, false, err, 'Some error occured', 500);
        }
    }
}