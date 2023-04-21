import { auth } from "./firebase.js";

//remove Storage
document.getElementById("logout").addEventListener("click", () => {
auth.signOut()
});