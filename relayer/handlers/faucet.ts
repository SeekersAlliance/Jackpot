import { sendERC20Token, sendNativeToken, usdcContractAddress } from './util';

interface FaucetPayload {
	tokenAddress: 'native' | 'usdc' | string;
	toAddress: string;
	amount: number;
}

export const handleFaucet = async ({
	tokenAddress,
	toAddress,
	amount,
}: FaucetPayload) => {
	if (tokenAddress === 'native') {
		return sendNativeToken(toAddress, amount);
	} else if (tokenAddress === 'usdc') {
		return sendERC20Token(usdcContractAddress, toAddress, amount);
	}

	return sendERC20Token(tokenAddress, toAddress, amount);
};
