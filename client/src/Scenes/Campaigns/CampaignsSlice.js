import { createSlice } from "@reduxjs/toolkit";

export const campaignsSlice = createSlice({
  name: "campaigns",
  initialState: [],
  reducers: {
    addCampaign: (state, action) => {
      const { id, screen } = action.payload;
      state.push({
        "Terminal ID": id,
        screen,
        "Sol ID": "001",
        Location: "Hyo_Ajose_CD1",
        "Last Txn Date": "21/11/2019 16:47",
        Status: "ACTIVE",
        Address: "292B, Ajose Adeogun, Victoria Island, Lagos",
        Type: "Hyosung",
        "IP Address": "10.0.86.68",
        "Location Type": "EC",
        State: "Lagos",
        Region: "Lagos Island",
      });
    },
    modifyCampaign: (state, action) => {
      const { id, screen, defaultScreen } = action.payload;
      const campaign = state.find((campaign) => campaign["Terminal ID"] === id);
      if (campaign) {
        if (screen) campaign.screen = screen;
        if (defaultScreen) campaign.defaultScreen = defaultScreen;
      }
    },
  },
});

export const { addCampaign, modifyCampaign } = campaignsSlice.actions;

export const selectCampaigns = (state) => state.campaigns;

export default campaignsSlice.reducer;
