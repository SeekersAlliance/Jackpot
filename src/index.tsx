import type { FC } from 'react';
import { useEffect } from 'react';
import {
	createBrowserRouter,
	redirect,
	RouterProvider,
} from 'react-router-dom';
import DashboardScreen from 'screens/Dashboard';
import HomeScreen from 'screens/Home';
import InventoryScreen from 'screens/Inventory';
import ResultScreen from 'screens/Result';
import { subscribeDrawEvent, web3 } from 'utils/chain';
import { getBaseUrl } from 'utils/helper';
import { appState } from 'utils/state';

export const router = createBrowserRouter(
	[
		{
			path: '/inventory',
			element: <InventoryScreen />,
		},
		{
			path: '/dashboard',
			element: <DashboardScreen />,
		},
		{
			path: '/result/:itemType',
			element: <ResultScreen />,
		},
		{
			path: '/referred/:referredAddress',
			loader: async ({ params }) => {
				const { referredAddress } = params;
				appState.referredAddress = referredAddress;
				return redirect('/');
			},
		},
		{
			path: '/',
			element: <HomeScreen />,
		},
	],
	{
		basename: getBaseUrl() || '/',
	},
);

export const App: FC = () => {
	useEffect(() => {
		let ws: WebSocket;
		const connect = () => {
			ws = new WebSocket('wss://opbnb-testnet.publicnode.com');
			ws.onopen = (event) => {
				console.log(event);
				subscribeDrawEvent();
			};

			ws.onmessage = (event) => {
				console.log(event);
			};
			ws.onclose = () => {
				setTimeout(connect, 5000);
			};
		};

		connect();

		return () => {
			web3.eth.clearSubscriptions();
			ws.close();
		};
	}, []);
	return <RouterProvider router={router} />;
};

export default App;
