import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetMessages from "../hooks/useGetMessages";
import Message from "./Message";
import { addMessage, setMessages } from "../redux/slices/messagesSlice";

function Messages({ socket }) {
	const dispatch = useDispatch();
	const selectedUser = useSelector((state) => state.selectedUser);
	const messages = useSelector((state) => state.messages);
	const { messages: retrievedMessages, loading } =
		useGetMessages(selectedUser);

	/*
	 * Need message queue here to recived messages effeciently
	 * At the first render, we need to dispatch setMessages for add old messages
	 * Then we need to dispatch addMessage for add new messages one by one
	 * And the queue execute those actions in order (FIFO)
	 */
	useEffect(() => {
		dispatch(setMessages(retrievedMessages));
	}, [retrievedMessages]);

	useEffect(() => {
		socket.on("newMessage", (data) => {
			if (data.senderId === selectedUser._id) {
				// Message from selected user
				dispatch(addMessage(data));
			}
		});

		socket.on("sentMessage", (data) => {
			if (data.receiverId === selectedUser._id) {
				// Message to selected user
				dispatch(addMessage(data));
			}
		});

		return () => {
			socket.off("newMessage");
			socket.off("sentMessage");
		};
	}, [selectedUser]);

	return (
		<div className="flex-1 flex flex-col gap-2 py-4 px-3 mx-1 overflow-y-auto">
			{!loading && (
				<>
					{messages?.map((message) => (
						<Message key={message._id} message={message} />
					))}
				</>
			)}
		</div>
	);
}

export default Messages;
