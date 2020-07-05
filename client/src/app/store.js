import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import campaignsReducer from "../Scenes/Campaigns/CampaignsSlice";
import requestsReducer from "../Scenes/Requests/New/requestsSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    campaigns: campaignsReducer,
    requests: requestsReducer,
  },
});
