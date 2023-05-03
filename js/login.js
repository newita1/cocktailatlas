// Importaciónes de firebase
import {  signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./firebase.js";
// Guardo en una constante el formulario de login
const signInForm = document.querySelector('#signinup-form');
// Asigno un evento al formulario para hacer el login
signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Guardo en constante email y password recogidos del formulario
    const email = signInForm['email'].value;
    const password = signInForm['password'].value;
    // Hace la autentificación de firebase, y te envia a la pantalla de inicio
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Usuario autenticado y sesión establecida correctamente.");
        window.location.href = "../index.html";
    } catch (error) {
        console.error("Error al autenticar usuario y establecer sesión:", error);
    }
});
