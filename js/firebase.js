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

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuario autenticado");
    const email = user.email;
    console.log(email);
    if (email === "fer@mail.com") {
      var div = document.getElementById("menu");
      div.innerHTML += `                    <li class="nav-item">
      <a class="nav-link active adm" href="administrador.html">Administrar</a>
  </li>`;
    } else {
      var div = document.getElementById("menu");
      div.innerHTML += `                    <li class="nav-item">
      <a class="nav-link active and" href="anadir.html">Añadir</a>
  </li>`;
    }
    document.getElementById("logout").style.display = "block";
  } else {
    console.log("Usuario no autenticado");
    document.getElementById("logout").style.display = "none";
    document.getElementById("iniciosesion").style.display = "block";
    document.getElementById("registrosesion").style.display = "block";
  }
  document.getElementById("logout").addEventListener("click", () => {
    auth.signOut();
    location.reload();

  });
});
