import axios from "axios";

export const fetchScreens = async () => {
  try {
    const res = await axios.get("/api/campaigns/");
    return res.data.screens;
  } catch (error) {
    console.log(error);
  }
};

export const getRequests = async () => {
  try {
    const res = await axios.get("/api/request/");
    res.data.forEach((item) => (item.key = item._id));
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateRequestByID = async (id, fields) => {
  try {
    const res = await axios.put("/api/request/", { id, fields });
    return res.data;
  } catch (error) {
    console.log("Error:", error);
  }
};

export const updateScreenByID = async (id, fields) => {
  try {
    const res = await axios.put("/api/campaigns/", { id, fields });
    return res.data;
  } catch (error) {
    console.log("Error:", error);
  }
};
