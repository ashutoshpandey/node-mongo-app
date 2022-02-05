import { Router } from 'express';
import * as express from 'express';
import BaseController from './base-ctrl';

export class LoginController implements BaseController {
    public router: Router = express.Router();

}