import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './error-page';
import Contact from "./routes/contact";

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {//Queremos que el componente de contacto se muestre dentro del <Root>diseño. 
        //Lo hacemos haciendo que la ruta de contacto sea secundaria de la ruta raíz.
        //Ahora volverá a ver el diseño raíz, pero una página en blanco a la derecha. 
        //Necesitamos decirle a la ruta raíz dónde queremos que represente sus rutas secundarias. 
        //Eso lo hacemos con <Outlet> en root.jsx..
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
