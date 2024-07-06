import express from "express";
import dotenv from "dotenv";
import connectToDB from "./db/connect.js";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import userRoutes from "./routes/user.js";
import cookieParser from "cookie-parser";
import {app, server} from "./socket/socket.js";
import path from "path";
import cloudinary from "cloudinary";
import fileUpload from 'express-fileupload';
import cors from "cors";


dotenv.config();//{path: '../config.env'}
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// console.log("CLOUDINARY_API_KEY", process.env.CLOUDINARY_API_KEY);

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}));

const __dirname = path.resolve();

const PORT = process.env.PORT || 8000;

app.use(cookieParser());
app.use(express.json());//to extract data from req.body
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use(express.static(path.join(__dirname, "/frontend/dist")));


// app.get("*", (req, res) => {
// 	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

server.listen(PORT, () => {
    connectToDB();
    console.log(`server is listening for requests on port ${PORT}`);
});