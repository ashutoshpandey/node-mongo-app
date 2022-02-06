import crypto from 'crypto';
import * as bcrypt from 'bcryptjs';

import config from '../config';
import { AppError } from '../app-error';

export class EncryptionUtil {

    /***************** methods for bcrypt library ******************************/

    encryptWithBcrypt(text: string) {
        var salt = bcrypt.genSaltSync(10);

        // Salt and hash password
        var hash = bcrypt.hashSync(text, salt);

        return hash;
    }

    verifyWithBcrypt(text: string, hash: any) {
        return bcrypt.compareSync(text, hash);
    }

    /***************** methods for crypto library ******************************/

    encryptWithCrypto(text: any) {
        let algorithm: string = 'aes-256-ctr';
        let key = config.SERVER_KEYS.SERVER_SECRET;

        let iv = crypto.randomBytes(16).toString("hex").slice(0, 16);

        let cipher = crypto.createCipheriv(algorithm, key, iv);
        let encryptedText = cipher.update(text, 'utf8', 'hex');
        encryptedText += cipher.final('hex');
        encryptedText = iv + encryptedText;

        return encryptedText;
    }

    decryptWithCrypto(text: any) {
        let algorithm: string = 'aes-256-ctr';
        let key = config.SERVER_KEYS.SERVER_SECRET;

        try {
            const iv = text.slice(0, 16);
            text = text.slice(16, text.length);
            let decipher = crypto.createDecipheriv(algorithm, key, iv);
            let decryptedText = decipher.update(text, 'hex', 'utf8');
            decryptedText += decipher.final('utf8');

            return decryptedText;
        } catch (err) {
            throw new AppError(err.toString(), 500);
        }
    }
}