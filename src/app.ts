import helmet from 'helmet';
import express from 'express';
import * as bodyParser from 'body-parser';
import BaseController from './controllers/base-ctrl';

var xss = require('xss-clean');

class App {
	public app: express.Application;

	constructor(controllers: BaseController[]) {
		this.app = express();

		this.initializeControllers(controllers);
		this.initializeMiddlewares();
	}

	private initializeMiddlewares() {
		this.app.use((request: express.Request, response: express.Response, next: any) => {
			response.setHeader('Access-Control-Allow-Origin', '*');
			response.setHeader('Access-Control-Allow-Methods', '*');
			response.setHeader('Access-Control-Allow-Headers', 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,authToken');
			next();
		});

		this.app.use(xss());
		this.app.use(helmet());

		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(bodyParser.json({ limit: '50mb' }));
		this.app.use(express.static('public'));

		this.app.use((request: express.Request, response: express.Response, next: any) => {
			request.body.startTime = new Date();
			next();
		});
	}

	/**
	 * @function initializeControllers
	 * @description Initializes all routes
	 * @param controllers 
	 */
	public initializeControllers(controllers: BaseController[]) {
		let that = this;

		controllers.forEach((controller) => {
			that.app.use('/', controller.router);
		});
	}

	public listen() {
		const { SERVER_PORT = 3000 } = process.env;
		const { SERVER_ROOT_URL = "http://localhost:${SERVER_PORT}" } = process.env;

		const server = this.app.listen(SERVER_PORT, () => {
			console.log(`Server is running at ${SERVER_ROOT_URL}...`);
		});
	}
}

export default App;
