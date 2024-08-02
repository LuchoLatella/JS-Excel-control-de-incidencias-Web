let data = null;

function cargarArchivo() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const fileType = file.name.split('.').pop();
            if (fileType === 'csv') {
                Papa.parse(e.target.result, {
                    header: true,
                    complete: function(results) {
                        data = results.data;
                        mostrarDatos(data);
                    }
                });
            } else if (fileType === 'xls' || fileType === 'xlsx') {
                const workbook = XLSX.read(e.target.result, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                data = XLSX.utils.sheet_to_json(worksheet);
                mostrarDatos(data);
            }
        };
        reader.readAsBinaryString(file);
    }
}

function mostrarDatos(datos) {
    const output = document.getElementById('output');
    output.textContent = JSON.stringify(datos, null, 2);
}

function limpiarArchivo() {
    if (data) {
        // Implementar la lógica de limpieza aquí
        // Ejemplo: eliminar columnas no deseadas
        data = data.map(row => {
            delete row['ColumnaNoDeseada'];
            return row;
        });
        mostrarDatos(data);
    }
}

function generarTablaDinamica() {
    if (data) {
        // Implementar la lógica para generar una tabla dinámica
        const output = document.getElementById('output');
        output.textContent = "Tabla dinámica generada (implementación pendiente)...";
    }
}

function cruceMinisterioSalud() {
    if (data) {
        // Implementar la lógica específica para el cruce de datos con el Ministerio de Salud
        const output = document.getElementById('output');
        output.textContent = "Cruce Ministerio de Salud realizado (implementación pendiente)...";
    }
}

function cruceAdmGeneral() {
    if (data) {
        // Implementar la lógica específica para el cruce de datos con Administración General
        const output = document.getElementById('output');
        output.textContent = "Cruce Administración General realizado (implementación pendiente)...";
    }
}

function mostrarModalDescarga() {
    document.getElementById('downloadModal').style.display = 'block';
}

function cerrarModalDescarga() {
    document.getElementById('downloadModal').style.display = 'none';
}

function descargarArchivo() {
    if (data) {
        const fileName = document.getElementById('fileName').value;
        const fileFormat = document.getElementById('fileFormat').value.toLowerCase();

        let blob;
        let extension;

        switch (fileFormat) {
            case 'csv':
                extension = '.csv';
                const csvData = Papa.unparse(data);
                blob = new Blob([csvData], { type: 'text/csv' });
                break;
            case 'xlsx':
                extension = '.xlsx';
                const worksheetXLSX = XLSX.utils.json_to_sheet(data);
                const workbookXLSX = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbookXLSX, worksheetXLSX, 'Sheet1');
                blob = new Blob([XLSX.write(workbookXLSX, { bookType: 'xlsx', type: 'array' })], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                break;
            case 'xlsm':
                extension = '.xlsm';
                const worksheetXLSM = XLSX.utils.json_to_sheet(data);
                const workbookXLSM = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbookXLSM, worksheetXLSM, 'Sheet1');
                blob = new Blob([XLSX.write(workbookXLSM, { bookType: 'xlsm', type: 'array' })], { type: 'application/vnd.ms-excel.sheet.macroEnabled.12' });
                break;
            case 'json':
                extension = '.json';
                const json = JSON.stringify(data, null, 2);
                blob = new Blob([json], { type: 'application/json' });
                break;
            case 'todos':
            default:
                extension = '';
                blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/octet-stream' });
                break;
        }

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName + extension;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        cerrarModalDescarga();
    }
}
