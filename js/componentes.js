fetch('componentes/nav.html')
.then(response => response.text())
.then(text => document.getElementById('contenido').innerHTML = text);

// fetch('componentes/modal.html')
// .then(response => response.text())
// .then(text => document.getElementById('informacion').innerHTML = text);

