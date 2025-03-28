import soap from 'soap';

const WSDL_URL = "http://localhost:2005/FileDepotService?wsdl";

class SoapService {
    constructor() {
        this.client = null;
    }

    async initClient() {
        if (!this.client) {
            const options = { 
                wsdl_headers: { Connection: "keep-alive" }, 
                wsdl_options: { timeout: 5000 } 
            };
            
            this.client = await soap.createClientAsync(WSDL_URL, options);
        }
    }

    // Método genérico que selecciona el método SOAP correcto
    async processSoapRequest(serviceMethod, action, data) {
        await this.initClient();
        
        if (!this.client[`${serviceMethod}Async`]) {
            throw new Error(`Método SOAP no encontrado: ${serviceMethod}Async`);
        }

        // Se envía la acción y los datos en el formato correcto
        const payload = { action, data: JSON.stringify(data) };

        return this.client[`${serviceMethod}Async`](payload)
            .then(response => response[0]) // Retornar solo la respuesta
            .catch(err => {
                console.error(`SOAP Error in ${action}:`, err);
                throw err;
            });
    }

    // Métodos específicos con el nombre del servicio correcto
    async processFileRequest(action, data) {
        return this.processSoapRequest("processFileRequest", action, data);
    }

    async processDirectoryRequest(action, data) {
        return this.processSoapRequest("processDirectoryRequest", action, data);
    }

    async processShareRequest(action, data) {
        return this.processSoapRequest("processShareRequest", action, data);
    }

    async processAuthRequest(action, data) {
        const response = await this.processSoapRequest("processAuthRequest", action, data);
        return JSON.parse(response.return); // Retornar el JSON correctamente parseado
    }
}

export default new SoapService();