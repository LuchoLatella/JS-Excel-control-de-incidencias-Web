import { limpiarArchivoService } from '../../backend/services/limpiarArchivoService.js';

export function LimpiarArchivoApp() {
    const container = document.createElement('div');
    container.className = 'container';

    const limpiarButton = document.createElement('button');
    limpiarButton.textContent = 'Limpiar Archivo';
    limpiarButton.onclick = async () => {
        if (window.globalData) {
            try {
                const cleanedWorkbook = await limpiarArchivoService(window.globalData);
                window.cleanedData = cleanedWorkbook; // Guardar datos limpiados globalmente
                alert('Archivo limpiado correctamente.');
                document.getElementById('downloadButton').disabled = false;
            } catch (err) {
                console.error(err);
                alert('Error al limpiar el archivo.');
            }
        } else {
            alert('No hay archivo cargado.');
        }
    };

    container.appendChild(limpiarButton);
    document.getElementById('app').appendChild(container);
}