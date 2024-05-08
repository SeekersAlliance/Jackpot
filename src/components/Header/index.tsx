import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { connectWallet, getAccount } from 'utils/chain';
import { formatAddress, getBaseUrl } from 'utils/helper';
import { appState } from 'utils/state';
import { useSnapshot } from 'valtio';

const tabs = [
	{
		link: '/',
		img: `${getBaseUrl()}/img/buttons/buy_cards.png`,
		imgActive: `${getBaseUrl()}/img/buttons/buy_cards_onpage.png`,
	},
	{
		link: '/inventory',
		img: `${getBaseUrl()}/img/buttons/inventory.png`,
		imgActive: `${getBaseUrl()}/img/buttons/inventory_onpage.png`,
	},
	{
		link: '/dashboard',
		img: `${getBaseUrl()}/img/buttons/dashboard.png`,
		imgActive: `${getBaseUrl()}/img/buttons/dashboard_onpage.png`,
	},
];

export const Header: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { address } = useSnapshot(appState);
	const [focus, setFocus] = useState(false);
	const [connected, setConnected] = useState(!!address);

	useEffect(() => {
		getAccount();
	}, []);

	useEffect(() => {
		setConnected(!!address);
	}, [address]);

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
				<Jackpot src={`${getBaseUrl()}/img/pg1-2/jackpot.png`} />
			</div>
			<div style={{ flex: 1, justifyContent: 'flex-end' }}>
				{!connected ? (
					<ConnectWallet
						$focus={focus}
						onMouseDown={() => setFocus(true)}
						onMouseUp={() => setFocus(false)}
						onClick={connectWallet}
					>
						Connect Wallet
					</ConnectWallet>
				) : (
					<div>
						<WalletGroup>
							<div>
								<div />
							</div>
							<div>{formatAddress(address)}</div>
						</WalletGroup>
					</div>
				)}
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
	padding-bottom: 50px;
`;

const NavigateGroup = styled.div`
	gap: 15px;
	align-self: flex-start;
	margin-top: 15px;

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

const ConnectWallet = styled.div<{ $focus: boolean }>`
	margin-top: 15px;
	width: 250px;
	aspect-ratio: 328 / 146;
	align-items: center;
	justify-content: center;
	background-image: url('${getBaseUrl()}/img/buttons/connect.png');
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	font-size: 25px;
	font-weight: 700;
	font-family: 'TitilliumWeb';
	align-self: flex-start;
	user-select: none;
	cursor: pointer;
	opacity: ${({ $focus }) => ($focus ? '0.5' : '1')};
	position: relative;
	transform: translateY(-30px);

	&:hover {
		background-image: url('${getBaseUrl()}/img/buttons/connect_hover.png');
	}
`;

const WalletGroup = styled.div`
	margin-top: 15px;
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
