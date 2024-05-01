import type { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
]);

export const App: FC = () => {
	return <RouterProvider router={router} />;
};

export default App;
