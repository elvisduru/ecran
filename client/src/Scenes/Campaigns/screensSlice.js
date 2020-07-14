import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { fetchScreens } from "../../helpers";

export const fetchAllScreens = createAsyncThunk(
  "screens/fetchAll",
  async () => {
    try {
      const screens = await fetchScreens();
      return screens;
    } catch (error) {
      console.log(error);
    }
  }
);

export const screensAdapter = createEntityAdapter({
  selectId: (screen) => screen._id,
  sortComparer: (a, b) => a.createdAt - b.createdAt,
});

const initialState = screensAdapter.getInitialState();

export const screensSlice = createSlice({
  name: "screens",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllScreens.fulfilled, screensAdapter.upsertMany);
  },
});

export const { selectAll: selectAllScreens } = screensAdapter.getSelectors(
  (state) => state.screens
);

export default screensSlice.reducer;
