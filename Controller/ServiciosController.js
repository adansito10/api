import Servicio from '../models/ServiciosModel.js';

class ServicioController {
    static async getAllServicios(req, res) {
        try {
            const servicios = await Servicio.findAll();
            res.json({
                message: 'Lista de todos los servicios',
                servicios: servicios
            });
        } catch (error) {
            console.error('Error al obtener servicios:', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async createServicio(req, res) {
        try {
            const { nombre_servicio, descripcion, imagen, video } = req.body;

            if (!nombre_servicio || !descripcion || !imagen) {
                return res.status(400).json({ message: "Faltan datos requeridos: nombre_servicio, descripcion, imagen" });
            }

            const servicio = await Servicio.create({ nombre_servicio, descripcion, imagen, video });
            res.status(201).json({
                message: 'Servicio creado correctamente',
                servicio: servicio
            });
        } catch (error) {
            console.error('Error al crear servicio:', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async getServicioById(req, res) {
        try {
            const servicio = await Servicio.findById(req.params.id);
            if (!servicio) {
                return res.status(404).json({ message: "Servicio no encontrado" });
            }
            res.json({
                message: 'Servicio encontrado correctamente',
                servicio: servicio
            });
        } catch (error) {
            console.error('Error al obtener servicio por ID:', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async updateServicio(req, res) {
        try {
            const { nombre_servicio, descripcion, imagen, video } = req.body;
            const servicio = await Servicio.update(req.params.id, { nombre_servicio, descripcion, imagen, video });
            if (!servicio) {
                return res.status(404).json({ message: 'Servicio no encontrado' });
            }
            res.json({
                message: 'Servicio actualizado correctamente',
                servicio: servicio
            });
        } catch (error) {
            console.error('Error al actualizar servicio:', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteServicio(req, res) {
        try {
            const servicio = await Servicio.findById(req.params.id);
            if (!servicio) {
                return res.status(404).json({ message: 'Servicio no encontrado' });
            }
            const result = await Servicio.delete(req.params.id);
            res.json({
                message: 'Servicio eliminado correctamente',
                servicio: servicio
            });
        } catch (error) {
            console.error('Error al eliminar servicio:', error);
            res.status(500).json({ error: error.message });
        }
    }
}

export default ServicioController;