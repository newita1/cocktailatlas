import { db, auth } from './firebase.js';
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const TaskForm = document.getElementById("formcont");

const saveTask = (nombre, email, telefono, text) =>
  addDoc(collection(db, "contacto"), { nombre, email, telefono, text });

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

