import express from "express";
import dotenv from "dotenv";
import connectToDB from "./db/connect.js";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import userRoutes from "./routes/user.js";
import cookieParser from "cookie-parser";
import {app, server} from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());//to extract data from req.body
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
    connectToDB();
    console.log(`server is listening for requests on port ${PORT}`);
});