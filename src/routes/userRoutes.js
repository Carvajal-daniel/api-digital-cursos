const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { authenticateToken } = require("../middleware/authMiddleware");

// Rotas públicas
router.post("/login", userController.login);
router.post("/", userController.createUser);

// Rotas protegidas
router.put("/:id", authenticateToken, userController.updateUser);
router.get("/:email", authenticateToken, userController.getUserByEmail);

module.exports = router;
