import { tablaDinamicaService } from '../../backend/services/tablaDinamicaService.js';

export function TablaDinamicaApp() {
    const container = document.createElement('div');
    const generarButton = document.createElement('button');
    generarButton.textContent = 'Generar Tabla Dinámica';
    generarButton.onclick = () => generarTablaDinamica();

    container.appendChild(generarButton);
    document.getElementById('app').appendChild(container);

    function generarTablaDinamica() {
        tablaDinamicaService()
            .then(data => {
                console.log('Tabla dinámica:', data);
                // Mostrar datos de la tabla dinámica en la UI
            })
            .catch(err => console.error(err));
    }
}
