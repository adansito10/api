/**
 * @swagger
 * components:
 *   schemas:
 *     Empleado:
 *       type: object
 *       required:
 *         - nombreEmpleado
 *         - RFC
 *         - telefono
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del empleado
 *         nombreEmpleado:
 *           type: string
 *           description: Nombre del empleado
 *         RFC:
 *           type: string
 *           description: Registro Federal de Contribuyentes del empleado
 *         telefono:
 *           type: string
 *           description: Número de teléfono del empleado
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del empleado
 *       example:
 *         id: 1
 *         nombreEmpleado: "Maria López"
 *         RFC: "LOPM800101ABC"
 *         telefono: "555-123-4567"
 *         created_at: "2024-10-10T08:30:00Z"
 */

/**
 * @swagger
 * /api/empleados:
 *   get:
 *     summary: Obtiene todos los empleados
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Lista de empleados obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empleado'
 *       500:
 *         description: Error en el servidor
 * 
 *   post:
 *     summary: Crea un nuevo empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empleado'
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       400:
 *         description: Error en la solicitud (falta de datos)
 *       500:
 *         description: Error en el servidor
 * 
 * /api/empleados/{id}:
 *   get:
 *     summary: Obtiene un empleado por ID
 *     tags: [Empleados]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del empleado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Empleado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error en el servidor
 * 
 *   put:
 *     summary: Actualiza un empleado existente
 *     tags: [Empleados]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del empleado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empleado'
 *     responses:
 *       200:
 *         description: Empleado actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       400:
 *         description: Error en la solicitud (falta de datos)
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error en el servidor
 * 
 *   delete:
 *     summary: Elimina un empleado existente
 *     tags: [Empleados]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del empleado
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Empleado eliminado exitosamente
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error en el servidor
 */
import express from 'express';
import EmpleadoController from '../Controller/EmpleadoController.js';

const router = express.Router();

router.get('/empleados', EmpleadoController.getAllEmpleados);
router.post('/empleados', EmpleadoController.createEmpleado);
router.get('/empleados/:id', EmpleadoController.getEmpleadoById);
router.put('/empleados/:id', EmpleadoController.updateEmpleado);
router.delete('/empleados/:id', EmpleadoController.deleteEmpleado);

export default router;

