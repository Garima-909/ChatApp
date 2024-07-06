import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [profilePic, setProfilePic] = useState("");
	const [gender, setGender] = useState("");

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setGender(gender);
	};

	const handleFileChange = (event) => {
		setProfilePic(event.target.files[0]);
	  };

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("fullName", fullName);
		formData.append("username", username);
		formData.append("email", email);
		formData.append("password", password);
		formData.append("confirmPassword", confirmPassword);
		formData.append("gender", gender);
		formData.append("profilePic", profilePic);
		// for (let [key, value] of formData.entries()) {
		// 	console.log(key, value);
		// }
		await signup(formData);
	};

	return (
		<div className='  h-[90%] flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className=' overflow-auto   w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input
							type='text'
							className='w-full input input-bordered  h-10'
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
						/>
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							className='w-full input input-bordered h-10'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

                    <div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Email</span>
						</label>
						<input
							type='text'
							className='w-full input input-bordered h-10'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							className='w-full input input-bordered h-10'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							className='w-full input input-bordered h-10'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<div>
						<label
						style={{ textAlign: "start", display: "block", fontSize: "20px" }}
						>
						Select Profile Pic
						</label>
						<input
						type="file"
						accept=".pdf, .jpg, .png"
						onChange={handleFileChange}
						style={{ width: "100%" }}
						/>
					</div>

					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={gender} />

					<Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
						href='#'
					>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;

// bg-gray-100