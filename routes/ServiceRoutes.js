/**
 * @swagger
 * components:
 *   schemas:
 *     Servicio:
 *       type: object
 *       required:
 *         - nombre_servicio
 *         - descripcion
 *         - imagen
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del servicio
 *         nombre_servicio:
 *           type: string
 *           description: Nombre del servicio
 *         descripcion:
 *           type: string
 *           description: Descripción del servicio
 *         imagen:
 *           type: string
 *           description: URL de la imagen del servicio
 *         video:
 *           type: string
 *           description: URL del video del servicio (opcional)
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del servicio
 *         update_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de actualización del servicio
 *         delete_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación del servicio (soft delete)
 *       example:
 *         id: 1
 *         nombre_servicio: "Paquete de Bodas"
 *         descripcion: "Explora nuestro paquete de bodas que tenemos para ti."
 *         imagen: "https://example.com/images/boda4.jpg"
 *         video: "https://example.com/videos/paquete-bodas.mp4"
 *         created_at: "2025-03-22T22:38:15.452Z"
 *         update_at: null
 *         delete_at: null
 */

/**
 * @swagger
 * /api/servicios:
 *   get:
 *     summary: Obtiene todos los servicios
 *     tags: [Servicios]
 *     responses:
 *       200:
 *         description: Lista de servicios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Servicio'
 *       500:
 *         description: Error en el servidor
 * 
 *   post:
 *     summary: Crea un nuevo servicio
 *     tags: [Servicios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Servicio'
 *     responses:
 *       201:
 *         description: Servicio creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servicio'
 *       400:
 *         description: Error en la solicitud (falta de datos)
 *       500:
 *         description: Error en el servidor
 * 
 * /api/servicios/{id}:
 *   get:
 *     summary: Obtiene un servicio por ID
 *     tags: [Servicios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del servicio
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Servicio encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servicio'
 *       404:
 *         description: Servicio no encontrado
 *       500:
 *         description: Error en el servidor
 * 
 *   put:
 *     summary: Actualiza un servicio existente
 *     tags: [Servicios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del servicio
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Servicio'
 *     responses:
 *       200:
 *         description: Servicio actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servicio'
 *       400:
 *         description: Error en la solicitud (falta de datos)
 *       404:
 *         description: Servicio no encontrado
 *       500:
 *         description: Error en el servidor
 * 
 *   delete:
 *     summary: Elimina un servicio existente
 *     tags: [Servicios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del servicio
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Servicio eliminado exitosamente
 *       404:
 *         description: Servicio no encontrado
 *       500:
 *         description: Error en el servidor
 */

import express from 'express';
import ServicioController from '../Controller/ServiciosController.js';

const router = express.Router();

router.get('/servicios', ServicioController.getAllServicios);
router.post('/servicios', ServicioController.createServicio);
router.get('/servicios/:id', ServicioController.getServicioById);
router.put('/servicios/:id', ServicioController.updateServicio);
router.delete('/servicios/:id', ServicioController.deleteServicio);

export default router;
