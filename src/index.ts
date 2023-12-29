import "reflect-metadata";
import express, { Request, Response } from "express";
import { router } from "./routes";
import { AppDataSource } from "./database";

const PORT = 5000;

const server = express();

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source inicializado!");
  })
  .catch((error) => {
    console.log(error);
  });

server.use(express.json());
server.use(router);

server.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "DioBank API" });
});

server.listen(PORT, function () {
  console.log(`Server ON rodando na porta ${PORT}`);
});
