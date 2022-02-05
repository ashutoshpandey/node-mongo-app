import multer from 'multer';
import config from '../config';
import { AppError } from '../app-error';

// multer configuration
const imageUploader = multer({
    storage: multer.diskStorage({
        destination: (req: any, file: any, callback: any) => {
            callback(null, config.root + '/public/images/user/profiles')
        },
        filename: (req: any, file: any, callback: any) => {
            const ext = file.mimetype.split('/')[1];
            callback(null, `${Date.now()}.${ext}`)
        }
    }),
    fileFilter: (req: any, file: any, callback: any) => {
        if (file.mimetype.startsWith('image')) {
            callback(null, true);
        } else {
            callback(new AppError('Uploaded file is not an image', 400), false);
        }
    },
    dest: config.UPLOAD_PATH + '/'
});

export default imageUploader;