import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import otherUsersReducer from "./slices/otherUsersSlice";
import selectedUserReducer from "./slices/selectedUserSlice";
import messagesReducer from "./slices/messagesSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        otherUsers: otherUsersReducer,
        selectedUser: selectedUserReducer,
        messages: messagesReducer,
    },
});

export default store;
