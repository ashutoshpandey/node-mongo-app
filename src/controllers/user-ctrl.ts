import { Router } from 'express';
import * as express from 'express';

import BaseController from './base-ctrl';
import constants from '../utils/constants';
import { UserService } from '../services/user-serv';
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
        this.router.get(constants.API_VERSION_V1 + constants.API.USERS + '/:pageNumber/:pageSize', (req: express.Request, res: express.Response) => { this.getUsers(req, res, this) });
        this.router.post(constants.API_VERSION_V1 + constants.API.USERS, (req: express.Request, res: express.Response) => { this.createUser(req, res, this) });
    }

    async createUser(req: express.Request, res: express.Response, that: any) {
        try {
            let result = await that.userService.create(req.body, req.headers);
            this.responseUtil.sendResponse(res, true, result, 'Record created', 201);
        }
        catch (err) {
            this.responseUtil.sendResponse(null, false, err, 'Some error occured', 500);
        }
    }

    async getUsers(req: express.Request, res: express.Response, that: any) {
        try {
            let result = await that.userService.getUsers(req.params, req.headers);
            this.responseUtil.sendResponse(res, true, result, 'Data found', 200);
        }
        catch (err) {
            this.responseUtil.sendResponse(null, false, err, 'Some error occured', 500);
        }
    }
}