import type { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeScreen from 'screens/Home';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <HomeScreen />,
	},
]);

export const App: FC = () => {
	return <RouterProvider router={router} />;
};

export default App;
