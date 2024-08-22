import React, { useMemo } from "react";
import { setSelectedUser } from "../redux/slices/selectedUserSlice";
import { useDispatch, useSelector } from "react-redux";

function OtherUser({ onlineUsers, user }) {
    const selectedUser = useSelector((state) => state.selectedUser);
    const dispatch = useDispatch();
    const isOnline = useMemo(() => {
        return onlineUsers.includes(user._id);
    }, [onlineUsers]);
    return (
        <div
            onClick={() => dispatch(setSelectedUser(user))}
            className={`flex gap-3 items-center bg-[#121212] rounded-md border-2 px-3 py-2 cursor-pointer ${
                user._id === selectedUser?._id
                    ? "border-primary opacity-100"
                    : "border-gray-300 opacity-70"
            } hover:opacity-100 transition-all duration-300`}
        >
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-10 rounded-full">
                    <img
                        src={`https://avatar.iran.liara.run/public/${
                            user.gender === "male" ? "boy" : "girl"
                        }`}
                        alt="user-profile"
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center flex-1">
                <p className="font-semibold text-gray-200">{user.name}</p>
                <p className="text-[.7rem] text-gray-400">{"Last Message"}</p>
            </div>
        </div>
    );
}

export default OtherUser;
