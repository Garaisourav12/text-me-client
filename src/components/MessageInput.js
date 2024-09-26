import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import hitApi from "../api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function MessageInput() {
	const [message, setMessage] = useState("");
	const selectedUser = useSelector((state) => state.selectedUser);

	const sendMessage = async () => {
		if (!message) {
			return;
		}

		// Store message in seperate variable
		const messageToSend = message;
		setMessage("");

		try {
			await hitApi(`/message/send/${selectedUser._id}`, "post", {
				message: messageToSend,
			});
		} catch (err) {
			toast.error(err.response.data.error);
		}
	};

	const handleEnterPress = (e) => {
		if (e.key === "Enter") {
			sendMessage();
		}
	};

	return (
		<div className="px-4 mb-4">
			<div className="w-full px-3 flex items-center gap-1 overflow-hidden rounded-md border-2 bg-[#121212] border-primary">
				<input
					type="text"
					placeholder="Type to send..."
					rows={1}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={handleEnterPress}
					className="message-input flex-1 py-4 border-none outline-none bg-transparent resize-none"
				/>
				{/* serach icon from react-icon */}
				<IoMdSend
					onClick={sendMessage}
					className="w-8 h-8 text-primary hover:opacity-90 duration-300 cursor-pointer"
				/>
			</div>
		</div>
	);
}

export default MessageInput;
