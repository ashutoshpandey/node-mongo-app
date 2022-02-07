import jwt from 'jsonwebtoken';
import config from '../config';
import { AppError } from '../app-error';
import { EncryptionUtil } from './encryption-util';

export class JwtUtil {
    public generateToken(payload: any) {
        let token = jwt.sign(
            payload,
            config.JWT.SECRET,
            { expiresIn: config.JWT.EXPIRY_SECONDS }
        );

        return new EncryptionUtil().encryptWithCrypto(token);
    }

    public verifyToken(req: any, res: any, next: any) {
        if (req.url.indexOf('/api') > -1) {
            try {
                let authToken = req.headers.authorization;

                if (authToken) {
                    let token = authToken.split(' ')[1];
                    let secretKey = config.JWT.SECRET;

                    if (secretKey) {
                        let encryptionUtil = new EncryptionUtil();

                        let decryptedToken = encryptionUtil.decryptWithCrypto(token);

                        let result = jwt.verify(decryptedToken, secretKey);

                        if (!result) {
                            next(new AppError('Failed to verify token.', 401));
                        } else {
                            next();
                        }
                    } else {
                        next(new AppError(`Server error`, 401));
                    }
                } else {
                    next(new AppError(`You don't have access, please login first`, 401));
                }
            } catch (err) {
                next(new AppError('Cannot verify auth token', 401));
            }
        } else {
            next();
        }
    }
}