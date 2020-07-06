import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { getRequests } from "../../../helpers";

export const fetchRequests = createAsyncThunk("requests/fetchAll", async () => {
  const requests = await getRequests();
  return requests;
});

export const requestsAdapter = createEntityAdapter({
  selectId: (request) => request._id,
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const initialState = requestsAdapter.getInitialState();

export const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    addRequest: requestsAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRequests.fulfilled, requestsAdapter.upsertMany);
  },
});

export const { addRequest } = requestsSlice.actions;

export const { selectAll: selectAllRequests } = requestsAdapter.getSelectors(
  (state) => state.requests
);
export default requestsSlice.reducer;
