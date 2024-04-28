import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const HomeScreen: FC = () => {
	const navigate = useNavigate();

	return (
		<Container className="container-block bgsize">
			<PageTitle onClick={() => navigate('/')}>coming soon..</PageTitle>
		</Container>
	);
};

export default HomeScreen;

const Container = styled.div`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const PageTitle = styled.span`
	color: #ffffff;
`;
