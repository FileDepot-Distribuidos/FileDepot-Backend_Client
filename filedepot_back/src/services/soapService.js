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

    async processFileRequest(action, data) {
        await this.initClient();
        return this.client[action + 'Async'](data)
            .then(response => response[0])
            .catch(err => {
                console.error(`SOAP Error in ${action}:`, err);
                throw err;
            });
    }

    async processDirectoryRequest(action, data) {
        return this.processFileRequest(action, data);
    }

    async processShareRequest(action, data) {
        return this.processFileRequest(action, data);
    }

    async authRequest(credentials) {
        return this.processFileRequest('AuthRequest', credentials);
    }
}

export default SoapService;