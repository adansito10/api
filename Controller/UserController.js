import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/UserModels.js';

class UserController {
    // Obtener todos los usuarios
    static async getAllUsers(req, res) {
        try {
            const users = await Usuario.findAll();
            res.json({
                message: 'Lista de usuarios obtenida correctamente',
                users: users
            });
        } catch (error) {
            console.error('Error en getAllUsers:', error.stack);
            res.status(500).json({ error: error.message });
        }
    }

    // Crear un nuevo usuario
    static async createUser(req, res) {
        try {
            const { nombre, correo, contrasena } = req.body;
            if (!nombre || !correo || !contrasena) {
                return res.status(400).json({ error: 'Faltan datos requeridos' });
            }
            const hashedPassword = await bcrypt.hash(contrasena, 10); // Hashea la contraseña
            const user = await Usuario.create({ nombre, correo, contrasena: hashedPassword });
            res.status(201).json({
                message: 'Usuario creado correctamente',
                user: user
            });
        } catch (error) {
            console.error('Error en createUser:', error.stack);
            res.status(500).json({ error: error.message });
        }
    }

    // Iniciar sesión
    static async login(req, res) {
        try {
            const { correo, contrasena } = req.body;
            if (!correo || !contrasena) {
                return res.status(400).json({ error: 'Faltan datos requeridos' });
            }

            // Buscar usuario por correo
            const user = await Usuario.findByCorreo(correo);
            if (!user) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            // Verificar contraseña
            const isMatch = await bcrypt.compare(contrasena, user.contrasena);
            if (!isMatch) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            // Generar token JWT
            const token = jwt.sign(
                { id: user.id, correo: user.correo },
                process.env.JWT_SECRET || '00bc9d4909e2c4d29f5a334cddcedca59b92e0e10f662c570ab46270d96db622',
                { expiresIn: '1h' }
            );

            res.json({
                message: 'Inicio de sesión exitoso',
                token: token,
                user: { id: user.id, nombre: user.nombre, correo: user.correo }
            });
        } catch (error) {
            console.error('Error en login:', error.stack);
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener un usuario por ID
    static async getUserById(req, res) {
        try {
            const user = await Usuario.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            return res.json({
                message: 'Usuario encontrado correctamente',
                user: user
            });
        } catch (error) {
            console.error('Error en getUserById:', error.stack);
            res.status(500).json({ error: error.message });
        }
    }

    // Actualizar un usuario
    static async updateUser(req, res) {
        try {
            const { nombre, correo, contrasena } = req.body;
            let hashedPassword = contrasena;
            if (contrasena) {
                hashedPassword = await bcrypt.hash(contrasena, 10); // Hashea solo si se proporciona una nueva contraseña
            }
            const user = await Usuario.update(req.params.id, { nombre, correo, contrasena: hashedPassword });
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.json({
                message: 'Usuario actualizado correctamente',
                user: user
            });
        } catch (error) {
            console.error('Error en updateUser:', error.stack);
            res.status(500).json({ error: error.message });
        }
    }

    // Eliminar un usuario
    static async deleteUser(req, res) {
        try {
            const user = await Usuario.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const result = await Usuario.delete(req.params.id);
            res.json({
                message: 'Usuario eliminado correctamente',
                user: result
            });
        } catch (error) {
            console.error('Error en deleteUser:', error.stack);
            res.status(500).json({ error: error.message });
        }
    }
}

export default UserController;