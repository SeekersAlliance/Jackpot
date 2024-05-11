import { handleFaucet } from './faucet';

interface RouteConfig {
	route: string;
	method: 'POST' | 'GET';
	handler: (payload: any) => Promise<object>;
}

export const routeConfigs: RouteConfig[] = [
	{
		route: '/faucet',
		method: 'POST',
		handler: handleFaucet,
	},
	{
		route: '/hello',
		method: 'GET',
		handler: async () => ({ message: 'world' }),
	},
];
