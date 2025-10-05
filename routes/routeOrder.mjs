import express from "express";
import { addOrder, listOrderClient } from "../controllers/controll_order.mjs";
import auth from "../middlewares/auth.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Endpoints para la gestión de pedidos
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientId
 *               - products
 *             properties:
 *               clientId:
 *                 type: string
 *                 example: 64adf6a1234567890abc1234
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                       example: Camiseta
 *                     cantidad:
 *                       type: number
 *                       example: 2
 *                     precio:
 *                       type: number
 *                       example: 45000
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *       400:
 *         description: Error en la creación del pedido
 */

/**
 * @swagger
 * /orders/{clientId}:
 *   get:
 *     summary: Listar pedidos de un cliente
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Lista de pedidos del cliente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 64adf6a1234567890abc9999
 *                   clienteId:
 *                     type: string
 *                     example: 64adf6a1234567890abc1234
 *                   productos:
 *                     type: array
 *                     
 *       404:
 *         description: No se encontraron pedidos para el cliente
 */

router.post("/", auth, addOrder);
router.get("/:clientId", auth, listOrderClient);

export default router;
