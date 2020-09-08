import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { updateManyATMs } from "../../helpers";

export const updateATMs = createAsyncThunk("atms/updateMany", async (data) => {
  try {
    console.log(data);
    const atms = await updateManyATMs(data);
    return atms;
  } catch (error) {
    console.log(error);
  }
});

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
