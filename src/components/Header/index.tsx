import type { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const tabs = [
	{
		link: '/',
		img: 'img/buttons/buy_cards.png',
		imgActive: 'img/buttons/buy_cards_onpage.png',
	},
	{
		link: '/inventory',
		img: 'img/buttons/inventory.png',
		imgActive: 'img/buttons/inventory_onpage.png',
	},
	{
		link: '/dashboard',
		img: 'img/buttons/dashboard.png',
		imgActive: 'img/buttons/dashboard_onpage.png',
	},
];

export const Header: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<Container>
			<div style={{ flex: 1 }}>
				<NavigateGroup>
					{tabs.map((tab) => {
						return (
							<img
								key={tab.link}
								src={
									location?.pathname === tab.link
										? tab.imgActive
										: tab.img
								}
								onClick={() => navigate(tab.link)}
							/>
						);
					})}
				</NavigateGroup>
			</div>
			<div style={{ flex: 1, justifyContent: 'center' }}>
				<Jackpot src="img/pg1-2/jackpot.png" />
			</div>
			<div style={{ flex: 1, justifyContent: 'flex-end' }}>
				<ConnectWallet
					onClick={() => {
						console.log('coming soon');
					}}
				>
					Connect Wallet
				</ConnectWallet>
			</div>
		</Container>
	);
};

export default Header;

const Container = styled.div`
	flex-direction: row;
	padding: 0 15px;
	width: 100%;
	justify-content: space-between;
	align-self: start;
`;

const NavigateGroup = styled.div`
	gap: 15px;
	align-self: center;

	img {
		max-width: 100px;
		cursor: pointer;
	}
`;

const Jackpot = styled.img`
	max-width: 500px;
	aspect-ratio: 827 / 217;
	height: auto;
	object-fit: contain;
`;

const ConnectWallet = styled.div`
	width: 250px;
	aspect-ratio: 328 / 146;
	align-items: center;
	justify-content: center;
	background-image: url(img/buttons/connect.png);
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	font-size: 25px;
	font-weight: 700;
	font-family: 'TitilliumWeb';
	align-self: center;
	user-select: none;
	cursor: pointer;
`;
