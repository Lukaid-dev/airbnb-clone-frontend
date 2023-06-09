import { createBrowserRouter } from 'react-router-dom';
import Root from './components/Root';
import GithubConfirm from './routes/GithubConfirm';
import Home from './routes/Home';
import NotFound from './routes/NotFound';
import RoonDetail from './routes/RoomDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'rooms/:roomPk',
        element: <RoonDetail />,
      },
      {
        path: 'social',
        children: [
          {
            path: 'github',
            element: <GithubConfirm />,
          },
        ],
      },
    ],
  },
]);

export default router;
