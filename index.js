import express from "express";
import dotenv from "dotenv";
import connectDB from "./drivers/connect-db.mjs";
import routeAuth from "./routes/routeAuth.mjs";
import routeClient from "./routes/routeClient.mjs";
import routeOrder from "./routes/routeOrder.mjs";
import { swaggerDocs } from "./config/swagger.mjs";

dotenv.config(); // Carga variables de entorno desde .env

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB Atlas
connectDB();

// Rutas principales
app.use("/api/auth", routeAuth);
app.use("/api/clients", routeClient);
app.use("/api/orders", routeOrder);

// Documentación Swagger
swaggerDocs(app);

// Ruta de prueba (verificar conexión)
app.get("/ping", (req, res) => {
  res.json({ msg: "API funcionando correctamente 🚀" });
});

// Puerto desde .env o 5000 por defecto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📑 Swagger docs en http://localhost:${PORT}/api/docs`);
});
export default app;