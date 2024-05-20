import type { FC } from 'react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import FaucetBtn from 'components/FaucetBtn';
import Header from 'components/Header';
import MainBtn from 'components/MainBtn';
import styled from 'styled-components';
import { purchasePack } from 'utils/chain';
import { getBaseUrl } from 'utils/helper';

export const HomeScreen: FC = () => {
	const navigate = useNavigate();

	return (
		<Fragment>
			<Container>
				<Header />
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
						<FaucetBtn
							onClick={() =>
								window.open(
									'https://testnet.opbnbscan.com/address/0x69fBe552E6361A7620Bb2C106259Be301049E087?tab=Contract&p=1&view=contract_write',
									'_blank',
								)
							}
						>
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
									await purchasePack(0, 1);
									navigate('/result/single');
								}}
							>
								BUY 1 CARD
							</MainBtn>
							<MainBtn
								tag="100 TestUSD"
								onClick={async () => {
									await purchasePack(1, 1);
									navigate('/result/pack');
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
	height: 100vh;
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
