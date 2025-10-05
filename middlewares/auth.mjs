import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Acceso denegado. Token requerido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guarda info del usuario en la request
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};

export default auth;
