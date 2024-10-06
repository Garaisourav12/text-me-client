import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import OtherUsers from "./OtherUsers";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import hitApi from "../api";
import { clearUser } from "../redux/slices/userSlice";
import { clearOtherUsers } from "../redux/slices/otherUsersSlice";
import { clearSelectedUser } from "../redux/slices/selectedUserSlice";
import { clearMessages } from "../redux/slices/messagesSlice";
import { useNavigate } from "react-router-dom";

function Sidebar({ onlineUsers }) {
	const [search, setSearch] = useState("");
	const [focus, setFocus] = useState(false);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const selectedUser = useSelector((state) => state.selectedUser);

	const handleLogout = async () => {
		try {
			setLoading(true);
			const response = await hitApi("/user/logout", "get");

			dispatch(clearUser());
			dispatch(clearOtherUsers());
			dispatch(clearSelectedUser());
			dispatch(clearMessages());

			toast.success(response.data.message);
			navigate("/login");
		} catch (err) {
			toast.error(err.response.data.error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className={`md:w-[350px] h-full p-4 md:ps-0 ${
				selectedUser ? "hidden md:flex" : "flex"
			} flex-col`}
		>
			{/* Search Box */}
			<div
				className={`w-full px-3 flex items-center gap-1 overflow-hidden rounded-md border-2 ${
					focus ? "border-gray-300" : "border-gray-400"
				} bg-[#121212] transition-all duration-200`}
			>
				<input
					type="text"
					placeholder="Search..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					className="flex-1 py-2 border-none outline-none bg-transparent text-gray-300"
				/>
				{/* serach icon from react-icon */}
				<IoMdSearch className="w-5 h-5" />
			</div>

			{/* divider */}
			<div className="w-full h-[1px] bg-gray-600 my-4"></div>

			{/* Contact List */}
			<OtherUsers onlineUsers={onlineUsers} search={search} />

			{/* divider */}
			<div className="w-full h-[1px] bg-gray-600 my-4"></div>

			{/* Logout button */}
			<button
				className="btn btn-error font-bold"
				onClick={handleLogout}
				disabled={loading}
			>
				{loading ? "Logging out..." : "Logout"}
			</button>
		</div>
	);
}

export default Sidebar;
