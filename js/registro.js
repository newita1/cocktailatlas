import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { auth } from "./firebase.js"
const signupForm = document.querySelector('#signup-form')

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = signupForm['email'].value
    const password = signupForm['password'].value
try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    console.log(userCredential) 
    window.location.href="../login.html";

} catch(error) {
    console.log(error)
}

})