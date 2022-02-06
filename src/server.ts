import App from './app';
import config from './config';
import { connect } from 'mongoose';
import { UserController } from './controllers/user-ctrl';
import { LoginController } from './controllers/login-ctrl';

const app = new App(
    [
        new UserController(),
        new LoginController()
    ]
);

(async () => {
    await connect(config.DATABASE, {});
})();

app.listen();