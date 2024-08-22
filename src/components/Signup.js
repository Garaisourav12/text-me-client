import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import hitApi from "../api";

function Signup() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const user = {
            name: fullName,
            email,
            username,
            password,
            confirmPassword,
            gender,
        };

        try {
            const response = await hitApi("/user/register", "post", user);

            toast.success(response.data.message);

            // Clear form fields
            setFullName("");
            setEmail("");
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setGender("");

            // Redirect to login page
            navigate("/login");
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="flex py-2 w-[420px] max-w-[95%] rounded-lg shadow-lg bg-primary">
                <form
                    action=""
                    className="flex flex-col py-8 px-8 w-full rounded-lg bg-[#171c22]"
                    onSubmit={handleSignup}
                >
                    <h1 className="text-center text-3xl font-semibold mb-6">
                        SignUp
                    </h1>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="input w-full mb-4 outline-none border-2 bg-[#171c22] text-gray-300 border-gray-400 focus:border-gray-300 transition-all duration-200"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input w-full mb-4 outline-none border-2 bg-[#171c22] text-gray-300 border-gray-400 focus:border-gray-300 transition-all duration-200"
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input w-full mb-4 outline-none border-2 bg-[#171c22] text-gray-300 border-gray-400 focus:border-gray-300 transition-all duration-200"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input w-full mb-4 outline-none border-2 bg-[#171c22] text-gray-300 border-gray-400 focus:border-gray-300 transition-all duration-200"
                    />
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input w-full outline-none border-2 bg-[#171c22] text-gray-300 border-gray-400 focus:border-gray-300 transition-all duration-200"
                        />
                        {password !== confirmPassword && (
                            <p className="text-red-500 text-center mt-1">
                                Password not matched
                            </p>
                        )}
                    </div>
                    <div className="flex gap-4 items-center mb-4">
                        <input
                            type="radio"
                            name="Male"
                            value={"male"}
                            onChange={handleGenderChange}
                            className="radio w-5 h-5 radio-primary"
                            checked={gender === "male"}
                        />
                        <label className="">Male</label>
                        <input
                            type="radio"
                            name="Female"
                            value={"female"}
                            onChange={handleGenderChange}
                            className="radio w-5 h-5 radio-primary"
                            checked={gender === "female"}
                        />
                        <label className="">Female</label>
                        <input
                            type="radio"
                            name="Others"
                            value={"others"}
                            onChange={handleGenderChange}
                            className="radio w-5 h-5 radio-primary"
                            checked={gender === "others"}
                        />
                        <label className="">Others</label>
                    </div>
                    <p className="text-center mb-4">
                        Already have an account?{" "}
                        <Link
                            className="text-primary hover:text-[#6370f6] transition-all duration-300"
                            to="/login"
                        >
                            SignIn
                        </Link>
                    </p>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={password !== confirmPassword}
                    >
                        SignUp
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
