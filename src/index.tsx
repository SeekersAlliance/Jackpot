import type { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashboardScreen from 'screens/Dashboard';
import HomeScreen from 'screens/Home';
import InventoryScreen from 'screens/Inventory';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <HomeScreen />,
	},
	{
		path: '/inventory',
		element: <InventoryScreen />,
	},
	{
		path: '/dashboard',
		element: <DashboardScreen />,
	},
]);

export const App: FC = () => {
	return <RouterProvider router={router} />;
};

export default App;