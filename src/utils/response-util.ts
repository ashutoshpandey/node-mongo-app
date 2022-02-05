import { Response } from 'express';

export class ResponseUtil {
    sendResponse(res: Response, success: boolean, data: any, message: string, httpStatus: number) {
        res.status(httpStatus).send({
            data: data,
            success: success,
            message: message
        });
    }
}