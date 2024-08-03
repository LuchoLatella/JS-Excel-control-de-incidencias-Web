import { CargarArchivoApp } from './components/CargarArchivoApp.js';
import { LimpiarArchivoApp } from './components/LimpiarArchivoApp.js';
import { TablaDinamicaApp } from './components/TablaDinamicaApp.js';
import { CruceMinisterioSaludApp } from './components/CruceMinisterioSaludApp.js';
import { CruceAdmGeneralApp } from './components/CruceAdmGeneralApp.js';
import { DescargarArchivoApp } from './components/DescargarArchivoApp.js';

document.addEventListener('DOMContentLoaded', () => {
    CargarArchivoApp();
    LimpiarArchivoApp();
    TablaDinamicaApp();
    CruceMinisterioSaludApp();
    CruceAdmGeneralApp();
    DescargarArchivoApp();
});