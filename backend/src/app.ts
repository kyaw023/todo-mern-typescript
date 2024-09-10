import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoutes from "./routes/index";

const app: Express = express();

dotenv.config();

const port: string | number = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());

const mongo_url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.chq4f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(mongo_url)
  .then(() => {
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    );
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api", todoRoutes);
