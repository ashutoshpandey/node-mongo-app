import jwt from 'jsonwebtoken';
import config from '../config';
import { EncryptionUtil } from './encryption-util';

export class JwtUtil {
    private encryptionUtil: EncryptionUtil;

    constructor() {
        this.encryptionUtil = new EncryptionUtil();
    }

    public generateToken(payload: any) {
        let token = jwt.sign(
            payload,
            config.jwt.SECRET,
            { expiresIn: config.jwt.EXPIRY_SECONDS }
        );

        return this.encryptionUtil.encryptWithCrypto(token);
    }

    public verifyToken(authToken: any) {
        let result = {};

        return new Promise((resolve, reject) => {
            if (authToken) {
                let token = authToken.split(' ')[1];
                let secretKey = config.SERVER_KEYS.SERVER_SECRET;

                if (secretKey) {
                    let decryptedToken = this.encryptionUtil.decryptWithCrypto(token);

                    jwt.verify(decryptedToken, secretKey, function (err: any, decoded: any) {
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

                        resolve(result);
                    });
                } else {
                    // if there is no secret key
                    result = {
                        valid: false
                    }

                    resolve(result);
                }
            } else {
                // if there is no token
                result = {
                    valid: false,
                    message: 'No token provided.'
                }

                resolve(result);
            }
        });
    }
}