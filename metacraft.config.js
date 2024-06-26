const { resolve } = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const copyAssets = (config) => {
	config.module.rules[1].use[1] = {
		loader: 'css-loader',
		options: { url: false },
	};

	config.plugins.push(
		new CopyPlugin({
			patterns: [
				{
					from: resolve(process.cwd(), 'assets/'),
					to: './',
					filter: (uri) => {
						const isHtml = uri.endsWith('.ejs');
						const isCss = uri.endsWith('.sass');
						return !isHtml || !isCss;
					},
				},
			],
		}),
	);

	return config;
};

module.exports = {
	publicPath: () =>
		process.env.PUBLIC_URL || process.env.NODE_ENV === 'development'
			? '/'
			: '/jackpot',
	keepPreviousBuild: () => true,
	buildId: () => 'app',
	webpackMiddlewares: [copyAssets],
	moduleAlias: {
		global: {},
	},
};
