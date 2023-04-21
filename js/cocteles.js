import { db, auth } from './firebase.js'
import {collection, getDocs } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
const colRef = collection(db, "cocteles");
const docsSnap = await getDocs(colRef);

const data = [];
docsSnap.forEach(doc => {
  data.push([doc.data().imagen, doc.data().nombre ]);
})

const initialData = data.slice(0, 16); // Obtener las primeras 20 imágenes    <p>${element[1]}</p>
initialData.forEach(element => {
  document.getElementById("cartas").innerHTML += `                 <div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <img src="${element[0]}" alt="Avatar">
    </div>
    <div class="flip-card-back">
      <h1>${element[1]}</h1>
      <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      Info
    </button>
    </div>
  </div>
</div>  `;
});

let currentIndex =  16; // Indice de la siguiente imagen que se debe mostrar

document.getElementById("load-more").addEventListener("click", () => {
  const nextData = data.slice(currentIndex, currentIndex + 16); // Obtener las siguientes 20 imágenes
  nextData.forEach(element => {
    document.getElementById("cartas").innerHTML += `                 <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img src="${element[0]}" alt="Avatar">
      </div>
      <div class="flip-card-back">
        <h1>${element[1]}</h1>
          <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    Info
  </button>
      </div>
    </div>
  </div>   `;
  });
  currentIndex += 16; // Actualizar el índice de la siguiente imagen que se debe mostrar
});

console.log(data);