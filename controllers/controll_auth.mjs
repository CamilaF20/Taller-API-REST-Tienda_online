import User from "../models/User.mjs";
import bcrypt from "bcryptjs";
import e from "express";
import jwt from "jsonwebtoken";

// Registrar usuario
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validar que no exista el usuario
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ error: "El usuario ya está registrado" });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login de usuario
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const passwordValida = await bcrypt.compare(password, user.password);
    if (!passwordValida) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Crear token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 👇 ESTA FUNCIÓN TE FALTABA
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // excluye password
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
