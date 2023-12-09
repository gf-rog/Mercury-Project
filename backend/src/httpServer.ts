import dotenv from "dotenv";
import servers from "./server";
import usersRouter from "./routes/usersRoute";
import authRouter from "./routes/authRoute";
import importInitialData from "./data/importData";
const { app } = servers;

dotenv.config();
const linkSecret = process.env.LINK_SECRET;

importInitialData().then((res) => console.log(res));

app.use("/users", usersRouter);
app.use("/auth", authRouter);