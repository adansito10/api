import pool from '../config/Db.js';

class Servicio {
    static async findAll() {
        // Seleccionamos solo los servicios que no están eliminados (delete_at IS NULL)
        const result = await pool.query('SELECT * FROM SERVICIOS WHERE delete_at IS NULL');
        return result.rows;
    }

    static async create({ nombre_servicio, tipo_servicio, ubicacion, precio }) {
        // Insertamos un nuevo servicio con las columnas correctas
        const result = await pool.query(
            `INSERT INTO SERVICIOS (nombre_servicio, tipo_servicio, ubicacion, precio) 
             VALUES ($1, $2, $3, $4) 
             RETURNING *`,
            [nombre_servicio, tipo_servicio, ubicacion, precio]
        );
        return result.rows[0];
    }

    static async findById(id) {
        // Buscamos un servicio por ID asegurándonos de que no esté eliminado
        const result = await pool.query(
            'SELECT * FROM SERVICIOS WHERE id = $1 AND delete_at IS NULL',
            [id]
        );
        return result.rows[0];
    }

    static async update(id, data) {
        const { nombre_servicio, tipo_servicio, ubicacion, precio } = data;

        // Actualizamos un servicio existente con las columnas correctas
        const result = await pool.query(
            `UPDATE SERVICIOS 
             SET nombre_servicio = $1, tipo_servicio = $2, ubicacion = $3, precio = $4, update_at = NOW(), delete_at = NULL 
             WHERE id = $5 AND delete_at IS NULL 
             RETURNING *`,
            [nombre_servicio, tipo_servicio, ubicacion, precio, id]
        );

        return result.rows[0]; // Retornamos el servicio actualizado
    }

    static async delete(id) {
        // Marcamos el servicio como eliminado (delete_at = NOW())
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
            servicio: result.rows[0] // Retornamos el servicio eliminado
        };
    }
}

export default Servicio;
