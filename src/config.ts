import path from 'path';
import dotenv from 'dotenv';

// initialize configuration
dotenv.config();

let rootPath = path.normalize(__dirname);

const config: any = {
    root: rootPath,
    port: process.env.PORT || 3000,
    ENV_NAME: process.env.ENV_NAME,
    TIME_ZONE: process.env.TIME_ZONE,
    SERVER_ROOT_URL: process.env.SERVER_ROOT_URL,
    WHITE_LISTED_URLS: process.env.WHITE_LISTED_URLS,
    JWT: {
        SECRET: process.env.JWT_SECRET,
        EXPIRY_SECONDS: parseInt(process.env.JWT_EXPIRY_SECONDS)
    },
    SERVER_KEYS: {
        SERVER_SECRET: process.env.SERVER_SECRET,
        REFRESH_SERVER_SECRET: process.env.REFRESH_SERVER_SECRET
    }
};

export default config;