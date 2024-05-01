import { type FC, useState } from 'react';
import styled from 'styled-components';

interface Props {
	children: string;
	onClick?: () => void;
	tag?: string;
}

export const MainBtn: FC<Props> = ({ children, onClick, tag }) => {
	const [focus, setFocus] = useState(false);
	const hasTag = !!tag;

	return (
		<Container
			onMouseDown={() => setFocus(true)}
			onMouseUp={() => setFocus(false)}
			onClick={onClick}
		>
			{hasTag && <Tag>{tag}</Tag>}
			<Button $focus={focus}>{children}</Button>
		</Container>
	);
};

export default MainBtn;

const Container = styled.div`
	flex-direction: column;
	align-items: flex-end;
`;

const Tag = styled.div`
	background-image: url('/img/buttons/main_tag.png');
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center 2px;
	width: 190px;
	aspect-ratio: 237 / 33;
	align-items: center;
	justify-content: center;
	font-size: 18px;
	font-weight: 700;
	color: #fff;
	position: relative;
	transform: translateX(20px);
`;

const Button = styled.div<{ $focus: boolean }>`
	background-image: url('/img/buttons/${({ $focus }) =>
		$focus ? 'main_click.png' : 'main.png'}');
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center 3px;
	width: 380px;
	aspect-ratio: 455 / 59;
	align-items: center;
	justify-content: center;
	font-size: 28px;
	font-weight: 700;
	font-family: 'TitilliumWeb';
	user-select: none;
	cursor: pointer;
`;
