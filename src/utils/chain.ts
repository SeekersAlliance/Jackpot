import { snapshot } from 'valtio';
import Web3 from 'web3';

import abiMarketplace from './abiMarketplace.json';
import abiToken from './abiToken.json';
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

enum SmartContract {
	Token = '0x69fBe552E6361A7620Bb2C106259Be301049E087',
	Marketplace = '0xecc09a9b0831cb38455cfcde8b27ad2538b348b3',
}

const web3 = new Web3(window.ethereum);

const loadContract = (abi: any, contract: SmartContract) => {
	return new web3.eth.Contract(abi, contract);
};

export const purchasePack = async (pack: number, card: number) => {
	const { address, referredAddress } = snapshot(appState);

	try {
		if (!address) throw new Error('Please connect wallet');

		const allowanceRequire = pack === 1 ? 100000000n : 10000000n;
		const tokenContract = loadContract(abiToken, SmartContract.Token);
		const allowanceGrant = (await tokenContract.methods
			.allowance(address, SmartContract.Marketplace)
			.call()) as bigint;
		console.log(allowanceGrant);
		const isAllowanceEnough = allowanceGrant === allowanceRequire;
		if (!isAllowanceEnough) {
			await tokenContract.methods
				.approve(SmartContract.Marketplace, allowanceRequire)
				.send({ from: address })
				.catch(console.log);
		}

		const marketplaceContract = loadContract(
			abiMarketplace,
			SmartContract.Marketplace,
		);
		const result = await marketplaceContract.methods
			.purchasePack(pack, card, referredAddress || address)
			.send({
				from: address,
			})
			.catch(console.log);
		console.log(result);
		return result;
	} catch (error) {
		console.error(error);
	}
};
