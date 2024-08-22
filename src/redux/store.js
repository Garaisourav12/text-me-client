import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import otherUsersReducer from "./slices/otherUsersSlice";
import selectedUserReducer from "./slices/selectedUserSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        otherUsers: otherUsersReducer,
        selectedUser: selectedUserReducer,
    },
});

export default store;
