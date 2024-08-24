
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux';
import store from './redux/Store.ts';

import { router } from './routing/Routes.tsx';
import { RouterProvider } from 'react-router-dom';


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
