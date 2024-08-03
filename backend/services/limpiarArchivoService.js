import * as XLSX from 'xlsx';

export async function limpiarArchivoService(file) {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.onload = function(e) {
                const workbook = XLSX.read(e.target.result, { type: 'binary' });
                const firstSheetName = workbook.SheetNames[0];
                let sheet = workbook.Sheets[firstSheetName];

                // 1. Renombrar la hoja a "carga"
                workbook.SheetNames[0] = 'carga';

                // 2. Eliminar la primera fila
                sheet = XLSX.utils.sheet_add_aoa(sheet, [], { origin: -1 });

                // 3. Aplicar AutoFiltro
                if (!sheet['!autofilter']) {
                    sheet['!autofilter'] = { ref: "A1:" + XLSX.utils.encode_col(sheet['!ref'].split(":")[1]) + 1 };
                }

                // 4. Ajustar Ancho de Columnas (Se ajusta a través de un array con las anchuras)
                const columnWidths = [
                    { wpx: 100 }, { wpx: 42.2 }, { wpx: 35.6 }, { wpx: 33.3 }, { wpx: 125.6 },
                    { wpx: 170 }, { wpx: 100 }, { wpx: 63.3 }, { wpx: 200 }, { wpx: 100 },
                    { wpx: 100 }, { wpx: 191 }, { wpx: 100 }, { wpx: 128.9 }, { wpx: 148.9 },
                    { wpx: 183.3 }, { wpx: 213.3 }
                ];
                sheet['!cols'] = columnWidths;

                // 5. Reorganizar la columna E a la posición D
                const EColumn = XLSX.utils.sheet_to_json(sheet, { header: 1 }).map(row => row[4]);
                XLSX.utils.sheet_add_aoa(sheet, XLSX.utils.sheet_to_json(sheet, { header: 1 }).map((row, i) => [row[0], row[1], row[2], EColumn[i], row[3], ...row.slice(5)]), { origin: "A1" });

                // 6. Eliminar columnas I:J y P:S
                const jsonSheet = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                const cleanedData = jsonSheet.map(row => row.filter((_, index) => index !== 8 && index !== 9 && index < 15));

                const newSheet = XLSX.utils.aoa_to_sheet(cleanedData);

                // Reemplazar la hoja antigua con la nueva
                workbook.Sheets['carga'] = newSheet;

                // Generar el nuevo archivo
                const newWorkbook = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

                resolve(newWorkbook);
            };
            reader.readAsBinaryString(file);
        } catch (error) {
            reject(error);
        }
    });
}
