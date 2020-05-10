import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import campaignsReducer from '../Scenes/Campaigns/CampaignsSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    campaigns: campaignsReducer
  },
});
