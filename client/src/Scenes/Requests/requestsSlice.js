import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { getRequests, updateRequestByID, addNewRequest } from "../../helpers";

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

export const addRequest = createAsyncThunk(
  "requests/addOne",
  async (requestData, { rejectWithValue }) => {
    try {
      const request = await addNewRequest(requestData);
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRequests.fulfilled, requestsAdapter.upsertMany);
    builder.addCase(updateRequest.fulfilled, requestsAdapter.updateOne);
    builder.addCase(addRequest.fulfilled, requestsAdapter.addOne);
  },
});

export const {
  selectAll: selectAllRequests,
  selectById: selectRequestById,
} = requestsAdapter.getSelectors((state) => state.requests);

export default requestsSlice.reducer;
