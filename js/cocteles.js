// Impoprtacion de firestore
import { db } from './firebase.js'
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

// Constante con la coleccion de cocteles y recuperar documentos
const colRef = collection(db, "cocteles");
const docsSnap = await getDocs(colRef);

// Constante data con array vacío 
const data = [];

// Un bucle foreach para obtener los datos y guardarlos en el array 
docsSnap.forEach(doc => {
  data.push({
    imagen: doc.data().imagen,
    nombre: doc.data().nombre,
    ingredients: doc.data().ingredients,
    instrucciones: doc.data().instrucciones,
    recipiente: doc.data().recipiente
  });
});

// Se almacena en initialData los primeros 16 cócteles.
const initialData = data.slice(0, 16);

// Función para crear la estructura HTML de una tarjeta de cóctel con sus datos
function createCard(coctel) {
  const card = document.createElement("div");
  card.classList.add("flip-card");

  card.innerHTML = `
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img src="${coctel.imagen}" alt="Avatar">
      </div>
      <div class="flip-card-back">
        <h1>${coctel.nombre}</h1>
        <button type="button" class="btn btn-warning btn-info" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Info
        </button>
      </div>
    </div>
  `;
  // EventListener en el boton info para actualizar el modal al dar click
  const btnInfo = card.querySelector(".btn-info");
  btnInfo.addEventListener("click", () => {
  updateModal(coctel);
  });

  return card;
}

// Función para actualizar el contenido de las tarjetas de cócteles
function updateCocteles(cocteles) {
  const cartas = document.getElementById("cartas");
  cartas.innerHTML = "";
  cocteles.forEach(coctel => {
    const card = createCard(coctel);
    cartas.appendChild(card);
  });
}

// Función para filtrar los cócteles basado en la búsqueda del searchbox  
function filtrar() {
  const texto = buscador.value.toLowerCase();
  const coctelesFiltrados = data.filter(coctel =>
    coctel.nombre.toLowerCase().indexOf(texto) !== -1
  );
  updateCocteles(coctelesFiltrados);
}

// Función para actualizar el contenido del modal
function updateModal(coctel) {
  // Actualizar el nombre del cóctel
  document.getElementById("staticBackdropLabel").textContent = coctel.nombre;

  // Actualizar la imagen del cóctel
  const modalImg = document.querySelector(".modal-body img");
  if (modalImg) {
    modalImg.src = coctel.imagen;
  }

  // Actualizar la lista de ingredientes
  const ingredientesList = document.querySelector(".modal-body .ingredientes ul");
  if (ingredientesList) {
    ingredientesList.innerHTML = '';
    console.log(coctel)
    coctel.ingredients.forEach(ingrediente => {
      const listItem = document.createElement("li");
      listItem.textContent = ingrediente;
      ingredientesList.appendChild(listItem);
    });
  }

  // Actualizar las instrucciones
  const instruccionesElem = document.querySelector("#instrucciones");
  if (instruccionesElem) {
    instruccionesElem.textContent = coctel.instrucciones;
  }

  // Actualizar el recipiente
  const recipienteElem = document.querySelector("#recipiente");
  if (recipienteElem) {
    recipienteElem.textContent = coctel.recipiente;
  }
}

// Muestra los primeros 16 cocteles al cargar la pagina
initialData.forEach(coctel => {
  const card = createCard(coctel);
  document.getElementById("cartas").appendChild(card);
});

// El indice se establece en 16 para cargar 16 nuevos cócteles
let currentIndex = 16;

// AddEventListener al boton de load-more para cargar las proximas 16
document.getElementById("load-more").addEventListener("click", () => {
  const nextData = data.slice(currentIndex, currentIndex + 16);

  nextData.forEach(coctel => {
    const card = createCard(coctel);
    document.getElementById("cartas").appendChild(card);
  });
  // Incrementa el indice en 16 para mostrar en vez de 16, 32.. y incrementando 16 por cada click
  currentIndex += 16;
});

// Agrega un listener al campo de búsqueda para filtrar los cocteles cuando se escribe algo
buscador.addEventListener('keyup', filtrar);

