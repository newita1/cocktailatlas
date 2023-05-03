// Importaciónes del firebase
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { auth } from "./firebase.js"
// Guardo en una constante, el formulario de registro
const signupForm = document.querySelector('#signup-form')
// Se le asigna al boton del formulario, la función para que se pueda registrar
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    // Guardo en constantes, el email y la contraseña que obtengo a traves del formulario
    const email = signupForm['email'].value
    const password = signupForm['password'].value
    // Hago la autentificación de firebase con los datos que le paso y si el registro se completa te envia a la pantalla de Inicio, si no muestra error por consola
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userCredential)
        window.location.href = "../index.html";

    } catch (error) {
        console.log(error)
    }

})