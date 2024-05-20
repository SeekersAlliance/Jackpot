import { proxy } from 'valtio';

interface AppState {
	address: string;
	requestId: string;
	cardResult: number[];
	referredAddress?: string;
	transactionId?: string;
	jackpot: number;
}

export const appState = proxy<AppState>({
	address: '',
	requestId: '',
	cardResult: [],
	jackpot: 0,
});
