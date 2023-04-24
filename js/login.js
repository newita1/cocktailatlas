import { setPersistence, signInWithEmailAndPassword, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./firebase.js";

const signInForm = document.querySelector('#signinup-form');

signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = signInForm['email'].value;
    const password = signInForm['password'].value;

    try {
        // await setPersistence(auth, browserLocalPersistence);
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Usuario autenticado y sesión establecida correctamente.");
        window.location.href="../index.html";
    } catch (error) {
        console.error("Error al autenticar usuario y establecer sesión:", error);
    }
});
