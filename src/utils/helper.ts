export const getBaseUrl = () =>
	process.env.NODE_ENV === 'development' ? '' : '/jackpot';
