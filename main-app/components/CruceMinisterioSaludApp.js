import { cruceMinisterioSaludService } from '../../backend/services/cruceMinisterioSaludService.js';

export function CruceMinisterioSaludApp() {
    const container = document.createElement('div');
    const cruceButton = document.createElement('button');
    cruceButton.textContent = 'Cruce x Casos Ministerio de Salud';
    cruceButton.onclick = () => cruceMinisterioSalud();

    container.appendChild(cruceButton);
    document.getElementById('app').appendChild(container);

    function cruceMinisterioSalud() {
        cruceMinisterioSaludService()
            .then(data => {
                console.log('Cruce Ministerio de Salud:', data);
                // Mostrar resultados del cruce en la UI
            })
            .catch(err => console.error(err));
    }
}
