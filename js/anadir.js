// Importar las funciones necesarias de Firestore y el objeto db desde firebase.js:

import { db, storage } from './firebase.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";

// Crear una referencia al formulario y una función saveTask que guarda la información en la colección "solicitudes" de Firestore:
const TaskForm = document.getElementById("formulario");

//Obtener la lista de ingredientes desde Firestore y agregarlos como opciones al elemento select con ID "ingredientes":
const ingredientes = [];
const querySnapshot = await getDocs(collection(db, "ingredientes"));
querySnapshot.forEach((doc) => {
  ingredientes.push(doc.data().ingrediente)
});

const select = document.querySelector('#ingredientes');
ingredientes.forEach(element => {
  const opt = document.createElement("option")
  opt.value = element
  opt.textContent = element;
  select.appendChild(opt)
});

if (ingredientes.length > 0) {
  select.value = ingredientes[0];
}

//Agregar un evento 'submit' al formulario para guardar la información del formulario en Firestore:
TaskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const file = document.querySelector("#seleccionArchivos").files[0];
  const storageRef = storage.ref().child("imagenes/" + file.name);

  storageRef.put(file).then((snapshot) => {
    console.log("Archivo subido con éxito");
    return storageRef.getDownloadURL();
  })

  const contenedorSelects = document.getElementById("contenedor-selects");
  const selectores = contenedorSelects.querySelectorAll("select");
  const ingredientes = [];

  selectores.forEach((selector) => {
    ingredientes.push(selector.value);
  });

  console.log(ingredientes);
  
  const nombrecoc = TaskForm["nombre"];
  const recipiente = TaskForm["recipiente"];
  const ingrediente = TaskForm["ingredientes"];
  const preparacion = TaskForm["preparacion"];

  const saveTask = (nombrecoc, recipiente, ingredientes, preparacion, imagen) =>
  addDoc(collection(db, "solicitudes"), {
    nombrecoc,
    recipiente,
    ingredientes,
    preparacion,  
    imagen,
  });

  saveTask(
    nombrecoc.value,
    recipiente.value,
    {  ingrediente: ingrediente.value, ingredientes },
    preparacion.value,
    { imagen: url}
  );
  TaskForm.reset();
});

// Agregar un evento 'click' al botón "agregar-select" para crear y agregar nuevos elementos select con las opciones de ingredientes:
var numSelects = 0;

var botonAgregar = document.getElementById("agregar-select");
botonAgregar.addEventListener("click", async function () {
  if (numSelects < 4) {
    numSelects++;
    var nuevoSelect = document.createElement("select");
    nuevoSelect.name = "select-" + numSelects;
    nuevoSelect.className = "form-select";

    // Agrega las opciones al nuevo select
    const ingredientes = [];
    const querySnapshot = await getDocs(collection(db, "ingredientes"));
    querySnapshot.forEach((doc) => {
      ingredientes.push(doc.data().ingrediente)
    });
    ingredientes.forEach(element => {
      const opt = document.createElement("option")
      opt.value = element
      opt.textContent = element;
      nuevoSelect.appendChild(opt)
    });

    document.getElementById("contenedor-selects").appendChild(nuevoSelect);
  }
});


// Obtener la imagen del input y mostrarla por pantalla
const $seleccionArchivos = document.querySelector("#seleccionArchivos"),
  $imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion");

$seleccionArchivos.addEventListener("change", () => {
  const archivos = $seleccionArchivos.files;
  if (!archivos || !archivos.length) {
    $imagenPrevisualizacion.src = "";
    return;
  }
  const primerArchivo = archivos[0];
  const objectURL = URL.createObjectURL(primerArchivo);
  $imagenPrevisualizacion.src = objectURL;
});
