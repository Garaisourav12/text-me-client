import React, { useMemo } from "react";
import OtherUser from "./OtherUser";
import { useSelector } from "react-redux";

function OtherUsers({ onlineUsers, search }) {
    const otherUsers = useSelector((state) => state.otherUsers);

    const filteredOtherUsers = useMemo(() => {
        return otherUsers.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [otherUsers, search]);

    return (
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto other-users">
            {filteredOtherUsers.map((user) => (
                <OtherUser
                    key={user._id}
                    onlineUsers={onlineUsers}
                    user={user}
                />
            ))}
        </div>
    );
}

export default OtherUsers;
