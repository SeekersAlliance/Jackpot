import type { FC } from 'react';
import { useEffect, useState } from 'react';
import Header from 'components/Header';
import MainBtn from 'components/MainBtn';
import styled from 'styled-components';
import { CardType, getCardImage } from 'utils/cards';
import { getNftIdList } from 'utils/chain';
import { getBaseUrl } from 'utils/helper';
import { appState } from 'utils/state';
import { useSnapshot } from 'valtio';

export const InventoryScreen: FC = () => {
	const { address } = useSnapshot(appState);
	const [nftIdList, setNftIdList] = useState<number[]>([]);
	const [collectedIds, setCollectedIds] = useState<number[]>(
		Array.from(new Set(nftIdList)),
	);
	useEffect(() => {
		const getNft = async () => {
			if (address) {
				const nftIdList = await getNftIdList();
				setNftIdList(nftIdList);
			}
		};

		getNft();
	}, [address]);

	useEffect(() => {
		const newCollectedIds = Array.from(new Set(nftIdList));
		setCollectedIds(newCollectedIds);
	}, [nftIdList]);

	return (
		<Container>
			<Header />
			<Title>INVENTORY</Title>
			<Collection>
				<h3>Collect all 5 cards to win Jackpot!</h3>
				<div>
					{Array(5)
						.fill(0)
						.map((_, idx) => {
							const cardType = collectedIds.some(
								(cardId) => cardId === idx + 1,
							)
								? CardType.small
								: CardType.none;
							const cardImgSrc = getCardImage(idx + 1, cardType);
							return <Card key={idx} src={cardImgSrc} />;
						})}
				</div>
				<MainBtn isLong={true} disabled={!(collectedIds.length === 5)}>
					BURN CARDS TO CLAIM JACKPOT!
				</MainBtn>
				<span>{`${collectedIds.length}/5 Cards Collected`}</span>
			</Collection>
			<CardInWallet>
				{nftIdList.map((cardId, idx) => {
					const cardImgSrc = getCardImage(cardId, CardType.small);
					return <Card key={idx} src={cardImgSrc} />;
				})}
			</CardInWallet>
		</Container>
	);
};

export default InventoryScreen;

const Container = styled.div`
	flex-direction: column;
	align-items: center;
	height: 100vh;
`;

const Title = styled.h1`
	font-size: 40px
	font-weight: 700;
	color: #fff;
`;

const Collection = styled.div`
	margin-top: 30px;
	background-image: url('${getBaseUrl()}/img/pg6-7/inventory_frame.png');
	background-size: contain;
	background-repeat: no-repeat;
	max-width: 1200px;
	aspect-ratio: 226 / 75;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 20px 0;
	position: relative;

	h3 {
		text-align: center;
		color: #fff;
		font-size: 20px;
		font-weight: 700;
	}

	span {
		position: absolute;
		bottom: 15px;
		right: 25px;
		color: #fff;
	}
`;

const Card = styled.img`
	width: 180px;
	aspect-ratio: 301 / 449;
`;

const CardInWallet = styled.div`
	flex-wrap: wrap;
	max-width: 1080px;
`;
