import type { Request, Response } from 'express';

import { routeConfigs } from './handlers';

export const configureExpress = (express: any) => {
	const app = express();

	app.use(express.json());

	for (const { method, handler, route } of routeConfigs) {
		if (method === 'POST') {
			app.post(route, makeHandler(handler));
		} else if (method === 'GET') {
			app.get(route, makeHandler(handler));
		}
	}

	return app;
};

const makeHandler = (handler: any) => {
	return async (req: Request, res: Response) => {
		try {
			const result = await handler(req.body);
			res.json(result);
		} catch (error) {
			console.log(error);
			return res.status(400).send(error);
		}
	};
};
