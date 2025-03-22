/**
 * @swagger
 * components:
 *   schemas:
 *     Servicio:
 *       type: object
 *       required:
 *         - nombre_servicio
 *         - tipo_servicio
 *         - ubicacion
 *         - precio
 *         - fecha
 *       properties:
 *         idservicio:
 *           type: integer
 *           description: ID único del servicio
 *         nombreServicio:
 *           type: string
 *           description: Nombre del servicio
 *         tipoServicio:
 *           type: string
 *           description: Tipo del servicio
 *         ubicacion:
 *           type: string
 *           description: Ubicación del servicio
 *         precio:
 *           type: number
 *           format: float
 *           description: Precio del servicio
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha en que se ofrece el servicio
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del servicio
 *       example:
 *         idservicio: 1
 *         nombre_servicio: "Limpieza profunda"
 *         tipo_servicio: "Limpieza"
 *         ubicacion: "Sucursal C"
 *         precio: 450.00
 *         fecha: "2024-10-16"
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
 *         description: Error en la solicitud (ta de datos)
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
