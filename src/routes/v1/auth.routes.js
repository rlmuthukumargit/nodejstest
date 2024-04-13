const express = require("express");
const authRoutes = express.Router();
const { verifyToken } = require("../../middleware");
const { authController } = require("../../controllers/index");

authRoutes.get('/reset-password', verifyToken.validateToken, authController.verifyToken);
 
module.exports = authRoutes;