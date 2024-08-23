import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
    name: "otherUsers",
    initialState: [],
    reducers: {
        setMessages: (state, action) => {
            return action.payload;
        },
        addMessage: (state, action) => {
            return [...state, action.payload];
        },
        clearMessages: (state, action) => {
            return [];
        },
    },
});

export const { setMessages, addMessage, clearMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
