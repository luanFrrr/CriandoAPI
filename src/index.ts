import express, { Request, Response } from "express";
import { router } from "./routes";

const PORT = 5000;

const server = express();

server.use(express.json());
server.use(router);

server.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "DioBank API" });
});

server.listen(PORT, function () {
  console.log(`Server ON rodando na porta ${PORT}`);
});
