import React, { useMemo } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedUser } from "../redux/slices/selectedUserSlice";

function SelectedProfile({ onlineUsers }) {
    const dispatch = useDispatch();
    const selectedUser = useSelector((state) => state.selectedUser);
    const isOnline = useMemo(() => {
        return onlineUsers.includes(selectedUser._id);
    }, [onlineUsers, selectedUser]);

    return (
        <div className={`flex gap-3 items-center bg-primary px-3 py-2`}>
            <IoArrowBack
                onClick={() => {
                    dispatch(clearSelectedUser());
                }}
                className="text-3xl text-white cursor-pointer md:hidden"
            />
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-10 rounded-full ring ring-offset-base-100 ring-offset-2">
                    <img
                        src={`https://avatar.iran.liara.run/public/${
                            selectedUser?.gender === "male" ? "boy" : "girl"
                        }`}
                        alt="user-profile"
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center flex-1">
                <p className="font-bold text-white">{selectedUser?.name}</p>
            </div>
        </div>
    );
}

export default SelectedProfile;
