import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import hitApi from "../api";

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSignIn = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			const response = await hitApi("/user/login", "post", {
				email,
				password,
			});
			toast.success(response.data.message);

			// Clear form fields
			setEmail("");
			setPassword("");

			// Redirect to home page
			navigate("/");
		} catch (error) {
			toast.error(error.response.data.error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex justify-center items-center w-full h-screen">
			<div className="flex py-2 w-[420px] max-w-[95%] rounded-lg shadow-lg bg-primary">
				<form
					action=""
					className="flex flex-col py-10 px-8 w-full rounded-lg bg-[#171c22]"
					onSubmit={handleSignIn}
				>
					<h1 className="text-center text-3xl font-semibold mb-8">
						SignIn
					</h1>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="input w-full mb-4 outline-none border-2 bg-[#171c22] text-gray-300 border-gray-400 focus:border-gray-300 transition-all duration-200"
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="input w-full mb-4 outline-none border-2 bg-[#171c22] text-gray-300 border-gray-400 focus:border-gray-300 transition-all duration-200"
					/>
					<p className="text-center mb-4">
						Don't have an account?{" "}
						<Link
							className="text-primary hover:text-[#6370f6] transition-all duration-300"
							to="/register"
						>
							SignUp
						</Link>
					</p>
					<button
						type="submit"
						disabled={loading}
						className="btn btn-primary"
					>
						{loading ? "SigningIn..." : "SignIn"}
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
