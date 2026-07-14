import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./types"; 

const feedSlice = createSlice({
  name: "feed",
  initialState: null as User[] | null,
  reducers: {
    addFeed: (_state, action: PayloadAction<User[]>) => {
      return action.payload;
    },
    removeFeed: (state, action: PayloadAction<string>) => {
      if (!state) return state;
      return state.filter((r) => r._id !== action.payload);
    },
    nullFeed: () => {
      return null;
    },
  },
});

export const { addFeed, removeFeed, nullFeed } = feedSlice.actions;
export default feedSlice.reducer;