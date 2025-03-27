import soap from 'soap';

const WSDL_URL = 'http://example.com/soap?wsdl'; // Reemplaza con la URL real del WSDL

class SoapService {
    constructor() {
        this.client = null;
    }

    async initClient() {
        if (!this.client) {
            this.client = await soap.createClientAsync(WSDL_URL);
        }
    }

    // Método genérico para solicitudes SOAP
    async processSoapRequest(action, data) {
        await this.initClient();
        return this.client[action + 'Async'](data)
            .then(response => response[0])
            .catch(err => {
                console.error(`SOAP Error in ${action}:`, err);
                throw err;
            });
    }

    // Procesar solicitudes de archivos
    async processFileRequest(action, data) {
        return this.processSoapRequest(action, data);
    }

    // Procesar solicitudes de directorios
    async processDirectoryRequest(action, data) {
        return this.processSoapRequest(action, data);
    }

    // Procesar solicitudes de compartir archivos/directorios
    async processShareRequest(action, data) {
        return this.processSoapRequest(action, data);
    }

    // Autenticación
    
    // async processAuthRequest(action, data) {
    //     return this.processSoapRequest(action, data);
    // }

    async processAuthRequest({ action, email, password }) {
        console.log(`Mocked SOAP Request: action=${action}, email=${email}, password=${password}`);

        if (action === 'login') {
            // Simulación de una respuesta exitosa
            if (email === 'test@example.com' && password === '123456') {
                return { success: true, userID: 1, email };
            }
            return { success: false };
        }

        if (action === 'register') {
            return { success: true };
        }

        return { success: false };
    }

}

export default new SoapService();