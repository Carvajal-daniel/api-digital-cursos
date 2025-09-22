const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { authenticateToken } = require("../middleware/authMiddleware");
const { authorizeAdmin } = require("../middleware/admin");

// Rotas públicas
router.post("/login", userController.login);
router.post("/", userController.createUser);

// Rotas protegidas (qualquer usuário logado)
// Coloque rotas estáticas antes das dinâmicas para evitar conflitos
router.get("/admin-dashboard", authenticateToken, authorizeAdmin, (req, res) => {
  res.json({ message: "Bem-vindo Admin 🚀" });
});

// Nova rota para verificar senha atual
router.post("/verify-password", authenticateToken, userController.verifyPassword);

// Rotas dinâmicas
router.put("/:id", authenticateToken, userController.updateUser);
router.get("/:email", authenticateToken, userController.getUserByEmail);

// Rota para admins
router.delete("/:id", authenticateToken, authorizeAdmin, userController.deleteUser);

module.exports = router;
