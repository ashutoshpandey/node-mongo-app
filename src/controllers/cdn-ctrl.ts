import { Router } from 'express';
import * as express from 'express';
import BaseController from './base-ctrl';
import constants from '../utils/constants';
import { CDNService } from '../services/cdn-serv';
import { ResponseUtil } from '../utils/response-util';

export class CDNController implements BaseController {
    private cdnService: CDNService;
    private responseUtil: ResponseUtil;

    public router: Router = express.Router();

    constructor() {
        this.cdnService = new CDNService();
        this.responseUtil = new ResponseUtil();

        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.route(constants.API.CDN + constants.API.USER_PROFILE + '/:file')
            .get((req: express.Request, res: express.Response) => {
                this.getUserProfile(req, res)
            });
    }

    async getUserProfile(req: express.Request, res: express.Response) {
        try {
            let file: any = this.cdnService.getUserProfile(req, res);

            if (file)
                res.sendFile(file);
            else
                res.status(404).send();
        }
        catch (err) {
            this.responseUtil.sendResponse(res, false, err, 'Some error occured', 500);
        }
    }
}