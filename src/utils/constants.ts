import * as path from 'path';
let rootPath = path.normalize(__dirname + '/..');

let publicPath = rootPath + '/public/';

const constants = {
    PATH: {
        PUBLIC: publicPath,
        IMAGES: {
            USER_PROFILE: 'images/users/'
        }
    },

    API_VERSION_V1: '/api/v1',

    API: {
        CDN: '/cdn',
        LOGIN: '/login',
        USERS: '/users',
        USER_PROFILE: '/user-profile',
        USER_PROFILE_IMAGE: '/user-profile-image'
    },

    DEFAULT_PAGE_SIZE: 10
};

export default constants;