import { appState } from './state';

export const opBNBChainTarget = {
	chainId: '0x15EB',
	chainName: 'opBNB Testnet',
	nativeCurrency: {
		symbol: 'tBNB',
		decimals: 18,
	},
	rpcUrls: ['https://opbnb-testnet-rpc.bnbchain.org'],
	blockExplorerUrls: ['https://opbnb-testnet.bscscan.com'],
};

export const getAccount = async () => {
	if (window.ethereum) {
		const accounts = await window.ethereum.request({
			method: 'eth_accounts',
		});

		if (accounts.length > 0) {
			appState.address = accounts[0];
		}

		await ensureNetworkTarget();
	}
};

export const connectWallet = async () => {
	if (window?.ethereum) {
		const accounts = await window.ethereum.request({
			method: 'eth_requestAccounts',
		});

		if (accounts.length > 0) {
			appState.address = accounts[0];
		}

		await ensureNetworkTarget();
	}
};

export const ensureNetworkTarget = async () => {
	await window.ethereum?.request({
		method: 'wallet_addEthereumChain',
		params: [opBNBChainTarget],
	});
	await window.ethereum?.request({
		method: 'wallet_switchEthereumChain',
		params: [
			{
				chainId: opBNBChainTarget.chainId,
			},
		],
	});
};

export const handleAccountChanged = (accounts: string[]) => {
	appState.address = accounts[0];
};
