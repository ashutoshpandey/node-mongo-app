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

        let encryptionUtil = new EncryptionUtil();
        return encryptionUtil.encryptWithCrypto(token);
    }

    public verifyToken(req: any, res: any, next: any) {
        let result = {};

        return new Promise(async (resolve, reject) => {
            let authToken = req.headers.authorization;

            if (authToken) {
                let token = authToken.split(' ')[1];
                let secretKey = config.SERVER_KEYS.SERVER_SECRET;

                if (secretKey) {
                    let encryptionUtil = new EncryptionUtil();

                    let decryptedToken = encryptionUtil.decryptWithCrypto(token);
                    console.log('2.');
                    console.log(decryptedToken);

                    let err = jwt.verify(decryptedToken, secretKey);
                    console.log('3.');

                    if (err) {
                        result = {
                            valid: false,
                            message: 'Failed to verify token.'
                        }
                    } else {
                        result = {
                            valid: true
                        }
                    }

                    next();
                } else {
                    next(new AppError(`Server error`, 401));
                }
            } else {
                next(new AppError(`You don't have access, please login first`, 401));
            }
        });
    }
}