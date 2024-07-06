import User from "../models/user.js";
import generateTokenAndSetCookie from "../uitls/generateToken.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";

export const login = async(req, res) => {
    try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};














export const logout = async(req, res) => {
    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

















export const signup = async(req, res) => {
    try {
		const { fullName, username, email, password, confirmPassword, gender } = req.body;
		console.log(req.body);

		if (password !== confirmPassword) {
			console.log("p is : " , password);
			console.log("cp is : ", confirmPassword);
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		let profilePic = "";
		console.log(req.files);
		if(!req.files || Object.keys(req.files).length === 0){
			profilePic = `https://robohash.org/${username}`;
		}
		else{
			const dp = req.files.profilePic;
			// console.log("------------------");
			// console.log(dp);
			// console.log("------------------");
			const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

			if(!allowedFormats.includes(dp.mimetype)){
				return res.status(400).json({error: "Invalid file type !"});
			}

			const cloudinaryResponse = await cloudinary.uploader.upload(dp.tempFilePath, {
				folder: 'chatApp', // optional: specify a folder in Cloudinary
				use_filename: true, // optional: use the original filename
				unique_filename: false // optional: do not use unique filenames
			});


			if(!cloudinaryResponse || cloudinaryResponse.error){
				console.error("Cloudinary error : ", cloudinaryResponse.error || "Unknown error");
				return res.status(400).json({error: "Failed to save profile pic !"});
			}

			profilePic = cloudinaryResponse.secure_url;
		}
		
		

		const newUser = new User({
			fullName,
			username,
			email,
			password: hashedPassword,
			gender,
			profilePic
		});

		if (newUser) {
			// Generate JWT token here
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller : ", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};