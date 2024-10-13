import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import postRoutes from "./routes/post.route";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

createConnection({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + "/entity/**/*.ts"],
  synchronize: true,
})
  .then(() => {
    console.log("Connected to the database ✅");
    app.listen(process.env.SERVER_PORT, () =>
      console.log(`Server running on port ${process.env.SERVER_PORT}`)
    );
  })
  .catch((error) => console.log("Database connection error: ", error));
