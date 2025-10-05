import express from "express";
import { register, login, getUsers } from "../controllers/controll_auth.mjs";
import auth from "../middlewares/auth.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación y gestión de usuarios
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Camila
 *               email:
 *                 type: string
 *                 example: camila@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Error de validación
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: camila@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, devuelve token JWT
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Listar todos los usuarios registrados
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []   # Requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 64adf6a1234567890abc1234
 *                   name:
 *                     type: string
 *                     example: Camila
 *                   email:
 *                     type: string
 *                     example: camila@example.com
 *                   rol:
 *                     type: string
 *                     example: cliente
 *       401:
 *         description: Acceso denegado, token requerido o inválido
 */
router.get("/users", auth, getUsers);

export default router;
