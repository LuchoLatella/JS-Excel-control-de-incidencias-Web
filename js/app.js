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

function descargarArchivo() {
    if (data) {
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'datos.json'; // Aquí puedes cambiar el formato y el nombre del archivo
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}
