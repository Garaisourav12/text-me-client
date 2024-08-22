import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useGetMessages from "../hooks/useGetMessages";
import Message from "./Message";

function Messages({ socket }) {
    const selectedUser = useSelector((state) => state.selectedUser);
    const { messages, setMessages, loading } = useGetMessages(selectedUser);

    useEffect(() => {
        socket.on("newMessage", (data) => {
            setMessages((prev) => [...prev, data]);
        });
        socket.on("sentMessage", (data) => {
            setMessages((prev) => [...prev, data]);
        });
    }, []);

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
