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

    async processSoapRequest(serviceMethod, action, data) {
        await this.initClient();

        if (!this.client[`${serviceMethod}Async`]) {
            throw new Error(`Método SOAP no encontrado: ${serviceMethod}Async`);
        }

        const payload = { action, data: JSON.stringify(data) };
        console.log(`\nEnviando solicitud SOAP:`);
        console.log(`  Método: ${serviceMethod}`);
        console.log(`  Acción: ${action}`);
        console.log(`  Payload:`, payload);

        return this.client[`${serviceMethod}Async`](payload)
            .then(response => {
                const raw = response[0]?.return || "{}";
                console.log(`Respuesta SOAP (raw): ${raw}`);
                const parsed = JSON.parse(raw);
                console.log(`Respuesta parseada:`, parsed);
                return parsed;
            })
            .catch(err => {
                console.error(`Error en SOAP [${action}]:`, err.message);
                throw err;
            });
    }

    async processFileRequest(action, data) {
        console.log(`\n📁 processFileRequest`);
        return this.processSoapRequest("processFileRequest", action, data);
    }

    async processDirectoryRequest(action, data) {
        console.log(`\nprocessDirectoryRequest`);
        return this.processSoapRequest("processDirectoryRequest", action, data);
    }

    async processShareRequest(action, data) {
        console.log(`\nprocessShareRequest`);
        return this.processSoapRequest("processShareRequest", action, data);
    }

    async processAuthRequest(action, data) {
        console.log(`\nprocessAuthRequest`);
        return this.processSoapRequest("processAuthRequest", action, data);
    }
}

export default new SoapService();
