import jwt from 'jsonwebtoken';
import SoapService from '../services/soapService.js';

class AuthController {
    // Validar credenciales a través del servicio SOAP y generar JWT
    static async sendCredentials(req, res) {
        try {
            const { email, password } = req.body;

            // Llamada al servicio SOAP
            const response = await SoapService.authRequest({ email, password });

            // Validar respuesta del servicio SOAP
            if (response && response.success) {
                // Generar JWT
                const token = jwt.sign(
                    { userID: response.userID, email: response.email }, 
                    'SECRET_KEY', 
                    { expiresIn: '1h' }
                );
                return res.status(200).json({ token });
            }

            return res.status(401).json({ message: 'Credenciales inválidas' });

        } catch (error) {
            console.error('Error en autenticación SOAP:', error);
            return res.status(500).json({ message: 'Error en autenticación', error });
        }
    }

    // Validar JWT
    static validateJWT(req, res) {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(403).json({ message: 'Token no proporcionado' });
        }

        jwt.verify(token, 'SECRET_KEY', (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Token inválido' });
            }

            res.status(200).json(decoded);
        });
    }
}

export default AuthController;