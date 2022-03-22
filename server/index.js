import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"; //跨域
import dotenv from "dotenv"; //类似环境变量

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); //cors 在router之前

app.use("/posts", postRoutes);
app.use("/user", userRoutes);
//cloud.mongodb.com
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));

//mongoose.set('useFindAndModify', false);
