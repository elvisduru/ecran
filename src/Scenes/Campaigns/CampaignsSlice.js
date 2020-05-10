import { createSlice } from '@reduxjs/toolkit'
import atms from '../../atm-list.json'

import defaultScreen from '../../images/PIC301.png'
import screen from '../../images/ad2.png'

const data = atms.map(atm => {
  atm.defaultScreen = defaultScreen
  atm.screen = screen
  atm.key = atm["S/N"]
  return atm
})

export const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState: data,
  reducers: {
    addCampaign: (state, action) => {
      const { id, screen } = action.payload
      state.push({
        'Terminal ID': id,
        screen,
        "Sol ID": "001",
        "Location": "Hyo_Ajose_CD1",
        "Last Txn Date": "21/11/2019 16:47",
        "Status": "ACTIVE",
        "Address": "292B, Ajose Adeogun, Victoria Island, Lagos",
        "Type": "Hyosung",
        "IP Address": "10.0.86.68",
        "Location Type": "EC",
        "State": "Lagos",
        "Region": "Lagos Island"
      })
    },
    modifyCampaign: (state, action) => {
      const { id, screen, defaultScreen } = action.payload
      const campaign = state.find(campaign => campaign['Terminal ID'] === id)
      if (campaign) {
        if (screen) campaign.screen = screen
        if (defaultScreen) campaign.defaultScreen = defaultScreen
      }
    }
  }
})

export const { addCampaign, modifyCampaign } = campaignsSlice.actions

export const selectCampaigns = state => state.campaigns

export default campaignsSlice.reducer