import type { FC } from 'react';
import Header from 'components/Header';
import MainBtn from 'components/MainBtn';
import styled from 'styled-components';
import { CardType, getCardImage } from 'utils/cards';

const cardInWallet = [1, 1, 1, 3, 3, 4, 4, 4, 4];
const cardCollected = Array.from(new Set(cardInWallet));

export const InventoryScreen: FC = () => {
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
							const cardType = cardCollected.some(
								(cardId) => cardId === idx + 1,
							)
								? CardType.small
								: CardType.none;
							const cardImgSrc = getCardImage(idx + 1, cardType);
							return <Card key={idx} src={cardImgSrc} />;
						})}
				</div>
				<MainBtn isLong={true} disabled={!(cardCollected.length === 5)}>
					BURN CARDS TO CLAIM JACKPOT!
				</MainBtn>
				<span>{`${cardCollected.length}/5 Cards Collected`}</span>
			</Collection>
			<CardInWallet>
				{cardInWallet.map((cardId, idx) => {
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
	background-image: url('img/pg6-7/inventory_frame.png');
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
