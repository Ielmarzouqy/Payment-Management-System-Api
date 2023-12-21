const express = require("express");
const userRoute = express.Router();
const AuthController = require("../../controller/auth/AuthController");
const authController = new AuthController();

userRoute.post("/register", authController.register);
// userRoute.post("/login", authController.login);
// userRoute.get("/logout", authController.logout);



module.exports = userRoute;
