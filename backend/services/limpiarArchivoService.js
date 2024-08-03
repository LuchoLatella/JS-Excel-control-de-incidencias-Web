export async function limpiarArchivoService() {
    // Implementar la lógica de limpieza
    // Aquí se espera que los datos ya estén cargados en una variable global o pasada como parámetro
    return new Promise((resolve) => {
        // Ejemplo de eliminación de columnas específicas
        let cleanedData = globalData.map(row => {
            delete row['ColumnaNoDeseada'];
            return row;
        });
        resolve(cleanedData);
    });
}
