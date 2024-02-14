import "dotenv/config";
import { AppDataSource } from "./data-source";
import { app } from "./app";

AppDataSource.initialize()
  .then((): void => {
    console.log("Database connected");

    const PORT: number = Number(process.env.PORT);
    app.listen(PORT, (): void => console.log(`App is running at port ${PORT}`));
  })
  .catch((error): void => console.log(error));
