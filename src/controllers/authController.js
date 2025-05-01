import jwt from 'jsonwebtoken';
import SoapService from '../services/soapService.js';

class AuthController {
    // Validar credenciales a través del servicio SOAP y generar JWT
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            console.log('Login request recibido desde el front-end!');
            

            // Llamada al servicio SOAP
            const response = await SoapService.processAuthRequest(
                'login',
                { email, password }
            );

            // Validar respuesta del servicio SOAP
            if (response?.success) {

                // Generar JWT
                const token = jwt.sign(
                    { userId: response.data.userId },
                    'SECRET_KEY',
                    { expiresIn: '1h' }
                );
                res.cookie('token', token, {
                    httpOnly: true, // importante para seguridad (JS no puede acceder)
                    secure: false, // solo en HTTPS (en local puedes ponerlo false si quieres)
                    sameSite: 'Strict', // evita CSRF
                    maxAge: 60 * 60 * 1000 // 1 hora en milisegundos
                });
                return res.status(200).json({ message: 'Login exitoso' });                
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

    static logout(req, res) {
        res.clearCookie('token', {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict'
        });
        return res.status(200).json({ message: 'Sesión cerrada' });
    }

    // Validar JWT
    static validateJWT(req, res, next) {
     
        const token = req.cookies.token;

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

    static validateSession(req, res) {
        const token = req.cookies.token;
    
        if (!token) {
            return res.status(403).json({ message: 'Token no proporcionado' });
        }
    
        jwt.verify(token, 'SECRET_KEY', (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Token inválido' });
            }
    
            // Token válido, responder OK
            return res.status(200).json({ message: 'Token válido', user: decoded });
        });
    }     

}

export default AuthController;