import { db, auth } from './firebase.js'
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const colRef = collection(db, "cocteles");
const docsSnap = await getDocs(colRef);

const data = [];
docsSnap.forEach(doc => {
  data.push({
    imagen: doc.data().imagen,
    nombre: doc.data().nombre,
    ingredients: doc.data().ingredients,
    instrucciones: doc.data().instrucciones,
    recipiente: doc.data().recipiente
  });
});

const initialData = data.slice(0, 16);

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
  
  const btnInfo = card.querySelector(".btn-info");
  btnInfo.addEventListener("click", () => {
    updateModal(coctel);
  });

  return card;
}

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


initialData.forEach(coctel => {
  const card = createCard(coctel);
  document.getElementById("cartas").appendChild(card);
});

let currentIndex = 16;

document.getElementById("load-more").addEventListener("click", () => {
  const nextData = data.slice(currentIndex, currentIndex + 16);

  nextData.forEach(coctel => {
    const card = createCard(coctel);
    document.getElementById("cartas").appendChild(card);
  });

  currentIndex += 16;
});

console.log(data);
