import { limpiarArchivoService } from './limpiarArchivoService';
import * as XLSX from 'xlsx';

document.getElementById('fileInput').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    try {
        const { newWorkbook, workbook } = await limpiarArchivoService(file);
        
        // Notificar al usuario que el archivo ha sido limpiado
        alert('El archivo ha sido limpiado. Por favor, elija el formato para guardar.');

        // Mostrar opciones de "guardar como"
        const format = prompt('Elija el formato para guardar: csv, xlsx, xlsm', 'xlsx');

        if (format === 'csv') {
            const csvWorkbook = XLSX.utils.sheet_to_csv(workbook.Sheets['carga']);
            downloadFile(csvWorkbook, 'archivo.csv', 'text/csv');
        } else if (format === 'xlsm') {
            const xlsmWorkbook = XLSX.write(workbook, { bookType: 'xlsm', type: 'binary' });
            downloadFile(xlsmWorkbook, 'archivo.xlsm', 'application/vnd.ms-excel.sheet.macroEnabled.12');
        } else if (format === 'xlsx') {
            downloadFile(newWorkbook, 'archivo.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        } else {
            alert('Formato no válido.');
        }

    } catch (error) {
        console.error('Error al limpiar el archivo:', error);
    }
});

function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
