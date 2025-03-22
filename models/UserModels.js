import pool from '../config/Db.js';

class Usuario {
    static async findAll() {
        try {
            const result = await pool.query('SELECT * FROM USUARIOS');
            return result.rows;
        } catch (error) {
            console.error('Error en findAll:', error.stack);
            throw error;
        }
    }

    static async create({ nombre, correo, contrasena }) {
        try {
            const result = await pool.query(
                'INSERT INTO USUARIOS (nombre, correo, contrasena, create_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *',
                [nombre, correo, contrasena]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error en create:', error.stack);
            throw error;
        }
    }

    static async findById(idUsuario) {
        try {
            const result = await pool.query('SELECT * FROM USUARIOS WHERE id = $1', [idUsuario]);
            return result.rows[0];
        } catch (error) {
            console.error('Error en findById:', error.stack);
            throw error;
        }
    }

    static async findByCorreo(correo) {
        try {
            const result = await pool.query('SELECT * FROM USUARIOS WHERE correo = $1 AND delete_at IS NULL', [correo]);
            return result.rows[0];
        } catch (error) {
            console.error('Error en findByCorreo:', error.stack);
            throw error;
        }
    }

    static async update(idUsuario, { nombre, correo, contrasena }) {
        try {
            const result = await pool.query(
                `UPDATE USUARIOS 
                 SET nombre = $1, correo = $2, contrasena = $3, update_at = NOW()
                 WHERE id = $4 RETURNING *`,
                [nombre, correo, contrasena, idUsuario]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error en update:', error.stack);
            throw error;
        }
    }

    static async delete(idUsuario) {
        try {
            const result = await pool.query(
                'UPDATE USUARIOS SET delete_at = NOW() WHERE id = $1 AND delete_at IS NULL RETURNING *',
                [idUsuario]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error en delete:', error.stack);
            throw error;
        }
    }
}

export default Usuario;