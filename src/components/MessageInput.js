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

        try {
            const response = await hitApi(
                `/message/send/${selectedUser._id}`,
                "post",
                { message }
            );

            // toast.success(response.data.message);
        } catch (err) {
            toast.error(err.response.data.error);
        }

        setMessage("");
    };

    return (
        <div className="px-4 mb-4">
            <div className="w-full px-3 flex items-center gap-1 overflow-hidden rounded-md border-2 bg-[#121212] border-primary">
                <textarea
                    placeholder="Type to send..."
                    rows={1}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
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
