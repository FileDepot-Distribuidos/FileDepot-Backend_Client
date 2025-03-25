import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/auth", require("./routes/authRoutes"));
app.use("/files", require("./routes/fileRoutes"));

export default app;