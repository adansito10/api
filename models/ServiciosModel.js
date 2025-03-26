import pool from '../config/Db.js';

class Servicio {
    static async findAll() {
        const result = await pool.query('SELECT * FROM SERVICIOS WHERE delete_at IS NULL');
        return result.rows;
    }

    static async create({ nombre_servicio, descripcion, imagen, video }) {
        const result = await pool.query(
            `INSERT INTO SERVICIOS (nombre_servicio, descripcion, imagen, video) 
             VALUES ($1, $2, $3, $4) 
             RETURNING *`,
            [nombre_servicio, descripcion, imagen, video]
        );
        return result.rows[0];
    }

    static async findById(id) {
        const result = await pool.query(
            'SELECT * FROM SERVICIOS WHERE id = $1 AND delete_at IS NULL',
            [id]
        );
        return result.rows[0];
    }

    static async update(id, data) {
        const { nombre_servicio, descripcion, imagen, video } = data;
        const result = await pool.query(
            `UPDATE SERVICIOS 
             SET nombre_servicio = $1, descripcion = $2, imagen = $3, video = $4, update_at = NOW(), delete_at = NULL 
             WHERE id = $5 AND delete_at IS NULL 
             RETURNING *`,
            [nombre_servicio, descripcion, imagen, video, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query(
            `UPDATE SERVICIOS 
             SET delete_at = NOW() 
             WHERE id = $1 AND delete_at IS NULL 
             RETURNING *`,
            [id]
        );
        if (result.rows.length === 0) {
            return { message: 'Servicio no encontrado o ya eliminado' };
        }
        return {
            message: 'Servicio eliminado correctamente',
            servicio: result.rows[0]
        };
    }
}

export default Servicio;