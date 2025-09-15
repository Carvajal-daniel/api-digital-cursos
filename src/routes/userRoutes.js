const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { authenticateToken } = require("../middleware/authMiddleware");
const { authorizeAdmin } = require("../middleware/admin");

// Rotas públicas
router.post("/login", userController.login);
router.post("/", userController.createUser);

// Rotas protegidas (qualquer usuário logado)
router.put("/:id", authenticateToken, userController.updateUser);
router.get("/:email", authenticateToken, userController.getUserByEmail);

// Rota só para admins
router.get("/admin-dashboard", authenticateToken, authorizeAdmin, (req, res) => {
  res.json({ message: "Bem-vindo Admin 🚀" });
});

module.exports = router;
