import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const atmsAdapter = createEntityAdapter({
  selectId: (atm) => atm._id,
  sortComparer: (a, b) => a.createdAt - b.createdAt,
});

const initialState = atmsAdapter.getInitialState();

const atmsSlice = createSlice({
  name: "atms",
  initialState,
  reducers: {
    atmsReceived: atmsAdapter.upsertMany,
  },
});

export const { atmsReceived } = atmsSlice.actions;

export const {
  selectAll: selectAllATMs,
  selectById: selectATMBYID,
} = atmsAdapter.getSelectors((state) => state.atms);

export default atmsSlice.reducer;
