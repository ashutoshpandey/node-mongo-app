import App from './app';
import config from './config';
import * as mongoose from 'mongoose';

const app = new App(
    []
);

mongoose.connect(config.DATABASE, {});

app.listen();