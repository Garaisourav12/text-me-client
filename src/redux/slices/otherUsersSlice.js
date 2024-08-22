import { createSlice } from "@reduxjs/toolkit";

const otherUsersSlice = createSlice({
    name: "otherUsers",
    initialState: [],
    reducers: {
        setOtherUsers: (state, action) => {
            return action.payload;
        },
        clearOtherUsers: (state, action) => {
            return [];
        },
    },
});

export const { setOtherUsers, clearOtherUsers } = otherUsersSlice.actions;
export default otherUsersSlice.reducer;
