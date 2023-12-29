import { DataSource } from "typeorm";
import { User } from "../entities/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/db.sqlite",
  entities: [User],
  migrations: ["./src/database/migrations"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source inicializado!");
  })
  .catch((error) => {
    console.log(error);
  });
