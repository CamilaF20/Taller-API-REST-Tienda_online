import express from "express";
import auth from "../middlewares/auth.mjs";
import {
  addClient,
  clientList,
  updateClient,
  deleteClient
} from "../controllers/controll_client.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Endpoints para la gestión de clientes
 */

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Crea un nuevo cliente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 example: juan@example.com
 *               address:
 *                 type: string
 *                 example: Calle 123 #45-67
 *     responses:
 *       201:
 *         description: Cliente creado con éxito
 *
 *   get:
 *     summary: Obtiene todos los clientes
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes
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
 *                     example: Juan Pérez
 *                   email:
 *                     type: string
 *                     example: juan@example.com
 *                   address:
 *                     type: string
 *                     example: Calle 123 #45-67
 */

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Actualiza un cliente existente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: María Gómez
 *               email:
 *                 type: string
 *                 example: maria@example.com
 *               address:
 *                 type: string
 *                 example: Carrera 45 #12-34
 *     responses:
 *       200:
 *         description: Cliente actualizado correctamente
 *
 *   delete:
 *     summary: Elimina un cliente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente eliminado correctamente
 */

router.post("/", auth, addClient);
router.get("/", auth, clientList);
router.put("/:id", auth, updateClient);
router.delete("/:id", auth, deleteClient);

export default router;
