import express from "express";
import dotenv from "dotenv";
import connectToDB from "./db/connect.js";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import userRoutes from "./routes/user.js";
import cookieParser from "cookie-parser";
import {app, server} from "./socket/socket.js";
import path from "path";


dotenv.config();
const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

app.use(express.json());//to extract data from req.body
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
    connectToDB();
    console.log(`server is listening for requests on port ${PORT}`);
});