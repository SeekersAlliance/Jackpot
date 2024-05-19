import type { FC } from 'react';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainBtn from 'components/MainBtn';
import TransactionBtn from 'components/TransactionBtn';
import styled from 'styled-components';
import { formatAddress, getBaseUrl } from 'utils/helper';
import { appState } from 'utils/state';
import { useSnapshot } from 'valtio';

import CardGroup from './CardGroup';

export const ResultScreen: FC = () => {
	const { itemType } = useParams();
	const navigate = useNavigate();
	const [animationRunning, setAnimationRunning] = useState(true);
	const { address, cardResult, transactionId = '' } = useSnapshot(appState);
	const title = itemType === 'single' ? 'CARD RECEIVED' : 'CARDS RECEIVED';

	return (
		<Container>
			{animationRunning ? (
				<Video autoPlay onEnded={() => setAnimationRunning(false)}>
					<source
						src={`${getBaseUrl()}/img/pg3/reveal.mp4`}
						type="video/mp4"
					/>
				</Video>
			) : (
				<Fragment>
					<Header>
						<WalletGroup>
							<div>
								<div />
							</div>
							<div>{formatAddress(address)}</div>
						</WalletGroup>
					</Header>
					<TransactionGroup>
						<TransactionBtn>
							{formatAddress(transactionId, 15)}
						</TransactionBtn>
					</TransactionGroup>
					<Title>{title}</Title>
					<CardGroup cardIds={cardResult} />
					<BtnGroup>
						<MainBtn
							onClick={() => navigate('/', { replace: true })}
						>
							BUY CARDS
						</MainBtn>
						<MainBtn
							onClick={() =>
								navigate('/inventory', { replace: true })
							}
						>
							SEE INVENTORY
						</MainBtn>
					</BtnGroup>
					<SeekersAllianceLogo
						src={`${getBaseUrl()}/img/pg1-2/seekers_alliance_logo.png`}
					/>
				</Fragment>
			)}
		</Container>
	);
};

export default ResultScreen;

const Container = styled.div`
	width: 100%;
	height: 100vh;
	background-image: url('${getBaseUrl()}/img/pg4-5/card_received_bg.png');
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	position: relative;
	flex-direction: column;
	align-items: center;
`;

const Video = styled.video`
	width: 100%;
	height: 100%;
`;

const Header = styled.div`
	padding: 15px;
	width: 100%;
	justify-content: flex-end;
	align-self: flex-start;
`;

const WalletGroup = styled.div`
	gap: 15px;
	align-self: flex-start;

	div {
		background-color: #444;
		border-radius: 8px;
		flex: 1;
		color: #fff;
		width: 160px;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		font-size: 20px;
		padding: 3px 15px;

		&:nth-child(1) {
			div {
				padding: 0;
				background-image: url('${getBaseUrl()}/img/pg1-2/opbnb_logo.png');
				background-size: contain;
				background-repeat: no-repeat;
				width: 130px;
				aspect-ratio: 192 / 37;
			}
		}
	}
`;

const TransactionGroup = styled.div`
	flex-direction: column;
	position: absolute;
	top: 15px;
	left: 15px;
`;

const Title = styled.h1`
	font-size: 40px
	font-weight: 700;
	color: #fff;
`;

const BtnGroup = styled.div`
	padding-bottom: 30px;
`;

const SeekersAllianceLogo = styled.img`
	position: absolute;
	bottom: 15px;
	right: 15px;
`;
