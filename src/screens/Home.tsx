import type { FC } from 'react';
import { Fragment } from 'react';
import FaucetBtn from 'components/FaucetBtn';
import Header from 'components/Header';
import styled from 'styled-components';

export const HomeScreen: FC = () => {
	return (
		<Fragment>
			<Container>
				<Header />
				<Content>
					<BtnGroup>
						<FaucetBtn>TBNB Faucet</FaucetBtn>
						<FaucetBtn>Get 1000 TestUSD</FaucetBtn>
					</BtnGroup>
					<MainContent>
						<img src="img/pg1-2/buy_cards_banner.png" />
					</MainContent>
				</Content>
			</Container>
			<SeekersAllianceLogo src="img/pg1-2/seekers_alliance_logo.png" />
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

const SeekersAllianceLogo = styled.img`
	position: absolute;
	bottom: 15px;
	right: 15px;
`;
