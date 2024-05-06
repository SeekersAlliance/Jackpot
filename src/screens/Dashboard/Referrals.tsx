import type { FC } from 'react';
import { useState } from 'react';
import { MetricBox } from 'components/MetricBox';
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
					<input value={input} readOnly />
					<CopyBtn
						$focus={copyClick}
						onMouseDown={() => setCopyClick(true)}
						onMouseUp={() => setCopyClick(false)}
					/>
				</ReferralInput>
			</ReferralBox>
			<MetricGroup>
				<MetricBox title="Successful Referrals" metric="30" />
				<MetricBox
					title="Total Cards Bought by Referrals "
					metric="350"
				/>
				<MetricBox title="You Earned" metric="$101.30" />
			</MetricGroup>

			<ReferredTrack>
				<ReferredBox>
					<div>
						<div>
							<h3>Referred Address</h3>
						</div>
						<div>
							<h3>Total Spending (TestUSD)</h3>
						</div>
					</div>
					<div>
						<div>0x21ba0aE36317C9...F819995F45a99ceEC5</div>
						<div>
							<div>$10.00</div>
						</div>
					</div>
					<div>
						<div>1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</div>
						<div>
							<div>$100.00</div>
						</div>
					</div>
				</ReferredBox>
				<ReferralImage />
			</ReferredTrack>
		</Container>
	);
};

export default Referrals;

const Container = styled.div<{ $active: boolean }>`
	flex-direction: column;
	display: ${({ $active }) => ($active ? 'flex' : 'none')} !important;
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

const MetricGroup = styled.div`
	justify-content: space-between;
	gap: 25px;
`;

const ReferredTrack = styled.div`
	align-self: stretch;
	margin-top: 15px;
`;

const ReferredBox = styled.div`
	background-image: url('img/pg9-10/referred_list_box.png');
	background-repeat: no-repeat;
	background-size: contain;
	height: 560px;
	aspect-ratio: 572 / 405;
	flex-direction: column;
	overflow-y: scroll;

	div {
		div {
			justify-content: center;
			font-size: 20px;
			font-weight: 600;

			&:nth-child(odd) {
				flex: 1.5;
				color: #fff;
			}

			&:nth-child(even) {
				display: block !important;
				flex: 1;
				div {
					color: #fecd21;
					margin: 0 auto;
					width: 80px;
					justify-content: flex-end;
				}
			}

			h3 {
				text-align: center;
				font-size: 24px;
				font-weight: 600;
				color: #fff;
				margin: 15px 0;
			}
		}
	}
`;

const ReferralImage = styled.div`
	background-image: url('img/pg9-10/referral_banner.jpg');
	background-size: contain;
	background-repeat: no-repeat;
	flex: 1;
	align-self: stretch;
`;
