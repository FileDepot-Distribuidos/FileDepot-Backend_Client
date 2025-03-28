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

    // Método genérico para solicitudes SOAP
    async processSoapRequest(action, data) {

        await this.initClient();
        return this.client["processAuthRequestAsync"](data)
            .then(response => {
                console.log("📡 XML Enviado:\n", this.client.lastRequest);
                return response[0];
            })
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

    async processAuthRequest(action, data) {
        const payload = { action, data: JSON.stringify(data) };        
        const response = await this.processSoapRequest("processAuthRequest", payload);
        return JSON.parse(response.return);
    }

}

export default new SoapService();