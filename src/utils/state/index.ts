import { proxy } from 'valtio';

interface AppState {
	address: string;
	cardResult?: number[];
}

export const appState = proxy<AppState>({
	address: '',
});
