import { Router, Request, Response } from "express";
import { UserController } from "./controllers/UserController";
import { LoginController } from "./controllers/LoginController";
import { verifyauth } from "./middleware/verifyAuth";

export const router = Router();

const userController = new UserController();
const loginController = new LoginController();

router.post("/user", userController.createUser);
router.get("/user/:userId", verifyauth, userController.getUser);
router.delete("/user", userController.deleteUser);

router.post("/login", loginController.login);
