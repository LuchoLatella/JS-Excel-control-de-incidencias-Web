import { cargarArchivoService } from '../../backend/services/cargarArchivoService.js';

export function CargarArchivoApp() {
    const container = document.createElement('div');
    container.className = 'container';

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'fileInput';

    const cargarButton = document.createElement('button');
    cargarButton.textContent = 'Cargar Archivo';
    cargarButton.onclick = async () => {
        const file = fileInput.files[0];
        if (file) {
            try {
                const data = await cargarArchivoService(file);
                window.globalData = data; // Guardar datos globalmente
                alert('Archivo cargado correctamente.');
            } catch (err) {
                console.error(err);
                alert('Error al cargar el archivo.');
            }
        } else {
            alert('Por favor, selecciona un archivo.');
        }
    };

    container.appendChild(fileInput);
    container.appendChild(cargarButton);
    document.getElementById('app').appendChild(container);
}