// Importaciones de firebase
import { db } from './firebase.js';
import {  collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
// Guardo en una constante el formulario
const TaskForm = document.getElementById("formcont");
// Guardo en una constante la función para subir datos a la bbdd
const saveTask = (nombre, email, telefono, text) =>
  addDoc(collection(db, "contacto"), { nombre, email, telefono, text });
// Asigno un eventlistener al formulario, para recoger en constantes nombre, email, telefono y texto. y llamo a la funcion saveTask para subir los valores
// a la bbd, y despues enviar un aviso por pantalla y borrar contenido del formulario.
TaskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = TaskForm["name"];
  const email = TaskForm["emails"];
  const telefono = TaskForm["telefono"];
  const text = TaskForm["mensaje"];

  saveTask(nombre.value, email.value, telefono.value, text.value);
  TaskForm.reset();
  alert(
    "Formulario enviado, nos pondremos en contacto con usted lo antes posible"
  );
});

