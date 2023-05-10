import { Outlet, Link, useLoaderData } from 'react-router-dom';
import { getContacts } from '../contacts.js';

// Hay dos API que usaremos para cargar datos loadery useLoaderData. Primero crearemos y 
//exportaremos una función de cargador en el módulo raíz, luego la conectaremos a la ruta. 
//Finalmente, accederemos y renderizaremos los datos.
export async function loader() {
    const contacts = await getContacts();
    return { contacts };
}

export default function Root() {
    const {contacts} = useLoaderData();
    return (
        <>
            <div id='sidebar'>
                <h1>React Router Contacts</h1>
                <div>
                    <form id='search-form' role='search'>
                        <input
                            id='q'
                            aria-label='Search contacts'
                            placeholder='Search'
                            type='search'
                            name='q'
                        />
                        <div
                            id='search-spinner'
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live='polite'
                        ></div>
                    </form>
                    <form method='post'>
                        <button type='submit'>New</button>
                    </form>
                </div>
                <nav>
                {contacts.lenght ? (
                    <ul>
                    {contacts.map((contact) => (
                        <li key={contact.id}>
                        {/* El enrutamiento del lado del cliente permite que nuestra aplicación actualice la URL sin solicitar 
                        otro documento del servidor. En su lugar, la aplicación puede generar inmediatamente una nueva interfaz
                        de usuario. Hagamos que suceda con <Link>. Cambiar <a href> por <Link to>*/}
                            <Link to={`contacts/${contact.id}`}>
                                {contact.first || contact.last ? (
                                    <>
                                        {contact.first} {contact.last}
                                    </>
                                ) : (
                                    <i>No name</i>
                                )} {' '}
                                {contact.favorite && <span>*</span>}
                            </Link>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p>
                        <i>No contacts</i>
                    </p>
                )}
                </nav>
            </div>
            <div id='detail'>
                <Outlet />
            </div>
        </>
    );
}