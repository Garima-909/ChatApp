import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: [true, "Please provide your full NAme."],
		},
		username: {
			type: String,
			required: true,
			required: [true, "Please provide your username."],
		},
        email: {
            type: String,
            required: true,
            validate: [validator.isEmail, "Please enter a valid email."]
        },
		password: {
			type: String,
			required: [true, "Please provide your password."],
			minlength: 6,
		},
		gender: {
			type: String,
			required: [true, "Please provide your gender."],
			enum: ["male", "female"],
		},
		profilePic: {
			type: String,
			default: "",
		},
		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;