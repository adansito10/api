/**
 * @swagger
 * components:
 *   schemas:
 *     Cita:
 *       type: object
 *       required:
 *         - paciente
 *         - fecha
 *         - hora
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la cita
 *         paciente:
 *           type: string
 *           description: Nombre del paciente
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha de la cita
 *         hora:
 *           type: string
 *           format: time
 *           description: Hora de la cita
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la cita
 *       example:
 *         id: 1
 *         paciente: "Juan Pérez"
 *         fecha: "2024-10-16"
 *         hora: "09:00"
 *         created_at: "2024-10-10T08:30:00Z"
 */

/**
 * @swagger
 * /api/citas:
 *   get:
 *     summary: Obtiene todas las citas
 *     tags: [Citas]
 *     responses:
 *       200:
 *         description: Lista de citas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cita'
 *       500:
 *         description: Error en el servidor
 *   
 *   post:
 *     summary: Crea una nueva cita
 *     tags: [Citas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cita'
 *     responses:
 *       201:
 *         description: Cita creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cita'
 *       400:
 *         description: Error en la solicitud
 *       500:
 *         description: Error en el servidor
 * 
 * /api/citas/{id}:
 *   put:
 *     summary: Actualiza una cita existente
 *     tags: [Citas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la cita
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cita'
 *     responses:
 *       200:
 *         description: Cita actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cita'
 *       404:
 *         description: Cita no encontrada
 *       500:
 *         description: Error en el servidor
 * 
 *   delete:
 *     summary: Elimina una cita existente
 *     tags: [Citas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la cita
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Cita eliminada exitosamente
 *       404:
 *         description: Cita no encontrada
 *       500:
 *         description: Error en el servidor
 */

import express from 'express';
import CitaController from '../Controller/CitasController.js';

const router = express.Router();

router.get('/citas', CitaController.getAllCitas);
router.post('/citas', CitaController.createCita);
router.get('/citas/:id', CitaController.getCitaById);
router.put('/citas/:id', CitaController.updateCita);
router.delete('/citas/:id', CitaController.deleteCita);

export default router;
