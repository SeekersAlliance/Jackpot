import type { FC } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

interface Props {
	active?: boolean;
}

export const Referrals: FC<Props> = ({ active = true }) => {
	const [copyClick, setCopyClick] = useState(false);
	const [input, setInput] = useState('');

	return (
		<Container $active={active}>
			<ReferralBox>
				<h3>Your Referral Link:</h3>
				<ReferralInput>
					<input value={input} />
					<CopyBtn
						$focus={copyClick}
						onMouseDown={() => setCopyClick(true)}
						onMouseUp={() => setCopyClick(false)}
					/>
				</ReferralInput>
			</ReferralBox>
		</Container>
	);
};

export default Referrals;

const Container = styled.div<{ $active: boolean }>`
	flex-direction: column;
	display: ${({ $active }) => ($active ? 'flex' : 'none')};
	width: 100%;
	padding: 15px 0;
	gap: 15px;
`;

const ReferralBox = styled.div`
	background-image: url('img/pg9-10/referral_link_box.png');
	background-size: contain;
	background-repeat: no-repeat;
	width: 100%;
	aspect-ratio: 834 / 101;
	padding: 0 40px;
	flex-direction: column;
	justify-content: center;
	gap: 15px;

	h3 {
		font-size: 20px;
		font-weight: 600;
		line-height: 22px;
		color: #fff;
	}
`;

const ReferralInput = styled.div`
	gap: 15px;

	input {
		background-color: #fff;
		flex: 1;
		padding: 2px 15px;
		border-color: transparent;
		font-family: inherit;
		font-size: 18px;
		&:focus-visible {
			outline: none;
		}
		align-self: center;
	}
`;

const CopyBtn = styled.div<{ $focus: boolean }>`
	background-image: url(${({ $focus }) =>
		$focus ? 'img/buttons/copy_click.png' : 'img/buttons/copy.png'});
	background-size: contain;
	width: 50px;
	aspect-ratio: 1;
	cursor: pointer;
`;
