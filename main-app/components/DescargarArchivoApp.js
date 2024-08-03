export function DescargarArchivoApp() {
    const container = document.createElement('div');
    container.className = 'container';

    const descargarButton = document.createElement('button');
    descargarButton.id = 'downloadButton';
    descargarButton.textContent = 'Descargar Archivo';
    descargarButton.disabled = true;
    descargarButton.onclick = () => {
        if (window.pivotTableData) {
            const blob = new Blob([window.pivotTableData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'archivo_procesado.xlsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else {
            alert('No hay datos para descargar.');
        }
    };

    container.appendChild(descargarButton);
    document.getElementById('app').appendChild(container);
}
