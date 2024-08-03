import { cargarArchivoService } from '../../backend/services/cargarArchivoService.js';

export function CargarRespaldatoriaApp() {
    const container = document.createElement('div');
    container.className = 'container';

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'backupFileInput';

    const cargarButton = document.createElement('button');
    cargarButton.textContent = 'Cargar Respaldo';
    cargarButton.onclick = async () => {
        const file = fileInput.files[0];
        if (file) {
            try {
                const data = await cargarArchivoService(file);
                window.backupData = data; // Guardar respaldo globalmente
                alert('Archivo de respaldo cargado correctamente.');
            } catch (err) {
                console.error(err);
                alert('Error al cargar el archivo de respaldo.');
            }
        } else {
            alert('Por favor, selecciona un archivo de respaldo.');
        }
    };

    container.appendChild(fileInput);
    container.appendChild(cargarButton);
    document.getElementById('app').appendChild(container);
}
