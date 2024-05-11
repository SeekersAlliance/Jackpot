import type { Address, Transaction, Web3BaseWalletAccount } from 'web3';
import { utils, Web3 } from 'web3';

import erc20Abi from './erc20.abi.json';

interface Config {
	rpcEndpoint: string;
	contractOwnerKey: string;
	contractOwnerAccount: Web3BaseWalletAccount;
}

export const rpcEndpoint = process.env.RPC_ENDPOINT as string;
export const web3 = new Web3(rpcEndpoint);
export const contractOwnerKey = process.env.CONTRACT_OWNER_KEY as string;
export const contractOwnerAccount = web3.eth.accounts.privateKeyToAccount(
	Buffer.from(contractOwnerKey, 'hex'),
);

export const config: Config = {
	rpcEndpoint,
	contractOwnerKey,
	contractOwnerAccount,
};

export const usdcContractAddress = '0xDE9504986Db4fec3C23BBFA36cd8199c3967bb02';
export const erc20Contrat = new web3.eth.Contract(
	erc20Abi,
	usdcContractAddress,
);

export const sendNativeToken = async (toAddress: Address, amount: number) => {
	const transaction: Transaction = {
		from: config.contractOwnerAccount.address,
		to: toAddress,
		value: utils.toWei(amount, 'ether'),
		gasPrice: utils.toWei('20', 'gwei'),
		gasLimit: 200000,
	};
	const signed = await contractOwnerAccount.signTransaction(transaction);
	const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

	return {
		amount,
		address: toAddress,
		transactionHash: receipt.transactionHash,
	};
};

export const sendERC20Token = async (
	tokenContractAddress: string,
	toAddress: Address,
	amount: number,
) => {
	const parsedAmount = web3.utils.toWei(amount, 'mwei'); // mwei factor = 6
	const transaction: Transaction = {
		from: config.contractOwnerAccount.address,
		to: tokenContractAddress,
		data: erc20Contrat.methods
			.transfer(toAddress, parsedAmount)
			.encodeABI(),
		gasPrice: utils.toWei('20', 'gwei'),
		gasLimit: 200000,
	};
	const signed = await contractOwnerAccount.signTransaction(transaction);
	const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

	return {
		amount,
		address: toAddress,
		transactionHash: receipt.transactionHash,
	};
};
