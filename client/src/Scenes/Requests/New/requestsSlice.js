import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { getRequests, updateRequestByID } from "../../../helpers";

export const fetchRequests = createAsyncThunk("requests/fetchAll", async () => {
  try {
    const requests = await getRequests();
    return requests;
  } catch (error) {
    console.log(error);
  }
});

export const updateRequest = createAsyncThunk(
  "requests/update",
  async (requestData, { rejectWithValue }) => {
    const { id, ...fields } = requestData;
    try {
      const request = await updateRequestByID(id, fields);
      return request;
    } catch (error) {
      console.log(error);
    }
  }
);

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
    builder.addCase(updateRequest.fulfilled, requestsAdapter.updateOne);
  },
});

export const { addRequest } = requestsSlice.actions;

export const { selectAll: selectAllRequests } = requestsAdapter.getSelectors(
  (state) => state.requests
);

export default requestsSlice.reducer;
