import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        removeFeed: (state, action) => {
            if (!state) return state;
            return { ...state, data: state.data.filter(r => r._id !== action.payload) };
        },
        nullFeed: () => {
            return null;
        }
    }
})

export const { addFeed, removeFeed, nullFeed } = feedSlice.actions;
export default feedSlice.reducer;