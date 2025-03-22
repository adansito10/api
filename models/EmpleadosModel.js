import pool from '../config/Db.js';

class Empleado {
    // Obtener todos los empleados
    static async findAll() {
        const result = await pool.query('SELECT * FROM EMPLEADOS');
        return result.rows;
    }

    // Crear un nuevo empleado
    static async create({ nombre, RFC, telefono, apellidos }) {
        const result = await pool.query(
            'INSERT INTO EMPLEADOS (nombre, RFC, telefono, apellidos) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, RFC, telefono, apellidos]
        );
        return result.rows[0];
    }

    // Obtener un empleado por ID
    static async findById(id) {
        const result = await pool.query('SELECT * FROM EMPLEADOS WHERE id = $1', [id]);
        return result.rows[0];
    }

    // Actualizar un empleado
    static async update(id, data) {
        const { nombre, RFC, telefono, apellidos } = data;
        const result = await pool.query(
            'UPDATE EMPLEADOS SET nombre = $1, RFC = $2, telefono = $3, apellidos = $4, update_at = NOW(), delete_at = NULL WHERE id = $5 RETURNING *',
            [nombre, RFC, telefono,apellidos, id]
        );
        return result.rows[0];
    }

    // Eliminar un empleado de forma lógica (actualizar delete_at)
    static async delete(id) {
        const result = await pool.query(
            'UPDATE EMPLEADOS SET delete_at = NOW() WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) {
            return { message: 'Empleado no encontrado o ya eliminado' };
        }
        return { message: 'Empleado eliminado exitosamente', empleado: result.rows[0] };
    }
}

export default Empleado;
