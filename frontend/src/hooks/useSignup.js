import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({ fullName, username, email, password, confirmPassword, gender }) => {
		const success = handleInputErrors({ fullName, username, email, password, confirmPassword, gender });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, email, password, confirmPassword, gender }),
			});
			console.log(1);
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			console.log(2);
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
			console.log(3);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ fullName, username, email, password, confirmPassword, gender }) {
	console.log(1);
	if (!fullName || !username || !password || !confirmPassword || !gender || !email) {
		toast.error("Please fill in all fields");
		return false;
	}
	console.log(2);
	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}
	console.log(3);
	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}
	console.log(4);

	return true;
}