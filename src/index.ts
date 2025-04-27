import express, {Express} from "express";
import authRoutes from "./routes/authRoutes.js";
import dietplanRoutes from "./routes/dietplanRoutes.js";
import dotenv from 'dotenv';
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app:Express = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON request body

app.use("/api/auth", authRoutes);
app.use("/api/diet", dietplanRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT);
