// fetch para recoger el nav.html (menu) y cargarlo siempre que <nav> tenga de id => (contenido)
<<<<<<< HEAD
function componentes() {
    return fetch('../componentes/nav.html')
=======
fetch('componentes/nav.html')
>>>>>>> parent of f746d71 (a)
    .then(response => response.text())
    .then(text => document.getElementById('contenido').innerHTML = text);

}    
export default componentes
