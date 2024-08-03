export async function cargarArchivoService(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const fileType = file.name.split('.').pop();
            if (fileType === 'csv') {
                Papa.parse(e.target.result, {
                    header: true,
                    complete: function(results) {
                        resolve(results.data);
                    }
                });
            } else if (fileType === 'xls' || fileType === 'xlsx') {
                const workbook = XLSX.read(e.target.result, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                resolve(XLSX.utils.sheet_to_json(worksheet));
            } else {
                reject(new Error('Formato de archivo no soportado'));
            }
        };
        reader.readAsBinaryString(file);
    });
}
