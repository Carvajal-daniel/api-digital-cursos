const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const userModel = require("../models/UserModels");

dotenv.config();

// Buscar usuário por e-mail
async function getUserByEmail(req, res) {
  const { email } = req.params;
  try {
    const user = await userModel.findUserByEmail(email);
    if (!user)
      return res
        .status(404)
        .json({ status: "error", message: "Usuário não encontrado" });
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

// Criar usuário com senha criptografada
async function createUser(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.createUser(name, email, hashedPassword);
    res.status(201).json({ message: "Usuário criado com sucesso", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Atualizar usuário (re-hash da senha se mudar)
async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ status: "error", message: "Todos os campos são obrigatórios" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.updateUser(id, {
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email e senha são obrigatórios" });

  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Senha inválida" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, // 👈 role incluído
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    // 👇 envia **uma única resposta** com token + usuário
    res.json({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role, // 👈 importante
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = { getUserByEmail, createUser, updateUser, login };
