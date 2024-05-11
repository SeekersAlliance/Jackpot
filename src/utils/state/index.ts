import { proxy } from 'valtio';

interface AppState {
	address: string;
	cardResult?: number[];
	referredAddress?: string;
}

export const appState = proxy<AppState>({
	address: '',
});
