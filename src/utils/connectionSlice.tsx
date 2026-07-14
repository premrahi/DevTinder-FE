import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./types";

const connectionSlice = createSlice({
  name: "connection",
  initialState: null as User[] | null,
  reducers: {
    addConnections: (_state, action: PayloadAction<User[]>) => action.payload,
    removeConnections: () => null,
  },
});

export const { addConnections, removeConnections } = connectionSlice.actions;
export default connectionSlice.reducer;