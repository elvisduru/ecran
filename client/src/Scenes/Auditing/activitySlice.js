import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { fetchActivities } from "../../helpers";

const activityAdapter = createEntityAdapter({
  selectId: (activity) => {
    return activity._id;
  },
  sortComparer: (a, b) => a.createdAt - b.createdAt,
});

export const fetchAllActivities = createAsyncThunk(
  "activities/fetchAll",
  async () => {
    try {
      const activities = await fetchActivities();
      return activities;
    } catch (error) {
      console.log(error);
    }
  }
);

const activitySlice = createSlice({
  name: "activities",
  initialState: activityAdapter.getInitialState(),
  reducers: {
    addActivity: activityAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllActivities.fulfilled, activityAdapter.upsertMany);
  },
});

export const { addActivity } = activitySlice.actions;

export const {
  selectAll: selectAllActivities,
  selectById: selectActivityById,
} = activityAdapter.getSelectors((state) => state.activities);

export default activitySlice.reducer;
