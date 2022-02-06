import { Router } from 'express';
import * as express from 'express';
import BaseController from './base-ctrl';
import constants from '../utils/constants';
import { LoginService } from '../services/login-serv';
import { ResponseUtil } from '../utils/response-util';

export class LoginController implements BaseController {
    private loginService: LoginService;
    private responseUtil: ResponseUtil;

    public router: Router = express.Router();

    constructor() {
        this.loginService = new LoginService();
        this.responseUtil = new ResponseUtil();

        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(
            constants.API_VERSION_V1 + constants.API.LOGIN,
            (req: express.Request, res: express.Response) => {
                this.login(req, res)
            });
    }

    async login(req: express.Request, res: express.Response) {
        try {
            let result = await this.loginService.login(req.body, req.headers);
            this.responseUtil.sendResponse(res, true, result, 'Login result', 201);
        }
        catch (err) {
            this.responseUtil.sendResponse(res, false, err, 'Some error occured', 500);
        }
    }
}