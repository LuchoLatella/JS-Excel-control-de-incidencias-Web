import { tablaDinamicaService } from '../../backend/services/tablaDinamicaService.js';

export function TablaDinamicaApp() {
    const container = document.createElement('div');
    container.className = 'container';

    const generarButton = document.createElement('button');
    generarButton.textContent = 'Generar Tabla Dinámica';
    generarButton.onclick = async () => {
        if (window.cleanedData) {
            try {
                const pivotTable = await tablaDinamicaService(window.cleanedData);
                window.pivotTableData = pivotTable; // Guardar tabla dinámica globalmente
                alert('Tabla dinámica generada correctamente.');
                document.getElementById('downloadButton').disabled = false;
            } catch (err) {
                console.error(err);
                alert('Error al generar la tabla dinámica.');
            }
        } else {
            alert('No hay datos limpiados.');
        }
    };

    container.appendChild(generarButton);
    document.getElementById('app').appendChild(container);
}
