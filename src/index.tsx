import type { FC } from 'react';
import {
	createBrowserRouter,
	redirect,
	RouterProvider,
} from 'react-router-dom';
import DashboardScreen from 'screens/Dashboard';
import HomeScreen from 'screens/Home';
import InventoryScreen from 'screens/Inventory';
import ResultScreen from 'screens/Result';
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
	return <RouterProvider router={router} />;
};

export default App;
