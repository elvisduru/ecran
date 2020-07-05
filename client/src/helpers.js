import axios from "axios";

export const fetchScreens = async () => {
  try {
    const res = await axios.get("/api/campaigns/screens");
    return res.data.screens;
  } catch (err) {
    console.log(err);
  }
};

export const getRequests = async () => {
  try {
    const res = await axios.get("/api/request/");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
