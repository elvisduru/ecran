import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { fetchScreens, updateScreenByID } from "../../helpers";

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

export const updateScreen = createAsyncThunk(
  "screens/update",
  async (screenData, { rejectWithValue }) => {
    const { id, ...fields } = screenData;
    try {
      const screen = await updateScreenByID(id, fields);
      return screen;
    } catch (error) {
      console.log(error);
    }
  }
);

const screensAdapter = createEntityAdapter({
  selectId: (screen) => screen._id,
  sortComparer: (a, b) => a.createdAt - b.createdAt,
});

const initialState = screensAdapter.getInitialState();

const screensSlice = createSlice({
  name: "screens",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllScreens.fulfilled, screensAdapter.upsertMany);
    builder.addCase(updateScreen.fulfilled, screensAdapter.updateOne);
  },
});

export const { selectAll: selectAllScreens } = screensAdapter.getSelectors(
  (state) => state.screens
);

export default screensSlice.reducer;
