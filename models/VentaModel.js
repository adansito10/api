import pool from '../config/Db.js';

export const getAllVentas = async () => {
    const query = 'SELECT * FROM ventas';
    const { rows } = await pool.query(query);
    return rows;
};

export const getVentaById = async (id) => {
    const query = 'SELECT * FROM ventas WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

export const createVenta = async (venta) => {
    const query = 'INSERT INTO ventas(monto, id_cliente) VALUES($1, $2) RETURNING *';
    const { rows } = await pool.query(query, [venta.monto, venta.id_cliente]);
    return rows[0];
};

export const updateVenta = async (id, venta) => {
    const query = 'UPDATE ventas SET id = $1, monto = $2, update_at = NOW() WHERE id = $3 RETURNING *';
    const { rows } = await pool.query(query, [venta.id, venta.monto, id]);
    return rows[0];
};

export const deleteVenta = async (id) => {
    const query = 'UPDATE ventas SET delete_at = NOW() WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
        return { message: 'Venta no encontrada o ya eliminada' };
    }
    return { message: 'Venta eliminada correctamente', venta: rows[0] };
};
