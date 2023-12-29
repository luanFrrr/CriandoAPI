import { Request, Response } from "express";
import { UserService } from "../services/UserServices";

export class UserController {
  userService: UserService;

  constructor(userService = new UserService()) {
    this.userService = userService;
  }

  createUser = (req: Request, res: Response) => {
    const user = req.body;

    if (!user.name || !user.email || !user.password) {
      return res
        .status(400)
        .json({ message: "Bad request! Todos os campos são obrigatórios" });
    }
    this.userService.createUser(user.name, user.email, user.password);
    return res.status(201).json({ message: "Usuário criado" });
  };

  getUser = (req: Request, res: Response) => {
    return res.status(200);
  };

  deleteUser = (req: Request, res: Response) => {
    const user = req.body;
    console.log("Deletando usuário");
    return res.status(200).json({ message: "Usuário deletado" });
  };
}
