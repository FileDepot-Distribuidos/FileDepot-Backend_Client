import jwt from 'jsonwebtoken';
import SoapService from '../services/soapService.js';

class AuthController {
    // Validar credenciales a través del servicio SOAP y generar JWT
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            console.log('Email:', email);
            console.log('Password:', password);

            // Llamada al servicio SOAP
            const response = await SoapService.processAuthRequest(
                'login',
                { email, password }
            );

            // Validar respuesta del servicio SOAP
            if (response?.success) {
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

    // Registrar un nuevo usuario a través del servicio SOAP
    static async register(req, res) {
        try {
            const { email, password, phone } = req.body;

            console.log('Email:', email);
            console.log('Password:', password);
            console.log('Phone:', phone);

            // Llamada al servicio SOAP
            const response = await SoapService.processAuthRequest(
                'register',
                {
                    email,
                    password,
                    phone
                });

            // Validar respuesta del servicio SOAP
            if (response.success) {
                return res.status(201).json({ message: 'Usuario registrado exitosamente' });
            }

            return res.status(400).json({ message: 'Error al registrar usuario' });

        } catch (error) {
            console.error('Error al registrar usuario:', error);
            return res.status(500).json({ message: 'Error interno en el servidor' });
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

            req.user = decoded;
            next();

        });
    }
}

export default AuthController;