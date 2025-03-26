import pool from '../config/Db.js';

class Usuario {
    static async findAll() {
        try {
            const result = await pool.query('SELECT * FROM USUARIOS WHERE delete_at IS NULL');
            return result.rows;
        } catch (error) {
            console.error('Error en findAll:', error.stack);
            throw error;
        }
    }

    static async create({ nombre, correo, contrasena, imagen }) {
        try {
            const result = await pool.query(
                'INSERT INTO USUARIOS (nombre, correo, contrasena, imagen, create_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *',
                [nombre, correo, contrasena, imagen || '']
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error en create:', error.stack);
            throw error;
        }
    }

    static async findById(idUsuario) {
        try {
            const result = await pool.query('SELECT * FROM USUARIOS WHERE id = $1 AND delete_at IS NULL', [idUsuario]);
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

    static async update(idUsuario, { nombre, correo, contrasena, imagen }) {
        try {
            const updates = [];
            const values = [];
            let index = 1;

            if (nombre) {
                updates.push(`nombre = $${index++}`);
                values.push(nombre);
            }
            if (correo) {
                updates.push(`correo = $${index++}`);
                values.push(correo);
            }
            if (contrasena) {
                updates.push(`contrasena = $${index++}`);
                values.push(contrasena);
            }
            if (imagen !== undefined) {
                updates.push(`imagen = $${index++}`);
                values.push(imagen || '');
            }

            updates.push(`update_at = NOW()`);

            if (updates.length === 1) {
                return null;
            }

            values.push(idUsuario);
            const query = `UPDATE USUARIOS SET ${updates.join(', ')} WHERE id = $${index} AND delete_at IS NULL RETURNING *`;

            const result = await pool.query(query, values);
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