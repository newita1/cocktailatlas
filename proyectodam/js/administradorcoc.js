// Importación de firebase
import { db } from './firebase.js';
import { collection, doc, getDocs, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';

// Seleccionamos la tabla y el tbody de la tabla
const tabla = document.querySelector('.table');
const tbody = tabla.querySelector('tbody');

// Función que se encarga de eliminar un documento al hacer click en el botón Eliminar
async function eliminarDocumento(event) {
  const button = event.target;
  const docId = button.getAttribute('data-id');

  await deleteDoc(doc(db, 'cocteles', docId));
  button.parentElement.parentElement.remove();
}

// Función que se encarga de mostrar o ocultar los ingredientes completos al hacer click en el bóton
// leer más/menos
function toggleLeerMas(event) {
  const button = event.target;
  const celda = button.parentElement;
  const ingredientesCortos = celda.querySelector('.ingredientes-cortos');
  const ingredientesCompletos = celda.querySelector('.ingredientes-completos');

  if (ingredientesCortos.style.display === 'none') {
    ingredientesCortos.style.display = '';
    ingredientesCompletos.style.display = 'none';
    button.textContent = 'Leer más';
  } else {
    ingredientesCortos.style.display = 'none';
    ingredientesCompletos.style.display = '';
    button.textContent = 'Leer menos';
  }
}

// Constante que define el numero de elementos por página
const elementosPorPagina = 7;

// Obtenemos los documentos de la colección "cócteles"
const querySnapshot = await getDocs(collection(db, "cocteles"));
const documentos = querySnapshot.docs;

// Dividimos los documentos en páginas utilizando la función dividirEnPaginas
const paginas = dividirEnPaginas(documentos, elementosPorPagina);

// Mostramos la primera página al cargar la página
mostrarPagina(0, paginas);

// Función que se encarga de dividir los documentos en páginas
function dividirEnPaginas(documentos, elementosPorPagina) {
  return documentos.reduce((paginas, elemento, index) => {
    const paginaActual = Math.floor(index / elementosPorPagina);
    paginas[paginaActual] = paginas[paginaActual] || [];
    paginas[paginaActual].push(elemento);
    return paginas;
  }, []);
}

// Función que se encarga de mostrar los documentos de la página actual
function mostrarPagina(pagina, documentos) {
  tbody.innerHTML = '';

  documentos[pagina].forEach((doc) => {
    // Constante fila para crear una nueva fila en la tabla
    const fila = tbody.insertRow(-1);
    fila.insertCell().textContent = doc.data().nombre;
    fila.insertCell().innerHTML = `<img src="${doc.data().imagen}" width="70px" alt="">`;
    fila.insertCell().innerHTML = `
      <h2 style="font-size: 15px;">${doc.data().ingredients}</h2>
      `;
    fila.insertCell().textContent = doc.data().recipiente;
    fila.insertCell().innerHTML = `<span class="ingredientes-cortos">${doc.data().instrucciones.slice(0, 50)}...</span>
      <span class="ingredientes-completos" style="display: none;">${doc.data().instrucciones}</span>
      <button class="leer-mas">Leer más</button>`;
    fila.insertCell().innerHTML = `<button class="btndelete" data-id="${doc.id}">Eliminar</button>`;

    const botonEliminar = fila.querySelector('button[data-id]');
    botonEliminar.addEventListener('click', eliminarDocumento);

    const botonLeerMas = fila.querySelector('.leer-mas');
    botonLeerMas.addEventListener('click', toggleLeerMas);
  });
}



mostrarPagina(0, paginas);

let paginaActual = 0;

// Función para cargar la siguiente pagina (los proximos 7 cócteles) 
function siguientePagina() {
  if (paginaActual < paginas.length - 1) {
    paginaActual++;
    mostrarPagina(paginaActual, paginas);
  }
}

// Función para cargar la pagina anterior (los anteriores 7 cócteles)
function anteriorPagina() {
  if (paginaActual > 0) {
    paginaActual--;
    mostrarPagina(paginaActual, paginas);
  }
}

// Declaramos los constantes de los botones Siguiente y Anterior
const botonSiguiente = document.querySelector('#botonSiguiente');
const botonAnterior = document.querySelector('#botonAnterior');

// Asignamos addEventListener a los botones, para que hagan las funciones
// SiguientePagina o AnteriorPagina
botonSiguiente.addEventListener('click', siguientePagina);
botonAnterior.addEventListener('click', anteriorPagina);
