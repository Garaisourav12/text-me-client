import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetMessages from "../hooks/useGetMessages";
import Message from "./Message";

function Messages({ socket }) {
    const dispatch = useDispatch();
    const selectedUser = useSelector((state) => state.selectedUser);
    const messages = useSelector((state) => state.messages);
    const {
        messages: retrievedMessages,
        setMessages,
        loading,
    } = useGetMessages(selectedUser);

    useEffect(() => {
        dispatch(setMessages(retrievedMessages));
    }, [retrievedMessages]);

    useEffect(() => {
        socket.on("newMessage", (data) => {
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
