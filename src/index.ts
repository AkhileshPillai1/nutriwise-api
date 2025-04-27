import express, {Express} from "express";
import authRoutes from "./routes/authRoutes.js";
import dietplanRoutes from "./routes/dietplanRoutes.js";
import dotenv from 'dotenv';

dotenv.config();

const app:Express = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON request body

app.use("/api/auth", authRoutes);
app.use("/api/diet", dietplanRoutes);

app.listen(PORT);
