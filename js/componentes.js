// fetch para recoger el nav.html (menu) y cargarlo siempre que <nav> tenga de id => (contenido)
export default nav = () => fetch('componentes/nav.html')
    .then(response => response.text())
    .then(text => document.getElementById('contenido').innerHTML = text);

