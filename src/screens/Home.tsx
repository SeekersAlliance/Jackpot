import type { FC } from 'react';
import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FaucetBtn from 'components/FaucetBtn';
import Header from 'components/Header';
import MainBtn from 'components/MainBtn';
import styled, { keyframes } from 'styled-components';
import { faucetToken, fetchPastEvents, purchasePack } from 'utils/chain';
import { formatAddress, getBaseUrl } from 'utils/helper';
import { appState } from 'utils/state';
import { useSnapshot } from 'valtio';

export const HomeScreen: FC = () => {
	const navigate = useNavigate();
	const { address, referredAddress, latestEvents } = useSnapshot(appState);

	useEffect(() => {
		console.log(referredAddress, '<<< referred address log in buy cards');
	}, [referredAddress]);

	useEffect(() => {
		window.ethereum && fetchPastEvents();
	}, []);

	return (
		<Fragment>
			<Container>
				<Header />
				<MarqueeContainer>
					<MarqueeInnerContainer>
						{latestEvents.map((event, idx) => {
							const isJackpot = event.event.includes('Jackpot');
							const user = (
								isJackpot
									? event.returnValues.user
									: event.returnValues.requester
							) as string;
							const jackpotText = `${formatAddress(user, 5)} collected all 5 cards & won the $${(Number(event.returnValues?.value) / 10 ** 6).toFixed(2)} JACKPOT!!! 🤑 🤑 🤑`;
							const drawCardText = `${formatAddress(user, 5)} opened a Rare card! 🎉`;
							return (
								<MarqueeItem key={idx} $isJackpot={isJackpot}>
									<span>
										{`${isJackpot ? jackpotText : drawCardText}`}
									</span>
								</MarqueeItem>
							);
						})}
					</MarqueeInnerContainer>
				</MarqueeContainer>
				<Content>
					<BtnGroup>
						<FaucetBtn
							onClick={() =>
								window.open(
									'https://opbnb-testnet-bridge.bnbchain.org/deposit',
									'_blank',
								)
							}
						>
							TBNB Faucet
						</FaucetBtn>
						<FaucetBtn onClick={() => faucetToken(address, 1000)}>
							Get 1000 TestUSD
						</FaucetBtn>
					</BtnGroup>
					<MainContent>
						<img
							src={`${getBaseUrl()}/img/pg1-2/buy_cards_banner.png`}
						/>
						<MainBtnGroup>
							<MainBtn
								tag="10 TestUSD"
								onClick={async () => {
									const result = await purchasePack(0, 1);
									result && navigate('/result/single');
								}}
							>
								BUY 1 CARD
							</MainBtn>
							<MainBtn
								tag="100 TestUSD"
								onClick={async () => {
									const result = await purchasePack(1, 1);
									result && navigate('/result/pack');
								}}
							>
								BUY 10 GET 1 FREE!
							</MainBtn>
						</MainBtnGroup>
					</MainContent>
				</Content>
			</Container>
			<SeekersAllianceLogo
				src={`${getBaseUrl()}/img/pg1-2/seekers_alliance_logo.png`}
			/>
		</Fragment>
	);
};

export default HomeScreen;

const Container = styled.div`
	flex-direction: column;
	align-items: center;
`;

const Content = styled.div`
	height: 100%;
	flex-direction: column;
	justify-content: flex-end;
	gap: 15px;
	padding-bottom: 80px;
`;

const BtnGroup = styled.div`
	gap: 15px;
`;

const MainContent = styled.div`
	position: relative;

	img {
		max-width: 1200px;
		object-fit: contain;
		aspect-ratio: 20 / 9;
	}
`;

const MainBtnGroup = styled.div`
	position: absolute;
	bottom: 20px;
	right: 40px;
	flex-direction: column;
	gap: 20px;
`;

const SeekersAllianceLogo = styled.img`
	position: absolute;
	bottom: 15px;
	right: 15px;
`;

const marqueeAnimation = keyframes`
	0% {
		left: 0%;
	}

	100% {
		left: -200%;
	}
`;

const MarqueeContainer = styled.div`
	width: 100vw;
	overflow: hidden;
	position: relative;
	margin-bottom: 20px;
	flex-basis: 40px;
`;

const MarqueeInnerContainer = styled.div`
	width: 400%;
	position: absolute;
	overflow: hidden;
	animation: ${marqueeAnimation} 20s linear infinite;
`;

const MarqueeItem = styled.div<{ $isJackpot: boolean }>`
	flex-grow: 1;
	flex-basis: 1;
	height: 100%;
	justify-content: center;

	span {
		background-color: #666;
		height: 100%;
		padding: 5px 10px;
		text-align: center;
		color: ${({ $isJackpot }) => ($isJackpot ? 'gold' : '#fff')};
	}
`;
