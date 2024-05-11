import { readFileSync } from 'fs';

import { config as loadEnvironment, parse } from 'dotenv';
import type { SSTConfig } from 'sst';
import type { StackContext } from 'sst/constructs';
import { Api, Function } from 'sst/constructs';

loadEnvironment({ path: './relayer/.env' });

export const Relayer = ({ stack }: StackContext) => {
	const environmentBuf = readFileSync('relayer/.env');
	const environment = parse(environmentBuf);
	const { routeConfigs } = require('./relayer/handlers');
	const relayerRoutes: Record<string, any> = {};
	const relayerFunction = new Function(stack, 'relayer-function', {
		handler: 'relayer/lambda.handler',
		environment,
	});

	for (const { method, route } of routeConfigs) {
		relayerRoutes[`${method} ${route}`] = {
			function: relayerFunction,
		};
	}

	const relayer = new Api(stack, 'relayer', {
		cors: {
			allowOrigins: ['*'],
			allowHeaders: ['Content-Type', 'Authorization'],
			allowMethods: ['GET', 'POST'],
		},
		routes: relayerRoutes,
	});

	stack.addOutputs({
		relayerUrl: relayer.url,
	});
};

export default {
	config() {
		return {
			name: 'seeker-jackpot',
			region: 'ap-south-1',
		};
	},
	stacks(app) {
		app.stack(Relayer);
	},
} satisfies SSTConfig;
