import { db } from './firebase.js';
import { collection, doc, getDocs, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';

const tabla = document.querySelector('.table');
const tbody = tabla.querySelector('tbody');

async function eliminarDocumento(event) {
  const button = event.target;
  const docId = button.getAttribute('data-id');

  await deleteDoc(doc(db, 'contacto', docId));
  button.parentElement.parentElement.remove();
}

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

const elementosPorPagina = 7;
const querySnapshot = await getDocs(collection(db, "contacto"));
const documentos = querySnapshot.docs;
const paginas = dividirEnPaginas(documentos, elementosPorPagina);
mostrarPagina(0, paginas);


function dividirEnPaginas(documentos, elementosPorPagina) {
  return documentos.reduce((paginas, elemento, index) => {
    const paginaActual = Math.floor(index / elementosPorPagina);
    paginas[paginaActual] = paginas[paginaActual] || [];
    paginas[paginaActual].push(elemento);
    return paginas;
  }, []);
}

function mostrarPagina(pagina, documentos) {
  tbody.innerHTML = '';

  documentos[pagina].forEach((doc) => {
    const fila = tbody.insertRow(-1);
    fila.insertCell().textContent = doc.data().email;
    fila.insertCell().textContent = doc.data().telefono;
    fila.insertCell().textContent = doc.data().nombre;;
    fila.insertCell().innerHTML = `<span class="ingredientes-cortos">${doc.data().text.slice(0, 50)}...</span>
      <span class="ingredientes-completos" style="display: none;">${doc.data().text}</span>
      <button class="leer-mas">Leer más</button>`;
    fila.insertCell().innerHTML = `<button class="btndelete" data-id="${doc.id}">Resuelto</button>`;

    const botonEliminar = fila.querySelector('button[data-id]');
    botonEliminar.addEventListener('click', eliminarDocumento);

    const botonLeerMas = fila.querySelector('.leer-mas');
    botonLeerMas.addEventListener('click', toggleLeerMas);
  });
}



mostrarPagina(0, paginas);

let paginaActual = 0;

function siguientePagina() {
  if (paginaActual < paginas.length - 1) {
    paginaActual++;
    mostrarPagina(paginaActual, paginas);
  }
}

function anteriorPagina() {
  if (paginaActual > 0) {
    paginaActual--;
    mostrarPagina(paginaActual, paginas);
  }
}

const botonSiguiente = document.querySelector('#botonSiguiente');
const botonAnterior = document.querySelector('#botonAnterior');

botonSiguiente.addEventListener('click', siguientePagina);
botonAnterior.addEventListener('click', anteriorPagina);
