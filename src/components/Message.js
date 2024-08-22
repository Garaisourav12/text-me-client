import React, { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";

function Message({ message }) {
    const user = useSelector((state) => state.user);
    const scroll = useRef();

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const myMessage = useMemo(() => {
        return user._id === message.senderId;
    }, [message]);

    return (
        <div
            ref={scroll}
            className={`chat ${myMessage ? "chat-end" : "chat-start"}`}
        >
            {/* <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                </div>
            </div> */}
            <div className="chat-header mb-1">
                <time className="text-xs opacity-50 text-gray-100">
                    {new Date(message.createdAt).toLocaleString()}
                </time>
            </div>
            <div
                className={`chat-bubble ${
                    myMessage ? "chat-bubble-success" : ""
                }`}
            >
                <p className={myMessage ? "text-black" : "text-white"}>
                    {message.message}
                </p>
            </div>
        </div>
    );
}

export default Message;
