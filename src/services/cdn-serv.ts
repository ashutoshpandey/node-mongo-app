import { Request, Response } from 'express';

import constants from '../utils/constants';

export class CDNService {
    getUserProfile(req: Request, res: Response) {
        if (req.params.file && req.params.file != 'default') {
            return constants.PATH.PUBLIC + constants.PATH.IMAGES.USER_PROFILE + req.params.file;
        } else {
            return null;
        }
    }
}