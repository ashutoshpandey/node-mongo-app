import App from './app';
import config from './config';
import { connect } from 'mongoose';
import { UserController } from './controllers/user-ctrl';

const app = new App(
    [
        new UserController()
    ]
);

(async () => {
    await connect(config.DATABASE, {});
})();

app.listen();