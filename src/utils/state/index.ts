import { proxy } from 'valtio';

interface AppState {
	address: string;
	requestId: string;
	cardResult: number[];
	referredAddress?: string;
	transactionId?: string;
	jackpot: number;
	referral: {
		count: number;
		amount: number;
		value: number;
		history: unknown[];
	};
	profit: {
		total: number;
		claimed: number;
		unclaim: number;
		nextCardSoldProfit: number;
	};
}

export const appState = proxy<AppState>({
	address: '',
	requestId: '',
	cardResult: [],
	jackpot: 0,
	referral: {
		count: 0,
		amount: 0,
		value: 0,
		history: [],
	},
	profit: {
		total: 0,
		claimed: 0,
		unclaim: 0,
		nextCardSoldProfit: 0,
	},
});
