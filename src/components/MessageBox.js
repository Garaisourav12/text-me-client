import React from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import SelectedProfile from "./SelectedProfile";

function MessageBox({ onlineUsers, socket }) {
    return (
        <div className="h-full flex-1 flex flex-col md:border-2 border-primary overflow-hidden md:rounded-md">
            <SelectedProfile onlineUsers={onlineUsers} />
            <Messages socket={socket} />
            <MessageInput />
        </div>
    );
}

export default MessageBox;
