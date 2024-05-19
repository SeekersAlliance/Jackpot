import { snapshot } from 'valtio';
import Web3 from 'web3';

import abiDraw from './abiDraw.json';
import abiMarketplace from './abiMarketplace.json';
import abiNFT from './abiNFT.json';
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

export enum SmartContract {
	Token = '0x69fBe552E6361A7620Bb2C106259Be301049E087',
	Marketplace = '0xecc09a9b0831cb38455cfcde8b27ad2538b348b3',
	Draw = '0xe0320089466D923f3401F3b50CBEBE51Fba5C868',
	NFT = '0x49430AB34Dad2622b3327B57e517D22a2488E530',
}

export const web3 = new Web3(window.ethereum);
const web3Socket = new Web3(
	new Web3.providers.WebsocketProvider('wss://opbnb-testnet.publicnode.com'),
);

const loadContract = (abi: any, contract: SmartContract) => {
	return new web3.eth.Contract(abi, contract);
};

const marketplaceContract = loadContract(
	abiMarketplace,
	SmartContract.Marketplace,
);
const tokenContract = loadContract(abiToken, SmartContract.Token);
const nftContract = loadContract(abiNFT, SmartContract.NFT);

export const purchasePack = async (pack: number, card: number) => {
	const { address, referredAddress } = snapshot(appState);

	try {
		if (!address) throw new Error('Please connect wallet');

		const allowanceRequire = pack === 1 ? 100000000n : 10000000n;
		const allowanceGrant = (await tokenContract.methods
			.allowance(address, SmartContract.Marketplace)
			.call()) as bigint;
		const isAllowanceEnough = allowanceGrant === allowanceRequire;
		if (!isAllowanceEnough) {
			await tokenContract.methods
				.approve(SmartContract.Marketplace, allowanceRequire)
				.send({ from: address });
		}

		const result = await marketplaceContract.methods
			.purchasePack(
				pack,
				card,
				referredAddress || '0x0000000000000000000000000000000000000000',
			)
			.send({
				from: address,
			});
		appState.transactionId = result.transactionHash;

		const requestIdHash = result.logs.find(
			(log) => log.address === SmartContract.Draw.toLowerCase(),
		)?.topics?.[1];

		if (requestIdHash) {
			const decString = web3.utils.hexToNumberString(requestIdHash);
			appState.requestId = decString;
		}
	} catch (error) {
		console.log(error);
	}
};

export const subscribeDrawEvent = async () => {
	try {
		const drawContract = new web3Socket.eth.Contract(
			abiDraw,
			SmartContract.Draw,
		);
		const subscription = drawContract.events.RequestCompleted();
		subscription.on('data', (event) => {
			const { requestId } = snapshot(appState);
			const compareRequestId =
				event.returnValues[0]?.toString() === requestId;

			if (compareRequestId) {
				appState.cardResult = [
					...event.returnValues['ids']?.map((value) => Number(value)),
				];
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const nftIds = [1, 2, 3, 4, 5];

export const getNftIdList = async () => {
	const { address } = snapshot(appState);
	const nftBalance = await Promise.all(
		nftIds.map(async (nftId) => {
			return Number(
				await nftContract.methods.balanceOf(address, nftId).call(),
			);
		}),
	);
	const nftIdList = nftBalance.reduce((list, balance, idx) => {
		const idFilledArray: number[] = Array(balance).fill(nftIds[idx]);
		return list.concat(idFilledArray);
	}, [] as number[]);
	return nftIdList;
};
