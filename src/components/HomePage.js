import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MessageBox from "./MessageBox";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import useAuth from "../hooks/useAuth";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { setUser } from "../redux/slices/userSlice";
import { setOtherUsers } from "../redux/slices/otherUsersSlice";

const BASE_URL =
	process.env.REACT_APP_BASE_URL || "https://text-me-backend.onrender.com";

function HomePage() {
	const dispatch = useDispatch();
	const { auth } = useAuth();
	const { otherUsers } = useGetOtherUsers(auth);
	const selectedUser = useSelector((state) => state.selectedUser);
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);

	useEffect(() => {
		if (auth) {
			dispatch(setUser(auth.user));

			const socketio = io(BASE_URL, {
				query: {
					userId: auth.user._id,
				},
			});
			setSocket(socketio);

			socketio?.on("online", (onlineUsers) => {
				setOnlineUsers(onlineUsers);
			});
			return () => socketio?.close();
		}
	}, [auth]);

	useEffect(() => {
		dispatch(setOtherUsers(otherUsers));
	}, [otherUsers]);

	return (
		<div className="md:p-4 lg:p-12 h-full w-full md:flex">
			<Sidebar onlineUsers={onlineUsers} />
			{selectedUser ? (
				<MessageBox onlineUsers={onlineUsers} socket={socket} />
			) : (
				<div
					className={`p-4 flex-1 hidden md:flex flex-col border-2 border-gray-500 rounded-md justify-center items-center text-center h-full`}
				>
					<p className="text-4xl font-bold text-white mb-1">
						Hi, {auth?.user.name.split(" ")[0]}
					</p>
					<p className="text-2xl font-bold text-gray-300">
						Select a user to start messaging
					</p>
				</div>
			)}
		</div>
	);
}

export default HomePage;
