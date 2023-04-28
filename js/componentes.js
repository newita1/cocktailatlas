fetch('componentes/nav.html')
    .then(response => response.text())
    .then(text => document.getElementById('contenido').innerHTML = text);

