/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - nombre
 *         - correo
 *         - contrasena
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del usuario
 *         nombre:
 *           type: string
 *           description: Nombre del usuario
 *         correo:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario
 *         contrasena:
 *           type: string
 *           description: Contraseña del usuario (se almacenará hasheada)
 *         imagen:
 *           type: string
 *           description: Imagen de perfil del usuario (en formato base64)
 *         create_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del usuario
 *         update_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización del usuario
 *         delete_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación lógica del usuario
 *       example:
 *         id: 1
 *         nombre: "Juan Pérez"
 *         correo: "juan.perez@example.com"
 *         contrasena: "contraseña123"
 *         imagen: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/..."
 *         create_at: "2025-03-23T20:19:30.878Z"
 *         update_at: null
 *         delete_at: null
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lista de usuarios obtenida correctamente"
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor"
 * 
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - correo
 *               - contrasena
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               correo:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario
 *               contrasena:
 *                 type: string
 *                 description: Contraseña del usuario
 *               imagen:
 *                 type: string
 *                 description: Imagen de perfil del usuario (en formato base64)
 *             example:
 *               nombre: "Juan Pérez"
 *               correo: "juan.perez@example.com"
 *               contrasena: "contraseña123"
 *               imagen: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/..."
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario creado correctamente"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nombre:
 *                       type: string
 *                     correo:
 *                       type: string
 *                     imagen:
 *                       type: string
 *                   example:
 *                     id: 1
 *                     nombre: "Juan Pérez"
 *                     correo: "juan.perez@example.com"
 *                     imagen: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/..."
 *       400:
 *         description: Error en la solicitud (falta de datos)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Faltan datos requeridos"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor"
 * 
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario encontrado correctamente"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario no encontrado"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor"
 * 
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               correo:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario
 *               contrasena:
 *                 type: string
 *                 description: Nueva contraseña del usuario (opcional)
 *               imagen:
 *                 type: string
 *                 description: Imagen de perfil del usuario (en formato base64, opcional)
 *             example:
 *               nombre: "Juan Pérez Actualizado"
 *               correo: "juan.perez.actualizado@example.com"
 *               contrasena: "nuevaContraseña123"
 *               imagen: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/..."
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario actualizado correctamente"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nombre:
 *                       type: string
 *                     correo:
 *                       type: string
 *                     imagen:
 *                       type: string
 *                   example:
 *                     id: 1
 *                     nombre: "Juan Pérez Actualizado"
 *                     correo: "juan.perez.actualizado@example.com"
 *                     imagen: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/..."
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario no encontrado"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor"
 * 
 *   delete:
 *     summary: Elimina un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario eliminado correctamente"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario no encontrado"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor"
 *
 * /api/login:
 *   post:
 *     summary: Inicia sesión y genera un token JWT
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 format: email
 *               contrasena:
 *                 type: string
 *             required:
 *               - correo
 *               - contrasena
 *             example:
 *               correo: "juan.perez@example.com"
 *               contrasena: "contraseña123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Inicio de sesión exitoso"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nombre:
 *                       type: string
 *                     correo:
 *                       type: string
 *                     imagen:
 *                       type: string
 *                   example:
 *                     id: 1
 *                     nombre: "Juan Pérez"
 *                     correo: "juan.perez@example.com"
 *                     imagen: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/..."
 *       400:
 *         description: Faltan datos requeridos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Faltan datos requeridos"
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Credenciales inválidas"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor"
 */

import express from 'express';
import UserController from '../Controller/UserController.js';

const router = express.Router();

router.post('/usuarios', UserController.createUser);
router.get('/usuarios', UserController.getAllUsers);
router.get('/usuarios/:id', UserController.getUserById);
router.put('/usuarios/:id', UserController.updateUser);
router.delete('/usuarios/:id', UserController.deleteUser);
router.post('/login', UserController.login);

export default router;