import { cargarArchivoService } from '../../backend/services/cargarArchivoService.js';

export function CargarArchivoApp() {
    const container = document.createElement('div');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'fileInput';

    const cargarButton = document.createElement('button');
    cargarButton.textContent = 'Cargar Archivo';
    cargarButton.onclick = () => cargarArchivo();

    container.appendChild(fileInput);
    container.appendChild(cargarButton);
    document.getElementById('app').appendChild(container);
    
    function cargarArchivo() {
        const file = fileInput.files[0];
        if (file) {
            cargarArchivoService(file)
                .then(data => {
                    console.log('Archivo cargado:', data);
                    // Aquí puedes manejar la data cargada
                })
                .catch(err => console.error(err));
        }
    }
}
