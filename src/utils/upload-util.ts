import multer from 'multer';
import config from '../config';
import { AppError } from '../app-error';

// multer configuration
const imageUploader = multer({
    storage: multer.diskStorage({
        destination: (req: any, file: any, callback: any) => {
            callback(null, config.root + '/public/images/users/')
        },
        filename: (req: any, file: any, callback: any) => {
            let ext = file.mimetype.split('/')[1];

            if (ext == 'jpeg')
                ext = 'jpg';

            let image_name = `${Date.now()}.${ext}`;

            req.body.image_name = image_name;

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