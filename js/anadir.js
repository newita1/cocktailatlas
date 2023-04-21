import { db } from './firebase.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const TaskForm = document.getElementById("formulario");
const saveTask = (nombrecoc, recipiente, ingrediente, preparacion, imagen) =>
  addDoc(collection(db, "solicitudes"), {
    nombrecoc,
    recipiente,
    ingrediente,
    preparacion,
    imagen,
  });
//--
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

// Asignar la primera opción del arreglo como seleccionada
if (ingredientes.length > 0) {
  select.value = ingredientes[0];
}

console.log(ingredientes)

//--
TaskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //--
  const contenedorSelects = document.getElementById("contenedor-selects");
  const selectores = contenedorSelects.querySelectorAll("select");
  const valores = [];

  selectores.forEach((selector) => {
    valores.push(selector.value);
  });

  console.log(valores);
  //--
  const nombrecoc = TaskForm["nombre"];
  const recipiente = TaskForm["recipiente"];
  const ingrediente = TaskForm["ingredientes"];
  const preparacion = TaskForm["preparacion"];
  const imagen = TaskForm["seleccionArchivos"];

  saveTask(
    nombrecoc.value,
    recipiente.value,
    ingrediente.value,
    preparacion.value,
    imagen.value
  );
  TaskForm.reset();
});

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


// Obtener referencia al input y a la imagen

const $seleccionArchivos = document.querySelector("#seleccionArchivos"),
  $imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion");

// Escuchar cuando cambie
$seleccionArchivos.addEventListener("change", () => {
  // Los archivos seleccionados, pueden ser muchos o uno
  const archivos = $seleccionArchivos.files;
  // Si no hay archivos salimos de la función y quitamos la imagen
  if (!archivos || !archivos.length) {
    $imagenPrevisualizacion.src = "";
    return;
  }
  // Ahora tomamos el primer archivo, el cual vamos a previsualizar
  const primerArchivo = archivos[0];
  // Lo convertimos a un objeto de tipo objectURL
  const objectURL = URL.createObjectURL(primerArchivo);
  // Y a la fuente de la imagen le ponemos el objectURL
  $imagenPrevisualizacion.src = objectURL;
});
