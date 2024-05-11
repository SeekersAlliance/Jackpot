import { routeConfigs } from './handlers';

const defaultHeaders = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Headers':
		'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
	'Access-Control-Allow-Methods': '*',
	'Access-Control-Allow-Origin': '*',
};

export const handler = async (event: any) => {
	const httpContext = event.requestContext?.http || {};
	const payload = event.body ? JSON.parse(event.body) : {};

	for (const { method, route, handler } of routeConfigs) {
		if (method === httpContext.method && route === httpContext.path) {
			return runHandler(payload, handler);
		}
	}

	return {
		statusCode: 200,
		headers: defaultHeaders,
	};
};

const runHandler = async (
	payload: any,
	handler: (payload: any) => Promise<any>,
) => {
	try {
		return {
			statusCode: 200,
			headers: defaultHeaders,
			body: JSON.stringify(await handler(payload)),
		};
	} catch (error) {
		return {
			statusCode: 400,
			headers: defaultHeaders,
			body: JSON.stringify({ error, message: String(error) }),
		};
	}
};
