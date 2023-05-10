import { Outlet, Link } from 'react-router-dom';

export default function Root() {
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
                    <ul>
                        <li>
                            <Link to={`/contacts/1`}>Your name</Link>
                        </li>
                        {/* El enrutamiento del lado del cliente permite que nuestra aplicación actualice la URL sin solicitar 
                        otro documento del servidor. En su lugar, la aplicación puede generar inmediatamente una nueva interfaz
                        de usuario. Hagamos que suceda con <Link>. Cambiar <a href> por <Link to>*/}
                        <li>
                            <Link to={`/contacts/2`}>Your friend</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id='detail'>
                <Outlet />
            </div>
        </>
    );
}