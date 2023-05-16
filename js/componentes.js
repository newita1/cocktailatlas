// fetch para recoger el nav.html (menu) y cargarlo siempre que <nav> tenga de id => (contenido)
function componentes() {
    return fetch('../componentes/nav.html')
    .then(response => response.text())
    .then(text => document.getElementById('contenido').innerHTML = text);

}    
export default componentes
