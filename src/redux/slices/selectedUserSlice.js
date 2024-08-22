import { createSlice } from "@reduxjs/toolkit";

const selectedUserSlice = createSlice({
    name: "selectedUser",
    initialState: null,
    reducers: {
        setSelectedUser: (state, action) => {
            return action.payload;
        },
        clearSelectedUser: (state, action) => {
            return null;
        },
    },
});

export const { setSelectedUser, clearSelectedUser } = selectedUserSlice.actions;
export default selectedUserSlice.reducer;
