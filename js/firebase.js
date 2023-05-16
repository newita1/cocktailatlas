// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
import componentes from "./componentes.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCm3ClxOBYX9XSix24Cgze14NyrOEU85ag",
  authDomain: "cocktailatlas-802b5.firebaseapp.com",
  projectId: "cocktailatlas-802b5",
  storageBucket: "cocktailatlas-802b5.appspot.com",
  messagingSenderId: "817386792038",
  appId: "1:817386792038:web:68151f2a412be665df39a7",
  measurementId: "G-4N8S787Z9S",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage(app);

// Hace autentificación para comprobar que el usuario esta contectado

componentes().then(() => {

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Usuario autenticado");
      const email = user.email;
      console.log(email);
      // Si el usuario coincide con el correo del admin, se carga en el menu una nueva sección de la pagina "Admin" y si no carga en el menu una sección "Cliente"
      if (email === "fer@mail.com") {
        var div = document.getElementById("menu");
        div.innerHTML += `                    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle adm" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Administrador
        </a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="administradorcoc.html">Administrar cócteles</a></li>
          <li><a class="dropdown-item" href="administradorcont.html">Solicitudes de contacto</a></li>
          <li><a class="dropdown-item" href="administradorsol.html">Solicitudes de recetas</a></li>
        </ul>
      </li>`;
      } else {
        var div = document.getElementById("menu");
        div.innerHTML += `                    <li class="nav-item">
        <a class="nav-link active and" href="anadir.html">Añadir</a>
    </li>`;
      }
      // Muestra el boton de logout
      document.getElementById("email").innerHTML = email;
      document.getElementById("logout").style.display = "block";
    } else {
      // Si el usuario no esta autentificado oculta el logout y muestra las opciones de registro y inicio de sesión
      
        console.log("Usuario no autenticado");
        document.getElementById("iniciosesion").style.display = "block";
        document.getElementById("registrosesion").style.display = "block";
        document.getElementById("logout").style.display = "none";
    }
    // se asigna evento click al Logout, para cerrar sesión y enviar al inicio de la web
    document.getElementById("logout").addEventListener("click", () => {
      auth.signOut();
      window.location.href = "../index.html";
    });
  });

});

