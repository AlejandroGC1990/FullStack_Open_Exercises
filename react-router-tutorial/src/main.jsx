import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import ErrorPage from './error-page';
import Contact, { loader as contactLoader } from "./routes/contact";
import EditContact, {
  action as editAction,
} from './routes/edit';
import { action as destroyAction } from "./routes/destroy";
import Index from './routes';
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { /*Tenga en cuenta el { index:true }lugar de { path: "" }. Eso le dice al enrutador que 
        haga coincidir y represente esta ruta cuando el usuario se encuentra en la ruta exacta 
        de la ruta principal, por lo que no hay otras rutas secundarias para representar en el 
        archivo <Outlet>.*/
        index: true,
        element: <Index />
      },
      {/*Queremos que el componente de contacto se muestre dentro del <Root>diseño. 
        Lo hacemos haciendo que la ruta de contacto sea secundaria de la ruta raíz.
        Ahora volverá a ver el diseño raíz, pero una página en blanco a la derecha. 
        Necesitamos decirle a la ruta raíz dónde queremos que represente sus rutas secundarias. 
        Eso lo hacemos con <Outlet> en root.jsx..*/
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        /*Queremos que se represente en la salida de la ruta raíz, por lo que la convertimos en 
        hermana de la ruta secundaria existente.*/
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
