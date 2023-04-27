import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons'

//MÉTODO ANTIGUO DE DEVOLVER LA PROMESA CON AXIOS
// const getAll = () => {
//   return axios.get(baseUrl)
// }

// const create = newPerson => {
//   return axios.post(baseUrl, newPerson)
// }

// const update = (id, newPerson) => {
//   return axios.put(`${baseUrl}/${id}`, newPerson)
// }

//MÉTODO ACTUALIZADO. ASIGNO LA PROMESA A LA VARIABLE request
//Y LLAMO A SU MÉTODO .then
//La función getAll modificada todavía devuelve una promesa, como el método then de una promesa también devuelve una promesa.
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const update = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
};

//Después de definir el parámetro del método then para devolver directamente response.data, 
//hemos conseguido que la función getAll funcione como queríamos. Cuando la solicitud HTTP es exitosa, 
//la promesa devuelve los datos enviados en la respuesta del backend.

const exportedObject = {
    /*Las etiquetas a la izquierda de los dos puntos en la definición del objeto son 
    las claves del objeto, mientras que las que están a la derecha de este son variables 
    que se definen dentro del módulo.*/
    //getAll: getAll,
    //create: create,
    //update: update,
    //remove: remove 
    /*Dado que los nombres de las claves y las variables asignadas son los mismos, podemos 
    escribir la definición del objeto con una sintaxis más compacta:*/

    getAll, create, update, remove 

}

export default exportedObject;

/*El módulo devuelve un objeto que tiene tres funciones (getAll, create y update) como propiedades que se ocupan de las notas. 
Las funciones devuelven directamente las promesas devueltas por los métodos axios.*/