import config from '../config';

export class GenericUtil {
    public getUserProfileImage(image_file: string) {
        return config.SERVER_ROOT_URL + '/cdn/user-profile/' + image_file;
    }
}